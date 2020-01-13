<template>
  <div class="date">
    <loongDate :inputTime="new Date()" :dateType="dateType"></loongDate>
  </div>
</template>

<script>
    import loongDate from "@/components/loongDate/loongDate"

    export default {
        name: "dateTest",
        data() {
            return {
                width:'300px',
                dateType:'Datepickerfull'  // Datepickerfull 时间+日历表   Timepicker 时间   Datepicker 日历
            }
        },
        components: {
            loongDate
        }
    }
</script>

<style scoped>
  .date {
    width: 100%;
    height: calc(100% - 20px);
    background-color: #ffffff;
    margin-top: 20px;
  }
</style>
