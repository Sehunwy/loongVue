<template>
  <div class="table-tree">
    <div class="table">
      <div class="table-header" :style="{minWidth: minWid}">
        <div class="table-row header-row fs14 c3" ref="headerRow">
          <div v-for="(title,index) in tableTitle" :class="[index!=(tableTitle.length-1)?'borRight':'']"
               class="row-details c9 fs12" :style="{width:dataWid[index]+'px'}">
            <div class="fs14 iconCheck fl" v-show="index==0&&!isTree">
              <div style="width: 14px;margin-right: 5px" v-show="hasCheckbox">
                <div class="table-checkbox" :class="[isSelectAllShow?'select-checkbox':'']"
                     @click.stop="checkBoxAllShow()">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gou"></use>
                  </svg>
                </div>
              </div>
            </div>
            {{title.title}}
          </div>
        </div>
      </div>
      <div class="table-body" ref="bodyRef" :style="{minWidth: minWid}">
        <div ref="tableBody">
          <div class="body-row" v-for="(data,dataIn) in dataFin" :class="showClass[dataIn]"
               v-show="isShowRow[dataIn].show"
               @click="rowClick(dataIn)">
            <div v-for="(title,index) in tableTitle" :class="[index!=(tableTitle.length-1)?'borRight':'']"
                 class="row-details c3 fs12"
                 :style="{width:dataWid[index]+'px'}">
              <div class="fs14 iconCheck" v-show="index==0" :style="{paddingLeft:data.layerNumber*30+'px'}">
                <div style="width: 14px;margin-right: 5px" v-show="!isSpread&&isTree">
                  <span v-show="data.hasChild" style="color: rgb(51,51,51)" class="cursor-pointer"
                        @click.stop="spreadRow(dataIn)">
                    <svg class="icon" aria-hidden="true">
                      <use :xlink:href='"#"+isShowRow[dataIn].icon'></use>
                    </svg>
                  </span>
                </div>
                <div style="width: 14px;margin-right: 5px" v-show="hasCheckbox">
                  <div class="table-checkbox" :class="[isSelect[dataIn]?'select-checkbox':'']"
                       @click.stop="checkBoxShow(dataIn)">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-gou"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div v-if="title.type=='button'">
                <span class="fs16 color-1188dd cursor-pointer" :title="icon.text" style="margin-right: 5px"
                      v-for="icon in title.operations" @click="icon.callBack(rowData[dataIn])">
                  <svg class="icon" aria-hidden="true">
                      <use :xlink:href='icon.icon'></use>
                  </svg>
                </span>
              </div>
              <div v-else v-html="$options.filters.formater(data[title.name],title.formater,title.pattern)"
                   :class="[title.overflowEllipsis?'ellip':'newline']"
                   :title="title.overflowEllipsis?$options.filters.formater(data[title.name],title.formater,title.pattern):''">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {formatDate} from '@/assets/js/formatDate'  //引入时间格式化js

    export default {
        name: "loongTableTree",
        data() {
            return {
                dataWid: [],
                notWid: [],
                setWid: 0,
                count: 0,
                index: 0,
                dataFin: [],
                layerNumber: 0,
                layerArr: [],
                isShowRow: [],
                isSelect: [],
                isFT: [],
                chooseData: [],
                finChooseData: [],
                rowData: [],
                difference: '',
                callData: [],
                showClass: [],
                isSelectAllShow: false
            }
        },
        methods: {
            getWid: function () {
                for (let i in this.tableTitle) {
                    if (this.tableTitle[i].width != '' && this.tableTitle[i].width != undefined) {
                        this.setWid = this.setWid + parseInt(this.tableTitle[i].width);
                        this.dataWid[i] = parseInt(this.tableTitle[i].width) - 31;
                    } else {
                        this.count++;
                        this.notWid.push(i)
                    }
                }
            },
            getRemainWid: function (currentWidth, difference) {
                this.difference = difference;
                let remainWid = (currentWidth - this.setWid) / this.count - 31;
                for (let index of this.notWid) {
                    this.$set(this.dataWid, index, remainWid);
                }
                console.log(difference)
                this.$set(this.dataWid, this.dataWid.length - 2, remainWid - difference);
            },
            setTree: function (tableData, parentId) {
                for (let i in tableData) {
                    this.index++;
                    this.layerNumber = parentId == -1 ? 0 : this.layerArr[parentId] + 1;
                    this.layerArr[this.index] = this.layerNumber;
                    let hasChild = tableData[i].children.length != 0 && tableData[i].children != undefined;
                    let obj = {
                        id: this.index,
                        parentId: parentId,
                        hasChild: hasChild,
                        layerNumber: this.layerNumber
                    };
                    let obj2 = {};
                    for (let title of this.tableTitle) {
                        obj[title.name] = tableData[i][title.name];
                        obj2[title.name] = tableData[i][title.name];
                    }
                    this.dataFin.push(obj);
                    this.rowData.push(obj2)
                    if (this.isSpread) {
                        this.isShowRow.push({show: true})
                    } else {
                        this.isShowRow.push(
                            {
                                show: parentId == -1 ? true : false,
                                icon: 'icon-jiantouyou'
                            }
                        )
                    }
                    if (hasChild && this.isTree) {
                        this.setTree(tableData[i].children, this.index);
                    }
                }
            },
            spreadRow: function (index) {
                let isShow = false;
                for (let i in this.dataFin) {
                    if (this.dataFin[i].parentId == (index + 1)) {
                        this.isShowRow[i].show = !this.isShowRow[i].show;
                        isShow = this.isShowRow[i].show;
                    }
                }
                if (!isShow) {
                    this.setFalse(index + 1)
                }
                this.isShowRow[index].icon = isShow ? 'icon-jiantouxia' : 'icon-jiantouyou';
                this.setBodyWid();
                this.setShowClass();
            },
            setShowClass: function () {
                let index = 0;
                for (let i in this.isShowRow) {
                    if (this.isShowRow[i].show) {
                        index++;
                        this.showClass[i] = index % 2 ? 'back-odd' : 'back-even'
                    } else {
                        this.showClass[i] = 'back-odd';
                    }
                }
            },
            setFalse: function (parentId) {
                for (let i in this.dataFin) {
                    if (this.dataFin[i].parentId == parentId) {
                        this.isShowRow[i].show = false;
                        this.isShowRow[i].icon = 'icon-jiantouyou';
                        this.setFalse(this.dataFin[i].id);
                    }
                }
            },
            checkBoxShow: function (index) {
                this.isFT = [];
                this.finChooseData = [];
                if (this.isTree) {
                    this.setChildBox(index);
                    this.setParentBox(index);
                } else {
                    this.notTree(index)
                }
                for (let data of this.chooseData) {
                    if (data != "" && data != undefined) {
                        this.finChooseData.push(data)
                    }
                }
                this.$emit('chooseData', this.finChooseData);
                if (this.finChooseData.length == this.rowData.length) {
                    this.isSelectAllShow = true;
                } else {
                    this.isSelectAllShow = false;
                }
            },
            setChildBox: function (index, notFirst, parentShow) {
                let show = parentShow;
                if (!notFirst) {
                    this.$set(this.isSelect, index, !this.isSelect[index]);
                    show = this.isSelect[index];
                    if (show) {
                        this.chooseData[index] = this.rowData[index];
                    } else {
                        this.chooseData[index] = '';
                    }
                }
                for (let i in this.dataFin) {
                    if (this.dataFin[i].parentId == (index + 1)) {
                        this.$set(this.isSelect, i, show);
                        if (show) {
                            this.chooseData[i] = this.rowData[i];
                        } else {
                            this.chooseData[i] = '';
                        }
                        this.setChildBox(this.dataFin[i].id - 1, true, show)
                    }
                }
            },
            setParentBox: function (index) {
                for (let i in this.dataFin) {
                    if (this.dataFin[index].parentId == this.dataFin[i].id) {
                        this.isSelectAll(this.dataFin[i].id)
                        this.setParentBox(i);
                    }
                }
            },
            isSelectAll: function (id) {
                let countF = 0;
                let countT = 0;
                for (let i in this.dataFin) {
                    if (this.dataFin[i].parentId == id) {
                        if (this.isSelect[i]) {
                            countT++;
                        } else {
                            countF++;
                        }
                    }
                }
                if (countT == countF + countT) {
                    this.$set(this.isSelect, id - 1, true);
                    this.chooseData[id - 1] = this.rowData[id - 1];
                } else {
                    this.$set(this.isSelect, id - 1, false);
                    this.chooseData[id - 1] = '';
                }
            },
            rowClick: function (index) {
                if (this.rowSelect) {
                    this.checkBoxShow(index)
                }
            },
            setBodyWid: function () {
                this.$nextTick(function () {
                    this.titleWid = this.$refs.headerRow.offsetWidth;
                    this.bodyWid = this.$refs.tableBody.offsetWidth;
                    let difference = this.titleWid - this.bodyWid;
                    this.getRemainWid(this.titleWid, difference);
                })
            },
            // 非树形结构
            notTree: function (index) {
                if (this.chooseData[index] != "" && this.chooseData[index] != undefined) {
                    this.chooseData[index] = "";
                    this.$set(this.isSelect, index, false);
                } else {
                    this.chooseData[index] = this.rowData[index];
                    this.$set(this.isSelect, index, true)
                }
            },
            // 非树形结构是否全选
            checkBoxAllShow: function () {
                this.isSelectAllShow = !this.isSelectAllShow;
                for (let i in this.rowData) {
                    this.isSelect[i] = this.isSelectAllShow;
                }
                this.chooseData = this.isSelectAllShow ? [...this.rowData] : [];
                this.$emit('chooseData', this.chooseData);
            },
            clickGlobal: function () {
                let _this = this;
                this.$nextTick(function () {
                    setTimeout(function () {
                        _this.setBodyWid();
                    },500);
                })
            }
        },
        created() {
            this.getWid();
        },
        mounted() {
            window.onresize = () => {
                this.setBodyWid();
            };
        },
        filters: {
            //时间格式化
            formater: function (value, incomingType, type) {
                let types = typeof incomingType;
                if (types == "undefined") {
                    return value;
                } else if (types == "function") {
                    return incomingType(value, type);
                } else if (types == "string" && incomingType == "dateFormat") {
                    return formatDate(value, type);
                }
            }
        },
        watch: {
            tableData: function (newVal, oldVal) {
                this.layerArr = [];
                this.dataFin = [];
                this.rowData = [];
                this.isShowRow = [];
                this.isSelect = [];
                this.chooseData = [];
                this.isSelectAllShow = false;
                this.setTree(newVal, '-1');
                this.setBodyWid();
                this.setShowClass();
            }
        },
        props: {
            tableTitle: {}, // 表头数据
            tableData: {}, // 表数据
            isSpread: {
                default: false // 初始是否展开
            },
            hasCheckbox: {
                default: false // 是否有多选框
            },
            rowSelect: {
                default: false // 是否可根据行选中
            },
            minWid: {
                default: '300px' // 表格最小宽度
            },
            isTree: {
                default: true // 是否为树形结构
            }
        }
    }
</script>

<style scoped>
  .back-odd {
    background-color: rgb(255, 255, 255);
  }

  .back-even {
    background-color: rgb(248, 249, 250);
  }

  .table-checkbox {
    width: 12px;
    height: 12px;
    border: 1px solid #ccc;
    float: left;
    border-radius: 2px;
    line-height: 14px;
    color: #fff;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
  }

  .select-checkbox {
    width: 14px;
    height: 14px;
    border: none;
    background-color: #1188dd;
  }

  .table-tree {
    width: 100%;
    height: 100%;
  }

  .table {
    width: 100%;
    height: calc(100% - 17px);
    overflow-x: auto;
    overflow-y: hidden;
  }

  .header-row {
    height: 38px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #E9ECEF;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .header-row .row-details {
    padding-left: 30px;
    font-weight: normal;
    height: 22px;
    text-align: left;
  }

  .borRight {
    border-right: 1px solid #e9ecef;
  }

  .table-body {
    height: calc(100% - 38px);
    overflow-y: auto;
    overflow-x: hidden;
  }

  .body-row {
    display: flex;
    align-items: center;
    height: 42px;
    text-align: left;
  }

  .body-row .row-details {
    padding-left: 30px;
    display: flex;
    align-items: center;
  }

  .iconCheck {
    display: flex;
    align-items: center;
  }

</style>
