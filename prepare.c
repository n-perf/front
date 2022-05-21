#include <stdio.h>
#include <fcntl.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <stdbool.h>

#define MAX_PATH        1024
#define MAX_COMMAND     1024
#define MAX_READ_SIZE   1024
#define MAX_STR         200

struct options {
    bool before;
    bool after;
    bool module;
    bool err;
    bool verbose;
    char module_name[MAX_STR];
};
typedef struct options options;

char WORKING_PATH[MAX_PATH];
char FTRACE_RES_PATH[MAX_PATH];
options option;

// initialize path for results
void init_path(options *o) {
    strcpy(FTRACE_RES_PATH, WORKING_PATH);
    strcat(FTRACE_RES_PATH, "/ftrace");

    if(o->before) strcat(FTRACE_RES_PATH, ".before");
    else if(o->after) strcat(FTRACE_RES_PATH, ".after");
}

// initialize tracing
void init_tracing() {
    system("echo 0 > /sys/kernel/debug/tracing/tracing_on");
    if(option.verbose) printf("%s\n", "echo 0 > /sys/kernel/debug/tracing/tracing_on");

    system("echo 'function_graph' > /sys/kernel/debug/tracing/current_tracer");
    if(option.verbose) printf("%s\n", "echo 'function_graph' > /sys/kernel/debug/tracing/current_tracer");
}

// clean trace result
void clean_trace() {
    system("echo > /sys/kernel/debug/tracing/trace");
}

// set tracing_on
void start_trace() {
    clean_trace();
    system("echo 1 > /sys/kernel/debug/tracing/tracing_on");
    if(option.verbose) printf("%s\n", "echo > /sys/kernel/debug/tracing/trace");
    if(option.verbose) printf("%s\n", "echo 1 > /sys/kernel/debug/tracing/tracing_on");
}

// get available functions for tracing
void get_available_filter_functions(char *module) {
    char cmd[MAX_COMMAND];

    strcpy(cmd, "cat /sys/kernel/debug/tracing/available_filter_functions");
    strcat(cmd, " | grep ");
    strcat(cmd, module);
    strcat(cmd, " | sort > ");
    strcat(cmd, FTRACE_RES_PATH);

    if(option.verbose) printf("%s\n", cmd);
    system(cmd);
}

// set function filter for tracing
void set_available_filter_function(char *func) {
    char cmd[MAX_COMMAND];

    strcpy(cmd, "echo ");
    strcat(cmd, "'");
    strcat(cmd, func);
    strcat(cmd, "' >> ");
    strcat(cmd, "/sys/kernel/debug/tracing/set_graph_function");

    if(option.verbose) printf("%s\n", cmd);
    system(cmd);
}

// set functions filter for tracing
void set_available_filter_functions() {
    char function[MAX_READ_SIZE];
    char buffer[MAX_READ_SIZE];
    char answer[MAX_COMMAND];
    int fd, i, index;
    ssize_t size;
    bool bracket;

    if((fd = open(FTRACE_RES_PATH, O_RDONLY)) < 0) {
        fprintf(stderr, "[ERROR] %s open error\n", FTRACE_RES_PATH);
        exit(1);
    }

    while((size = read(fd, buffer, MAX_READ_SIZE)) > 0) {
        index = 0;
        bracket = false;
        for(i = 0; i < size; i++) {
            if(buffer[i] == '[') {
                bracket = true;
            }
            else if(buffer[i] == ']') {
                bracket = false;
            }
            else if(bracket || buffer[i] == ' ') {
                continue;
            }
            else if(buffer[i] == '\n') {
                function[index] = '\0';
                printf("[add] add function \"%s\" on ftrace (y/n)? ", function);
                fgets(answer, MAX_COMMAND, stdin);

                if(!strcmp(answer, "y\n") || !strcmp(answer, "Y\n") || !strcmp(answer, "\n")) {
                    if(!strcmp(answer, "\n")) printf("\n");
                    set_available_filter_function(function);
                }
                index = 0;
            }
            else {
                function[index++] = buffer[i];
            }
        }
        if(lseek(fd, index * -1, SEEK_CUR) < 0) {
            fprintf(stderr, "[ERROR] lseek error\n");
            exit(1);
        }
    }
}

// save tracing result of module
void save_tracing_res() {
    char cmd[MAX_COMMAND];

    strcpy(cmd, "cat /sys/kernel/debug/tracing/trace > ");
    strcat(cmd, FTRACE_RES_PATH);
    system(cmd);

    if(option.verbose) printf("%s\n", cmd);
}

// initialize option
void init_option(options *o) {
    o->before = false;
    o->after = false;
    o->module = false;
    o->err = false;
    o->verbose = false;
}

// parse option
void parse_option(int argc, char *argv[], options *o) {
    int opt;

    optind = 1;
    while ((opt = getopt(argc, argv, "bavm:")) != -1) {
        switch (opt) {
            case 'b': o->before = true; break;
            case 'a': o->after = true; break;
            case 'v': o->verbose = true; break;
            case 'm': {
                if(strlen(optarg) > 0) {
                    o->module = true;
                    strcpy(o->module_name, optarg);
                }
                else {
                    o->err = true;
                    break;
                }
            }
            default: break;
        }
    }
}

// print usage of this program
void print_usage() {
    printf("USAGE:\n");
    printf("  > prepare -b -a -m [KERNEL_MODULE_NAME]\n");
    printf("    >> -b : before\n");
    printf("    >> -a : after\n");
    printf("    >> -m [KERNEL_MODULE_NAME] : setting module name for tracing\n");
}

int main(int argc, char *argv[]) {
    char answer[MAX_COMMAND];

    if (argc < 2) {
        print_usage();
        exit(1);
    }

    init_option(&option);
    parse_option(argc, argv, &option);
    if (option.err || !option.module || (!option.before && !option.after)) {
        print_usage();
        exit(1);
    }

    if (getcwd(WORKING_PATH, MAX_PATH) == NULL) {
        fprintf(stderr, "[ERROR] getcwd error\n");
        exit(1);
    }

    init_path(&option);
    init_tracing();
    get_available_filter_functions(option.module_name);
    set_available_filter_functions();

    start_trace();

    while(1) {
        printf("When the test is finished (y/n)? ");
        fgets(answer, MAX_COMMAND, stdin);

        if(!strcmp(answer, "y\n") || !strcmp(answer, "Y\n")) break;
    }

    save_tracing_res();
    return 0;
}
