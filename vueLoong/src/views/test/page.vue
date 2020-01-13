<template>
  <div class="page">
    <loongPagination  :pageSize="pageSize" :pageNum="pageNum" :totalPage="totalPage" @pageInfo="pageInfo"></loongPagination>
  </div>
</template>

<script>
  import loongPagination from "@/components/loongPagination/loongPagination"
    export default {
        name: "page",
        data() {
            return {
                limits: [10,20,30,40,50],  // 可选每页显示条数
                pageSize: 20,  // 每页显示条数
                pageNum: 1,    // 当前页数
                totalPage: 10  // 总页数
            }
        },
        methods: {
            pageInfo: function (data) {
                console.log(data)
            }
        },
        components: {
            loongPagination
        }
    }
</script>

<style scoped>
.page {
  width: 100%;
  height: calc(100% - 20px);
  margin-top: 20px;
  background-color: #ffffff;
}
</style>
