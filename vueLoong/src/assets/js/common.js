function getByteSize(value, unit) {
  if (unit == "KB") {
    value = value * 1024;
  } else if (unit == "MB") {
    value = value * 1024 * 1024;
  } else if (unit == "GB") {
    value = value * 1024 * 1024 * 1024;
  } else if (unit == "TB") {
    value = value * 1024 * 1024 * 1024 * 1024;
  } else if (unit == "PB") {
    value = value * 1024 * 1024 * 1024 * 1024 * 1024;
  }
  return value;
}

function formatSizeStr(value) {
  let size = 0;
  if (value >= 1024 * 1024 * 1024 * 1024 * 1024) {
    size = (Math.round(value * 100 /
      (1024 * 1024 * 1024 * 1024 * 1024)) / 100)
        .toString() +
      'PB';
  } else if (value >= 1024 * 1024 * 1024 * 1024) {
    size = (Math.round(value * 100 /
      (1024 * 1024 * 1024 * 1024)) / 100)
        .toString() +
      'TB';
  } else if (value >= 1024 * 1024 * 1024) {
    size = (Math.round(value * 100 /
      (1024 * 1024 * 1024)) / 100).toString() +
      'GB';
  } else if (value >= 1024 * 1024) {
    size = (Math.round(value * 100 /
      (1024 * 1024)) / 100).toString() +
      'MB';
  } else if (value >= 1024) {
    size = (Math.round(value * 100 /
      (1024)) / 100).toString() +
      'KB';
  } else {
    size = (Math.round(value * 100) / 100).toString() +
      'B';
  }
  return size;
}

function formatDate(timeStamp, type) {
  let d = new Date(parseInt(timeStamp));
  let Y = d.getFullYear();
  let M = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  let date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  let hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  let minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  let second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
  if (type == '年月日' || type == 1) {
    return Y + "年" + M + "月" + date + "日";
  }
  if (type == 'Y-M-D' || type == 2) {
    return Y + "-" + M + "-" + date;
  }
  if (type == 'Y.M.D' || type == 3) {
    return Y + "." + M + "." + date;
  }
  if (type == 'Y/M/D' || type == 4) {
    return Y + "/" + M + "/" + date;
  }
  if (type == '年月日 时分秒' || type == 5) {
    return Y + "年" + M + "月" + date + "日 " + hour + ":" + minute + ":" + second;
  }
  if (type == 'Y-M-D h:m:s' || type == 6) {
    return Y + "-" + M + "-" + date + " " + hour + ":" + minute + ":" + second;
  }
  if (type == 'Y.M.D h:m:s' || type == 7) {
    return Y + "." + M + "." + date + " " + hour + ":" + minute + ":" + second;
  }
  if (type == 'Y/M/D h:m:s' || type == 8) {
    return Y + "/" + M + "/" + date + " " + hour + ":" + minute + ":" + second;
  }
  if (type == '年月日 时分' || type == 9) {
    return Y + "年" + M + "月" + date + "日 " + hour + ":" + minute;
  }
  if (type == 'Y-M-D h:m' || type == 10) {
    return Y + "-" + M + "-" + date + " " + hour + ":" + minute;
  }
  if (type == 'Y.M.D h:m' || type == 11) {
    return Y + "." + M + "." + date + " " + hour + ":" + minute;
  }
  if (type == 'Y/M/D h:m' || type == 12) {
    return Y + "/" + M + "/" + date + " " + hour + ":" + minute;
  }
  if (type == 'HH:mm:ss' || type == 13) {
    return +hour + ":" + minute + ":" + second;
  }
  return timeStamp;
}

function timeFormat(timestamp, mask) {
  var d = new Date(parseInt(timestamp));
  var zeroize = function (value, length) {
    if (!length)
      length = 2;
    value = String(value);
    for (var i = 0, zeros = ''; i < (length - value.length); i++) {
      zeros += '0';
    }
    return zeros + value;
  };

  return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
    switch ($0) {
      case 'd':
        return d.getDate();
      case 'dd':
        return zeroize(d.getDate());
      case 'ddd':
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr',
          'Fri', 'Sat'][d.getDay()];
      case 'dddd':
        return ['Sunday', 'Monday', 'Tuesday',
          'Wednesday', 'Thursday', 'Friday',
          'Saturday'][d.getDay()];
      case 'M':
        return d.getMonth() + 1;
      case 'MM':
        return zeroize(d.getMonth() + 1);
      case 'MMM':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May',
          'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
          'Nov', 'Dec'][d.getMonth()];
      case 'MMMM':
        return ['January', 'February', 'March',
          'April', 'May', 'June', 'July',
          'August', 'September', 'October',
          'November', 'December'][d
          .getMonth()];
      case 'yy':
        return String(d.getFullYear()).substr(2);
      case 'yyyy':
        return d.getFullYear();
      case 'h':
        return d.getHours() % 12 || 12;
      case 'hh':
        return zeroize(d.getHours() % 12 || 12);
      case 'H':
        return d.getHours();
      case 'HH':
        return zeroize(d.getHours());
      case 'm':
        return d.getMinutes();
      case 'mm':
        return zeroize(d.getMinutes());
      case 's':
        return d.getSeconds();
      case 'ss':
        return zeroize(d.getSeconds());
      case 'l':
        return zeroize(d.getMilliseconds(), 3);
      case 'L':
        var m = d.getMilliseconds();
        if (m > 99)
          m = Math.round(m / 10);
        return zeroize(m);
      case 'tt':
        return d.getHours() < 12 ? 'am' : 'pm';
      case 'TT':
        return d.getHours() < 12 ? 'AM' : 'PM';
      case 'Z':
        return d.toUTCString().match(/[A-Z]+$/);
      default:
        return $0.substr(1, $0.length - 2);
    }
  });
}

function setChart() {
  let optionTemp = {
    title: { // 标题
      show: false
    },
    color: ["#4884FD", "#3BCAEC", "#3AE9DA", "#484BFD"],
    tooltip: {
      show: true,
      trigger: 'axis', // 触发类型 item数据项图形触发（散点图、饼图等无类目轴） axis坐标轴触发（柱状图、折线图等使用类目轴）  none不触发
      axisPointer: { // 坐标轴指示器配置项
        type: 'cross' // 指示器类型 line直线指示器 shadow阴影指示器 none 无指示器 cross十字准星指示器
      }
    }, // 提示框
    toolbox: {
      show: false
    }, // 工具栏
    grid: {
      left: 80, // gird离容器左侧的距离
      right: 50,
      bottom: 15,
      containLabel: true //默认false gird区域是否包含坐标轴的刻度标签 true用于防止标签溢出，标签长度动态变化可能会溢出容器或覆盖其他组件  false多个grid进行对齐
    }, // 直角坐标系内绘图网格
    xAxis: {
      type: 'category', // 坐标轴类型 value数值轴（适用于连续数据） category类目轴（适用于离散的类目数据，必须通过data设置类目数据）  time时间轴（适用于连续的时序数据） log对数轴（适用于对数数据）
      boundaryGap: false, // 坐标轴两边留白策略 类目轴可设置为true和false。默认true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间   非类目轴，包括时间，数值，对数轴，boundaryGap是一个两个值的数组，分别表示数据最小值和最大值的延伸范围（设置百分比或数值）
      data: [],
      axisLabel: {
        show: true,
        color: "#666666", // 刻度标签颜色
        fontSize: 12
      }, // 坐标轴刻度标签设置
      axisTick: {
        show: false,
      }, // 坐标轴刻度设置
      axisLine: {
        lineStyle: {
          color: "#C4DAF7" // 坐标轴轴线颜色
        }
      }, // 坐标轴轴线设置
      splitLine: { // 是否去除网格线
        show: false
      }, // 坐标轴在grid区域中的分割线
      nameTextStyle: {
        color: "#555555",
        fontSize: 12,
        align: "left",
        padding: [0, 0, -25, 0]
      }, // 坐标轴名称文字样式
      name: '时间',
      nameGap: 26 // 坐标轴名称与轴线之间的距离
    }, // 直角坐标系中x轴
    yAxis: {
      name: "",
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: { // 是否展示刻度
        show: false,
      },
      splitLine: { // 是否去除网格线 show:false
        lineStyle: {
          color: "#C4DAF7"
        }
      },
      nameTextStyle: {
        color: "#555555",
        fontSize: 12,
        padding: [0, 20, 0, 0]

      },
      axisLabel: { // 是否显示数据 show:false
        color: "#666666",
        fontSize: 12
      },
      offset: 29, // y轴相对于默认位置的偏移
    }, // 直角坐标系中y轴
    series: [
      {
        name: '文件读速率', // 名称 用于tooltip显示
        type: 'line', // 图表类型
        smooth: true,// 是否平滑显示
        symbol: "none",//去掉点的
        data: [],
        areaStyle: {
          color: {
            type: 'linear', // 线性渐变
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(72,132,253,0.3)' // 0% 处的颜色
            }, {
              offset: 0.8, color: 'rgba(40,196,239,0)' // 80% 处的颜色
            }, {
              offset: 1, color: 'rgba(40,196,239,0)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false xy百分比 true代表绝对的像素位置
          }
        }, // 区域填充样式
        lineStyle: {
          color: "rgba(72,132,253,1)",
          shadowColor: "rgba(17,136,221,0.5)",
          shadowOffsetX: 0,
          shadowOffsetY: 3,
          shadowBlur: 3,
        }, // 线条样式
      },
      {
        name: '文件写速率',
        type: 'line',
        smooth: true,
        symbol: "none",
        data: [],
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(59,202,236,0.3)' // 0% 处的颜色
            }, {
              offset: 0.8, color: 'rgba(59,202,236,0)' // 80% 处的颜色
            }, {
              offset: 1, color: 'rgba(59,202,236,0)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        },
        lineStyle: {
          color: "rgba(59,202,236,1)",
          shadowColor: "rgba(17,136,221,0.5)",
          shadowOffsetX: 0,
          shadowOffsetY: 3,
          shadowBlur: 3,
        },
      }
    ],
    legend: {
      itemHeight: 8,
      icon: 'circle', // 图例项icon（'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'）
      data: [
        {
          name: '文件读速率',

        },
        {
          name: '文件写速率',
        }
      ],
      right: "100px"
    } // 通过图例控制哪些系列的显示隐藏
  }
  return optionTemp;
}

function setChartTime() {
  let option = {
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: "none"
      }
    },
    grid: {
      top: "23%",
      bottom: 0,
      left: "5%",
      right: 0
    },
    color: ["#28C4EF", "#4884FD"],
    xAxis: {
      name: "",
      show: true,
      axisLabel: {//决定是否显示数据
        show: false,
      },
      type: 'category',
      data: (function () {
        let now = new Date();
        let res = [];
        let len = 20;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          now = new Date(now - 3000);
        }
        return res;
      })(),
      boundaryGap: false,//是否从原点开始
      splitLine: {
        show: false //去除网格线
      },
      axisLine: {
        lineStyle: {
          color: "#E9ECEF",
          width: '2'
        }
      }
    },
    yAxis: {
      name: "",
      nameTextStyle: {
        color: '#666'
      },
      type: 'value',
      splitLine: {
        show: false //去除网格线
      },
      axisLabel: {//决定是否显示数据
        show: false,
      },
      axisTick: {//不展示刻度
        show: false
      },
      axisLine: {
        lineStyle: {
          color: "#E9ECEF",
          width: '1'
        }
      }
    },
    series: [{
      name: '',
      type: 'line',
      symbol: 'none',  //去掉点的
      smooth: true,  //让曲线变平滑的,
      smoothMonotone: 'x',
      lineStyle: {
        color: "#28C4EF",
        width: 2,
        shadowOffsetX: 0,
        shadowOffsetY: 3,
        shadowColor: 'rgba(40,196,239, 0.5)',
        shadowBlur: 3

      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(40,196,239, 0.3)' // 0% 处的颜色
          }, {
            offset: 0.8, color: 'rgba(40,196,239, 0)' // 100% 处的颜色
          }, {
            offset: 1, color: 'rgba(40,196,239, 0)' // 100% 处的颜色
          }]

        }
      },
      data: []
    },
      {
        name: "",
        type: 'line',
        symbol: 'none',
        smooth: true,
        lineStyle: {
          color: "#4884FD",
          width: 2,
          shadowOffsetX: 0,
          shadowOffsetY: 3,
          shadowColor: 'rgba(72,132,253, 0.5)',
          shadowBlur: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(72,132,253, 0.3)' // 0% 处的颜色
            }, {
              offset: 0.8, color: 'rgba(72,132,253, 0)' // 100% 处的颜色
            }, {
              offset: 1, color: 'rgba(72,132,253, 0)' // 100% 处的颜色
            }],
          }
        },
        data: []
      }]
  };
  return option;
}

function setChartDisk() {
  let option = {
    title: {
      show: false
    },
    tooltip: {
      trigger: 'axis'
    },
    toolbox: {
      show: false
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '13%'
    },
    xAxis: {
      name: '时间',
      nameLocation: 'center',
      nameGap: 25,
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLabel: {
        color: "#666666",
        fontSize: 12
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#C4DAF7"
        }
      },
      splitLine: {
        show: false
      },
      nameTextStyle: {
        color: "#555555",
        fontSize: 12,
        align: "left"
      }
    },
    series: [{
      name: '读',
      type: 'line',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(72,132,253,0.1)'
          }, {
            offset: 0.8,
            color: 'rgba(72,132,253,0)'
          }, {
            offset: 1,
            color: 'rgba(72,132,253,0)'
          }]
        }
      },
      data: [],
      lineStyle: {
        color: "rgba(72,132,253,1)",
        shadowColor: "rgba(52,112,233,0.3)",
        shadowOffsetX: 0,
        shadowOffsetY: 3,
        shadowBlur: 3,
      },
      smooth: true,
      symbol: "none"
    },
      {
        name: '写',
        type: 'line',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(118,69,255,0.1)'
            }, {
              offset: 0.8,
              color: 'rgba(118,69,255,0)'
            }, {
              offset: 1,
              color: 'rgba(118,69,255,0)'
            }]
          }
        },
        data: [],
        lineStyle: {
          color: "rgba(118,69,255,1)",
          shadowColor: "rgba(78,51,228,0.3)",
          shadowOffsetX: 0,
          shadowOffsetY: 3,
          shadowBlur: 3,
        },
        smooth: true,
        symbol: "none"
      },
      {
        name: '请求',
        type: 'line',
        yAxisIndex: 1,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(216,39,255,0.1)' // 0% 处的颜色
            }, {
              offset: 0.8,
              color: 'rgba(216,39,255,0)' // 100% 处的颜色
            }, {
              offset: 1,
              color: 'rgba(216,39,255,0)' // 100% 处的颜色
            }],

          }
        },
        data: [],
        lineStyle: {
          color: "rgba(216,39,255,1)",
          shadowColor: "rgba(167,41,205,0.3)",
          shadowOffsetX: 0,
          shadowOffsetY: 3,
          shadowBlur: 3,
        },
        smooth: true,
        symbol: "none"
      },
      {
        name: '登录次数',
        type: 'line',
        yAxisIndex: 1,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(4,252,255,0.1)' // 0% 处的颜色
            }, {
              offset: 0.8,
              color: 'rgba(4,252,255,0)' // 100% 处的颜色
            }, {
              offset: 1,
              color: 'rgba(4,252,255,0)' // 100% 处的颜色
            }],
          }
        },
        data: [],
        lineStyle: {
          color: "rgba(4,252,255,1)",
          shadowColor: "rgba(38,212,197,0.3)",
          shadowOffsetX: 0,
          shadowOffsetY: 3,
          shadowBlur: 3,
        },
        smooth: true,
        symbol: "none"
      }],
    color: ['rgba(72,132,253,1)', 'rgba(118,69,255,1)', 'rgba(216,39,255,1)', 'rgba(4,252,255,1)'],
    legend: {
      itemHeight: 8,
      data: [{
        name: '读',
        icon: "circle",
        textStyle: {
          color: 'rgba(72,132,253,1)'
        }
      },
        {
          name: '写',
          icon: "circle",
          textStyle: {
            color: 'rgba(118,69,255,1)'
          }
        },
        {
          name: '请求',
          icon: "circle",
          textStyle: {
            color: 'rgba(216,39,255,1)'
          }
        },
        {
          name: '登录次数',
          icon: "circle",
          textStyle: {
            color: 'rgba(4,252,255,1)'
          }
        }
      ],
      right: "4%"
    },
    yAxis: [{
      name: '',
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: "#C4DAF7"
        }
      },
      nameTextStyle: {
        color: "#555555",
        fontSize: 12,
      },
      axisLabel: {
        color: "#666666",
        fontSize: 12
      },
      offset: 9,
    },
      {
        name: '',
        type: 'value',
        position: 'right',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: "#C4DAF7"
          }
        },
        nameTextStyle: {
          color: "#555555",
          fontSize: 12,
        },
        axisLabel: {
          color: "#666666",
          fontSize: 12
        },
        offset: 9,
      }]
  };
  return option;
}

function mathCeil(x, y) {
  let tmp = Math.ceil(((x / y) * 100).toFixed(2)) <= 100 ? Math.ceil(((x / y) * 100).toFixed(2)) : 100;
  return y == 0 ? "0%" : tmp + "%";
}

// 取最大数单位
function getUnit(arr) {
  let max;
  if (Array.isArray(arr)) {
    max = Math.max.apply(null, arr);
  } else {
    max = arr;
  }
  let unit = "B"
  if (max >= 1024) {
    let formatMax = formatSizeStr(max);
    unit = formatMax.substring(formatMax.length - 2, formatMax.length);
  }
  return unit;
};

// 转换为指定单位值
function convertToUnit(val, unit) {
  if (Array.isArray(val)) {
    var rst = [];
    for (var i = 0; i < val.length; i++) {
      val[i] = computeByUnit(val[i], unit);
      rst.push(val[i]);
    }
    return rst;
  } else {
    val = computeByUnit(val, unit);
    return val;
  }
};

function computeByUnit(value, unit) {
  if (unit == "KB") {
    value = Math.round(value * 100 / (1024)) / 100;
  } else if (unit == "MB") {
    value = Math.round(value * 100 /
      (1024 * 1024)) / 100;
  } else if (unit == "GB") {
    value = Math.round(value * 100 /
      (1024 * 1024 * 1024)) / 100;
  } else if (unit == "TB") {
    value = Math.round(value * 100 /
      (1024 * 1024 * 1024 * 1024)) / 100;
  } else if (unit == "PB") {
    value = Math.round(value * 100 /
      (1024 * 1024 * 1024 * 1024 * 1024)) / 100;
  }
  return value;
};

export {
  getByteSize, formatSizeStr, formatDate, setChart, mathCeil, getUnit, convertToUnit, setChartTime, setChartDisk, timeFormat
}
