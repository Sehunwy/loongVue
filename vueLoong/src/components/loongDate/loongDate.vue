<template>
  <div class="loong-date" ref="loongDate">
    <div style="display:inline-block;position:relative;">
      <input v-model="inputVal" type="text" class="date-input" ref="dateInput" :input="search()" @click="getCurrTime()"
             :style="{width:inputWid}">
      <span class="clear-date" @click="clearInput()" v-show="isClose">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-guanbi2"></use>
        </svg>
      </span>
      <div class="date-table">
        <div v-show="showCalendar" class="date-calendar">
          <div class="calendar-head">
            <div class="calendar-year cursor-pointer pt10">
              <div class="prev icon-btn" @click="preMonth()">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-rilizuo"></use>
                </svg>
              </div>
              <div class="header-month-year" @click="showMonthTable()">
                {{calMonth}}月&nbsp;&nbsp;&nbsp;{{calYear}}
              </div>
              <div class="next icon-btn" @click="nextMonth()">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-riliyou"></use>
                </svg>
              </div>
            </div>
            <div class="calendar-week">
              <div class="week" v-for="day in weeksTitle">{{day}}</div>
            </div>
          </div>
          <div class="calendar-body">
            <div class="calendar-day" v-for="count1 in calendarArr.length">
              <div class="day cursor-pointer" v-for="count2 in calendarArr[count1-1].length"
                   :class="[calendarArr[count1-1][count2-1].classDay,calendarArr[count1-1][count2-1].currDay?'curr-day':'',selectDay[count1-1][count2-1]?'day-select':'']"
                   @click="getCurrClickDate(count1-1,count2-1)">
                {{calendarArr[count1-1][count2-1].day}}
              </div>
            </div>
          </div>
        </div>
        <div v-show="showTime" class="date-time-split"></div>
        <div v-show="showTime" class="date-time">
          <div class="time-hours">
            <div class="sel-select" :class="[hourDis?'sel-select-active':'']" @click="disInit('hourDis')">
              {{calHour}}
            </div>
            <div v-show="hourDis" class="sel-option">
              <div class="sel-option-item" v-for="count in 24" @click="getSelectTime('calHour',count-1)">{{count-1}}
              </div>
            </div>
          </div>
          <div class="split-hour-minute">:</div>
          <div class="time-minute">
            <div class="sel-select" :class="[minuteDis?'sel-select-active':'']" @click="disInit('minuteDis')">
              {{calMinute}}
            </div>
            <div v-show="minuteDis" class="sel-option">
              <div class="sel-option-item" v-for="count in 60" @click="getSelectTime('calMinute',count-1)">{{count-1}}
              </div>
            </div>
          </div>
          <div class="split-hour-minute">:</div>
          <div class="time-second">
            <div class="sel-select" :class="[secondDis?'sel-select-active':'']" @click="disInit('secondDis')">
              {{calSecond}}
            </div>
            <div v-show="secondDis" class="sel-option">
              <div class="sel-option-item" v-for="count in 60" @click="getSelectTime('calSecond',count-1)">{{count-1}}
              </div>
            </div>
          </div>
          <div class="confirm-btn" @click="confirmTime()">
            <svg class="icon confirm-icon">
              <use xlink:href="#icon-rizhijieguodui"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="year-month-table" v-show="showMonth">
        <div class="year-month-calendar">
          <div class="year-month-head cursor-pointer">
            <div class="prev year-month-btn">
              <div @click="calYear--">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-rilizuo"></use>
                </svg>
              </div>
            </div>
            <div class="header-year" @click="showCalTable()">
              {{calYear}}
            </div>
            <div class="year-month-next year-month-btn">
              <div @click="calYear++">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-riliyou"></use>
                </svg>
              </div>
            </div>
          </div>
          <div class="year-month-body">
            <div class="month-row" v-for="count1 in 3">
              <div class="month-td cursor-pointer" v-for="count2 in 4" @click="choseMonth((count1-1)*4+count2)">
                {{(count1-1)*4+count2}}月
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {formatDate} from '@/assets/js/formatDate'

    export default {
        name: "loongDate",
        data() {
            return {
                inputVal: "2018-1-10 12:12:12",
                inputFin: '',
                hourDis: false,  // 选择小时下拉是否显示
                minuteDis: false,  // 选择分钟下拉是否显示
                secondDis: false,  // 选择秒下拉是否显示
                showCalendar: false,
                showTime: false,
                showMonth: false,
                isClose: false, // 是否显示清除按钮
                calYear: '',
                calMonth: '',
                calDay: '',
                calHour: '',
                calMinute: '',
                calSecond: '',
                weeksTitle: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                weeks: [7, 1, 2, 3, 4, 5, 6],
                calendarArr: [[]],
                selectDay: [[]],
                selectCoord: [-1, -1], // [上一个x,上一个y]
                nowYear: '',
                nowMonth: '',
                nowDay: ''
            }
        },
        props: {
            inputWid: {
                default: '300px'
            }, // input宽度
            dateType: {
                default: 'Datepickerfull'
            }, // Datepickerfull 时间+日历表   Timepicker 时间   Datepicker 日历
            inputTime: {
                default: ''
            }
        },
        methods: {
            initArr: function () {
                for (let i = 0; i < 6; i++) {
                    this.calendarArr[i] = [];
                    this.selectDay[i] = [];
                }
            },
            clearInput: function () {
                this.inputFin = "";
                this.showCalendar = false;
                this.showTime = false;
                this.showMonth = false;
                this.isClose = false;
                this.$emit('getTimeStamp', '');
            },
            search: function () {
                this.inputVal = this.inputFin;
            },
            getCurrTime: function () {
                this.hourDis = false;
                this.minuteDis = false;
                this.secondDis = false;
                this.showCalendar = false;
                this.showTime = false;
                this.showMonth = false;
                this.isClose = true;
                let date;
                if (this.inputVal != "") {
                    if (this.dateType == 'Timepicker') {
                        this.inputVal = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + " " + this.inputVal;
                    }
                    date = new Date(this.inputVal)
                } else {
                    date = new Date();
                }
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let hour = date.getHours();
                let minute = date.getMinutes();
                let second = date.getSeconds();
                if (this.dateType == 'Datepickerfull') {
                    this.showCalendar = true;
                    this.showTime = true;
                } else if (this.dateType == 'Timepicker') {
                    this.showTime = true;
                } else {
                    this.showCalendar = true;
                }
                this.calYear = year;
                this.calMonth = month;
                this.calDay = day;
                this.calHour = hour;
                this.calMinute = minute;
                this.calSecond = second;
                if (this.inputFin == "") {
                    this.setCalendar(new Date());
                } else {
                    this.setCalendar(this.inputFin);
                }
            },
            getSelectTime: function (type, count) {
                this[type] = count;
                this.hourDis = false;
                this.minuteDis = false;
                this.secondDis = false;
            },
            // 确认选中的时间
            confirmTime: function () {
                this.calYear = this.nowYear;
                this.calMonth = this.nowMonth;
                this.calDay = this.nowDay;
                let month = this.calMonth < 10 ? "0" + this.calMonth : this.calMonth;
                let day = this.calDay < 10 ? "0" + this.calDay : this.calDay;
                let hour = this.calHour < 10 ? "0" + this.calHour : this.calHour;
                let minute = this.calMinute < 10 ? "0" + this.calMinute : this.calMinute;
                let second = this.calSecond < 10 ? "0" + this.calSecond : this.calSecond;
                if (this.dateType == 'Datepickerfull') {
                    this.inputVal = this.calYear + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
                } else if (this.dateType == 'Timepicker') {
                    this.inputVal = hour + ':' + minute + ':' + second;
                } else {
                    this.inputVal = this.calYear + '-' + month + '-' + day;
                }
                let d = this.calYear + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
                let date = new Date(d);
                this.inputFin = this.inputVal;
                this.showCalendar = false;
                this.showTime = false;
                this.showMonth = false;
                this.isClose = false;
                this.$emit('getTimeStamp', Date.parse(date));
            },
            disInit: function (dis) {
                this.hourDis = false;
                this.minuteDis = false;
                this.secondDis = false;
                this[dis] = true;
            },
            // 创建日期表
            setCalendar: function (date) {
                let date1 = this.calYear + '-' + this.calMonth + '-1';
                let count = 0;
                let week = this.weeks[new Date(date1).getDay()];
                let currDay = (new Date(this.calYear, this.calMonth, 0)).getDate();//获得当前月的天数
                let lastMonth = this.calMonth - 1; // 上一月月份
                let lastYear = this.calYear;  // 上一月年份
                let nextMonth = this.calMonth + 1;
                let nextYear = this.calYear;
                let classDay = "";
                let year = this.calYear;
                let month = this.calMonth;
                if (lastMonth == 0) {
                    lastYear = lastYear - 1;
                    lastMonth = 12;
                }
                if (nextMonth == 13) {
                    nextMonth = 1;
                    nextYear = nextYear + 1;
                }
                let lastDay = (new Date(lastYear, lastMonth, 0)).getDate();//获得上一月月的天数
                if (week == 7) {
                    week = 0;
                }
                for (let i = week - 1; i >= 0; i--) {
                    classDay = 'c9';
                    this.calendarArr[0][i] = {
                        year: lastYear,
                        month: lastMonth,
                        day: lastDay,
                        classDay: classDay,
                        currDay: this.isCurrDate(lastYear, lastMonth, lastDay, new Date())
                    }; //上个月坐标
                    this.selectDay[0][i] = false;
                    this.selectDay[0][i] = this.isCurrDate(lastYear, lastMonth, lastDay, date);  // 日期是否选中
                    if (this.selectDay[0][i]) {
                        this.selectCoord[0] = 0;
                        this.selectCoord[1] = i;
                    }  // 选中日期坐标
                    lastDay--;
                }
                for (let i = week; i < 7; i++) {
                    count++;
                    classDay = '';
                    this.calendarArr[0][i] = {
                        year: year,
                        month: month,
                        day: count,
                        classDay: classDay,
                        currDay: this.isCurrDate(year, month, count, new Date())
                    };  // 当月第一行日期坐标
                    this.selectDay[0][i] = false;
                    this.selectDay[0][i] = this.isCurrDate(year, month, count, date);
                    if (this.selectDay[0][i]) {
                        this.selectCoord[0] = 0;
                        this.selectCoord[1] = i;
                    }
                }
                for (let i = 1; i < 6; i++) {
                    for (let j = 0; j < 7; j++) {
                        count++;
                        if (count > currDay) {
                            count = 1;  // 下个月
                            classDay = 'c9';
                            year = nextYear;
                            month = nextMonth;
                        }
                        this.calendarArr[i][j] = {
                            year: year,
                            month: month,
                            day: count,
                            classDay: classDay,
                            currDay: this.isCurrDate(year, month, count, new Date())
                        };
                        this.selectDay[i][j] = false;
                        this.selectDay[i][j] = this.isCurrDate(year, month, count, date);
                        if (this.selectDay[i][j]) {
                            this.selectCoord[0] = i;
                            this.selectCoord[1] = j;
                        }
                    }
                }
            },
            // 判断是否为当前日期
            isCurrDate: function (year, month, day, date) {
                // 获得当前日期
                let dateCurr = new Date(date);
                let yearCurr = dateCurr.getFullYear();
                let monthCurr = dateCurr.getMonth() + 1;
                let dayCurr = dateCurr.getDate();
                if (yearCurr == year && monthCurr == month && dayCurr == day)
                    return true;
                else
                    return false;
            },
            // 得到当前点击的日期
            getCurrClickDate: function (x, y) {
                this.$set(this.selectDay[this.selectCoord[0]], this.selectCoord[1], false);
                this.$set(this.selectDay[x], y, true);
                this.selectDay.push();
                this.selectCoord[0] = x;
                this.selectCoord[1] = y;
                this.nowYear = this.calendarArr[x][y].year;
                this.nowMonth = this.calendarArr[x][y].month;
                this.nowDay = this.calendarArr[x][y].day;
                if (this.dateType == 'Datepicker') {
                    this.confirmTime();
                }
            },
            // 点击显示日历月份表
            showMonthTable: function () {
                this.showCalendar = false;
                this.showTime = false;
                this.showMonth = true;
            },
            // 点击显示日历表
            showCalTable: function () {
                this.hourDis = false;
                this.minuteDis = false;
                this.secondDis = false;
                this.showCalendar = false;
                this.showTime = false;
                this.showMonth = false;
                this.showMonth = false;
                if (this.dateType == 'Datepickerfull') {
                    this.showCalendar = true;
                    this.showTime = true;
                } else if (this.dateType == 'Datepicker') {
                    this.showCalendar = true;
                } else {
                    this.showTime = true;
                }
            },
            // 根据年份选中月份
            choseMonth: function (month) {
                this.calMonth = month;
                this.showMonth = false;
                if (this.dateType == 'Datepickerfull') {
                    this.showCalendar = true;
                    this.showTime = true;
                } else if (this.dateType == 'Timepicker') {
                    this.showTime = true;
                } else {
                    this.showCalendar = true;
                }
                if (this.inputFin == "") {
                    this.setCalendar(new Date());
                } else {
                    this.setCalendar(this.inputFin);
                }
            },
            // 点击月份减一
            preMonth: function () {
                this.calMonth--;
                if (this.calMonth == 0) {
                    this.calMonth = 12;
                    this.calYear--;
                }
                if (this.inputFin == "") {
                    this.setCalendar(new Date());
                } else {
                    this.setCalendar(this.inputFin);
                }
            },
            // 点击月份加一
            nextMonth: function () {
                this.calMonth = this.calMonth + 1;
                if (this.calMonth == 13) {
                    this.calMonth = 1;
                    this.calYear++;
                }
                if (this.inputFin == "") {
                    this.setCalendar(new Date());
                } else {
                    this.setCalendar(this.inputFin);
                }
            },
            // 数据框初始数据
            inputInit: function () {
                let d = Date.parse(new Date(this.inputTime));
                this.$emit('getTimeStamp', d);
                if (this.inputTime != '') {
                    let date = this.inputTime;
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1 < 10 ? "0" + date.getMonth() + 1 : date.getMonth() + 1;
                    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                    let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                    let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                    if (this.dateType == 'Datepickerfull') {
                        this.inputFin = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
                    } else if (this.dateType == 'Datepicker') {
                        this.inputFin = year + '-' + month + '-' + day;
                    } else {
                        this.inputFin = hour + ':' + minute + ':' + second;
                    }
                    this.nowYear = year;
                    this.nowMonth = month;
                    this.nowDay = day;
                }
            },
            closeAll: function () {
                let loongDate = this.$refs.loongDate;
                let isContainsDate = loongDate.contains(event.target);
                if (!isContainsDate) {
                    this.showCalendar = false;
                    this.showTime = false;
                    this.showMonth = false;
                    this.isClose = false;
                }
            }
        },
        created() {
            this.initArr();
            this.inputInit();
        },
        mounted() {
            window.addEventListener("click", this.closeAll);
        },
        beforeDestroy() {
            window.removeEventListener('click', this.closeAll)
        },
    }
</script>

<style scoped>
  .date-input {
    padding-left: 10px;
    border-radius: 2px;
    border: 1px solid rgba(206, 212, 218, 1);
    outline: none;
    height: 32px;
    line-height: 32px;
    box-sizing: border-box;
    font-size: 12px;
    min-width: 180px;
    background: rgba(255, 255, 255, 1);
  }

  .date-input:hover {
    border: 1px solid #1188DD;
  }

  .clear-date {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 997;
    display: inline-block;
    width: 30px;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    text-align: center;
    font-size: 16px;
    color: #CED4DA;
  }

  .date-table {
    position: absolute;
    z-index: 999;
    padding: 0 5px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.19);
    border-radius: 1px;
  }

  .date-calendar {
    width: 271px;
    text-align: center;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    margin-bottom: 10px;
  }

  .calendar-year {
    display: flex;
    flex-direction: row;
  }

  .icon-btn {
    margin-left: 4px;
    padding-top: 2px;
    width: 30px;
    height: 28px;
    border-radius: 2px;
    color: #1188DD;
  }

  .icon-btn:hover {
    color: #22A7F0;
  }

  .header-month-year {
    width: 188px;
    height: 28px;
    margin-left: 3px;
    font-size: 12px;
    font-weight: bold;
    font-family: PingFangSC-Medium;
    line-height: 28px;
    text-align: center;
    color: rgba(51, 51, 51, 1);
    background: rgba(238, 247, 255, 1);
    border-radius: 2px;
  }

  .header-month-year:hover {
    background: rgba(221, 238, 255, 1);
  }

  .calendar-week {
    display: flex;
    flex-direction: row;
    font-weight: bold;
  }

  .week {
    color: #666666;
    padding: 8px 3px;
    width: 33px;
  }

  .calendar-day {
    display: flex;
    flex-direction: row;
    color: #333333;
    text-align: center;
    font-size: 12px;
    font-family: MicrosoftYaHei;
  }

  .day {
    display: block;
    height: 24px;
    width: 37px;
    text-align: center;
    line-height: 24px;
    margin-left: 2px;
    margin-top: 1px;
  }

  .day-select {
    background-color: #1188DD !important;
    color: #FFF !important;
    border-radius: 2px;
  }

  .curr-day {
    color: #22A7F0;
  }

  .date-time-split {
    height: 1px;
    width: 100%;
    background-color: rgb(238, 238, 238);
  }

  .date-time {
    width: 266px;
    height: 50px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    padding-left: 5px;
  }

  .time-hours {
    color: #1455a2;
    position: relative;
  }

  .time-minute {
    color: #1455a2;
    position: relative;
  }

  .time-second {
    color: #1455a2;
    position: relative;
  }

  .sel-select {
    width: 51px;
    height: 30px;
    line-height: 30px;
    color: rgba(51, 51, 51, 1);
    border-radius: 2px;
    padding-left: 10px;
    border: 1px solid rgba(206, 212, 218, 1);
  }

  .sel-select-active {
    border: 1px solid rgba(17, 136, 221, 1);
  }

  .sel-option {
    position: absolute;
    top: 32px;
    z-index: 999;
    width: 63px;
    height: 110px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 1px;
    overflow: auto;
  }

  .sel-option-item {
    height: 22px;
    line-height: 22px;
    padding-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    cursor: pointer;
  }

  .sel-option-item:hover {
    color: rgba(17, 136, 221, 1);
  }

  .split-hour-minute {
    margin: 0 6px;
    font-size: 12px;
    line-height: 30px;
    height: 32px;
  }

  .confirm-btn {
    width: 36px;
    height: 32px;
    color: #1188DD;
    font-size: 12px;
    cursor: pointer;
    margin-left: 10px;
    background: rgba(238, 247, 255, 1);
    border-radius: 2px;
    text-align: center;
    line-height: 32px;
  }

  .confirm-btn:hover {
    background: rgba(221, 238, 255, 1);
  }

  .confirm-icon {
    width: 16px;
    height: 16px;
  }

  .confirm-icon {
    width: 16px;
    height: 16px;
  }

  .year-month-table {
    position: absolute;
    z-index: 999;
    padding: 0 5px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.19);
    border-radius: 1px;
  }

  .year-month-calendar {
    width: 200px;
    position: relative;
    padding: 0;
    margin-bottom: 10px;
    z-index: 4;
    color: #333333;
    text-align: center;
    background-color: #FFF;
    font-size: 12px;
    font-family: MicrosoftYaHei;
  }

  .year-month-head {
    display: flex;
    flex-direction: row;
    padding: 10px 0;
  }

  .year-month-btn {
    width: 50px;
    height: 28px;
    border-radius: 2px;
    color: #1188DD;
  }

  .year-month-btn:hover {
    background: rgba(248, 249, 250, 1);
  }

  .year-month-btn div {
    margin-left: 0px;
    padding-top: 2px;
    width: 30px;
    height: 28px;
    border-radius: 2px;
    text-align: center;
  }

  .year-month-btn svg {
    width: 18px;
    height: 24px;
    color: #1188DD;
  }

  .year-month-next div {
    float: right;
  }

  .header-year {
    height: 28px;
    width: 120px;
    text-align: center;
    font-size: 12px;
    font-family: PingFangSC-Medium;
    line-height: 28px;
    color: rgba(51, 51, 51, 1);
    background: rgba(238, 247, 255, 1);
    border-radius: 2px;
    font-weight: bold;
  }

  .header-year:hover {
    background: rgba(221, 238, 255, 1);
  }

  .month-row {
    display: flex;
    flex-direction: row;
  }

  .month-td {
    width: 25%;
    height: 26px;
    text-align: center;
  }
</style>
