<template>
  <div class="loong-sider" :style="{'width': isFold ? '58px':'180px'}" :class="foldClass">
    <div class="sider-logo">
      <img :src="logo" alt="">
    </div>
    <div class="loong-menus">
      <ul class="menuList" style="width: 100%">
        <li class="menus-details" v-for="(item,index) in menus"
            :class="[showClass[index].show,showClass[index].show == 'back-1188dd'? 'menu-item-animation':'']"
            v-show="showArr[index]"
            @click="clickMenus(item.index)" :ref="`tip${index}`" @mouseover="mouseOver(index)"
            @mouseleave="mouseLeave(index)">
          <span class="menu-content">
            <span>
              <svg class="icon fs18" aria-hidden="true">
                <use :xlink:href='"#"+item.icon' :ref="`icon${item.id}`"></use>
              </svg>
            </span>
            <span class="ml" v-show="!isFold">{{ $t(item.meta.title) }}</span>
          </span>
          <loongBalloonTip v-show="isFold" :tipTitle="$t(item.meta.title)" tipPlacement="right" :elementInfo="elementInfo"
                           :isShowTip="isShowTip[index]"></loongBalloonTip>
        </li>
      </ul>
    </div>
    <div class="fold" @click="isFoldClick()">
      <span class="fold-icon">
        <svg class="icon" aria-hidden="true">
        <use :xlink:href="isFold ? '#icon-muluzhankai':'#icon-mulushouqi'"></use>
      </svg>
      </span>
    </div>
  </div>
</template>

<script>
    import loongBalloonTip from "@/components/loongBalloonTip/loongBalloonTip"

    export default {
        name: "siderBar",
        data() {
            return {
                isFold: false, // 侧边栏是否折叠
                menus: [], // 菜单项
                index: -1, // 菜单id
                showArr: [], // 菜单显示项
                showClass: [], // 菜单项的class
                foldClass: '', // 是否折叠的class 折叠'foldT'  没折叠'foldF'
                foldWid: '180px', // 菜单宽度
                selectSpread: [], // 点击菜单项的id 是否显示
                isShowTip: [], // BalloonTip 是否显示
                elementInfo: '' // BalloonTip的ref
            }
        },
        props: {
            logo: {} // 页面logo
        },
        methods: {
            // 鼠标移入事件
            mouseOver: function (index) {
                this.$set(this.isShowTip, index, true)
                this.elementInfo = this.$refs[`tip${index}`];
            },
            // 鼠标移出事件
            mouseLeave: function (index) {
                this.$set(this.isShowTip, index, false)
            },
            setMenus: function (items, isRoot, parentId) {
                isRoot = isRoot == undefined ? true : false
                for (let item of items) {
                    if (item.path != '*' && item.meta != undefined && item.meta.isMenus) {
                        this.index++;
                        this.showArr[this.index] = isRoot;
                        this.menus[this.index] = {
                            meta: item.meta,
                            path: item.path,
                            isRoot: isRoot,
                            parentId: parentId == undefined ? -1 : parentId,
                            index: this.index,
                            hasChildren: item.children == undefined ? false : true,
                            icon: item.meta.iconClose,
                            hasRedirect: item.redirect != undefined ? item.redirect : false
                        };
                        this.showClass[this.index] = {
                            show: 'back-38455A',
                            saveShow: 'back-38455A'
                        }
                    }
                    if (item.children != undefined) {
                        this.setMenus(item.children, false, this.index)
                    }
                }
            },
            // 菜单项点击
            clickMenus: function (index) {
                let reallyShow = JSON.parse(JSON.stringify(this.showArr));
                let isShow;
                if (!this.menus[index].hasRedirect) {
                    this.$router.replace(this.menus[index].path);
                    this.getSelectMenus(this.menus[index].path);
                }
                for (let i in this.menus) {
                    if (this.menus[index].isRoot) {
                        if (!this.menus[i].isRoot) {
                            this.$set(this.showArr, i, false);
                        }
                    }
                    if (this.menus[index].hasChildren) {
                        if (!this.menus[i].isRoot) {
                            if (this.showClass[i].show != 'back-1188dd') {
                                this.showClass[i] = {
                                    show: 'back-38455A',
                                    saveShow: 'back-38455A'
                                }
                            } else {
                                this.showClass[i].saveShow = 'back-38455A';
                            }
                            this.$set(this.showClass, i, this.showClass[i]);
                        }
                        if (this.menus[i].parentId == index) {
                            isShow = reallyShow[i];
                            this.$set(this.showArr, i, !reallyShow[i]);
                            if (this.showClass[i].show != 'back-1188dd') {
                                this.showClass[i] = {
                                    show: 'back-2A374D',
                                    saveShow: 'back-2A374D'
                                }
                            } else {
                                this.showClass[i].saveShow = 'back-2A374D';
                            }
                            this.$set(this.showClass, i, this.showClass[i]);
                        }
                    }
                }
                for (let i in this.menus) {
                    if (this.showArr[i] && !this.menus[i].isRoot && !this.menus[index].isRoot) {
                        if (isShow) {
                            this.showClass[i] = {
                                show: 'back-2A374D',
                                saveShow: 'back-2A374D'
                            }
                            this.$set(this.showClass, i, this.showClass[i]);
                        }
                    }
                    if (this.menus[index].isRoot) {
                        this.menus[i].icon = this.menus[i].meta.iconClose;
                    }
                }
                if (isShow) {
                    this.menus[index].icon = this.menus[index].meta.iconClose;
                } else {
                    this.menus[index].icon = this.menus[index].meta.iconOpen;
                }
            },
            getSelectMenus: function (path) {
                this.selectSpread = [];
                for (let i in this.menus) {
                    if (this.menus[i].path == path) {
                        this.showClass[i].show = 'back-1188dd';
                        this.$set(this.showClass, i, this.showClass[i]);
                        this.getSpreadMenus(this.menus[i].parentId, 'back-2A374D')
                    } else {
                        if (!this.menus[i].isRoot) {
                            this.$set(this.showArr, i, false);
                        }
                        this.showClass[i].show = this.showClass[i].saveShow;
                        this.$set(this.showClass, i, this.showClass[i]);
                        this.menus[i].icon = this.menus[i].meta.iconClose;
                        this.$set(this.menus, i, this.menus[i]);
                    }
                }
            },
            getSpreadMenus: function (parentId, show) {
                this.$nextTick(function () {
                    if (parentId != -1) {
                        this.selectSpread.push({
                            parentId: parentId,
                            show: show
                        })
                        this.getSpreadMenus(this.menus[parentId].parentId, 'back-38455A')
                    } else {
                        this.setSpread();
                    }
                })
            },
            setSpread: function () {
                this.$nextTick(function () {
                    for (let i in this.menus) {
                        for (let j in this.selectSpread) {
                            if (this.menus[i].parentId == this.selectSpread[j].parentId) {
                                this.$set(this.showArr, i, true);
                                if (this.showClass[i].show != 'back-1188dd') {
                                    this.showClass[i].show = this.selectSpread[j].show;
                                }
                                this.$set(this.showClass, i, this.showClass[i]);
                            } else if (this.menus[i].index == this.selectSpread[j].parentId) {
                                this.menus[i].icon = this.menus[i].meta.iconOpen;
                                this.$set(this.menus, i, this.menus[i]);
                            }
                        }
                    }
                })
            },
            // 侧边栏是否展开
            isFoldClick: function () {
                this.isFold = !this.isFold;
                this.foldClass = this.isFold ? 'foldT' : 'foldF';
                this.foldWid = this.isFold ? '58px' : '180px';
                this.$emit('siderFold', this.isFold)
            },
        },
        created() {
            this.setMenus(this.$router.options.routes);
            this.getSelectMenus(this.$route.path)
        },
        watch: {
            $route(to, from) {
                this.getSelectMenus(this.$route.path)
            },
        },
        components: {
            loongBalloonTip
        }
    }
</script>

<style scoped>
  /*初始菜单背景色*/
  .back-38455A {
    background-color: #38455A;
  }

  /*展开子菜单背景色*/
  .back-2A374D {
    background-color: #2A374D;
  }

  .loong-sider {
    height: 100%;
    background-color: #38455A;
    position: relative;
    left: 0px;
    z-index: 2;
    box-shadow: 5px 0px 5px 0px rgba(12, 54, 138, 0.19), 0px 0px 5px 0px rgba(18, 61, 148, 0.2);
  }

  .sider-logo {
    background-color: #2A374D;
    width: 100%;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loong-menus {
    width: 100%;
    height: calc(100% - 98px);
    background-color: #38455A;
    overflow: hidden;
  }

  .menus-details {
    height: 44px;
    color: #ffffff;
    font-size: 13px;
    line-height: 44px;
    cursor: pointer;
  }

  .menus-details:hover {
    background-color: #475369;
  }

  .back-2A374D:hover {
    border-left: 2px solid #1188DD;
    width: calc(100% - 2px);
  }

  .back-2A374D:hover .menu-content {
    margin-left: 18px;
  }

  .menuList {
    height: 100%;
    width: calc(100% + 17px) !important;
    overflow-y: auto;
  }

  .menu-content {
    margin-left: 20px;
    overflow: hidden;
    white-space: nowrap;
  }

  .fold {
    background-color: #2A374D;
    width: 100%;
    height: 44px;
    position: absolute;
    bottom: 0px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fold-icon {
    color: #AEB9C2;
  }

  .foldT {
    animation: myFold2 500ms linear;
  }

  .foldF {
    animation: myFold1 500ms linear;
  }

  @keyframes myFold1 {
    from {
      width: 58px;
    }
    to {
      width: 180px;
    }
  }

  @keyframes myFold2 {
    from {
      width: 180px;
    }
    to {
      width: 58px;
    }
  }

  .menu-item-animation {
    animation: menu-item 400ms linear;
  }

  @keyframes menu-item {
    from {
      width: 0px;
    }
    to {
      width: calc(100% + 17px);
    }
  }
</style>
