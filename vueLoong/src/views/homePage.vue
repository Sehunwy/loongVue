<template>
  <div class="home-page">
    <loongTab :tabArr="tabArr" :activeTab="activeTab"></loongTab>
  </div>
</template>

<script>
    import cloudStorage from '@/components/homePage/cloudStorage'
    import virtualCloud from '@/components/homePage/virtualCloud'
    import cloudDisk from '@/components/homePage/cloudDisk'
    import loongTab from '@/components/loongTab/loongTab'

    export default {
        name: "homePage",
        data() {
            return {
                tabArr: [
                    {
                        component: cloudStorage,
                        text: '云存储'
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
                activeTab: 1
            }
        },
        components: {
            loongTab
        },
    }
</script>

<style scoped>
  .home-page {
    width: 100%;
    height: 100%;
  }

</style>
