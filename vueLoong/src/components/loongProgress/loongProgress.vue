<template>
  <div class="loong-progress" style="text-align: center">
    <div v-show="!isCircle" class="line-progress panWrap"
         :style="{width:proSize,height: parseInt(slideHeight)+'px',borderRadius:parseInt(panRadius)+'px',backgroundColor:backgroundColor}">
      <div class="line-progress-percentage change-line" ref="changeLine"
           :style="{width:lineWid,borderRadius:parseInt(slideRadius)+'px',background:isGradient?'linear-gradient(to right, '+gradientColor[0]+' 0%, '+gradientColor[1]+' '+parseInt(proSize)+'px)':'',backgroundColor:!isGradient?slideColor:''}"
      ></div>
      <div ref="percentText" class="percentText" style="max-width: 100%;"
           :style="{fontSize:fontSize,fontColor:fontColor,fontFamily:fontFamily,fontWeight:fontWeight,top:top,left:left}"
           v-html="(typeof txt=='function')?txt(showTxt):showTxt">
      </div>
    </div>
    <div v-show="isCircle" class="panWrap" :style="{width:parseInt(proSize)+'px',height:parseInt(proSize)+'px'}">
      <canvas ref="progressCircle" :width="parseInt(proSize)" :height="parseInt(proSize)"></canvas>
      <canvas ref="progressBar" :width="parseInt(proSize)" :height="parseInt(proSize)"
              style="position: absolute;top: 0px;left: 0px"></canvas>
      <div ref="percentText1" class="percentText" style="max-width: 100%;text-align: center"
           :style="{fontSize:fontSize,fontColor:fontColor,fontFamily:fontFamily,fontWeight:fontWeight,top:top,left:left}"
           v-html="(typeof txt=='function')?txt(showTxt):showTxt">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "loongProgress",
        data() {
            return {
                value: '0%',
                lineWid: '0',
                count: 0,
                top: '-6px',
                left: '0px',
                slideColor: !this.isColor && this.slideBackColor != '' ? this.slideBackColor : '#1188DD',
                showTxt: this.txt == '' ? '' : this.txt,
                num: 0,
                canvas: '',
                ctx: '',
                center: parseInt(this.proSize) / 2,
                rad: parseInt(this.proSize) / 2,
                step: '',
                isCycle: false
            }
        },
        props: {
            isCircle: {
                default: true
            },  // true:circle,false:Line
            proSize: {//circle:外直径 line：宽度
                default: '110px'
            },
            slideHeight: {
                default: 5
            },//circle:环形宽度 line：高度
            proValue: {// 当前进度
                default: 0.5
            },
            txt: {},  // 百分比
            fontSize: {
                default: '12px'
            }, // 百分比字体大小
            fontColor: {},  // 百分比显示颜色
            fontFamily: {
                default: 'PingFangSC-Regular'
            }, // 百分比字体
            fontWeight: {
                default: '500'
            }, // 百分比字体粗细
            txtPosition: {
                default: 'right'
            },  //center top bottom right  百分比显示位置
            panRadius: {
                default: 2
            }, // 外层圆角
            slideRadius: {
                default: 2
            },  // 百分比圆角
            backgroundColor: {
                default: '#E9ECEF'
            }, // 外层背景色
            isColor: {
                default: true
            },// 百分比是否给定默认的背景色 true：默认配置 false:color
            slideBackColor: {
                default: ''
            }, // 百分比背景色
            isGradient: {
                default: false // 颜色是否为渐变
            },
            gradientColor: {
                default: ['#32E8FF', '#C832FF']
            },
            shadowBlur: {
                default: true // 圆形百分比是否含有阴影
            },
            startAngle: {
                default: 1.5 * Math.PI
            },//开始角度
            endAngle: {
                default: 3.5 * Math.PI
            },//结束角度
            counterclockwise: {
                default: false //true:逆时针
            },
            scale: {
                default: false//是否有刻度
            },
            scaleHeight: {
                default: 5 //刻度长度
            },
            scaleWidth: {
                default: 2  //刻度宽度
            },
            lineCap: {
                default: 'round' //round:向线条的每个末端添加圆形线帽 butt:向线条的每个末端添加平直的边缘 square:向线条的每个末端添加正方形线帽。
            }
        },
        methods: {
            textPosition: function () {
                this.$nextTick(function () {
                    let percentTextWid;
                    let percentTextHei;
                    let centerPosition;
                    let height = this.slideHeight;
                    if (this.isCircle) {
                        height = this.proSize;
                        percentTextWid = this.$refs.percentText1.clientWidth;
                        percentTextHei = this.$refs.percentText1.clientHeight;
                        centerPosition = (parseInt(this.proSize) - percentTextWid) / 2;
                    } else {
                        percentTextWid = this.$refs.percentText.clientWidth;
                        percentTextHei = this.$refs.percentText.clientHeight;
                        centerPosition = (parseInt(this.proSize) - percentTextWid) / 2;
                    }
                    if (this.txtPosition == 'center') {
                        this.top = (parseInt(height) - percentTextHei) / 2 + 'px';
                        this.left = centerPosition > 0 ? centerPosition + 'px' : '0px';
                    } else if (this.txtPosition == 'top') {
                        this.top = -(percentTextHei + 5) + 'px';
                        this.left = centerPosition > 0 ? centerPosition + 'px' : '0px';
                    } else if (this.txtPosition == 'bottom') {
                        this.top = parseInt(height) + 'px';
                        this.left = centerPosition > 0 ? centerPosition + 'px' : '0px';
                    } else {
                        this.top = (parseInt(height) - percentTextHei) / 2 + 'px';
                        this.left = parseInt(this.proSize) + 10 + 'px';
                    }
                })

            },
            percentageNow: function (newValue) {
                if (this.isColor) {
                    this.getColor(newValue);
                } else if (!this.isColor && this.slideBackColor != '') {
                    this.slideColor = this.slideBackColor;
                }
                this.lineWid = newValue + '%';
            },
            getColor: function (proportion) {
                if (proportion >= 0 && proportion <= 70) {
                    this.slideColor = '#1188DD';
                } else {
                    this.slideColor = '#ff2222';
                }
            },
            drawBackground: function () {
                let canvas = this.$refs.progressCircle;
                let ctx = canvas.getContext("2d")
                ctx.strokeStyle = "#E9ECEF";
                ctx.beginPath();
                ctx.lineWidth = this.slideHeight;
                ctx.arc(this.center, this.center, this.rad - this.slideHeight, this.startAngle, this.endAngle, false);
                //x,y是圆的圆心坐标，r是圆心的半径，sAngle是起始角，以弧度计。eAngle是结束角。
                // counterclockwise顺时针画还是逆时针画。true 表示逆时针绘制，false 或者不写为顺时针
                ctx.stroke();
                if (this.scale) {
                    this.drawScale(ctx);
                }
            },
            drawScale: function (ctx) {
                let startPos = this.startAngle;
                let startPoint = this.rad - this.slideHeight * 2 - this.scaleHeight;
                let startPointX = startPoint * Math.cos(startPos),
                    startPointY = startPoint * Math.sin(startPos);
                let endPoint = this.rad - this.slideHeight * 2;
                let endPointX = endPoint * Math.cos(startPos),
                    endPointY = endPoint * Math.sin(startPos);
                let scalePos = (this.endAngle - this.startAngle) / (10 * Math.PI);
                for (let i = 0; i < 11; i++) {
                    ctx.save();//锁画布(为了保存之前的画布状态)
                    ctx.beginPath();//beginpath()，它的作用就是循环每执行完一次，context回到原点处
                    ctx.lineCap = this.lineCap;
                    ctx.translate(this.center, this.center);//把当前画布的原点移到(this.center,this.center),后面的操作都以(this.center,this.center)作为参照点，默认原点为(0,0)
                    let rotPos = i * scalePos * Math.PI;
                    ctx.rotate(rotPos);
                    ctx.strokeStyle = this.backgroundColor;
                    ctx.lineWidth = this.scaleWidth;
                    ctx.moveTo(startPointX, startPointY);
                    ctx.lineTo(endPointX, endPointY);
                    ctx.stroke();
                    ctx.closePath();
                    ctx.restore();//恢复之前保存的状态
                }
            },
            drawProgressBar: function (end, newValue) {
                let start = this.startAngle;
                if (this.counterclockwise) {
                    start = 2 * Math.PI - this.startAngle;
                }
                this.canvas = this.$refs.progressBar;
                this.ctx = this.canvas.getContext("2d");
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                if (this.isGradient) {
                    let startX = this.center + this.rad * Math.cos(this.startAngle),
                        startY = this.center + this.rad * Math.sin(this.startAngle),
                        endX = this.center - this.rad * Math.cos(this.startAngle),
                        endY = this.center - this.rad * Math.sin(this.startAngle);
                    let gradient = this.ctx.createLinearGradient(startX, startY, endX, endY);//渐变开始点和渐变结束点
                    gradient.addColorStop(0, this.gradientColor[0]);
                    gradient.addColorStop(1, this.gradientColor[1]);
                    this.ctx.strokeStyle = gradient;
                } else {
                    this.getColor(newValue);
                    this.ctx.strokeStyle = this.slideColor;
                }
                this.drawAnimation(start / Math.PI, start / Math.PI, end, false)
            },
            drawAnimation: function (start, end, reallyEnd, isStop) {
                reallyEnd = parseFloat(reallyEnd)
                let _this = this;
                this.step = requestAnimationFrame(function () {
                    if (_this.counterclockwise) {
                        end = parseFloat((end - 0.05).toFixed(2));
                        if (reallyEnd <= start) {
                            _this.isCycle = true;
                        } else {
                            if (end < 0) {
                                end = 2;
                                _this.isCycle = true;
                            }
                        }
                        if (end <= reallyEnd && _this.isCycle) {
                            isStop = true;
                            end = reallyEnd;
                        }
                        _this.drawAnimation(start, end, reallyEnd, isStop);
                    } else {
                        end = end + 0.05;
                        if (end >= reallyEnd) {
                            isStop = true;
                            end = reallyEnd
                        }
                        _this.drawAnimation(start, end, reallyEnd, isStop);
                    }
                });
                if (isStop) {
                    this.isCycle = false;
                    window.cancelAnimationFrame(this.step);
                }
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.beginPath();
                this.ctx.lineCap = this.lineCap;
                this.ctx.lineWidth = this.slideHeight;
                this.ctx.arc(this.center, this.center, this.rad - this.slideHeight, start * Math.PI, end * Math.PI, this.counterclockwise);
                if (this.shadowBlur) {
                    this.ctx.shadowOffsetY = 4;
                    this.ctx.shadowBlur = 4;
                    this.ctx.shadowColor = 'rgba(11,106,173,0.3)';
                }
                this.ctx.stroke();
            },
            chooseWay: function (newValue) {
                if (this.isCircle) {
                    let end;
                    if (this.counterclockwise) {
                        let startPoint = 2 - this.startAngle / Math.PI;
                        let endPoint = 4 - this.endAngle / Math.PI;
                        let divide = (2 - (endPoint - startPoint)) / 100;
                        end = startPoint - newValue * divide;
                        end = end < 0 ? (2 + end).toFixed(2) : end.toFixed(2);
                    } else {
                        let divide = (this.endAngle / Math.PI - this.startAngle / Math.PI) / 100;
                        end = (newValue * divide + this.startAngle / Math.PI).toFixed(2);
                    }
                    this.drawProgressBar(end, newValue);
                } else {
                    this.percentageNow(newValue);
                }
            }
        },
        mounted() {
            this.drawBackground();
            let value = parseFloat(this.proValue);
            value = value > 1 ? value : value * 100;
            value = value.toFixed(2)
            this.showTxt = this.txt == '' ? '' : value + '%';
            this.chooseWay(value);
            window.requestAnimationFrame =
                window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame
                || window.msRequestAnimationFrame;
            this.$nextTick(function () {
                this.textPosition();
            })
        },
        beforeDestroy() {
            window.cancelAnimationFrame(this.step);
        },
        watch: {
            proValue: function (newVal, oldVal) {
                let newValue = parseFloat(newVal) <= 1 ? parseFloat(newVal) * 100 : parseFloat(newVal);
                this.showTxt = this.txt == '' ? '' : newValue + '%';
                this.chooseWay(newValue);
                this.$nextTick(function () {
                    this.textPosition();
                });
            }
        }
    }
</script>

<style scoped>
  .panWrap {
    position: relative;
  }

  .line-progress-percentage {
    height: 100%;
  }

  .change-line {
    width: 0px;
    transition: 0.4s linear;
    transition-property: width, background;
  }

  .percentText {
    position: absolute;
  }

</style>
