<template>
  <div class="loong-switch">
    <div @click="changeOpen()" style="width: 22px;height: 12px;">
      <div class="loong-switch-btn switch-btn-close"
           :style="{backgroundColor:isOpen?switchBgColor:'rgb(206, 212, 218)'}"></div>
      <div class="loong-switch-circle" :class="btnClass"></div>
    </div>
    <span class="loong-switch-text c3 fs12">{{isOpen?activeText:inactiveText}}</span>
  </div>
</template>

<script>
    export default {
        name: "loongSwitch",
        data() {
            return {
                btnClass: this.switchState ? 'left1' : 'left8',
                isOpen: this.switchState
            }
        },
        props: {
            switchBgColor: {
                default: '#27CA42'  // 背景色
            },
            switchState: {
                default: true  // 初始状态
            },
            inactiveText: {
                default: '开关关闭' // 开关激活状态
            },
            activeText: {
                default: '开关打开' // 开关激活状态
            },
            disabledSwitch: {
                default: true // 点击是否可切换
            }
        },
        methods: {
            changeOpen: function () {
                if (this.disabledSwitch) {
                    this.isOpen = !this.isOpen;
                    this.btnClass = this.isOpen ? 'btn-open' : 'btn-close';
                    this.$emit('changeChoose', this.isOpen);
                }
            }
        }
    }
</script>

<style scoped>
  .loong-switch {
    position: relative;
  }

  .loong-switch-btn {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 22px;
    height: 12px;
    border-radius: 6px;
  }

  .switch-btn-close {
    background-color: rgb(206, 212, 218);
  }

  .loong-switch-circle {
    position: absolute;
    top: -2px;
    width: 14px;
    height: 14px;
    border-radius: 100%;
    box-shadow: 0 2px 5px 0 #7F7F7F;
    background: linear-gradient(#F6FCFE, #CDE2FB)
  }

  .left1 {
    left: -1px;
  }

  .left8 {
    left: 8px;
  }

  .btn-open {
    animation: open .2s linear;
    left: -1px;
  }

  .btn-close {
    animation: close .2s linear;
    left: 8px;
  }

  @-webkit-keyframes open {
    0% {
      left: 8px;
    }

    100% {
      left: -1px;
    }
  }

  @-webkit-keyframes close {
    0% {
      left: -1px;
    }

    100% {
      left: 8px;
    }
  }

  .loong-switch-text {
    position: absolute;
    left: 30px;
    top: -2px;
  }
</style>
