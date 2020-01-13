<template>
  <div class="loong-card-table">
    <div class="card-table-header min-wid" ref="tableHeader">
      <div class="header-row fl pl30 c9 fs12" v-for="(data,index) in cardTitle"
           :style="{width:titleWid[index]+'px'}" :class="[index!=0?'border-left-e9ecef':'']">
        {{data.title}}
      </div>
    </div>
    <div class="card-table-body min-wid" ref="refBody">
      <div ref="tableBody">
        <div v-for="(data,index) in cardData" class="table-body-row ml20 mr20 mt10"
             :class="[isChoose[index]?'row-card-selected':'']" :style="{width:bodyWid+'px'}" @click="chooseRow(index)"
             :ref="`cardRow${index}`">
          <div v-for="(title,titleIndex) in cardTitle" :class="[titleIndex!=0?'border-left-e9ecef':'']"
               class="row-details fl fs14 pl30"
               :style="{width:titleIndex!=0&&titleIndex!=cardTitle.length-1?titleWid[titleIndex]+'px':titleWid[titleIndex]-21+'px'}"
               @mouseenter="mouseover(titleIndex,index)" @mouseleave="mouseLeave(titleIndex,index)">
            <div v-if="title.type=='button'"
                 style="display: flex;justify-content:space-around;position: absolute;left: 0px;width: 100%">
              <span class="color-1188dd cursor-pointer" v-for="icon in title.operations" :title="icon.text"
                    @click.stop="icon.callBack(data)">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="icon.icon"></use>
                </svg>
              </span>
            </div>
            <div v-else class="ellip" :ref="`content${titleIndex}${index}`">
              <span v-html="$options.filters.formater(data[title.name],title.formater,title.pattern)"></span>
            </div>
            <span class="border-left-e9ecef card-more cursor-pointer" v-show="isExceed[titleIndex][index]"
                  @click.stop="showMore(titleIndex,index)">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iiconfont-angle-up"></use>
              </svg>
            </span>
            <div class="card-show-more fs14 c3" v-show="isShowMore[titleIndex][index]" @click.stop=""
                 v-html="$options.filters.formater(data[title.name],title.formater,title.pattern)"
                 :ref="`cardShowMore${titleIndex}${index}`" :class="[isMoreThan?'bottom0':'top0']"></div>
            <div class="card-close c9 cursor-pointer" v-show="isShowMore[titleIndex][index]"
                 @click.stop="closeShowDiv(titleIndex,index)" :style="{top:closeTop}">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-guanbi2"></use>
              </svg>
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
        name: "loongCardTable",
        data() {
            return {
                titleWid: [],
                remainWid: [],
                totalWid: 0,
                bodyWid: '',
                isChoose: [],
                chooseTrue: [],
                chooseData: [],
                isExceed: [],
                reallyShow: [],
                isShowMore: [],
                showSubscript: [-1, -1],
                isMoreThan: false,
                closeTop: '-27px',
            }
        },
        methods: {
            arrayInit: function () {
                for (let i in this.cardTitle) {
                    this.isExceed[i] = [];
                    this.reallyShow[i] = [];
                    this.isShowMore[i] = [];
                }
            },
            isShow: function () {
                let content;
                for (let i in this.cardTitle) {
                    for (let j in this.cardData) {
                        content = this.$refs[`content${i}${j}`];
                        if (content != undefined && content.length != 0) {
                            if (content[0].offsetWidth < content[0].scrollWidth) {
                                this.reallyShow[i][j] = true;
                            } else {
                                this.reallyShow[i][j] = false;
                            }
                        } else {
                            this.reallyShow[i][j] = false;
                        }
                    }
                }
            },
            getWid: function () {
                for (let i in this.cardTitle) {
                    if (this.cardTitle[i].width != "" && this.cardTitle[i].width != undefined) {
                        this.titleWid[i] = parseInt(this.cardTitle[i].width) - 31;
                        this.totalWid = this.totalWid + parseInt(this.cardTitle[i].width)
                    } else {
                        this.remainWid.push(i)
                    }
                }
            },
            setRemainWid: function () {
                let headerWid = this.$refs.tableHeader.offsetWidth;
                this.bodyWid = headerWid - 40;
                let remain = (headerWid - this.totalWid) / this.remainWid.length - 31;
                for (let i of this.remainWid) {
                    this.$set(this.titleWid, i, remain);
                }
            },
            chooseRow: function (index) {
                this.chooseData = [];
                let subscript = this.chooseTrue.indexOf(index);
                if (subscript >= 0) {
                    this.chooseTrue.splice(subscript, 1);
                    this.$set(this.isChoose, index, false);
                } else {
                    if (this.isMulti) {
                        this.chooseTrue.push(index);
                    } else {
                        this.$set(this.isChoose, this.chooseTrue[0], false);
                        this.chooseTrue[0] = index;
                    }
                    this.$set(this.isChoose, index, true);
                }
                for (let data of this.chooseTrue) {
                    this.chooseData.push(this.cardData[data])
                }
                this.$emit('chooseData', this.chooseData);
            },
            // 鼠标移入
            mouseover: function (i, j) {
                this.$set(this.isExceed[i], j, this.reallyShow[i][j]);
                this.isExceed.push();
            },
            // 鼠标移出
            mouseLeave: function (i, j) {
                this.$set(this.isExceed[i], j, false);
                this.isExceed.push();
            },
            // 点击显示更多
            showMore: function (i, j) {
                let beforeI = this.showSubscript[0];
                let beforeJ = this.showSubscript[1];
                if (beforeI >= 0 && beforeJ >= 0) {
                    this.$set(this.isShowMore[beforeI], beforeJ, false);
                }
                this.$set(this.isShowMore[i], j, true);
                this.isShowMore.push();
                this.showSubscript[0] = i;
                this.showSubscript[1] = j;
                this.$nextTick(function () {
                    this.displayPosition(i, j)
                })
            },
            // 查看更多显示位置
            displayPosition: function (i, j) {
                let offsetTop = this.$refs[`cardRow${j}`][0].offsetTop;
                let offsetHeight = this.$refs[`cardShowMore${i}${j}`][0].offsetHeight;
                let tableBodyHei = this.$refs.refBody.offsetHeight;
                let tableBodyScrTop = this.$refs.refBody.scrollTop;
                if (offsetTop + offsetHeight > tableBodyHei + tableBodyScrTop + 40) {
                    this.closeTop = -(offsetHeight - 27) + 'px';
                    this.isMoreThan = true;
                }
                else {
                    this.closeTop = '-27px';
                    this.isMoreThan = false;
                }
            },
            // 关闭显示更多
            closeShowDiv: function (i, j) {
                this.$set(this.isShowMore[i], j, false);
                this.isShowMore.push();
            }
        },
        created() {
            this.getWid();
            this.arrayInit();
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
        mounted() {
            window.onresize = () => {
                this.setRemainWid();
            };
            this.$nextTick(function () {
                this.setRemainWid();
                this.isShow();
            })
            this.$refs.refBody.onscroll = () => {
                if (this.showSubscript[0] != -1) {
                    this.displayPosition(this.showSubscript[0], this.showSubscript[1]);
                }
            }
        },
        watch: {
            cardData: function () {
                this.$nextTick(function () {
                    this.setRemainWid();
                    this.isShow();
                })
            }
        },
        props: {
            cardTitle: {}, // 表头内容
            cardData: {}, // 表内容
            isMulti: {} // 是否多选
        }
    }
</script>

<style scoped>
  .row-card-selected {
    border: 1px solid #1188DD !important;
  }

  .min-wid {
    min-width: 960px;
  }

  .loong-card-table {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: auto;
  }

  .card-table-header {
    height: 22px;
    background: rgba(248, 249, 250, 1);
    line-height: 22px;
    border-bottom: 1px solid rgba(233, 236, 239, 1);
    border-top: 1px solid rgba(233, 236, 239, 1);
    color: #999;
    padding: 8px 0;
  }

  .border-left-e9ecef {
    border-left: 1px solid #e9ecef;
  }

  .card-table-body {
    height: calc(100% - 40px);
    overflow-y: auto;
  }

  .table-body-row {
    height: 52px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 4px 0px rgba(12, 54, 138, 0.08), 0px 0px 10px 0px rgba(18, 61, 148, 0.09);
    border-radius: 2px;
    border: 1px solid rgba(206, 212, 218, 1);
  }

  .row-details {
    position: relative;
    height: 52px;
    line-height: 52px;
  }

  .card-more {
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: #FFFFFF
  }

  .top0 {
    top: 0px;
  }

  .bottom0 {
    bottom: 0px;
  }

  .card-show-more {
    position: absolute;
    width: calc(100% - 8px);
    left: 0px;
    z-index: 2;
    min-height: 52px;
    max-height: 156px;
    line-height: 26px;
    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #ffffff;
    border: 1px solid #e6e6e6;
    padding: 4px;
    overflow-y: auto;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, .4);
  }

  .card-close {
    font-size: 20px;
    position: absolute;
    right: -12px;
    z-index: 3;
  }
</style>
