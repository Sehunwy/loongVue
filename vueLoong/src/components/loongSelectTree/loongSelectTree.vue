<template>
  <div class="select-tree" :style="{width:treeWid}">
    <div class="select-box" ref="selectBox" :class="[isShowList?'select-box-selected':'']" @click="selectBox()">
      <div class="select">{{selectedValue}}</div>
      <div class="select-icon">
        <svg class="icon" :class="iconClass">
          <use xlink:href="#icon-xiajiantou"></use>
        </svg>
      </div>
    </div>
    <div class="list-box" ref="listBox" v-show="isShowList">
      <div class="select-search-box">
        <input class="select-search-input" placeholder="过滤搜索" v-model="searchVal" @keyup.enter="searchOption()">
        <div class="search-icon cursor-pointer" @click="searchOption()">
          <svg class="icon">
            <use xlink:href="#icon-sousu"></use>
          </svg>
        </div>
      </div>
      <ul class="option-list">
        <li class="option ellip c3 fs14" v-for="(data,index) in selectTreeData" @click="selectData(index)">
          <div :style="{paddingLeft: data.layer*10+'px'}"
               v-show="optionsShow[index].isShow">
            <div style="width: 14px;height: 14px" class="fl">
              <svg v-show="data.hasChild" class="icon collapable-icon" aria-hidden="true" @click.stop="isSpread(index)">
                <use :xlink:href="optionsShow[index].icon"></use>
              </svg>
            </div>
            <svg class="icon mr5" aria-hidden="true">
              <use xlink:href="#icon-bumen"></use>
            </svg>
            <span>{{data.data[treeVal]}}</span>
          </div>
        </li>
        <li class="option ellip c9 fs14" style="text-align: center;padding-top: 10px"
            v-show="count==0||selectTreeData.length==0">
          <span>无匹配数据</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "loongSelectTree",
        data() {
            return {
                isShowList: false,
                iconClass: '',
                selectTreeData: [],
                index: -1,
                optionsShow: [],
                layerArr: [],
                searchData: [],
                searchVal: '',
                isSearch: false,
                count: -1,
                selectedValue:''
            }
        },
        props: {
            treeWid: {
                default: '200px' // 搜索框宽度
            },
            treeData: {
                default: [] // 下拉框数据
            },
            treeVal: {
                default: 'value' // 下拉框数据键名
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
            setOptionData: function (data, parentId) {
                for (let i in data) {
                    parentId = parentId == undefined ? -1 : parentId;
                    this.index++;
                    this.layerNumber = parentId == -1 ? 0 : this.layerArr[parentId] + 1;
                    this.layerArr[this.index] = this.layerNumber;
                    this.selectTreeData.push({
                        id: this.index,
                        parentId: parentId,
                        data: data[i],
                        hasChild: data[i].children != undefined && data[i].children.length > 0 ? true : false,
                        layer: this.layerNumber
                    });
                    if (parentId == -1) {
                        this.searchData.push({
                            id: this.index,
                            parentId: -1,
                            data: data[i],
                        })
                    }
                    this.optionsShow.push({
                        isShow: parentId == -1 ? true : false,
                        parentId: parentId,
                        icon: '#icon-jiantouyou'
                    });
                    if (data[i].children != undefined && data[i].children.length > 0) {
                        this.setOptionData(data[i].children, this.index);
                    }
                }
            },
            // 是否展开子节点
            isSpread: function (index) {
                let parentId = this.selectTreeData[index].id;
                let show = false;
                for (let i in this.optionsShow) {
                    if (this.optionsShow[i].parentId == parentId) {
                        show = !this.optionsShow[i].isShow;
                    } else if (this.selectTreeData[index].parentId == -1 && this.optionsShow[i].parentId == -1) {
                        this.optionsShow[i].icon = '#icon-jiantouyou';
                    } else if (this.selectTreeData[index].parentId == -1) {
                        this.optionsShow[i].isShow = false;
                        this.optionsShow[i].icon = '#icon-jiantouyou';
                    }
                }
                this.recursiveShow(parentId, show, !show);
            },
            recursiveShow: function (parentId, show, isShowChild) {
                if (parentId != -1) {
                    this.optionsShow[parentId].icon = show ? '#icon-jiantouxia' : '#icon-jiantouyou';
                }
                for (let i in this.optionsShow) {
                    if (this.optionsShow[i].parentId == parentId) {
                        this.optionsShow[i].isShow = show;
                        if (isShowChild) {
                            this.recursiveShow(this.selectTreeData[i].id, show);
                        }
                    }
                }
            },
            searchOption: function () {
                this.isSearch = true;
                this.count = -1;
                this.count++;
                for (let i in this.searchData) {
                    if (this.searchData[i].data[this.treeVal].indexOf(this.searchVal) != -1) {
                        this.count++;
                        this.recursiveShow(this.searchData[i].id, true, true);
                        this.optionsShow[this.searchData[i].id].isShow = true;
                    } else {
                        this.recursiveShow(this.searchData[i].id, false, true);
                        this.optionsShow[this.searchData[i].id].isShow = false;
                    }
                }
            },
            initShow: function () {
                for (let show of this.optionsShow) {
                    if (show.parentId == -1) {
                        show.isShow = true;
                    } else {
                        show.isShow = false;
                    }
                }
            },
            selectData: function (index) {
                this.selectedValue = this.selectTreeData[index].data[this.treeVal];
                this.isShowList = false;
            },
            // 点击input重新打开select使箭头向右
            reopen: function () {
                for(let data of this.optionsShow) {
                    data.icon = '#icon-jiantouyou';
                }
            }
        },
        mounted() {
            window.addEventListener("click", this.clickOther);
        },
        beforeDestroy() {
            window.removeEventListener('click', this.clickOther)
        },
        watch: {
            treeData: function () {
                this.setOptionData(this.treeData);
            },
            isShowList: function (newVal, oldVal) {
                if (!newVal) {
                    this.searchVal = '';
                    this.count = -1;
                    this.reopen();
                    this.initShow();
                    console.log(this.optionsShow)
                }
            }
        }
    }
</script>

<style scoped>
  .select-tree {
    height: 32px;
    line-height: 32px;
    position: relative;
  }

  .select-box {
    height: 32px;
    line-height: 32px;
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

  .list-box {
    max-height: 185px;
    overflow: hidden;
    top: 34px;
    position: absolute;
    z-index: 10001;
    min-width: 100%;
    max-width: 600px;
    background-color: #fff;
    box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .select-search-box {
    height: 32px;
    line-height: 32px;
    width: 100%;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
  }

  .select-search-input {
    float: left;
    width: calc(100% - 40px);
    padding-left: 10px;
    border: none !important;
    height: 100%;
    color: #999;
    font-size: 12px;
    font-family: PingFangSC;
    background-color: #f8f9fa;
    outline: none;
  }

  .select-search-box .search-icon {
    float: left;
    width: 30px;
    height: 100%;
    text-align: center;
    font-size: 16px;
    color: #1188dd;
  }

  .option-list {
    width: 100%;
    cursor: pointer;
    background-color: #fff;
    max-height: 153px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .option-list .option {
    position: relative;
    padding: 0px 20px 0px 10px;
  }
</style>
