<template>
  <div class="table">
    <button @click="refreshAlarm()" class="button-common confirm-button">刷新</button>
    <div style="height: calc(100% - 100px)">
      <loongTable :titleData="title" :data="datas"></loongTable>
    </div>

    <loongPagination v-if="isRequest&&isFlow=='page'" :totalPage="totalPage" :limits="limits" :pageNum="pageNum"
                     :pageSize="pageSize" @pageInfo="getPageData"></loongPagination>
  </div>
</template>

<script>
    import loongPagination from "@/components/loongPagination/loongPagination"
    import loongTable from "@/components/loongTable/loongTable"
    import axios from 'axios'

    export default {
        name: "tableTest",
        data() {
            return {
                title: [
                    {
                        name: "service",
                        title: "服务",
                        width: "200px",
                    },
                    {
                        name: "name",
                        title: "组名",
                        width: "200px"
                    },
                    {
                        name: "domain",
                        title: "域名",
                        width: ""
                    },
                    {
                        name: "autoFailover",
                        title: "故障切换策略",
                        width: "201px"
                    },
                    {
                        name: "ctime",
                        title: "修改时间",
                        formater: 'dateFormat',
                        pattern: "Y-M-D h:m:s"
                    },
                    {
                        name: "ctime",
                        title: "修改时间",
                        formater: function (value, type) {
                            let d = new Date(parseInt(value));
                            let Y = d.getFullYear();
                            let M = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
                            let date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
                            let hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
                            let minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
                            let second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
                            if (type == '年月日' || type == 1) {
                                return Y + "年" + M + "月" + date + "日";
                            }
                            if (type == 'Y-M-D' || type == 2) {
                                return Y + "-" + M + "-" + date;
                            }
                            if (type == 'Y.M.D' || type == 3) {
                                return Y + "." + M + "." + date;
                            }
                            if (type == 'Y/M/D' || type == 4) {
                                return Y + "/" + M + "/" + date;
                            }
                            if (type == '年月日 时分秒' || type == 5) {
                                return Y + "年" + M + "月" + date + "日 " + hour + ":" + minute + ":" + second;
                            }
                            if (type == 'Y-M-D h:m:s' || type == 6) {
                                return Y + "-" + M + "-" + date + " " + hour + ":" + minute + ":" + second;
                            }
                            if (type == 'Y.M.D h:m:s' || type == 7) {
                                return Y + "." + M + "." + date + " " + hour + ":" + minute + ":" + second;
                            }
                            if (type == 'Y/M/D h:m:s' || type == 8) {
                                return Y + "/" + M + "/" + date + " " + hour + ":" + minute + ":" + second;
                            }
                            if (type == '年月日 时分' || type == 9) {
                                return Y + "年" + M + "月" + date + "日 " + hour + ":" + minute;
                            }
                            if (type == 'Y-M-D h:m' || type == 10) {
                                return Y + "-" + M + "-" + date + " " + hour + ":" + minute;
                            }
                            if (type == 'Y.M.D h:m' || type == 11) {
                                return Y + "." + M + "." + date + " " + hour + ":" + minute;
                            }
                            if (type == 'Y/M/D h:m' || type == 12) {
                                return Y + "/" + M + "/" + date + " " + hour + ":" + minute;
                            }
                            return value;
                        },
                        pattern: "Y-M-D h:m:s"
                    },
                    {
                        "name": "operation",
                        "title": "操作",
                        "type": "button",
                        "width": '100px',
                        "operations": [{
                            "icon": "#icon-rilizuo",
                            "text": "扩容",
                            "callBack": function (data) {
                                console.log(data);
                            }
                        }, {
                            "icon": "#icon-rilizuo",
                            "text": "修改",
                            "callBack": function (data) {
                                console.log(data);
                            }
                        }, {
                            "icon": "#icon-rilizuo",
                            "text": "test",
                            "callBack": function (data,) {
                                console.log(data);
                                alert("ssss");
                            }
                        }]
                    }], // 表头内容
                datas: [],    // 表内容
                chooseWay: 'checkbox',  // checkbox 多选   radio 单选
                selectWay: "row", // row 行选中   selectBox check选框选中
                selectDatas: [],   // 选中的数据
                tableHei: "42px",  // table行高
                isFlow: "page", // flow 流加载  page 分页加载,
                refresh: false, // 是否刷新
                hasMemory: true,
                pageSize: 20,
                pageNum: 1,
                totalPage: 1,
                limits: [10, 20, 30, 40, 50, 60],
                isRequest: false, // 数据是否请求完
            }
        },
        methods: {
            getData: function (data) {
                this.selectDatas = data;
                console.log(data);
                this.refresh = false;
            },
            refreshAlarm: function () {
                this.pageNum = 1;
                this.refresh = true;
                this.getTableData();
            },
            getTableData: function () {
                this.isRequest = false;
                axios.get('http://13.15.11.34:3000/getlist', {
                    params: {
                        pageSize: this.pageSize,
                        pageNum: this.pageNum,
                    }
                })
                    .then(response => {
                        this.totalPage = response.data.totalPage;
                        this.datas = response.data.data;
                        this.isRequest = true;
                        // this.refresh = false
                    })
                    .catch((error) => {
                        alert('请求失败了哦')
                    })
            },
            getPageData: function (data) {
                this.pageSize = data.pageSize;
                this.pageNum = data.pageNum;
            }
        },
        created() {
            this.getTableData();
        },
        watch: {
            pageSize: function (newVal, oldVal) {
                this.getTableData();
            },
            pageNum: function (newVal, oldVal) {
                this.getTableData();
            }
        },
        components: {
            loongPagination, loongTable
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
