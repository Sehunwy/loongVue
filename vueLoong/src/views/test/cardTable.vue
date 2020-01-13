<template>
  <div class="table-test">
    <div style="height: calc(100% - 60px)">
      <loongCardTable :cardTitle="cardTitle" :cardData="datas" :isMulti="isMulti"
                      @chooseData="chooseData"></loongCardTable>
    </div>
    <loongPagination :totalPage="totalPage" :limits="limits" :pageNum="pageNum"
                     :pageSize="pageSize" @pageInfo="getPageData"></loongPagination>
  </div>
</template>

<script>
    import loongCardTable from "@/components/loongCardTable/loongCardTable";
    import loongPagination from "@/components/loongPagination/loongPagination";
    import CIFS from "@/assets/img/service-CIFS.png"
    import FTP from "@/assets/img/service-FTP.png"
    import HTTP from "@/assets/img/service-HTTP.png"
    import NFS from "@/assets/img/service-NFS.png"

    export default {
        name: "cardTable",
        data() {
            return {
                pageSize: 20,
                pageNum: 1,
                datas: '',
                totalPage: 1,
                limits: [10, 20, 30, 40, 50, 60],
                isMulti: true, // 是否为多选
                cardTitle: [
                    {
                        name: "service",
                        title: "服务",
                        width: "200px",
                        formater: function (value) {
                            let type = NFS;
                            let backColor = '#656DFC';
                            if (value == 'CIFS') {
                                type = CIFS;
                                backColor = '#2C9DF0';
                            } else if (value == 'FTP') {
                                type = FTP;
                                backColor = '#5A90FD';
                            } else if (value == 'HTTP') {
                                type = HTTP;
                                backColor = '#33CAF1';
                            }
                            return '<div style="background-color: ' + backColor + ';position: absolute;width:100%;left:0px;height: 100%;"><img style="position: absolute;top: 10px;left: 10px" src="' + type + '"></div>';
                        }
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
                            "icon": "#icon-shezhi1",
                            "text": "扩容",
                            "callBack": function (data) {
                                console.log(data);
                            }
                        }, {
                            "icon": "#icon-kuaishebeidaxiao",
                            "text": "修改",
                            "callBack": function (data) {
                                console.log(data);
                            }
                        }]
                    }], // 表头内容
            }
        },
        methods: {
            getPageData: function (data) {
                console.log(data);
                this.pageSize = data.pageSize;
                this.pageNum = data.pageNum;
                this.getTableData();
            },
            getTableData: function () {
                this.$axios.get('http://13.15.11.34:3000/getlist', {
                    params: {
                        pageSize: this.pageSize,
                        pageNum: this.pageNum,
                    }
                })
                    .then(response => {
                        this.totalPage = response.data.totalPage;
                        this.datas = response.data.data;
                    })
                    .catch((error) => {
                        alert('请求失败了哦')
                    })
            },
            chooseData: function (data) {
                console.log(data)
            }
        },
        created() {
            this.getTableData();
        },
        components: {
            loongCardTable, loongPagination
        }
    }
</script>

<style scoped>
  .table-test {
    width: 100%;
    height: calc(100% - 20px);
    margin-top: 20px;
    background-color: #FFFFFF;
  }
</style>
