<template>
  <div class="loong-select" :style="{width:selectWid}">
    <div ref="selectBox" :style="{height:selectHei,lineHeight:selectHei}" class="select-box fs14 c3"
         :class="[isShowList?'select-box-selected':'']" @click="selectBox()">
      <div class="select ellip" :title="[isTitle?chooseVal:'']">{{chooseVal}}</div>
      <div class="select-icon" :class="iconClass">
        <svg class="icon">
          <use xlink:href="#icon-xiajiantou"></use>
        </svg>
      </div>
    </div>
    <div ref="listBox" class="list-box" v-show="isShowList" :style="{top: parseInt(selectHei)+2+'px'}">
      <div class="select-search-box" v-show="allowSearch" :style="{height: selectHei,lineHeight: selectHei}">
        <input v-model="searchVal" class="select-search-input c9 fs12" autocomplete="off" placeholder="过滤搜索"
               @input="search()">
      </div>
      <ul class="option-list">
        <li v-for="(data,index) in selectDatas" :style="{height: selectHei,lineHeight: selectHei}" class="option ellip c6 fs12" v-show="data[selectVal]!=''"
            @click="selectedData(index)" :title="[isTitle?data[selectVal]:'']">
          <span :class="[isSelect[index]?'color-1188dd':'']">{{data[selectVal]}}</span>
          <div class="check" v-show="multi" :style="{height: selectHei,lineHeight: selectHei}">
            <svg class="icon" :class="[isSelect[index]?'color-1188dd':'']" aria-hidden="true">
              <use xlink:href="#icon-gou"></use>
            </svg>
          </div>
        </li>
        <li class="option ellip c9 fs14" style="text-align: center;padding-top: 10px"
            v-show="count==0||selectDatas.length==0">
          <span>无匹配数据</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "loongSelect",
        data() {
            return {
                isShowList: false,
                iconClass: '',
                selectDatas: [],
                chooseVal: '',
                searchVal: '',
                isSelect: [],
                selectArr: [],
                finSelectData: [],
                count: -1
            }
        },
        methods: {
            selectBox: function () {
                this.isShowList = !this.isShowList;
                this.iconClass = this.isShowList ? 'select-icon-rotate' : 'select-icon-rotate1';
            },
            // 点击其他地方下拉框关闭
            clickOther: function () {
                let selectBox = this.$refs.selectBox;
                let listBox = this.$refs.listBox;
                let isContainsSelect = selectBox.contains(event.target);
                let isContainsList = listBox.contains(event.target);
                if (!isContainsSelect && !isContainsList) {
                    if (this.isShowList) {
                        this.iconClass = 'select-icon-rotate1';
                    }
                    this.isShowList = false;
                }
            },
            // 搜索查询
            search: function () {
                this.selectDatas = [];
                let obj = {};
                this.count = -1;
                this.count++;
                for (let i in this.selectData) {
                    obj = {};
                    obj[this.selectVal] = "";
                    if (this.selectData[i][this.selectVal].indexOf(this.searchVal) != -1) {
                        this.count++;
                        obj[this.selectVal] = this.selectData[i][this.selectVal];
                        this.selectDatas[i] = obj;
                    } else {
                        this.selectDatas[i] = obj;
                    }
                }
                console.log(this.count)
            },
            // 是否选中数据
            selectedData: function (index) {
                this.chooseVal = '';
                this.finSelectData = [];
                if (this.multi) {
                    let indexOf = this.selectArr.indexOf(index);
                    if (indexOf == -1) {
                        this.selectArr.push(index);
                        this.isSelect[index] = true;
                    } else {
                        this.selectArr.splice(indexOf, 1);
                        this.isSelect[index] = false;
                    }
                    for (let i in this.selectArr) {
                        let item = this.selectDatas[this.selectArr[i]][this.selectVal];
                        if (this.selectArr.length - 1 != i) {
                            item = item + ',';
                        }
                        this.chooseVal = this.chooseVal + item;
                    }
                } else {
                    this.selectArr[0] = index;
                    this.chooseVal = this.selectDatas[this.selectArr[0]][this.selectVal];
                    for (let i in this.isSelect) {
                        this.isSelect[i] = false;
                    }
                    this.isSelect[index] = true;
                    this.isShowList = false
                }
                for (let i of this.selectArr) {
                    this.finSelectData.push(this.selectData[i])
                }
            }
        },
        mounted() {
            window.addEventListener("click", this.clickOther);
            this.selectDatas = [...this.selectData];
        },
        beforeDestroy() {
            window.removeEventListener('click', this.clickOther)
        },
        watch: {
            isShowList: function (newVal, oldVal) {
                if (newVal) {
                    this.searchVal = '';
                    this.selectDatas = [...this.selectData];
                    this.count = -1;
                } else {
                    this.$emit('finSelectData', this.finSelectData)
                }
            }
        },
        props: {
            selectWid: {
                default: '200px' // select宽度
            },
            selectHei: {
                default: '32px' // select高度
            },
            selectData: {}, // 下拉框数据
            selectVal: {
                default: 'value' // 下拉框数据键名
            },
            multi: {
                default: false // 是否为多选
            },
            allowSearch: {
                default: false // 是否允许搜索
            },
            isTitle: {
                default: false // 是否含有title
            }
        }
    }
</script>

<style scoped>
  .loong-select {
    position: relative;
  }

  .select-box {
    position: relative;
    border: 1px solid #CED4DA;
    border-radius: 2px;
    background-color: #fff;
    cursor: pointer;
  }

  .select-box-selected {
    border: 1px solid #1188dd;
  }

  .select {
    float: left;
    width: calc(100% - 41px);
    padding-left: 10px;
    height: 100%;
    border-right: 1px solid #F1F3F5;
    overflow: hidden;
    white-space: nowrap;
    color: #333;
    font-size: 12px;
  }

  .select-icon {
    float: left;
    width: 30px;
    height: 100%;
    text-align: center;
    font-size: 16px;
    color: #1188dd;
  }

  .list-box {
    position: absolute;
    z-index: 10001;
    min-width: 100%;
    max-width: 600px;
    background-color: #fff;
    box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .select-search-box {
    width: 100%;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
  }

  .select-search-input {
    float: left;
    width: calc(100% - 30px);
    padding-left: 10px;
    border: none !important;
    height: 100%;
    font-family: PingFangSC;
    background-color: #f8f9fa;
    outline: none;
  }

  .option-list {
    width: 100%;
    cursor: pointer;
    background-color: #fff;
    max-height: 185px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .option-list .option {
    position: relative;
    padding: 0px 20px 0px 10px;
    line-height: 32px;
  }

  .select-icon-rotate {
    animation: iconSelect .3s linear;
    transform: rotate(180deg);
  }

  .select-icon-rotate1 {
    animation: iconNotSelect .3s linear;
    transform: rotate(0deg);
  }

  @-webkit-keyframes iconSelect {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(180deg);
    }
  }

  @-webkit-keyframes iconNotSelect {
    0% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }

  .option-list .check {
    width: 32px;
    color: #fff;
    text-align: center;
    font-size: 14px;
    display: inline-block;
    position: absolute;
    right: 0;
  }
</style>
