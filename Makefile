CC = gcc

TARGET = main

all : $(TARGET)

$(TARGET) : prepare.c
	$(CC) -o $@ $^

clean :
	rm -rf *.o
	rm -rf $(TARGET)
	rm -rf .ftrace*