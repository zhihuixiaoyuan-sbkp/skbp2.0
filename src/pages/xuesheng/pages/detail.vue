<template>
    <div class="main">
        <div v-for="item in datial" style="display: inline-block">
            <card :head="item.head"
                  :collage="item.collage"
                  :count="item.count"
                  @checkInfo='checkInfo(item.collage,item.count)'
            ></card>
        </div>

    </div>


</template>

<script>
    import card from "../components/card/card"

    export default {
        name: "detail",
        data() {
            return {
                datial: [//详细信息初始化数据
                    {
                        head: "计软",
                        collage: "计算机与软件工程学院",
                        count: "60"
                    },
                    {
                        head: "管理",
                        collage: "管理工程学院",
                        count: "80"
                    },
                    {
                        head: "艺术",
                        collage: "艺术设计学院",
                        count: "100"
                    },
                    {
                        head: "电气",
                        collage: "电气与通信工程学院",
                        count: "70"
                    },
                    {
                        head: "大数据",
                        collage: "大数据与人工智能学院",
                        count: "40"
                    },
                    {
                        head: "机械",
                        collage: "机械工程学院",
                        count: "50"
                    },
                    {
                        head: "外国语",
                        collage: "通识教育与外国语学院",
                        count: "90"
                    },
                ],
            }
        },
        components: {
            card
        },
        methods: {
            open(collage,count) {//element模态框
                this.$alert('<div style="text-align: center;width: 100%;border-top: 1px solid gainsboro;border-bottom:1px solid gainsboro" >' +
                    '<div style="height: 100%;width: 180px;position: relative;right: 0;left: 0;margin: auto;text-align: left;">' +
                    '<span style="display: block;margin-top: 10px;color: yellowgreen">重点人员：'+' '+ count + '人</span>' +
                    '<span style="display: block;margin-top: 10px;color: #02a774;">已处理报警通知：'+' '+ count +'条</span>' +
                    '<span style="display: block;margin-top: 10px;color: red">未处理报警通知：'+ ' ' + count+ '条</span>' +
                    '</div>' +
                    '</div>', collage, {
                    dangerouslyUseHTMLString: true
                });
            },

            checkInfo(collage,count) {//card绑定点击事件
                this.open(collage,count)
            }
        }
    }
</script>

<style scoped>
    .main {
        min-width: 990px;
        margin-left: 230px;
        margin-top: 30px;
    }

</style>