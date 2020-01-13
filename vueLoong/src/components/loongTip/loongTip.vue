<template>
  <div v-show="isShow" class="loong-tip fs14" ref="loongTip" :style="{left:left}">
    <div class="fl loong-notice-type" :class="classType" :style="{lineHeight:lineHeight}">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="iconUrl"></use>
      </svg>
    </div>
    <div class="tip-content pl10 fr" :class="classType">
      <div class="tip-message" ref="tipMessage">
        {{tipContent}}
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "loongTip",
        data() {
            return {
                left: "0px",
                isShow: false,
                lineHeight: '34px',
                classType: 'dialog-warning',
                iconUrl: '#icon-tishicuowu',
                timeout: ''
            }
        },
        props: {
            tipContent: {
                default: 'error'
            },// 提示框内容
            tipType: {
                default: 'error'
            },// 提示框类型 error错误   warning警告    success成功
            showTip: {
                default: false
            } // 是否显示提示
        },
        methods: {
            // 设置提示框位置
            setLocation: function () {
                this.$nextTick(function () {
                    let windowWid = window.innerWidth;
                    let loongTip = this.$refs.loongTip;
                    let tipMessage = this.$refs.tipMessage;
                    this.lineHeight = tipMessage.offsetHeight + 20 + 'px';
                    this.left = (windowWid - loongTip.offsetWidth) / 2 + 'px';
                })
            },
            // 设置提示类别
            getTipType: function () {
                if (this.tipType == "error") {
                    this.classType = 'dialog-error';
                    this.iconUrl = '#icon-tishicuowu';
                } else if (this.tipType == "success") {
                    this.classType = 'dialog-success';
                    this.iconUrl = '#icon-tishiwancheng';
                } else {
                    this.classType = 'dialog-warning';
                    this.iconUrl = '#icon-tishijinggao';
                }
            }
        },
        mounted() {
            window.onresize = () => {
                this.setLocation();
            };
        },
        watch: {
            showTip: function (newVal, oldVal) {
                let _this = this;
                this.isShow = newVal;
                this.setLocation();
                this.getTipType();
                clearTimeout(this.timeout);
                if (this.isShow) {
                    _this.timeout = setTimeout(function () {
                        _this.isShow = false;
                        _this.$emit("isTipShow", false)
                    }, 5000)
                }
            },
        }
    }
</script>

<style scoped>
  .loong-tip {
    position: fixed;
    max-width: 640px;
    z-index: 1000;
    color: #ffffff;
    top: 20px;
    border-radius: 2px;
    box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.14), 0 0 6px 0 rgba(0, 0, 0, 0.18);
  }

  .loong-notice-type {
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
    padding: 0 10px;
  }

  .tip-content {
    opacity: 0.9;
    padding: 10px;
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
    width: calc(100% - 54px);
  }

  .dialog-error {
    background: rgba(255, 99, 91, 1);
  }

  .dialog-success {
    background: rgba(89, 189, 80, 1);
  }

  .dialog-warning {
    background: rgba(255, 170, 0, 1);
  }
</style>
