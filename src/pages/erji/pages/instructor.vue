<template>
    <div class="main">
        <div v-for="item in instructor" style="display: inline-block">
            <card :head="item.counsellorName === undefined ? item.counsellorName : item.counsellorName.charAt(0)"
                  :collage="item.counsellorName"
                  :count="item.keyPersonnel"
                  @checkInfo='checkInfo(item.counsellorName,item.keyPersonnel,item.processed,item.untreated)'
            ></card>
        </div>

    </div>


</template>

<script>
    import card from "../../xuesheng/components/card/card"
   import axios from 'axios'
    import qs from 'qs'
    export default {
        name: "instructor",
        data() {
            return {
                instructor: [ ],//详细信息初始化数据
            }
        },
        components: {
            card
        },
        methods: {
            open(name,count,p,un) {//element模态框
                this.$alert('<div style="text-align: center;width: 100%;border-top: 1px solid gainsboro;border-bottom:1px solid gainsboro" >' +
                    '<div style="height: 100%;width: 180px;position: relative;right: 0;left: 0;margin: auto;text-align: left;">' +
                    '<span style="display: block;margin-top: 10px;color: yellowgreen">重点人员：'+' '+ count + '人</span>' +
                    '<span style="display: block;margin-top: 10px;color: #02a774;">已处理报警通知：'+' '+ p +'条</span>' +
                    '<span style="display: block;margin-top: 10px;color: red">未处理报警通知：'+ ' ' + un + '条</span>' +
                    '</div>' +
                    '</div>', name, {
                    dangerouslyUseHTMLString: true
                });
            },

            checkInfo(name,count,p,un) {//card绑定点击事件
                this.open(name,count,p,un)
            },
            /*学院数据请求*/
            getInstructorCensusInfo1() {
                axios.post(this.api + "/sbkp/census/getInstructorCensusInfo")
                    .then(this.getInstructorCensusInfoCallback1)
                    .catch(function () {
                        console.log("出错了")
                    })
            },
            getInstructorCensusInfoCallback1(res) {
                let data = res.data
                this.instructor = data.msg
            },
        },
        mounted() {
            this.getInstructorCensusInfo1()
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