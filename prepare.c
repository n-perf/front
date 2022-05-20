#include <stdio.h>
#include <fcntl.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <stdbool.h>

#define MAX_PATH        1024
#define MAX_COMMAND     1024
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
    printf("  > net-perf -b -a -m [MODULE_NAME]\n");
    printf("    >> -b : before\n");
    printf("    >> -a : after\n");
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "[ERROR] Usage error\n");
        print_usage();
        exit(1);
    }

    init_option(&option);
    parse_option(argc, argv, &option);
    if (option.err || !option.module || (!option.before && !option.after)) {
        fprintf(stderr, "[ERROR] Usage error\n");
        print_usage();
        exit(1);
    }

    if (getcwd(WORKING_PATH, MAX_PATH) == NULL) {
        fprintf(stderr, "[ERROR] getcwd error\n");
        exit(1);
    }

    init_path(&option);
    init_tracing();

    return 0;
}
