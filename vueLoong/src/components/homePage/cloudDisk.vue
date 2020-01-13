<template>
  <div class="cloudDisk">
    <div class="dashboard-box-wrap">
      <div class="dashboard-box-section back-white">
        <div class="pl20 pt10 pr20">
          <span class="fs13 c6">系统容量</span>
        </div>
        <div class="storage-progress-box">
          <loongProgress :isColor="false" :isGradient="true" :scale="true" slideHeight="6" proSize="160"
                         txtPosition='center' :startAngle="startAngle" :endAngle="endAngle" :txt="txtSys"
                         :proValue="proValueSys"></loongProgress>
        </div>
        <div class="storage-des">
          <p class="c9 fs12 store_storage c9">
            可用容量/总容量
          </p>
          <p class="c3 fs16 pt5">
            {{freeSys}}/{{totalSys}}
          </p>
        </div>
      </div>
      <div class="dashboard-box-section back-white">
        <div class="pl20 pt10 pr20">
          <span class="fs13 c6">成员数量</span>
        </div>
        <div class="storage-progress-box">
          <loongProgress :isColor="false" :isGradient="true" :scale="true" slideHeight="6" proSize="160"
                         txtPosition='center' :startAngle="startAngle" :endAngle="endAngle" :txt="txtUser"
                         :proValue="proValueUser"></loongProgress>
        </div>
        <div class="storage-des">
          <p class="c9 fs12 store_storage c9">
            可创建人数/总人数
          </p>
          <p class="c3 fs16 pt5">
            {{freeUser}}/{{totalUser}}
          </p>
        </div>
      </div>
      <div class="dashboard-box-section back-white">
        <div class="pl10 pr20 pt10">
          <div class="fl">
            <img :src="getImgUrl('user-dashbord.png')" alt="">
          </div>
          <div class="fr">
            <div class="tar">当前在线人数</div>
            <div class="fs36 tar fwb">{{onlineMember}}</div>
          </div>
          <div class="clear"></div>
        </div>
        <ul class="on-member-ul pl10 pr10 pt10 pb10">
          <li v-show="index<19" class="ellip" :title="data.user" v-for="(data,index) in members">
            <span>{{data.user}}</span>
          </li>
          <li v-show="hasMember&&members.length>=20" class="ellip" title="查看在线用户列表">
            <span class="color-1188dd fs16 cursor" @click="showDialog=true">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gengduo"></use>
              </svg>
            </span>
          </li>
          <loongDialog :isShowDialog="showDialog" @setShow="setShow" titleDialog="在线用户列表">
            <div style="width: 100%;height: 100%">
              <loongTable :titleData="title" :data="allMember" chooseWay="none"></loongTable>
            </div>
          </loongDialog>
          <div v-show="!hasMember" class="fs12 tac lh125 c9">当前暂无用户在线</div>
        </ul>
      </div>
    </div>
    <div class="dashboard-chart-wrap" style="height: 420px">
      <div class="pt10 pl20 pr22">
        <span class="fs13 c3">系统IO统计</span>
      </div>
      <div class="mt10 pl20" style="height: 32px">
        <div class="fl mr10">
          <loongDate :inputWid="inputWid" :inputTime="preDate" @getTimeStamp="getPreTime"></loongDate>
        </div>
        <div class="fl mr10">
          <loongDate :inputWid="inputWid" :inputTime="curDate" @getTimeStamp="getCurTime"></loongDate>
        </div>
        <div class="fl">
          <button class="btn-opr" @click="queryChart()">查询</button>
        </div>
      </div>
      <div class="disk-dashboard-chart-box" ref="chartBox"></div>
    </div>
    <div class="dashboard-chart-wrap mb20" style="height: 380px">
      <div class="pt10 pl20 pr22">
        <span class="fs13 c3">成员IO统计</span>
      </div>
      <div class="mt10 pl20" style="height: 32px">
        <div class="fl mr10">
          <loongDate :inputWid="inputWid" :inputTime="preDate1" @getTimeStamp="getPreTime1"></loongDate>
        </div>
        <div class="fl mr10">
          <loongDate :inputWid="inputWid" :inputTime="curDate1" @getTimeStamp="getCurTime1"></loongDate>
        </div>
        <div class="fl">
          <button class="btn-opr" @click="queryTable()">查询</button>
        </div>
      </div>
      <div class="mt10" style="width: 100%;height: 300px">
        <div :style="{height:isShowPage?'230px':'300px'}">
          <loongTable :titleData="tableTile" :data="tableData" chooseWay="none"></loongTable>
        </div>
        <div v-show="isShowPage" style="height: 70px;" class="flex-center">
          <loongPagination :pageNum="pageNum" :pageSize="pageSize" :total="total"
                           @pageInfo="getPageData"></loongPagination>
        </div>
      </div>
    </div>
    <loongTip :tipType="tipType" :tipContent="tipContent" :showTip="isShowTip" @isTipShow="getShow"></loongTip>
  </div>
</template>

<script>
    import {formatSizeStr, setChartDisk, timeFormat} from '@/assets/js/common'
    import loongProgress from "@/components/loongProgress/loongProgress"
    import loongDialog from "@/components/loongDialog/loongDialog"
    import loongTable from "@/components/loongTable/loongTable"
    import loongDate from "@/components/loongDate/loongDate"
    import loongTip from "@/components/loongTip/loongTip"
    import loongPagination from "@/components/loongPagination/loongPagination"
    import echarts from 'echarts'

    export default {
        name: "cloudDisk",
        data() {
            return {
                startAngle: 2 / 3 * Math.PI, //开始角度
                endAngle: 7 / 3 * Math.PI, //结束角度
                totalSys: '0B',
                freeSys: '0B',
                usedSys: '',
                proValueSys: '0%',
                txtSys: per => {
                    per = Math.round(parseFloat(per)) + '%'
                    return '<div style="color: #38455A;font-size: 36px;font-weight: 600;padding-top: 20px;">' + per + '</div><div class="c9 fs12">已使用' + this.usedSys + '</div>'
                },
                totalUser: '0',
                freeUser: '0',
                usedUser: '',
                proValueUser: '0%',
                txtUser: per => {
                    per = Math.round(parseFloat(per)) + '%'
                    return '<div style="color: #38455A;font-size: 36px;font-weight: 600;padding-top: 20px;">' + per + '</div><div class="c9 fs12">已创建人数' + this.usedUser + '</div>'
                },
                hasMember: true,
                members: [],
                allMember: [],
                onlineMember: 0,
                showDialog: false,
                title: [{
                    name: 'user',
                    title: '用户名'
                }],
                inputWid: '180px',
                curDate: '',
                preDate: '',
                curDate1: '',
                preDate1: '',
                startmillions: '',
                stopmillions: '',
                startmillions1: '',
                stopmillions1: '',
                tipContent: '',
                tipType: '',
                isShowTip: false,
                tableTile: [{
                    "name": "user",
                    "overflowEllipsis": true,
                    "title": '成员名'
                },
                    {
                        "name": "io",
                        "title": 'IO',
                        formater: function (value) {
                            return formatSizeStr(value);
                        }
                    },
                    {
                        "name": "read",
                        "title": '读',
                        formater: function (value) {
                            return formatSizeStr(value);
                        }
                    },
                    {
                        "name": "write",
                        "title": '写',
                        formater: function (value) {
                            return formatSizeStr(value);
                        }
                    },
                    {
                        "name": "request",
                        "title": '请求'
                    },
                    {
                        "name": "login",
                        "title": '登录'
                    },
                    {
                        "name": "operation",
                        "title": '操作',
                        "type": "button",
                        "operations": [{
                            "text": '查看成员IO详情',
                            'icon': '#icon-chakanxiangqing',
                            "callBack": function (index, rowData) {
                                console.log(index, rowData)
                            }
                        }]
                    }
                ],
                tableData: [],
                pageNum: 1,
                pageSize: 20,
                total: 1,
                isShowPage: false
            }
        },
        methods: {
            // 得到时间
            getPreTime: function (data) {
                this.startmillions = data;
            },
            getCurTime: function (data) {
                this.stopmillions = data;
            },
            getPreTime1: function (data) {
                this.startmillions1 = data;
            },
            getCurTime1: function (data) {
                this.stopmillions1 = data;
            },
            //根据输入毫秒值转换
            msFormat: function (s) {
                if (s <= 24 * 3600000) {
                    return "hour";
                } else if (s > 23 * 3600000 && s <= 30 * 24 * 3600000) {
                    return "day";
                } else {
                    return "month";
                }
            },
            xAxisUnit: function (time) {
                var xAxisFormat;
                switch (time) {
                    case 'hour':
                        xAxisFormat = "HH";
                        break;
                    case 'day':
                        xAxisFormat = "dd";
                        break;
                    case 'month':
                        xAxisFormat = "MM";
                        break;
                }
                return xAxisFormat;
            },
            getImgUrl: function (url1) {
                return require("@/assets/img/diskImg/" + url1);
            },
            setShow: function (isShow) {
                this.showDialog = isShow;
            },
            getSystemCapacity: function () {
                this.get('/api/info/syscapacity/list', {})
                    .then(json => {
                        if (json.data) {
                            let data = json.data[0];
                            this.totalSys = formatSizeStr(data.total);
                            this.freeSys = formatSizeStr(data.remaining);
                            this.usedSys = formatSizeStr(data.used);
                            if (data.total == 0) {
                                this.proValueSys = "0%";
                            } else {
                                this.proValueSys = Math.ceil(data.used / data.total * 100) + "%";
                            }
                        }
                    })
            },
            getUsercount: function () {
                this.get('/api/info/usercount/list', {})
                    .then(json => {
                        if (json.data) {
                            let data = json.data;
                            this.totalUser = data.total;
                            this.freeUser = data.remaining;
                            this.usedUser = data.used;
                            if (data.total == 0) {
                                this.proValueUser = "0%";
                            } else {
                                this.proValueUser = Math.ceil(data.used / data.total * 1000) / 10 + "%";
                            }
                        }
                    })
            },
            getListOn: function () {
                this.get('/api/log/diskonlineuser/list', {})
                    .then(data => {
                        if (data.data) {
                            data = data.data;
                            this.onlineMember = data.length;
                            if (data.length == 0) {
                                this.hasMember = false
                            } else {
                                this.hasMember = true;
                                if (data.length >= 20) {
                                    this.members = data.slice(0, 20);
                                    this.allMember = data;
                                } else {
                                    this.members = data;
                                }
                            }
                        }
                    })
            },
            initIoChartData: function (startmillions, stopmillions) {
                this.get('/api/log/disksystemio/draw', {
                    startmillions: startmillions,
                    stopmillions: stopmillions,
                    dcID: "1"
                })
                    .then(data => {
                        if (data.data) {
                            let range = this.msFormat(stopmillions - startmillions);
                            let dateFormat = this.xAxisUnit(range);
                            let ioUnit, xAxisDataSet = [], readDataSet = [], writeDataSet = [], requestDataSet = [],
                                loginDataSet = [];
                            data = data.data;
                            let myChart = echarts.init(this.$refs.chartBox);
                            let config = JSON.parse(JSON.stringify(setChartDisk()));
                            for (let i in data) {
                                if (i == 0) {
                                    ioUnit = data[i].unit;
                                }
                                xAxisDataSet.push(timeFormat(data[i].time, dateFormat));
                                readDataSet.push(data[i].read);
                                writeDataSet.push(data[i].write);
                                requestDataSet.push(data[i].request);
                                loginDataSet.push(data[i].login);
                            }
                            if (dateFormat == "HH") {
                                config.xAxis.name = '时间：小时';
                            }
                            if (dateFormat == "dd") {
                                config.xAxis.name = '时间：天';
                            }
                            if (dateFormat == "MM") {
                                config.xAxis.name = '时间：月';
                            }
                            config.series[0].data = readDataSet;
                            config.series[1].data = writeDataSet;
                            config.series[2].data = requestDataSet;
                            config.series[3].data = loginDataSet;
                            config.yAxis[0].name = '单位' + ":" + ioUnit;
                            config.yAxis[1].name = '单位' + ":" + '次数';
                            config.xAxis.data = xAxisDataSet;
                            myChart.setOption(config);
                            window.addEventListener("resize", function () {
                                myChart.resize();
                            });
                        }
                    })
            },
            queryChart: function () {
                this.setTip(this.startmillions, this.stopmillions, () => {
                    this.initIoChartData(this.startmillions, this.stopmillions);
                });
            },
            setTip: function (startmillions, stopmillions, callBack) {
                this.isShowTip = false;
                setTimeout(() => {
                    if (startmillions == '' || stopmillions == '') {
                        this.tipContent = '未选择时间';
                        this.tipType = 'warning';
                        this.isShowTip = true;
                    } else if (startmillions > stopmillions) {
                        this.tipContent = '开始时间不能晚于结束时间!';
                        this.tipType = 'error';
                        this.isShowTip = true;
                    } else {
                        callBack();
                    }
                })
            },
            getShow: function (data) {
                this.isShowTip = data;
            },
            getdiskuserio: function (startmillions, stopmillions) {
                this.isShowPage = false;
                this.get('/api/log/diskuserio/list', {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    startmillions: startmillions,
                    stopmillions: stopmillions,
                    dcID: "1"
                })
                    .then(data => {
                        if (data.data) {
                            if(data.data.length != 0) {
                                this.isShowPage = true;
                            }
                            this.tableData = data.data.rows;
                            this.total = data.data.total;
                        }
                    })
            },
            getPageData: function (data) {
                this.pageSize = data.pageSize;
                this.pageNum = data.pageNum;
            },
            queryTable: function () {
                this.setTip(this.startmillions1, this.stopmillions1, () => {
                    this.getdiskuserio(this.startmillions1, this.stopmillions1)
                });
            }
        },
        created() {
            this.curDate = new Date();
            this.preDate = new Date(this.curDate.getTime() - 23 * 60 * 60 * 1000);
            this.curDate1 = this.curDate;
            this.preDate1 = this.preDate;
            let curDate = Date.parse(this.curDate);
            let preDate = Date.parse(this.preDate);
            this.getSystemCapacity();
            this.getUsercount();
            this.getListOn();
            this.initIoChartData(preDate, curDate);
            this.getdiskuserio(preDate, curDate);
        },
        watch: {
            pageSize: function (newVal, oldVal) {
                this.getdiskuserio(this.startmillions1, this.stopmillions1);
            },
            pageNum: function (newVal, oldVal) {
                this.getdiskuserio(this.startmillions1, this.stopmillions1);
            }
        },
        components: {
            loongProgress, loongDialog, loongTable, loongDate, loongTip, loongPagination
        }
    }
</script>

<style scoped>
  .lh125 {
    line-height: 125px;
  }

  .cloudDisk {
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

  .normal-blue {
    background: #2BB2FF;
  }

  .dark-blue {
    background: #0C9AFF;
  }

  .purple-blue {
    background: #4884FD;
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
    box-shadow: 0px 10px 10px 0px rgba(12, 54, 138, 0.16);
  }

  .on-member-ul {
    background: rgba(248, 249, 250, 1);
    height: 125px;
  }

  .on-member-ul li {
    float: left;
    width: 25%;
    line-height: 25px;
    text-align: center;
  }

  .disk-dashboard-chart-box {
    padding: 0 20px;
    width: calc(100% - 40px);
    height: 350px;
  }
</style>
