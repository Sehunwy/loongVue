<template>
  <div class="tab">
    <loongTab :tabArr="tabArr" :activeTab="activeTab"></loongTab>
  </div>
</template>

<script>
    import cloudStorage from '@/components/homePage/cloudStorage'
    import virtualCloud from '@/components/homePage/virtualCloud'
    import cloudDisk from '@/components/homePage/cloudDisk'
    import loongTab from '@/components/loongTab/loongTab'

    export default {
        name: "tabTest",
        data() {
            return {
                tabArr: [
                    {
                        component: cloudStorage,  // tab组件
                        text: '云存储'  // tab名称
                    },
                    {
                        component: virtualCloud,
                        text: '虚拟云'
                    },
                    {
                        component: cloudDisk,
                        text: '云盘'
                    }
                ],
                activeTab: 1 // 初始激活的tab
            }
        },
        components: {
            loongTab
        },
    }
</script>

<style scoped>

</style>
