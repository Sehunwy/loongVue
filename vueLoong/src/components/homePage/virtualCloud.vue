<template>
  <div class="virtualCloud">
    <div class="sumBox">
      <div class="sum-item back-1188dd">
        <div class="data-icon">
          <img :src="getImgUrl('home-node.png')" alt="">
        </div>
        <div class="sumData">
          <p class="data-name mb15 fs12">物理节点</p>
          <p class="data-num ellip" :title="pmNum">{{pmNum}}</p>
        </div>
      </div>
      <div class="sum-item back-28C4EF">
        <div class="data-icon">
          <img :src="getImgUrl(isDomainPic)" alt="">
        </div>
        <div class="sumData">
          <p class="data-name mb15 fs12">{{isDomainName}}</p>
          <p class="data-num ellip" :title="pnCount">{{pnCount}}</p>
        </div>
      </div>
      <div class="sum-item back-4884FD">
        <div class="data-icon">
          <img :src="getImgUrl('home-user.png')" alt="">
        </div>
        <div class="sumData">
          <p class="data-name mb15 fs12">云账户</p>
          <p class="data-num ellip" :title="userCount">{{userCount}}</p>
        </div>
      </div>
      <div class="sum-item back-1188dd">
        <div class="data-icon">
          <img :src="getImgUrl('home-vm.png')" alt="">
        </div>
        <div class="sumData">
          <p class="data-name mb15 fs12">云主机</p>
          <p class="data-num ellip" :title="vmNum">{{vmNum}}</p>
        </div>
      </div>
      <div class="sum-item back-28C4EF">
        <div class="data-icon">
          <img :src="getImgUrl('home-runvm.png')" alt="">
        </div>
        <div class="sumData">
          <p class="data-name mb15 fs12">运行中的云主机</p>
          <p class="data-num">{{startVmNum}}</p>
        </div>
      </div>
      <div class="sum-item back-4884FD">
        <div class="data-icon">
          <img :src="getImgUrl('home-disk.png')" alt="">
        </div>
        <div class="sumData">
          <p class="data-name mb15 fs12">虚拟磁盘</p>
          <p class="data-num">{{diskCount}}</p>
        </div>
      </div>
    </div>
    <div class="statusBox pt20">
      <div class="status-li">
        <div class="li-title pl20 c6 fs14">资源池</div>
        <div class="info-details border-bottom-E9ECEF">
          <div class="info-box">
            <div class="boxHead fs13 c6">
            <span>
              虚拟资源池
            </span>
              <span class="fr color-1188dd cursor-pointer fs16">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-chakanxiangqing"></use>
            </svg>
          </span>
            </div>
          </div>
          <div class="errorShow" v-show="ResourceError">
            <img :src="getImgUrl('home-noData.png')" alt="">
          </div>
          <div class="info-chart" v-show="!ResourceError">
            <loongProgress proSize="160px" txtPosition="center" :isGradient="true" :txt="txtResource"
                           :proValue="proValueResource"
                           :startAngle="0.75*Math.PI" :endAngle="2.25*Math.PI" :scale="true"></loongProgress>
          </div>
          <div class="info-data text-cneter" v-show="!ResourceError">
            <p class="data-text fs12 c6">可用核数/虚拟总核数</p>
            <p class="data-number fs16 c3">{{cpuFree}} / {{cpuTotal}}</p>
          </div>
        </div>
        <div class="info-details border-bottom-E9ECEF">
          <div class="info-box">
            <div class="boxHead fs13 c6">
            <span>
              虚拟内存池
            </span>
              <span class="fr color-1188dd cursor-pointer fs16">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-chakanxiangqing"></use>
            </svg>
          </span>
            </div>
          </div>
          <div class="info-chart text-cneter">
            <loongProgress proSize="160px" txtPosition="center" :isGradient="true" :txt="txtMem" :proValue="proValueMem"
                           :startAngle="0.75*Math.PI" :endAngle="2.25*Math.PI" :scale="true"></loongProgress>
          </div>
          <div class="info-data text-cneter">
            <p class="data-text fs12 c6">可用内存/虚拟总内存</p>
            <p class="data-number fs16 c3">{{memFree}} / {{memTotal}}</p>
          </div>
        </div>
      </div>
      <div class="status-li">
        <div class="li-title pl20 c6 fs14">网络</div>
        <div class="info-details border-bottom-E9ECEF">
          <div class="info-box">
            <div class="boxHead fs13 c6">
            <span>
              物理网络宽带
            </span>
              <span class="fr color-1188dd cursor-pointer fs16">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-chakanxiangqing"></use>
            </svg>
          </span>
            </div>
          </div>
          <div class="info-chart text-cneter" ref="network">
          </div>
          <div class="info-data text-cneter">
            <ul class="space-between">
              <li class="data-list-ul">
                <p class="data-text fs12 c6">总发送量</p>
                <p class="data-number fs16 c3">
                  <span class="fs16 color-28C4EF">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-zhuyeshangjiantou"></use>
                    </svg>
                  </span>
                  {{netOut}}
                </p>
              </li>
              <li class="data-list-ul">
                <p class="data-text fs12 c6">总接收量</p>
                <p class="data-number fs16 c3">
                  <span class="fs16 color-4884FD">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-zhuyexiajiantou"></use>
                    </svg>
                  </span>
                  {{netIn}}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="info-details border-bottom-E9ECEF">
          <div class="info-box">
            <div class="boxHead fs13 c6">
            <span>
              IP地址
            </span>
              <span class="fr color-1188dd cursor-pointer fs16">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-chakanxiangqing"></use>
            </svg>
          </span>
            </div>
          </div>
          <div class="info-chart text-cneter">
            <loongProgress proSize="160px" txtPosition="center" :isGradient="true" :txt="txtIp" :proValue="proValueIp"
                           :startAngle="0.75*Math.PI" :endAngle="2.25*Math.PI" :scale="true"></loongProgress>
          </div>
          <div class="info-data text-cneter">
            <p class="data-text fs12 c6">IP可用量/IP总量</p>
            <p class="data-number fs16 c3">{{ipFree}} / {{ipTotal}}</p>
          </div>
        </div>
      </div>
      <div class="status-li">
        <div class="li-title pl20 c6 fs14">存储</div>
        <div class="info-details border-bottom-E9ECEF">
          <div class="info-box">
            <div class="boxHead fs13 c6">
            <span>
              性能监控
            </span>
            </div>
          </div>
          <div class="info-chart text-cneter" ref="performance">

          </div>
          <div class="info-data text-cneter">
            <ul class="space-between">
              <li class="data-list-ul">
                <p class="data-text fs12 c6">读速率</p>
                <p class="data-number fs16 c3">
                  <span class="fs16 color-28C4EF">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-zhuyeshangjiantou"></use>
                    </svg>
                  </span>
                  {{readRate}}
                </p>
              </li>
              <li class="data-list-ul">
                <p class="data-text fs12 c6">写速率</p>
                <p class="data-number fs16 c3">
                  <span class="fs16 color-4884FD">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-zhuyexiajiantou"></use>
                    </svg>
                  </span>
                  {{writeRate}}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="info-details border-bottom-E9ECEF">
          <div class="info-box">
            <div class="boxHead fs13 c6">
            <span>
              存储
            </span>
            </div>
          </div>
          <div class="info-chart text-cneter">
            <loongProgress proSize="160px" txtPosition="center" :isGradient="true" :txt="txtStorage"
                           :proValue="proValueStorage"
                           :startAngle="0.75*Math.PI" :endAngle="2.25*Math.PI" :scale="true"></loongProgress>
          </div>
          <div class="info-data text-cneter">
            <p class="data-text fs12 c6">可用容量/总容量</p>
            <p class="data-number fs16 c3">{{storageFree}} / {{storageTotal}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import loongProgress from "@/components/loongProgress/loongProgress"
    import {mathCeil, formatSizeStr, setChartTime, getUnit, convertToUnit} from '@/assets/js/common'
    import echarts from 'echarts'

    export default {
        name: "virtualCloud",
        data() {
            return {
                totalInterval: '',
                progressInterVal: '',
                isDomain: window.sessionStorage.getItem("isDomain") == "true" ? true : false,
                pmNum: "",
                pnCount: "",
                userCount: "",
                vmNum: "",
                startVmNum: "",
                diskCount: "",
                isDomainName: '云租户',
                isDomainPic: 'home-tenant.png',
                ResourceError: false,
                cpuFree: "",
                cpuTotal: "",
                proValueResource: '0%',
                txtResource: per => {
                    per = Math.round(parseFloat(per)) + '%'
                    return '<div style="color: #38455A;font-size: 36px;font-weight: 600;padding-top: 20px;">' + per + '</div><div class="c9 fs12">CPU利用率</div>'
                },
                memFree: '',
                memTotal: '',
                proValueMem: '0%',
                txtMem: per => {
                    per = Math.round(parseFloat(per)) + '%'
                    return '<div style="color: #38455A;font-size: 36px;font-weight: 600;padding-top: 20px;">' + per + '</div><div class="c9 fs12">内存利用率</div>'
                },
                ipFree: '',
                ipTotal: '',
                proValueIp: '0%',
                txtIp: per => {
                    per = Math.round(parseFloat(per)) + '%'
                    return '<div style="color: #38455A;font-size: 36px;font-weight: 600;padding-top: 20px;">' + per + '</div><div class="c9 fs12">IP利用率</div>'
                },
                storageTotal: '',
                storageFree: '',
                proValueStorage: '0%',
                txtStorage: per => {
                    per = Math.round(parseFloat(per)) + '%'
                    return '<div style="color: #38455A;font-size: 36px;font-weight: 600;padding-top: 20px;">' + per + '</div><div class="c9 fs12">IP利用率</div>'
                },
                netInDataSet: [],
                netOutDataSet: [],
                netOut: '',
                netIn: '',
                readDataSet: [],
                writeDataSet: [],
                readRate: '',
                writeRate: '',
            }
        },
        methods: {
            getImgUrl: function (url1) {
                return require("@/assets/img/cloudImg/" + url1);
            },
            totalCount: function () {
                this.get('/api/dashboard/cloud/totalCount', {})
                    .then(data => {
                        data = data.data;
                        if (this.isDomain) {
                            this.isDomainName = '云租户';
                            this.isDomainPic = 'home-tenant.png';
                        } else {
                            this.isDomainName = '物理网络';
                            this.isDomainPic = 'home-pn.png';
                        }
                        this.pnCount = data.pnCount;
                        this.pmNum = data.pmNum;
                        this.userCount = data.userCount;
                        this.vmNum = data.vmNum;
                        this.startVmNum = data.startVmNum;
                        this.diskCount = data.diskCount;
                    })
            },
            mointor: function () {
                this.get('/api/dashboard/cloud/total', {})
                    .then(data => {
                        if (data.error) {
                            this.ResourceError = true;
                        } else {
                            this.ResourceError = false;
                            data = data.data;
                            this.cpuFree = data.cpuNum - data.vcpuNum;
                            this.cpuTotal = data.cpuNum;
                            this.proValueResource = mathCeil(data.vcpuNum, data.cpuNum);
                            this.memFree = formatSizeStr(data.memTotal - data.memUsed);
                            this.memTotal = formatSizeStr(data.memTotal);
                            this.proValueMem = mathCeil(data.memUsed, data.memTotal);
                            this.ipFree = data.ipTotal - data.ipUsed;
                            this.ipTotal = data.ipTotal;
                            this.proValueIp = mathCeil(data.ipUsed, data.ipTotal);
                            this.storageTotal = formatSizeStr(data.totalSize);
                            this.storageFree = formatSizeStr(data.freeSize);
                            this.proValueStorage = mathCeil(data.totalSize - data.freeSize, data.totalSize);
                        }
                    })
            },
            byteSpeedCache: function () {
                this.get('/api/dashboard/cloud/totalNet', {})
                    .then(data => {
                        if (!data.error) {
                            data = data.data;
                            this.netInDataSet = this.netInDataSet.concat(data.bytesInSpeed);
                            this.netOutDataSet = this.netOutDataSet.concat(data.bytesOutSpeed);
                            let bytesInSpeed = data.bytesInSpeed, bytesOutSpeed = data.bytesOutSpeed;
                            let unit = getUnit(bytesInSpeed.concat(bytesOutSpeed));
                            let netIn = convertToUnit(bytesInSpeed, unit);
                            let netOut = convertToUnit(bytesOutSpeed, unit);
                            let myChart = echarts.init(this.$refs.network)
                            let config = JSON.parse(JSON.stringify(setChartTime()));
                            config.series[0].data = netOut;
                            config.series[0].name = '总发送量';
                            config.series[1].data = netIn;
                            config.series[1].name = '总接收量';
                            config.yAxis.name = unit + "/s";
                            myChart.setOption(config);
                            window.addEventListener("resize", function () {
                                myChart.resize();
                            });
                            this.netOut = netOut[netOut.length - 1] + unit + "/s";
                            this.netIn = netIn[netIn.length - 1] + unit + "/s";
                        }
                    })
            },
            rwSpeedCache: function () {
                this.get('/api/dashboard/cloud/totalBlock', {})
                    .then(data => {
                        if (!data.error) {
                            data = data.data;
                            this.readDataSet = this.readDataSet.concat(data.bytesOutSpeed);
                            this.writeDataSet = this.writeDataSet.concat(data.bytesInSpeed);
                            let bytesInSpeed = data.bytesInSpeed, bytesOutSpeed = data.bytesOutSpeed;
                            let unit = getUnit(bytesInSpeed.concat(bytesOutSpeed));
                            let diskRead = convertToUnit(bytesOutSpeed, unit);
                            let diskWrite = convertToUnit(bytesInSpeed, unit);
                            let myChart = echarts.init(this.$refs.performance);
                            let config = JSON.parse(JSON.stringify(setChartTime()));
                            config.series[0].data = diskRead;
                            config.series[0].name = '读速率';
                            config.series[1].data = diskWrite;
                            config.series[1].name = '写速率';
                            config.yAxis.name = unit + "/s";
                            myChart.setOption(config);
                            window.addEventListener("resize", function () {
                                myChart.resize();
                            });
                            this.readRate = diskRead[diskRead.length - 1] + unit + "/s";
                            this.writeRate = diskWrite[diskWrite.length - 1] + unit + "/s";
                        }
                    })
            }
        },
        created() {
            this.totalCount();
            this.mointor();
            this.byteSpeedCache();
            this.rwSpeedCache();
        },
        mounted() {
            this.totalInterval = setInterval(() => {
                this.totalCount();
            }, 5000);
            this.progressInterVal = setInterval(()=>{
                this.mointor();
                this.byteSpeedCache();
                this.rwSpeedCache();
            },3000);
        },
        beforeDestroy() {
            clearInterval(this.totalInterval);
            clearInterval(this.progressInterVal);
        },
        components: {
            loongProgress
        }
    }
</script>

<style scoped>
  .errorShow {
    height: 211px;
    display: flex;
    justify-content: center;
    align-items: center
  }

  .virtualCloud {
    min-width: 970px;
  }

  .sumBox {
    display: flex;
    justify-content: space-between;
  }

  .sum-item {
    width: calc(16.6666% - 14px);
    height: 106px;
    box-shadow: 0px 10px 10px 0px rgba(12, 54, 138, 0.19), 0px 0px 10px 0px rgba(18, 61, 148, 0.2);
    border-radius: 4px;
    color: #fff;
  }

  .data-icon {
    margin: 0px;
    float: left;
    width: 80px;
    height: 106px;
  }

  .sumData {
    float: left;
    width: calc(100% - 80px);
    height: calc(100% - 15px);
    text-align: center;
    padding: 15px 0 0 0;
  }

  .data-name {
    font-family: MicrosoftYaHei;
  }

  .data-num {
    font-size: 32px;
    font-family: PingFangSC-Regular;
  }

  .statusBox {
    display: flex;
    justify-content: space-between;
  }

  .status-li {
    width: calc(33.3333% - 14px);
    background-color: #fff;
    box-shadow: 0px 4px 4px 0px rgba(12, 54, 138, 0.08), 0px 0px 4px 0px rgba(18, 61, 148, 0.09);
    border-radius: 2px;
  }

  .li-title {
    height: 44px;
    line-height: 44px;
    background: #F8F9FA;
    text-align: left;
    font-family: PingFangSC-Regular;
  }

  .info-details {
    padding: 0 20px;
  }

  .boxHead {
    padding-top: 11px;
    margin-bottom: 15px;
    font-family: PingFangSC-Regular;
    height: 32px;
  }

  .info-chart {
    /*text-align: center;*/
    display: flex;
    justify-content: center;
    height: 140px;
  }

  .info-data {
    padding: 12px 0 20px 0;
    height: 39px;
  }

  .data-text {
    font-family: PingFangSC-Regular;
    line-height: 17px;
    margin-bottom: 2px;
    font-weight: 400;
  }

  .data-number {
    font-family: PingFangSC-Regular;
    line-height: 22px;
  }

  .data-list-ul {
    width: 50%;
    text-align: center;
  }
</style>
