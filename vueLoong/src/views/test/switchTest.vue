<template>
  <div class="switch">
    <loongSwitch :switchBgColor="switchBgColor" :switchState="switchState" :activeText="activeText"
                 :inactiveText="inactiveText" :disabledSwitch="disabledSwitch" @changeChoose="changeChoose"></loongSwitch>
  </div>
</template>

<script>
    import loongSwitch from "@/components/loongSwitch/loongSwitch";

    export default {
        name: "switchTest",
        data() {
            return {
                switchBgColor: '#27CA42', // 背景色
                switchState: true, // 初始状态
                activeText: "开关打开", // 开关激活状态
                inactiveText: "开关关闭",// 开关激活状态
                disabledSwitch: true, // 是否可切换
            }
        },
        methods: {
            changeChoose: function (data) {
                console.log(data)
            }
        },
        components: {
            loongSwitch
        }
    }
</script>

<style scoped>
  .switch {
    width: 100%;
    height: calc(100% - 20px);
    margin-top: 20px;
    background-color: #FFFFFF;
  }
</style>
