<template>
    <div class="main" v-if="isOk">
        <div v-if="isView">
            <div class="head_box">
                <span class="text">更新时间: {{(new Date()).toLocaleString('chinese', { hour12: false })}}</span>
                <div class="btn">
                    <el-button type="success" @click="clickView">切换表格</el-button>
                </div>
            </div>
            <div class="body_box">
                <bar
                        :echartStyle="s"
                        :title="title"
                        :legend="legend"
                        :xAxis="xAxis"
                        :series="series"
                        :tooltipFormatter="tooltipFormatter">
                </bar>
            </div>
        </div>
        <div v-else>
            <div>
                <div class="head_box">
                    <span class="text">更新时间: {{(new Date()).toLocaleString('chinese', { hour12: false })}}</span>
                    <label for="input6" class="btn2">
                        <svg class="icon icon-back icons" aria-hidden="true">
                            <use xlink:href="#icon-daoChu"></use>
                        </svg>
                        <form action="" method="get" @submit="exportAllCollege('/sbkp/census/exportAllCollege')">
                            <input type="submit" id="input6" hidden >
                        </form>
                    </label>
                    <div class="btn">
                        <el-button type="success" @click="clickView">切换图表</el-button>
                    </div>
                </div>
            </div>
            <div>
                <el-table
                        :data="tableData"
                        align="center"
                        style="width: 100%;background: transparent;border: 0px">
                    <el-table-column
                            align="center"
                            prop="college"
                            label="学院"
                            width="300"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="keyPersonnel"
                            label="重点人员人数"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="报警通知">
                        <el-table-column
                                align="center"
                                prop="processed"
                                label="已处理"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="untreated"
                                width="200"
                                label="未处理">
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import bar from '../../houqin/components/charts/charts'
    import axios from "axios"
    import qs from "qs"

    export default {
        name: "xuesheng",
        components: {
            bar
        },
        methods: {
            /*图表与表格切换*/
            clickView() {
                this.isView = !this.isView
            },

            /*请求学生处学院信息统计数据*/
            getStudentsCensusInfo() {
                axios.post(this.api + "/sbkp/census/getStudentsCensusInfo")
                    .then(this.getStudentsCensusInfoCallback)
                    .catch(function () {
                        console.log("出错了")
                    })
            },

            /*请求学生处学员信息统计数据回调函数*/
            getStudentsCensusInfoCallback(res) {
                let data = res.data

                console.log(data)
                let arr = data.msg
                this.tableData =arr
                let len = arr.length
                /*//数据是否为空*/
                if (arr !== "null") {
                    for (let i = 0; i < len; i++) {
                        this.xAxis.data[i] = arr[i].college
                    }
                    for (let j = 0; j < 3; j++) {
                        for (let i = 0; i < len; i++) {
                            if (j === 0) {
                                this.series[j].data[i] = arr[i].keyPersonnel
                            } else if (j === 1) {
                                this.series[j].data[i] = arr[i].processed
                            } else {
                                this.series[j].data[i] = arr[i].untreated
                            }

                        }
                        this.isOk = true
                    }
                    console.log(this.series[2].data)

                }

            },

            /*学生处导出数据请求*/
            exportAllCollege(url){
                document.getElementsByTagName("form")[1].action = this.api + url
            }
        },
        mounted() {
            /*请求数据初始化页面*/
            this.getStudentsCensusInfo()
        },
        data() {
            return {
                isOk:false,
                isView: true,//切换表格/图表
                tableData: [//接口数据模型
                    {
                        college: "",
                        keyPersonnel: '',
                        processed: '',
                        untreated: ''
                    },


                ],
                a: '统计数据',
                b: '人数',
                c: [],
                d: '统计',
                e: [],
                s: {},
                tooltipFormatter: '人数',
                title: {
                    text: '各学院违规人数统计',
                    top: -2,
                    left: 'center',
                    textStyle: {
                        fontWeight: 600,              //标题颜色
                        color: '#222',
                        fontSize: 15
                    }
                },
                legend: {
                    data: ['重点人员人数', '报警通知已处理', '报警通知未处理'],
                    top: 680
                },
                // X轴
                xAxis: {
                    data: [],
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: -12
                    }
                },
                // Y轴
                yAxis: {},
                // 数据
                series: [
                    // {
                    //     name: '重点人员人数',
                    //     type: 'bar',
                    //     barMaxWidth: 20,
                    //     data: [],
                    //
                    // },
                    {
                        name: '重点人员人数',
                        type: 'line',
                        yAxisIndex: 1,//索引从0开始
                        data: []
                    },
                    {
                        name: '报警通知已处理',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: []
                    },
                    {
                        name: '报警通知未处理',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: []
                    },

                ],
            }
        },
    }
</script>

<style scoped>
    .main {
        min-width: 990px;
        margin-left: 230px;
        /*margin-right: 50px;*/
        margin-top: 10px;
    }

    .main .head_box {
        width: 100%;
        position: relative;
        z-index: 999;
        top: 5px;
    }

    .main .head_box1 {
        height: 20px;
        top: 10px;

    }

    .main .head_box .text {
        position: relative;
        top: -11px;
    }

    .main .head_box .btn {
        /*width: 100px;*/
        /*position: absolute;*/
        /*display: inline-block;*/
        /*right: 220px;*/
        margin-right: 20px;
        float: right;
    }

    .main .head_box .btn2 {
        width: 30px;
        position: absolute;
        display: inline-block;
        right: 335px;
        margin-top: 7px
    }

    .main .head_box .btn2 .icons {
        height: 30px;
        width: 30px;
    }

    .main .body_box {
        position: relative;
        height: 100%;
    }
</style>