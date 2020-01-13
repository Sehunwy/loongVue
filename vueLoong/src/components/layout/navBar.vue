<template>
  <div style="overflow-x: hidden;min-width: 600px">
    <div class="loong-nav">
      <span class="breadcrumb-container">
        <span v-for="(item,index) in breadcrumb">
          {{ $t(item) }}
          <span v-show="index!=breadcrumb.length-1">/</span>
        </span>
      </span>
      <ul class="topbar-nav-list">
        <li class="topbar-nav" title="任务管理">
          <div class="topbar-nav-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-renwuguanli"></use>
            </svg>
          </div>
          <div class="topbar-nav-icon" v-show="taskTotal>0">
            <div class="warn-total">{{taskTotal}}</div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gaojing"></use>
            </svg>
          </div>
        </li>
        <li class="topbar-nav">
          <div @mouseenter="enter('alarm')" @mouseleave="leave('alarm')">
            <div class="topbar-nav-icon">
              <div class="warn-total" :title="warnTotal>999?warnTotal:''" v-show="warnTotal>0">
                {{warnTotal>999?'···':warnTotal}}
              </div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gaojing"></use>
              </svg>
            </div>
            <div class="hover-alarm hover-common" ref="alarm">
              <div class="warn-list">
                <div v-for="data in warnData" class="warn-list-item">
                  <div class="ellip warn-text">
                    <span>{{$t('message.'+data.alarmCode+'',[data.ip])}}</span>
                  </div>
                  <div class="warn-time">
                    {{data.date}}
                  </div>
                </div>
                <div class="warn-no-item c9" v-show="warnTotal==0">
                  暂无数据
                </div>
              </div>
              <div class="more-warn-btn" @click="goPath('alarm1',{query:'query'})">查看更多</div>
            </div>
          </div>
        </li>
        <li class="topbar-nav" title="日志管理">
          <div class="topbar-nav-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-rizhi"></use>
            </svg>
          </div>
          <div class="topbar-nav-icon" v-show="logTotal>0">
            <div class="warn-total">{{logTotal}}</div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gaojing"></use>
            </svg>
          </div>
        </li>
        <li class="topbar-nav" title="授权信息">
          <div class="topbar-nav-icon" style="padding: 16px 15px 8px 15px;">
            <img src="@/assets/img/shouquanxinxi.gif" alt="">
          </div>
        </li>
        <li class="topbar-nav topbar-nav-last">
          <div @mouseenter="enter('person')" @mouseleave="leave('person')">
            <div class="topbar-nav-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-nv"></use>
              </svg>
            </div>
            <div style="height: 1000px;background-color: #E9ECEF">
            </div>
            <div class="person-info hover-common" ref="person">
              <div class="login-type">
                {{owner}}
              </div>
              <div class="account-operation">
                账号设置
              </div>
              <div class="account-operation log-out" @click="logOut()">
                注销登录
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import {formatDate} from '@/assets/js/common'

    export default {
        name: "navBar",
        data() {
            return {
                breadcrumb: [], // 面包屑初始数组
                warnTotal: 0,
                warnShow: 0,
                warnData: [],
                taskTotal: 0,
                logTotal: 0,
                owner: window.sessionStorage.getItem("user")
            }
        },
        methods: {
            // set 面包屑
            setBreadcrumb: function (item) {
                this.breadcrumb = [];
                for (let i in item) {
                    if (item[i].meta.title != undefined) {
                        this.breadcrumb.push(item[i].meta.title)
                    }
                }
            },
            // 鼠标移入
            enter: function (even) {
                this.$refs[`${even}`].style.display = 'block';
            },
            // 鼠标移出
            leave: function (even) {
                this.$refs[`${even}`].style.display = 'none';
            },
            // 注销登录
            logOut: function () {
                this.get('/api/logout', {})
                    .then(response => {
                        window.location.href = "login.html";
                    })
            },
            getCurrentWarn: function () {
                this.get('/api/utility/alarm/current/list', {
                    pageSize: 20,
                    pageNum: 1,
                    owner: this.owner
                })
                    .then(data => {
                        if (data.data) {
                            data = data.data;
                            console.log(data)
                            this.warnTotal = data.total;
                            this.warnShow = data.total;
                            if (this.warnShow > 4) {
                                this.warnShow = 4;
                            }
                            // this.warnData = data.rows;
                            let alarmCode;
                            let indexOf;
                            let ip;
                            let datas = data.rows;
                            for (let i = 0; i < this.warnShow; i++) {
                                ip = datas[i].data;
                                indexOf = ip.indexOf(',');
                                if (indexOf >= 0) {
                                    ip = ip.substring(0, indexOf)
                                }
                                this.warnData[i] = {
                                    alarmCode: "alarm_" + datas[i].alarmCode,
                                    ip: ip,
                                    date: formatDate(datas[i].time, "Y-M-D h:m:s")
                                }
                            }
                            console.log(this.warnData)
                        }
                    })
            }
        },
        filters: {
            filterDate: function (timeStamp, type) {
                return formatDate(timeStamp, type);
            }
        },
        created() {
            this.setBreadcrumb(this.$route.matched);
            this.getCurrentWarn();
        },
        watch: {
            // 路由改变
            $route(to, from) {
                this.setBreadcrumb(this.$route.matched);
            },
        }
    }
</script>

<style scoped>
  .loong-nav {
    width: 100%;
    height: 54px;
    background-color: #F8F9FA;
  }

  .breadcrumb-container {
    line-height: 54px;
    padding-left: 20px;
    font-size: 14px;
    color: #333;
  }

  .topbar-nav-list {
    float: right;
    margin: 0px;
  }

  .topbar-nav {
    position: relative;
    float: left;
    font-size: 24px;
    color: #999999;
    cursor: pointer;
  }

  .topbar-nav-icon {
    padding: 12px 15px;
  }

  .topbar-nav-last {
    border-left: 1px #eee solid;
  }

  .topbar-nav:hover {
    color: #1188dd;
  }

  .topbar-nav-last:hover {
    background-color: #F2F4F6;
  }

  .hover-common {
    position: absolute;
    z-index: 1;
    font-size: 14px;
    color: #333333;
    right: 0px;
    top: 53px;
    background-color: #fff;
    box-shadow: 1px 1px 8px 0px rgba(0, 0, 0, 0.19);
    display: none;
  }

  .hover-alarm {
    width: 260px;
  }

  .warn-total {
    position: absolute;
    left: 29px;
    top: 14px;
    padding: 0 4px;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    background-color: #FF2222;
    color: #fff;
    border-radius: 4px;
  }

  .warn-list {
    border-bottom: 1px solid #E9ECEF;
  }

  .warn-list-item {
    padding: 10px 20px;
  }

  .warn-no-item {
    text-align: center;
    padding: 20px 0;
  }

  .warn-text {
    font-size: 12px;
    color: #333333;
  }

  .warn-time {
    font-size: 12px;
    color: #999999
  }

  .more-warn-btn {
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 12px;
    color: #1188DD;
  }

  .person-info {
    width: 120px;
  }

  .login-type {
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #E9ECEF;
    font-size: 13px
  }

  .account-operation {
    height: 36px;
    line-height: 36px;
    padding-left: 20px;
    overflow: hidden;
    font-size: 12px
  }

  .log-out {
    color: #ff2222;
  }
</style>
