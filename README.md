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
