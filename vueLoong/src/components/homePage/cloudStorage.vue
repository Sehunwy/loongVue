<template>
  <div class="cloudStorage">
    <div class="dashboard-box-wrap">
      <div class="dashboard-box-section back-white">
        <div class="pl20 pt10 pr20">
          <span class="fs13 c6">系统容量</span>
          <span class="detail-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-chakanxiangqing"></use>
            </svg>
          </span>
        </div>
        <div v-if="storageMonitorRequest" class="storage-progress-box">
          <loongProgress v-show="isStorage" proSize="160px" :proValue="proValue" txtPosition="center" :txt="txtStorage"
                         :isGradient="true" :isColor="false" :startAngle="2/3*Math.PI" :endAngle="7/3*Math.PI"
                         :scale="true"></loongProgress>
          <div v-show="!isStorage" class="pt30 c6 fs12" style="text-align: center;">
            <img :src="getImgUrl(storageErrorImg)" alt="">
            <div>{{storageErrorText}}</div>
          </div>
        </div>
        <div class="storage-des" v-show="isStorage&&storageMonitorRequest">
          <p class="c9 fs12 store_storage c9">
            可用容量/总容量
          </p>
          <p class="c3 fs16 pt5">
            {{free}}/{{total}}
          </p>
        </div>
      </div>
      <div class="dashboard-box-section">
        <div class="card-box light-blue">
          <img :src="getImgUrl('warn.png')" alt="">
          <div class="card-num">
            <p class="card-num-title">异常告警</p>
            <p class="card-num-txt ellip-nowrap" title="">{{allAlarms}}</p>
          </div>
          <div class="card-des back-white">
            <ul class="fs14 c3" style="width: 100%">
              <li class="des-item pl20">
                <div class="circle-mark fl back-red"></div>
                <div class="c9 fs12 pr5 fl">紧急</div>
                <div class="des-item-txt c6 fl ellip-nowrap" title="">
                  {{FatalAlarms}}
                </div>
                <div class="des-item-divider"></div>
              </li>
              <li class="des-item pl20">
                <div class="circle-mark fl back-orange"></div>
                <div class="c9 fs12 pr5 fl">重要</div>
                <div class="des-item-txt c6 fl ellip-nowrap" title="">
                  {{errorAlarms}}
                </div>
                <div class="des-item-divider"></div>
              </li>
              <li class="des-item pl20">
                <div class="circle-mark fl back-yellow"></div>
                <div class="c9 fs12 pr5 fl">警告</div>
                <div class="des-item-txt c6 fl ellip-nowrap" title="">
                  {{warningAlarms}}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="card-box mt15 normal-blue">
          <img :src="getImgUrl('app.png')" alt="">
          <div class="card-num">
            <p class="card-num-title">应用服务</p>
            <p class="card-num-txt ellip-nowrap" title="">{{clientCount}}</p>
          </div>
          <div class="card-des back-white">
            <ul class="fs14 c3" style="width: 100%">
              <li class="des-item pl20">
                <div class="c9 fs12 pr5 fl">运行中</div>
                <div class="des-item-txt c6 fl ellip-nowrap" title="">
                  {{runningClient}}
                </div>
                <div class="des-item-divider"></div>
              </li>
              <li class="des-item pl20">
                <div class="c9 fs12 pr5 fl">已停止</div>
                <div class="des-item-txt c6 fl ellip-nowrap" title="">
                  {{stopClient}}
                </div>
                <div class="des-item-divider"></div>
              </li>
              <li class="des-item pl20">
                <div class="c9 fs12 pr5 fl">未知</div>
                <div class="des-item-txt c6 fl ellip-nowrap" title="">
                  {{unknowClient}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="dashboard-box-section">
        <div class="card-box dark-blue">
          <img :src="getImgUrl('node.png')" alt="">
          <div class="card-num">
            <p class="card-num-title">服务</p>
            <p class="card-num-txt ellip-nowrap" title="">{{serverCount}}</p>
          </div>
          <div class="card-des back-white">
            <ul class="fs14 c3" style="width: 100%">
              <li class="des-item pl20">
                <div class="c9 fs12 pr5 fl">运行中</div>
                <div class="des-item-txt c6 fl ellip-nowrap">
                  {{runnigServer}}
                </div>
                <div class="des-item-divider"></div>
              </li>
              <li class="des-item pl20">
                <div class="c9 fs12 pr5 fl">异常</div>
                <div class="des-item-txt c6 fl ellip-nowrap">
                  {{badServer}}
                </div>
                <div class="des-item-divider"></div>
              </li>
              <li class="des-item pl20">
                <div class="c9 fs12 pr5 fl">已停止</div>
                <div class="des-item-txt c6 fl ellip-nowrap">
                  {{stopServer}}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="card-box mt15 purple-blue">
          <img :src="getImgUrl('disk.png')" alt="">
          <div class="card-num">
            <p class="card-num-title">异常磁盘数</p>
            <p class="card-num-txt ellip-nowrap" title="">{{badDiskCount}}</p>
          </div>
          <div class="card-des back-white5"></div>
        </div>
      </div>
    </div>
    <div class="dashboard-chart-wrap">
      <div class="pt10 pl20 pr22">
        <span class="fs13 c3">存储服务器</span>
        <span class="detail-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-chakanxiangqing"></use>
            </svg>
          </span>
      </div>
      <div v-show="!isServerList" ref="storageServer"
           style="width: calc(100% - 40px);height: calc(100% - 31px);padding: 0 20px"></div>
      <div v-show="isServerList"
           style="width: calc(100% - 40px);height: calc(100% - 106px);padding-top: 75px;text-align: center">
        <img :src="getImgUrl('no-server.png')" alt="">
        <p class="mt10 c9 fs14">暂无监控数据</p>
      </div>
    </div>
    <div class="dashboard-chart-wrap">
      <div class="pt10 pl20 pr22">
        <span class="fs13 c3">应用服务器</span>
        <span class="detail-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-chakanxiangqing"></use>
            </svg>
          </span>
      </div>
      <div v-show="!isAppList" ref="appServer"
           style="width: calc(100% - 40px);height: calc(100% - 31px);padding: 0 20px"></div>
      <div v-show="isAppList"
           style="width: calc(100% - 40px);height: calc(100% - 106px);padding-top: 75px;text-align: center">
        <img :src="getImgUrl('no-server.png')" alt="">
        <p class="mt10 c9 fs14">暂无监控数据</p>
      </div>
    </div>
  </div>
</template>

<script>
    import {formatSizeStr, formatDate, setChart} from '@/assets/js/common'
    import loongProgress from "@/components/loongProgress/loongProgress"
    import echarts from 'echarts'

    export default {
        name: "cloudStorage",
        data() {
            return {
                free: '0',
                total: '0',
                used: '0',
                proValue: '0%',
                txtStorage: per => {
                    per = Math.round(parseFloat(per)) + '%'
                    return '<div style="color: #38455A;font-size: 36px;font-weight: 600;padding-top: 20px;">' + per + '</div><div class="c9 fs12">已使用' + this.used + '</div>'
                },
                storageMonitorRequest: false,
                badDiskCount: "",
                badServer: "",
                clientCount: "",
                runnigServer: "",
                runningClient: "",
                serverCount: "",
                stopClient: "",
                stopServer: "",
                unknowClient: "",
                FatalAlarms: "",
                allAlarms: "",
                errorAlarms: "",
                warningAlarms: "",
                isAppList: false,
                interval: '',
                isServerList: false,
                storageErrorText: '',
                storageErrorImg: 'no-running.png',
                isStorage: true
            }
        },
        methods: {
            getImgUrl: function (url1) {
                return require("@/assets/img/storeImg/" + url1);
            },
            getStorageMonitor: function () {
                this.get('/api/store/fs/capacity/list', {})
                    .then(response => {
                        if (!response.error) {
                            this.isStorage = true;
                            this.free = response.data.free_size;
                            this.total = response.data.total_size;
                            this.used = this.total - this.free;
                            if (this.total != 0) {
                                this.proValue = this.used / this.total;
                            }
                            this.free = formatSizeStr(this.free);
                            this.total = formatSizeStr(this.total);
                            this.used = formatSizeStr(this.used);
                        } else {
                            this.isStorage = false;
                            switch (response.error) {
                                case "mds_no_running":
                                    this.storageErrorText = '元数据服务未运行!';
                                    this.storageErrorImg = 'no-running.png';
                                    break;
                                case "no_mds_node":
                                    this.storageErrorText = '无元数据服务!';
                                    this.storageErrorImg = 'no-server.png';
                                    break;
                                case "mds_cleint_no_run_or_locked":
                                    this.storageErrorText = '元数据客户端不可用！';
                                    this.storageErrorImg = 'noResult.png';
                            }
                        }
                        this.storageMonitorRequest = true;
                    })
            },
            getCardMonitor: function () {
                this.get('/api/store/node/monitor/cluster/info', {})
                    .then(response => {
                        if(response.data) {
                            this.badDiskCount = response.data.badDiskCount;
                            this.badServer = response.data.badServer;
                            this.clientCount = response.data.clientCount;
                            this.runnigServer = response.data.runnigServer;
                            this.runningClient = response.data.runningClient;
                            this.serverCount = response.data.serverCount;
                            this.stopClient = response.data.stopClient;
                            this.stopServer = response.data.stopServer;
                            this.unknowClient = response.data.unknowClient;
                        }
                    })
            },
            getWarnMonitor: function () {
                var owner = window.sessionStorage.getItem("user");
                this.get('/api/store/alarm/dashboard/info', {
                    owner: owner
                })
                    .then(response => {
                        if(response.data) {
                            this.allAlarms = response.data.allAlarms;
                            this.errorAlarms = response.data.errorAlarms;
                            this.warningAlarms = response.data.warningAlarms;
                            this.FatalAlarms = response.data.FatalAlarms;
                        }
                    })
            },
            getAppList: function () {
                this.get('/api/store/node/monitor/cluster/perfs/list', {
                    range: "tenmin",
                    metric: "FileRW",
                    clusterType: "ls_client"
                })
                    .then(response => {
                        if (response.data.length == 0) {
                            this.isAppList = true;
                        } else {
                            this.initAppChart(response.data);
                            this.isAppList = false;
                        }
                    })
            },
            initAppChart(dataList) {
                let xAxisDataSet;
                let fileRDataSet = [];
                let readTimeList = [];
                let fileWDataSet = [];
                let writeTimeList = [];
                for (let data of dataList) {
                    if (data.type == 'read') {
                        fileRDataSet.push(data.avg || 0);
                        readTimeList.push(formatDate(data.ctime, "HH:mm:ss"));
                    } else if (data.type == "write") {
                        fileWDataSet.push(data.avg || 0);
                        writeTimeList.push(formatDate(data.ctime, "HH:mm:ss"));
                    }
                }
                readTimeList.length > writeTimeList.length ? xAxisDataSet = writeTimeList : xAxisDataSet = readTimeList;
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(this.$refs.appServer)
                let config = JSON.parse(JSON.stringify(setChart()));
                config.xAxis.data = xAxisDataSet;
                config.yAxis.name = '单位：' + dataList[0].unit + '/S';
                config.series[0].data = fileRDataSet;
                config.series[1].data = fileWDataSet;
                // 绘制图表
                myChart.setOption(config);
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
            },
            getServerList: function () {
                this.get('/api/store/node/monitor/cluster/perfs/list', {
                    range: "tenmin",
                    metric: "Network",
                    clusterType: "ls_istore"
                })
                    .then(response => {
                        if (response.data.length == 0) {
                            this.isServerList = true;
                        } else {
                            this.initServerChart(response.data);
                            this.isServerList = false;
                        }
                    })
            },
            initServerChart: function (dataList) {
                let config = JSON.parse(JSON.stringify(setChart()));
                let fileRDataSet = [], fileWDataSet = [], xAxisDataSet = [];
                let outTimeList = [], inTimeList = [];
                for (let data of dataList) {
                    if (data.type == 'out') {
                        fileRDataSet.push(data.avg || 0);
                        outTimeList.push(formatDate(data.ctime, "HH:mm:ss"));
                    } else if (data.type == "in") {
                        fileWDataSet.push(data.avg || 0);
                        inTimeList.push(formatDate(data.ctime, "HH:mm:ss"));
                    }
                }
                config.series[0].name = '上行';
                config.series[0].data = fileRDataSet;
                config.series[1].name = '下行';
                config.series[1].data = fileWDataSet;
                config.legend.data[0].name = '上行';
                config.legend.data[1].name = '下行';
                config.yAxis.name = '单位' + dataList[0].unit + "/S";
                outTimeList.length > inTimeList.length ? xAxisDataSet = inTimeList : xAxisDataSet = outTimeList;
                config.xAxis.data = xAxisDataSet;
                let chart = echarts.init(this.$refs.storageServer);
                chart.setOption(config);
                window.addEventListener("resize", function () {
                    chart.resize();
                });
            }
        },
        created() {
            this.getStorageMonitor();
            this.getCardMonitor();
            this.getWarnMonitor();
            this.getAppList();
            this.getServerList();
        },
        mounted() {
            let _this = this;
            this.interval = setInterval(function () {
                _this.getStorageMonitor();
                _this.getCardMonitor();
                _this.getWarnMonitor();
                _this.getAppList();
                _this.getServerList();
            }, 5000);
        },
        beforeDestroy() {
            clearInterval(this.interval)
        },
        components: {
            loongProgress
        }
    }
</script>

<style scoped>

  .cloudStorage {
    min-width: 970px;
  }

  .dashboard-box-wrap {
    display: flex;
    justify-content: space-between;
  }

  .dashboard-box-section {
    height: 255px;
    width: calc(33.3333% - 9.3333px);
  }

  .card-box {
    position: relative;
    height: 120px;
    border-radius: 4px;
    box-shadow: 0px 10px 10px 0px rgba(12, 54, 138, 0.16);
    cursor: pointer;
  }

  .light-blue {
    background: #2ACEFB;
  }

  .light-blue:hover {
    background: #28C5F1;
  }

  .normal-blue {
    background: #2BB2FF;
  }

  .normal-blue:hover {
    background: #29ABF5;
  }

  .dark-blue {
    background: #0C9AFF;
  }

  .dark-blue:hover {
    background: #0B93F5;
  }

  .purple-blue {
    background: #4884FD;
  }

  .purple-blue:hover {
    background: #457EF3;
  }

  .detail-icon {
    float: right;
    color: #4A90E2;
    font-size: 16px;
    cursor: pointer;
  }

  .storage-progress-box {
    width: 160px;
    height: 150px;
    position: relative;
    left: calc(50% - 80px);
    padding-top: 10px
  }

  .storage-des {
    font-family: "Arial";
    text-align: center;
    font-weight: 500;
    padding-top: 10px;
  }

  .card-des {
    position: absolute;
    width: 100%;
    height: 32px;
    border-radius: 4px;
    bottom: 0;
    left: 0;
  }

  .des-item {
    float: left;
    position: relative;
    top: 0px;
    left: 0px;
    width: calc(33.333% - 20px);
    line-height: 32px;
  }

  .circle-mark {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    float: left;
    margin: 12px 5px 12px 0
  }

  .des-item-txt {
    width: calc(100% - 51px)
  }

  .des-item-divider {
    position: absolute;
    right: 1px;
    top: 8px;
    width: 1px;
    height: 16px;
    background-color: #E9ECEF;
  }

  .back-white5 {
    background: rgba(255, 255, 255, 0.5)
  }

  .card-num {
    position: absolute;
    top: 0px;
    right: 0px;
    text-align: right;
    margin: 10px 40px 0 0;
    width: calc(100% - 130px);
  }

  .card-num-title {
    font-size: 13px;
    color: #fff;
    font-weight: 500;
    line-height: 18px;
  }

  .card-num-txt {
    font-size: 36px;
    font-weight: 600;
    color: #fff;
    line-height: 36px;
    margin-top: 8px;
  }

  .dashboard-chart-wrap {
    margin-top: 20px;
    background-color: #fff;
    width: 100%;
    height: 355px;
    box-shadow: 0px 10px 10px 0px rgba(12, 54, 138, 0.16);
  }
</style>
