# 🌐 net-perf

`net-perf` is a web tool for measuring network performance.
It provide an efficient analysis by providing a visual view of exactly where the performance improvement was made.


## Why?

Let me give you an example of the HSR topology. HSR is implemented in the Linux kernel, but traditionally, the MAC addresses of nodes to which each node is connected are managed in a linked list, and the more links registered in one node, the more performance degrades.

Recently, to solve this problem, the Linux kernel has improved performance by reflecting patches that have changed the MAC address management method of each node from linked list structure to hash linked list.

However, there is a problem that this performance improvement can only be confirmed by the network results measured by iperf3. In other words, it is not possible to prove whether the use of the hash linked list has improved network performance.


## What?

Based on the above issues, we are developing a net-perf that identifies the need for a tool to prove that the performance improvement has been improved by correcting exactly which point, and visualizes and displays the results using ftrace and iperf3.

## How?

Installation is straightforward.

```shell
git clone https://github.com/n-perf/net-perf.git
cd net-perf
npm install
npm start
```
After uploading each of the .json file, iperf3 file, and ftrace file, simply click 'test performance'.

## Examples 
Typically, you access it through the CLI interface to use ftrace. However, in this case, the disadvantage is that the process of entering the tracing command into the /sys/kernel/debug/tracing path every time a test is performed is very cumbersome. In addition, to meet the requirements of measuring performance accurately or to be very sensitive to latency, the user thought it would be much more efficient to set the trace at the start of performance measurement, collect tracing data, and refine it immediately.

The prepare module measures the tracing data during the performance measurement period by executing it at the beginning of the performance measurement by entering the result value at the prompt to confirm that the performance measurement is finished. These prepare modules consist of initialization, function registration, and result storage steps. First, in the initialization step, a file path for storing the existing ftrace data is set, the existing tracing result data is deleted, and the current_tracer value is set to function_graph in order to check the call depth of the function and the execution time of each function. The figure is the code of the ftrace initialization part in the prepare module.

![ftrace초기화](https://user-images.githubusercontent.com/61650992/170805714-30667ed8-f65b-4e2c-8d3f-3e42b1369364.png)

When initialization is completed, the prepare module obtains a list of functions that can be traced according to the kernel module name input by the user. 
During the kernel build process, if the module's build option is not configured as [*] (built-in) as shown in Figure below, and is set to <M> (module) as shown in High-availability Seamless Redundancy, the trace cannot refer to the module and obtain a traceable function list.
  ![커널 빌드 옵션](https://user-images.githubusercontent.com/61650992/170805882-063c2e3d-d9eb-4b00-9299-910148445236.png)
  
Therefore, in this case, it is necessary to first load the corresponding kernel module. Whether the module is loaded or not can be confirmed through the lsmod command as shown in Figure.
 ![커널모듈로딩여부](https://user-images.githubusercontent.com/61650992/170806168-aba6d751-68ea-4dda-90cf-867685a1b5af.png)
  
  Once the module is loaded, a traceable list of functions can be obtained using available_filter_functions in ftrace. Based on this list, the user registers a function to be traced in the performance measurement process. ftrace provides an API called set_graph_fuction to trace a specific function, and it constructs a list of functions to filter by registering the function name in the file. Below is a part of the function registration step code to be traced, and a list of functions that can be traced in ftrace according to the kernel module name is taken, and functions that want to be analyzed for performance are selected and registered. After that, tracing is performed based on the registered function.
![트레이싱할 함수 등록](https://user-images.githubusercontent.com/61650992/170806422-5199566b-8dc0-490f-bc06-3d4fd6bfdd4e.png)
  
Finally, in the ftrace result storage stage, if the user enters y at the "When the test is finished (y/n)?" prompt, the performance measurement is finished and the trace results so far are stored in the path specified in the initialization stage using the trace API.


  
 

