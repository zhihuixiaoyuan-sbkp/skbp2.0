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
                    <label for="input7" class="btn2">
                        <svg class="icon icon-back icons" aria-hidden="true">
                            <use xlink:href="#icon-daoChu"></use>
                        </svg>
                        <form action="" method="get">
                            <input type="submit" id="input7" hidden @click="exportAllInstructor('/sbkp/census/exportAllInstructor')">
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
                            prop="counsellorName"
                            label="姓名"
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
    import qs from 'qs'

    export default {
        name: "erjixueyuan",
        data() {
            return {
                isOk: false,
                isView: true,//切换表格/图表
                tableData: [//接口数据模型
                    {
                        counsellorName: "",
                        keyPersonnel: '',
                        processed: '',
                        untreated: ''
                    },],
                a: '统计数据',
                b: '人数',
                c: [],
                d: '统计',
                e: [],
                s: {},
                tooltipFormatter: '人数',
                title: {
                    text: '信息统计',
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
                        // interval:0,
                        // rotate:-15
                    }
                },
                // Y轴
                yAxis: {},
                // 数据
                series: [
                    {
                        name: '重点人员人数',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [],

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
        components: {
            bar
        },
        methods: {
            clickView() {
                this.isView = !this.isView
            },
            /*请求二级学院信息统计数据*/
            getInstructorCensusInfo() {
                axios.post(this.api + "/sbkp/census/getInstructorCensusInfo")
                    .then(this.getInstructorCensusInfoCallback)
                    .catch(function () {
                        console.log("出错了")
                    })
            },

            /*请求二级学院信息统计数据回调函数*/
            getInstructorCensusInfoCallback(res) {
                let data = res.data
                console.log(data)
                let arr = data.msg
                this.tableData = arr
                let len = arr.length
                /*//数据是否为空*/
                if (arr !== "null") {
                    for (let i = 0; i < len; i++) {
                        this.xAxis.data[i] = arr[i].counsellorName
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

            /*导出数据*/
            exportAllInstructor(url){
                document.getElementsByTagName("form")[1].action = this.api + url
            }

        },
        mounted() {
            this.getInstructorCensusInfo()
        }
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
</style>>