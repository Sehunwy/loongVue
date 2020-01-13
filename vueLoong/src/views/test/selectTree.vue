<template>
  <div class="selectTree">
    <loongSelectTree :treeWid="treeWid" :treeData="treeData" :treeVal="treeVal"></loongSelectTree>
  </div>
</template>

<script>
    import loongSelectTree from "@/components/loongSelectTree/loongSelectTree";

    export default {
        name: "selectTree",
        data() {
            return {
                treeWid: '200px', // 搜索框宽度
                treeData: [], // 下拉框数据
                treeVal: 'value', // 下拉框数据键名
            }
        },
        methods: {
            getTableData: function () {
                this.$axios.get('http://13.15.11.34:3000/getSelectTree', {})
                    .then(response => {
                        this.treeData = response.data.data;
                        console.log(response.data.data)
                    })
                    .catch((error) => {
                        alert('请求失败了哦')
                    })
            },
        },
        created() {
            this.getTableData()
        },
        components: {
            loongSelectTree
        }
    }
</script>

<style scoped>
  .selectTree {
    width: 100%;
    height: calc(100% - 20px);
    margin-top: 20px;
    background-color: #FFFFFF;
  }
</style>
