<template>
    <div class="dialog">
      <button class="confirm-button button-common" @click="showDialog=true">点击</button>
      <loongDialog :content="contentDialog" :isShowDialog="showDialog" @setShow="setShow" @getRadio="getRadio">
        <loongPagination></loongPagination>
      </loongDialog>
    </div>
</template>

<script>
    import loongDialog from "@/components/loongDialog/loongDialog"
    import loongPagination from "@/components/loongPagination/loongPagination"
    export default {
        name: "dialogTest",
        data() {
            return {
                showDialog: false,  // 弹窗显示状态
                titleDialog: 'titleDialog',  // 弹窗title
                contentDialog: '<div style="margin: 10px">contentDialog</div>', // 弹窗内容
                buttonsDialog: [    // 弹窗按钮
                    {
                        "txt": "查询绑定",
                        "className": "confirm-button button-common",
                        "callback": function () {
                            console.log("查询绑定");
                        }
                    },
                    {
                        "txt": "取消绑定",
                        "className": "cancel-button button-common",
                        "callback": function () {
                            return true;
                        }
                    }
                ],
                modalType: 'max',// 弹窗大小 min小弹窗  max大弹窗
                widthDialog: '580px', // 弹窗宽度
                isDrag: true, // 是否可拖拽
                note: true,  // 选框
                noteDef: false, // 选框初始状态
                noteTip: 'test', // 选框内容
                isClose: true, // 右上角是否有关闭按钮
            }
        },
        methods: {
            setShow: function (isShow) {
                this.showDialog = isShow;
            },
            getRadio: function (data) {
                console.log(data);
            }
        },
        components: {
            loongDialog,loongPagination
        }
    }
</script>

<style scoped>

</style>
