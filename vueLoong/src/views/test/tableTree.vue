<template>
  <div class="table">
    <div style="height: calc(100% - 100px)">
      <loongTableTree :tableTitle="tableTitle" :tableData="datas" :isSpread="isSpread" :hasCheckbox="hasCheckbox"
                      :rowSelect="rowSelect" :minWid="minWid" :isTree="isTree"
                      @chooseData="chooseData"></loongTableTree>
    </div>
    <div>
      <loongPagination :totalPage="totalPage" :limits="limits" :pageNum="pageNum"
                       :pageSize="pageSize" @pageInfo="getPageData"></loongPagination>
    </div>
  </div>
</template>

<script>
    import loongTableTree from '@/components/loongTableTree/loongTableTree'
    import loongPagination from "@/components/loongPagination/loongPagination"
    import axios from 'axios'

    export default {
        name: "tableTree",
        data() {
            return {
                pageSize: 10,
                pageNum: 1,
                datas: '',
                totalPage: 1,
                limits: [10, 20, 30, 40, 50, 60],
                minWid: '960px', // 表格最小宽度
                rowSelect: false,  // 是否可根据行选中
                isSpread: false,  // 初始是否展开
                hasCheckbox: true,  // 是否有多选框
                isTree: false,  // 是否为树形结构
                tableTitle: [
                    {
                        name: 'blkId',
                        title: 'id',
                        width: '250px',
                        formater: function (value) {
                            return '<span class="c9 fs14" style="margin-right: 5px"><svg class="icon" aria-hidden="true">\n' +
                                '    <use xlink:href="#icon-bumen"></use>\n' +
                                '</svg></span><span>' + value + '</span>';
                        }
                    },
                    {
                        name: 'name',
                        title: '名称',
                        overflowEllipsis : true
                    },
                    {
                        name: 'status',
                        title: '状态',
                    },
                    {
                        name: 'ctime',
                        title: '创建时间',
                        formater: 'dateFormat',
                        pattern: "Y-M-D h:m:s"
                    },
                    {
                        name: "operation",
                        title: "操作",
                        type: "button",
                        width: '100px',
                        operations: [{
                            icon: "#icon-kelong",
                            text: "扩容",
                            callBack: function (data) {
                                console.log(data);
                            }
                        }, {
                            icon: "#icon-rongliangguanli",
                            text: "修改",
                            callBack: function (data) {
                                console.log(data);
                            }
                        }]
                    }
                ] // table 表头
            }
        },
        methods: {
            getPageData: function (data) {
                console.log(data);
                this.pageSize = data.pageSize;
                this.pageNum = data.pageNum;
                this.getTableData();
            },
            chooseData: function (data) {
                console.log(data)
            },
            getTableData: function () {
                this.isRequest = false;
                axios.get('http://13.15.11.34:3000/getTree', {
                    params: {
                        pageSize: this.pageSize,
                        pageNum: this.pageNum,
                    }
                })
                    .then(response => {
                        this.totalPage = response.data.totalPage;
                        this.datas = response.data.data;
                        this.totalPage = response.data.totalPage;
                        console.log(response.data)
                    })
                    .catch((error) => {
                        alert('请求失败了哦')
                    })
            }
        },
        components: {
            loongTableTree, loongPagination
        },
        created() {
            this.getTableData();
        }
    }
</script>

<style scoped>
  .table {
    width: 100%;
    height: calc(100% - 20px);
    margin-top: 20px;
    background-color: #ffffff;
  }
</style>
