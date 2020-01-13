<template>
  <div style="width: 100%;height: 100%">
    <div style="width: 100%;overflow: hidden">
      <div class="tab">
        <span class="dib tab-active-bar" ref="activeBar"></span>
        <span v-for="(item,index) in tabArr" class="dib pr10 pl10 mr30 fs13 cursor tab-nav"
              :class="currentView == item.component ? 'active-tab' : ''"
              @click="tabChange(item.component,index,item.text)">{{item.text}}</span>
      </div>
    </div>
    <div class="mt15 showView">
      <div :is="currentView"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "tab",
        data() {
            return {
                currentView: '' // 当前显示tab
            }
        },
        props: {
            tabArr: {},  // 传入对象 （component：tab组件 text：tab名称）
            activeTab: {} // 初始激活的tab 数字从1开始
        },
        methods: {
            tabChange: function (tabItem, index, text) {
                window.sessionStorage.setItem("selectedTab", index + 1);
                this.currentView = tabItem;
                let textLen = 0;
                let left = 0;
                let beforeLeft = 0;
                for (let i = 0; i < index; i++) {
                    textLen = textLen + this.tabArr[i].text.length * 13;
                }
                left = index * 50 + textLen + 'px';
                beforeLeft = this.$refs.activeBar.style.left == '' ? '0px' : this.$refs.activeBar.style.left;
                let style = document.styleSheets[0];
                style.insertRule("@keyframes move{0%{ left: " + beforeLeft + "; }to{ left:" + left + "}}", 0);
                this.$refs.activeBar.style.width = text.length * 13 + 20 + 'px';
                this.$refs.activeBar.style.left = left;
                this.$refs.activeBar.addEventListener('animationend', function () {
                    if (style.cssRules[0].name == 'move') {
                        style.deleteRule(0);
                    }
                });
            }
        },
        mounted() {
            let index;
            let tab = window.sessionStorage.getItem("selectedTab");
            if (tab == "" || tab == null) {
                index = this.activeTab - 1;
            } else {
                index = tab - 1;
            }
            this.tabChange(this.tabArr[index].component, index, this.tabArr[index].text)
        },
        beforeDestroy() {
            window.sessionStorage.setItem("selectedTab", "");
        }
    }
</script>

<style scoped>
  .tab {
    border-bottom: 1px solid #ced4da;
    position: relative;
    font-size: 0;
    min-width: 970px;
  }

  .tab-nav {
    text-align: center;
    padding-bottom: 10px;
    padding-top: 15px;
    font-size: 13px;
  }

  .active-tab {
    color: #1188dd;
  }

  .tab-active-bar {
    position: absolute;
    left: 0px;
    bottom: 0;
    width: 59px;
    height: 2px;
    background-color: #1188dd;
    border-radius: 2px;
    animation: move 400ms linear;
  }

  .showView {
    width: 100%;
    height: calc(100% - 60px);
    overflow: auto;
  }

</style>
