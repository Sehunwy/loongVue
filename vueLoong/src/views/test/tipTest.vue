<template>
  <div>
    <button class="button-common confirm-button" @click="showTip()">点击</button>
    <loongTip :showTip="isShowTip" @isTipShow="getShow"></loongTip>
  </div>
</template>

<script>
    import loongTip from "@/components/loongTip/loongTip"

    export default {
        name: "tipTest",
        data(){
            return {
                tipContent: 'error！请进行一些更改。', // 提示框内容
                tipType: 'error',  // 提示框类型 error错误   warning警告    success成功
                isShowTip: false
            }
        },
        methods:{
            showTip: function () {
                this.tipContent = 'warning！请进行一些更改。';
                this.tipType = 'warning';
                this.isShowTip = true;
            },
            getShow: function (show) {
                this.isShowTip = show;
            }
        },
        components: {
            loongTip
        }
    }
</script>

<style scoped>

</style>
