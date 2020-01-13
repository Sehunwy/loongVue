<template>
  <div style="width: 100%;height: calc(100% - 20px);margin-top: 20px;background-color: #FFFFFF">
    <loongProgress :proSize="proSize" :proValue="proValue" :txtPosition="txtPosition"
                   :slideHeight="slideHeight" :panRadius="panRadius" :slideRadius="slideRadius"
                   :backgroundColor="backgroundColor" :isColor="isColor" :counterclockwise="true" :scale="true"
                   :slideBackColor="slideBackColor" :txt="proValue" :isCircle="false" :startAngle="startAngle" :endAngle="endAngle"></loongProgress>
    <loongProgress :proSize="proSize" :proValue="proValue" :txtPosition="txtPosition"
                   :slideHeight="slideHeight" :panRadius="panRadius" :slideRadius="slideRadius"
                   :backgroundColor="backgroundColor" :isColor="isColor" :counterclockwise="true" :scale="true"
                   :slideBackColor="slideBackColor" :txt="proValue" :isCircle="true" :startAngle="startAngle" :endAngle="endAngle"></loongProgress>
    <loongProgress :proSize="proSize" :proValue="proValue1" :txtPosition="txtPosition" fontSize="30px"
                   :slideHeight="slideHeight" :panRadius="panRadius" :slideRadius="slideRadius" :txt="txt"
                   :isGradient="false" :isColor="false" :isCircle="true"></loongProgress>
  </div>

</template>

<script>
    import loongProgress from "@/components/loongProgress/loongProgress";

    export default {
        name: "progressTest",
        data() {
            return {
                isCircle: true,  // true:circle,false:Line
                proSize: '160px', //circle:外直径 line：宽度
                slideHeight: 5,//circle:环形宽度 line：高度
                proValue: '70%', // 当前进度
                proValue1: '40%',
                txt: function (per) {
                    return '<div style="font-size: 30px">' + per + '</div><div style="font-size: 12px;width: 100%">哈哈哈哈哈哈哈哈哈哈</div>';
                },  // 百分比
                fontSize: '12px', // 百分比字体大小
                fontColor: '',  // 百分比显示颜色
                fontFamily: 'PingFangSC-Regular', // 百分比字体
                fontWeight: '500', // 百分比字体粗细
                txtPosition: 'center',  //center top bottom right  百分比显示位置
                panRadius: 2, // 外层圆角
                slideRadius: 2,  // 百分比圆角
                backgroundColor: '#E9ECEF', // 外层背景色
                isColor: true,// 百分比是否给定默认的背景色
                slideBackColor: '', // 百分比背景色
                isGradient: false,//是否渐变
                shadowBlur: true,
                startAngle: 0.75 * Math.PI,//开始角度
                endAngle: 2.25 * Math.PI,//结束角度

                time: '',
            }
        },
        mounted() {
            let _this = this;
            this.time = setInterval(function () {
                _this.proValue = (Math.random() * 100).toFixed(2) + "%";
                _this.proValue1 = (Math.random() * 100).toFixed(2) + "%";
            }, 3000)
        },
        destroyed() {
            clearInterval(this.time)
        },
        components: {
            loongProgress
        }
    }
</script>

<style scoped>

</style>
