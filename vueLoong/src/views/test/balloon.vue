<template>
  <div class="balloonTip">
    <div style="width: 100%;height: 100%;" class="fl">
      <div v-for="(data,index) in datas">
        <div class="divClass" :ref="`tip${index}`"
             @mouseover="mouseOver(index)" @mouseleave="mouseLeave(index)">
          {{data.name}}
        </div>
        <loongBalloonTip :tipTitle="tipTitle" :tipPlacement="tipPlacement" :elementInfo="elementInfo"
                         :isShowTip="isShowTip[index]"></loongBalloonTip>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
    import loongBalloonTip from "@/components/loongBalloonTip/loongBalloonTip"

    export default {
        name: "balloon",
        data() {
            return {
                datas: [
                    {
                        tipTitle: '气泡1',
                        name: 'test1'
                    },
                    {
                        tipTitle: '气泡2',
                        name: 'test2'
                    },
                    {
                        tipTitle: '气泡3',
                        name: 'test3'
                    }
                ],
                tipPlacement: "top", // 气泡显示位置 top bottom left right
                tipBackColor: '', // 气泡显示背景色
                tipColor: '',     // 气泡显示字体颜色
                elementInfo: '',  // 产生气泡节点信息
                tipTitle: '气泡',  // 气泡显示内容
                isShowTip: [], // 气泡是否显示 初始为false
                widthTip: '130px', // 气泡显示宽度
            }
        },
        methods: {
            // 鼠标移入事件
            mouseOver: function (index) {
                this.tipTitle = this.datas[index].tipTitle;
                this.$set(this.isShowTip, index, true)
                this.elementInfo = this.$refs[`tip${index}`];
            },
            // 鼠标移出事件
            mouseLeave: function (index) {
                this.$set(this.isShowTip, index, false)
                this.elementInfo = this.$refs[`tip${index}`];
            }
        },
        components: {
            loongBalloonTip
        }
    }
</script>

<style scoped>
  .balloonTip {
    width: 100%;
    height: calc(100% - 20px);
    background-color: #ffffff;
    margin-top: 20px;
  }

  .divClass {
    width: 100px;
    height: 100px;
    border: 1px solid #000000;
    margin-top: 20px;
  }
</style>
