<template>
    <div class="main">
        <div v-for="item in detail" style="display: inline-block">
            <card :collage="item.college"
                  :head="item.college.substr(0,3)"
                  :count="item.key_personnel"
                  @checkInfo='checkInfo(item.college,item.key_personnel,item.processed,item.untreated)'
            ></card>
        </div>

    </div>


</template>

<script>
    import card from "../components/card/card"
    import axios from "axios"
    import qs from "qs"

    export default {
        name: "detail",
        data() {
            return {
                detail: [//详细信息初始化数据

                ],
            }
        },
        components: {
            card
        },
        methods: {
            /*查看更多模态*/
            open(collage, count,p,un) {//element模态框
                this.$alert('<div style="text-align: center;width: 100%;border-top: 1px solid gainsboro;border-bottom:1px solid gainsboro" >' +
                    '<div style="height: 100%;width: 180px;position: relative;right: 0;left: 0;margin: auto;text-align: left;">' +
                    '<span style="display: block;margin-top: 10px;color: yellowgreen">重点人员：' + ' ' + count + '人</span>' +
                    '<span style="display: block;margin-top: 10px;color: #02a774;">已处理报警通知：' + ' ' + p + '条</span>' +
                    '<span style="display: block;margin-top: 10px;color: red">未处理报警通知：' + ' ' + un + '条</span>' +
                    '</div>' +
                    '</div>', collage, {
                    dangerouslyUseHTMLString: true
                });
            },

            /*学院数据请求*/
            getStudentsCensusInfo1() {
                axios.post(this.api + "/sbkp/census/getStudentsCensusInfo")
                    .then(this.getStudentsCensusInfoCallback1)
                    .catch(function () {
                        console.log("出错了")
                    })
            },
            getStudentsCensusInfoCallback1(res) {
                let data = res.data
                this.detail = data.msg
            },

            checkInfo(collage, count,p,un) {//card绑定点击事件
                this.open(collage, count,p,un)
            }
        },
        mounted() {
            this.getStudentsCensusInfo1()
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