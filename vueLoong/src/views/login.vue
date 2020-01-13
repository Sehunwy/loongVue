<template>
  <div class="login-outer-wrap">
    <div class="login-wrap" :style="{backgroundImage:  'url(' + bg + ')' }">
      <div class="login-box">
        <div class="login-title">登录</div>
        <div class="login-con">
          <form class="login-form">
            <div class="login-input-line">
              <input type="text" name="username" v-model="username" placeholder="请输入用户名">
            </div>
            <div class="login-input-line">
              <input type="password" class="password-text" v-model="password" placeholder="请输入密码">
              <input type="hidden" name="password">
            </div>
            <div class="pt10">
              <div class="error-tip fs12 fl">{{errorMsg}}</div>
            </div>
            <div class="login-btn" @click="log_in()">登录</div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    import {hex_md5} from '@/assets/js/md5'
    import bg from '@/assets/img/login-bg.png'
    import $ from 'jquery'

    export default {
        name: "login",
        data() {
            return {
                username: '',
                password: '',
                bg: bg,
                errorMsg: ''
            }
        },
        methods: {
            log_in: function () {
                let _this = this;
                this.$axios.get('/noToken/api/node/isMaster', {})
                    .then(response => {
                        if (response.data) {
                            let param = {username: this.username, password: hex_md5(this.password)};
                            _this.$axios.get('/api/login', {
                                params: param,
                            })
                                .then(response => {
                                    if (response.data.error_code || response.data.error) {
                                        _this.$axios.get('/api/login', {
                                            params: {
                                                "username": this.username,
                                                "password": hex_md5(this.password),
                                                "type": "ad"
                                            },
                                        })
                                            .then(response => {
                                                if (response.data.error_code || response.data.error) {
                                                    _this.errorMsg = '用户名或密码错误';
                                                } else {
                                                    _this.goPath("homePage", "")
                                                }
                                            })
                                            .catch((error) => {
                                                let status = error.response.status;
                                                if (status == 400) {
                                                    _this.errorMsg = '服务连接失败';
                                                } else if (status == 500) {
                                                    _this.errorMsg = '登录失败';
                                                }
                                            })
                                    } else {
                                        _this.goPath("homePage", "")
                                    }
                                })
                                .catch((error) => {
                                    let status = error.response.status;
                                    if (status == 400) {
                                        _this.errorMsg = '服务连接失败';
                                    } else if (status == 500) {
                                        _this.errorMsg = '登录失败';
                                    }
                                })
                        } else {
                            _this.errorMsg = '访问的节点不是主管理服务节点';
                        }
                    })
                    .catch((error) => {
                        let status = error.response.status;
                        if (status == 410 || status == 500) {
                            _this.errorMsg = '服务连接失败';
                        }
                    })
            }
        }
    }
</script>

<style scoped>
  .login-outer-wrap {
    height: 100%;
    overflow: auto;
    background-image: linear-gradient(to bottom, #43BBFF, #1188DD);
  }

  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 600px;
    min-width: 700px;
    background-position: center center;
    background-repeat: no-repeat;
  }

  .login-box {
    position: absolute;
    width: 310px;
    height: 363px;
    background-color: #ffffff;
    border-radius: 4px;
    margin: auto;
    padding: 35px 20px 0 20px;
    top: calc((100% - 398px) / 2);
    left: calc((100% - 350px) / 2);
  }

  .login-title {
    padding: 30px 0 34px 33px;
    font-size: 24px;
    color: #666666;
  }

  .login-con {
    padding: 0 25px;
  }

  .login-input-line {
    padding: 18px 0 0 0;
  }

  .login-input-line input {
    width: 250px;
    height: 32px;
    padding-left: 10px;
    background-color: #F8F9FA;
    border: 1px solid #E0E0E0;
  }

  .login-btn {
    margin: 20px 0;
    width: 260px;
    height: 38px;
    font-size: 14px;
    line-height: 38px;
    background-color: #1188DD;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
  }

  .error-tip {
    color: #FF2222;
  }
</style>
