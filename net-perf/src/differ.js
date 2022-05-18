const beforeFtrace = "# tracer: function_graph\n" +
    "#\n" +
    "# CPU  DURATION                  FUNCTION CALLS\n" +
    "# |     |   |                     |   |   |   |\n" +
    "  6)               |  hsr_netdev_notify [hsr]() {\n" +
    "  6)               |    rtnl_is_locked() {\n" +
    "  6)   0.160 us    |      mutex_is_locked();\n" +
    "  6)   0.770 us    |    }\n" +
    "  6)   0.150 us    |    hsr_port_exists [hsr]();\n" +
    "  6)   0.150 us    |    is_hsr_master [hsr]();\n" +
    "  6)   3.500 us    |  }\n" +
    "  6)               |  hsr_netdev_notify [hsr]() {\n" +
    "  6)               |    rtnl_is_locked() {\n" +
    "  6)   0.090 us    |      mutex_is_locked();\n" +
    "  6)   0.240 us    |    }\n" +
    "  6)   0.080 us    |    hsr_port_exists [hsr]();\n" +
    "  6)   0.090 us    |    is_hsr_master [hsr]();\n" +
    "  6)   0.810 us    |  }\n" +
    " 13)               |  hsr_netdev_notify [hsr]() {\n" +
    " 13)               |    rtnl_is_locked() {\n" +
    " 13)   0.160 us    |      mutex_is_locked();\n" +
    " 13)   0.660 us    |    }\n" +
    " 13)   0.140 us    |    hsr_port_exists [hsr]();\n" +
    " 13)   0.130 us    |    is_hsr_master [hsr]();\n" +
    " 13)   3.110 us    |  }";

const afterFtrace = "# tracer: function_graph\n" +
    "#\n" +
    "# CPU  DURATION                  FUNCTION CALLS\n" +
    "# |     |   |                     |   |   |   |\n" +
    "  6)               |  hsr_netdev_notify [hsr]() {\n" +
    "  6)               |    rtnl_is_locked() {\n" +
    "  6)   0.260 us    |      mutex_is_locked();\n" +
    "  6)   0.370 us    |    }\n" +
    "  6)   0.450 us    |    hsr_port_exists [hsr]();\n" +
    "  6)   0.550 us    |    is_hsr_master [hsr]();\n" +
    "  6)   3.500 us    |  }\n" +
    "  6)               |  hsr_netdev_notify [hsr]() {\n" +
    "  6)               |    rtnl_is_locked() {\n" +
    "  6)   0.090 us    |      mutex_is_locked();\n" +
    "  6)   0.240 us    |    }\n" +
    "  6)   0.080 us    |    hsr_port_exists [hsr]();\n" +
    "  6)   0.090 us    |    is_hsr_master [hsr]();\n" +
    "  6)   0.110 us    |  }\n" +
    " 13)               |  hsr_netdev_notify [hsr]() {\n" +
    " 13)               |    rtnl_is_locked() {\n" +
    " 13)   0.260 us    |      mutex_is_locked();\n" +
    " 13)   0.660 us    |    }\n" +
    " 13)   0.140 us    |    hsr_port_exists [hsr]();\n" +
    " 13)   0.130 us    |    is_hsr_master [hsr]();\n" +
    " 13)   3.110 us    |  }";

function prepareDiff(text) {
    let results = [];

    for (let i = 4; i < text.length; i++) {
        results.push(text[i].split('|')[1]);
    }

    return results;
}

const before = beforeFtrace.split('\n');
const after = afterFtrace.split('\n');
