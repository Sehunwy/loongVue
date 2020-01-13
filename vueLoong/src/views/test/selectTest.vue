<template>
  <div class="select">
    <loongSelect :selectWid="selectWid" :selectData="selectData" :selectVal="selectVal" :multi="multi"
                 :allowSearch="allowSearch" :isTitle="isTitle" :selectHei="selectHei"
                 @finSelectData="getData"></loongSelect>
  </div>
</template>

<script>
    import loongSelect from "@/components/loongSelect/loongSelect";

    export default {
        name: "selectTest",
        data() {
            return {
                selectWid: '200px', // select宽度
                selectHei: '32px',  // select高度
                selectVal: 'value', // 下拉框数据键名
                multi: true, // 是否为多选
                allowSearch: true, // 是否允许搜索
                isTitle: true, // 是否含有title
                selectData: [], // 下拉框数据
            }
        },
        methods: {
            getData: function (data) {
                console.log(data)
            },
            getTableData: function () {
                this.$axios.get('http://13.15.11.34:3000/getSelect', {
                })
                    .then(response => {
                        this.selectData = response.data.data;
                        console.log(response.data.data)
                    })
                    .catch((error) => {
                        alert('请求失败了哦')
                    })
            },
        },
        created() {
            this.getTableData();
        },
        components: {
            loongSelect
        }
    }
</script>

<style scoped>
  .select {
    width: 100%;
    height: calc(100% - 20px);
    margin-top: 20px;
    background-color: #ffffff;
  }
</style>
