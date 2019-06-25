<template>
    <div class="main">
        <div v-for="item in instructor" style="display: inline-block">
            <card :head="item.name.charAt(0)"
                  :collage="item.name"
                  :count="item.count"
                  @checkInfo='checkInfo(item.name,item.count)'
            ></card>
        </div>

    </div>


</template>

<script>
    import card from "../../xuesheng/components/card/card"

    export default {
        name: "instructor",
        data() {
            return {
                instructor: [//详细信息初始化数据
                    {

                        name: "汤菲菲",
                        count: "60"
                    },
                    {

                        name: "夏琳",
                        count: "80"
                    },
                    {

                        name: "袁卫家",
                        count: "100"
                    },
                    {

                        name: "伍祥",
                        count: "70"
                    },
                    {

                        name: "高超",
                        count: "40"
                    },
                    {

                        name: "朱伟杰",
                        count: "50"
                    },
                    {
                       
                        name: "朱洪军",
                        count: "90"
                    },
                ],
            }
        },
        components: {
            card
        },
        methods: {
            open(name,count) {//element模态框
                this.$alert('<div style="text-align: center;width: 100%;border-top: 1px solid gainsboro;border-bottom:1px solid gainsboro" >' +
                    '<div style="height: 100%;width: 180px;position: relative;right: 0;left: 0;margin: auto;text-align: left;">' +
                    '<span style="display: block;margin-top: 10px;color: yellowgreen">重点人员：'+' '+ count + '人</span>' +
                    '<span style="display: block;margin-top: 10px;color: #02a774;">已处理报警通知：'+' '+ count +'条</span>' +
                    '<span style="display: block;margin-top: 10px;color: red">未处理报警通知：'+ ' ' + count+ '条</span>' +
                    '</div>' +
                    '</div>', name, {
                    dangerouslyUseHTMLString: true
                });
            },

            checkInfo(name,count) {//card绑定点击事件
                this.open(name,count)
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