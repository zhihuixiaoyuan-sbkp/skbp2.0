<template>
    <div class="main">
        <div style="height: 100%" v-if="isView">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="信息统计表-学院" name="second" style="height: 100%">
                    <div class="head_box">
                        <span class="text">更新时间: 2019/06/04 13:00</span>
                        <div class="btn">
                            <el-button type="success" @click="initView1(1)">切换表格</el-button>
                        </div>
                    </div>
                    <div class="body_box" v-if="isOk">
                        <bar
                                :echartStyle="s"
                                :title="title"
                                :legend="legend"
                                :xAxis="xAxis"
                                :series="series"
                                :tooltipFormatter="tooltipFormatter">
                        </bar>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="违规人数统计-楼栋" name="sss " style="height: 100%">
                    <div>
                        <div class="head_box">
                            <span class="text">更新时间: 2019/06/04 13:00</span>
                            <div class="btn">
                                <el-button type="success" @click="initView1(2)">切换表格</el-button>
                            </div>
                        </div>
                        <div v-if="ischart0">
                            <div class="body_box">
                                <bar
                                        :echartStyle="s2"
                                        :title="title2"
                                        :legend="legend2"
                                        :xAxis="xAxis2"
                                        :series="series2"
                                        :tooltipFormatter="tooltipFormatter2">
                                </bar>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="违规人数统计-性别" name="fourth" style="height: 100%">
                    <div class="head_box">
                        <span class="text">更新时间: 2019/06/04 13:00</span>
                        <div class="btn">
                            <el-button type="success" @click="initView1(3)">切换表格</el-button>
                        </div>
                    </div>
                    <div v-if="ischart1">
                        <div class="body_box">
                            <bar
                                    :echartStyle="s3"
                                    :title="title3"
                                    :legend="legend3"
                                    :xAxis="xAxis3"
                                    :series="series3"
                                    :tooltipFormatter="tooltipFormatter3">
                            </bar>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--<label for="radio" @click="ids.status = 1">-->
        <!--<label class="lb" v-if="!(ids.status === 1)"></label>-->
        <!--<svg class="icon icon-back icons log_span" aria-hidden="true" v-else>-->
        <!--<use xlink:href="#icon-zhengchang"></use>-->
        <!--</svg>-->
        <!--<input id="radio" type="radio" name="check_state" value="1"-->
        <!--v-model="ids.status">&nbsp;&nbsp;出勤-->
        <!--</label>-->
        <div v-else>
            <el-tabs v-model="activeName1" @tab-click="handleClick1">
                <el-tab-pane label="信息统计表-学院" name="xueyuan">
                    <div class="head_box head_box1">
                        <span class="text">更新时间: 2019/06/04 13:00</span>
                        <label class="btn2" for="inputid"
                               @click="exportTable('/sbkp/census/exportAllLogisticsCollege',0)">
                            <svg class="icon icon-back icons" aria-hidden="true">
                                <use xlink:href="#icon-daoChu"></use>
                            </svg>
                            <form action="" method="get">
                                <input id="inputid" type="submit" hidden/>
                            </form>
                        </label>
                        <div class="btn">
                            <el-button type="success" @click="initView(1)">切换图表</el-button>
                        </div>

                    </div>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 90%; margin-top: 40px">
                        <el-table-column
                                prop="college"
                                :label='name'
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="rulesNum"
                                label="违规人数"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="lateNum"
                                label="晚归">
                        </el-table-column>
                        <el-table-column
                                prop="nightoutNum"
                                label="夜不归宿">
                        </el-table-column>
                        <el-table-column
                                prop="dwellNum"
                                label="蜗居">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="违规人数统计-楼栋" name="loudong">
                    <div class="head_box head_box1">
                        <span class="text">更新时间: 2019/06/04 13:00</span>
                        <label class="btn2" for="inputid2"
                               @click="exportTable('/sbkp/census/exportAllLogisticsBuilding',1)">
                            <svg class="icon icon-back icons" aria-hidden="true">
                                <use xlink:href="#icon-daoChu"></use>
                            </svg>
                            <form action="" method="get">
                                <input id="inputid2" type="submit" hidden/>
                            </form>
                        </label>
                        <div class="btn">
                            <el-button type="success" @click="initView(2)">切换图表</el-button>
                        </div>

                    </div>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 90%; margin-top: 40px">
                        <el-table-column
                                prop="buildingNum"
                                :label='name'
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="rulesNum"
                                label="违规人数"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="lateNum"
                                label="晚归">
                        </el-table-column>
                        <el-table-column
                                prop="nightoutNum"
                                label="夜不归宿">
                        </el-table-column>
                        <el-table-column
                                prop="dwellNum"
                                label="蜗居">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="违规人数统计-性别" name="xingbie">
                    <div class="head_box head_box1">
                        <span class="text">更新时间: 2019/06/04 13:00</span>
                        <label class="btn2" for="inputid3" @click="exportTable('/sbkp/census/exportAllLogisticsSex',2)">
                            <svg class="icon icon-back icons" aria-hidden="true">
                                <use xlink:href="#icon-daoChu"></use>
                            </svg>
                            <form action="" method="get">
                                <input id="inputid3" type="submit" hidden/>
                            </form>
                        </label>
                        <div class="btn">
                            <el-button type="success" @click="initView(3)">切换图表</el-button>
                        </div>

                    </div>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 90%; margin-top: 40px">
                        <el-table-column
                                prop="stuSex"
                                :label='name'
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="rulesNum"
                                label="违规人数"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="lateNum"
                                label="晚归">
                        </el-table-column>
                        <el-table-column
                                prop="nightoutNum"
                                label="夜不归宿">
                        </el-table-column>
                        <el-table-column
                                prop="dwellNum"
                                label="蜗居">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>

<script>
    import bar from '../components/charts/charts'
    import axios from "axios"
    import qs from "qs"

    export default {
        name: "tongji",
        components: {
            bar
        },


        methods: {

            /*切换选项卡触发函数*/
            handleClick(event) {
                if (event.index === '1') {
                    this.getBuildingCensusInfo()
                }
                if (event.index === '2') {
                    this.getSexCensusInfo()
                }
                if (event.index === '0') {
                    this.getColleageCensusInfo()
                }
            },

            /*切换选项卡发送请求，显示表格数据*/
            handleClick1(event) {
                // console.log(event.name)
                if (event.name === 'loudong') {
                    this.name = "楼栋"
                    console.log(this.name)
                    this.getBuildingCensusInfo()
                }
                if (event.name === "xingbie") {
                    this.name = "性别"
                    console.log(this.name)
                    this.getSexCensusInfo()
                }
                if (event.name === "xueyuan") {
                    this.name = "学院"
                    console.log(this.name)
                    this.getColleageCensusInfo()
                }
            },

            /*图表表格切换*/
            initView1(num) {
                this.flag = num
                this.isView = !this.isView
            },
            initView(num) {
                if (this.flag === 1) {
                    this.ischart0 = false
                    this.ischart1 = false
                    this.isView = !this.isView
                } else if (this.flag === 2) {
                    this.isOk = false
                    this.ischart1 = false
                    this.isView = !this.isView
                } else if (this.flag === 3) {
                    this.isOk = false
                    this.ischart0 = false
                    this.isView = !this.isView
                } else {
                    this.isView = !this.isView
                }

            },

            /*学院统计图、表格数据接口异步请求*/
            getColleageCensusInfo() {
                axios.post(this.api + "/sbkp/census/getCollegeCensusInfo")
                    .then(this.getColleageCensusInfoCallback)
                    .catch(function () {
                        console.log("出错了")
                    })
            },

            /*请求学院统计图数据，回调函数*/
            getColleageCensusInfoCallback(res) {
                let data = res.data

                this.tableData = data.msg

                console.log(data)
                let arr = data.msg
                let len = arr.length
                let seriesLen = this.series.length
                for (var i = 0; i < len; i++) {//拆分数据结构
                    this.xAxis.data[i] = arr[i].college //x轴坐标轴
                }
                for (var j = 0; j < seriesLen; j++) {
                    for (var i = 0; i < len; i++) {//拆分数据结构
                        if (j === 0) {
                            this.series[j].data[i] = arr[i].rulesNum
                        } else if (j === 1) {
                            this.series[j].data[i] = arr[i].lateNum
                        } else if (j === 2) {
                            this.series[j].data[i] = arr[i].nightoutNum
                        } else {
                            this.series[j].data[i] = arr[i].dwellNum
                        }
                    }

                }
                // this.name = ""
                this.isOk = true


            },

            /*楼栋统计图、表格数据接口异步请求*/
            getBuildingCensusInfo() {
                axios.post(this.api + "/sbkp/census/getBuildingCensusInfo")
                    .then(this.getBuildingCensusInfoCallback)

                    .catch(
                        function () {
                            console.log("出错了")
                        }
                    )
            },

            /*请求楼栋统计图数据，回调函数*/
            getBuildingCensusInfoCallback(res) {
                let data = res.data
                console.log(data.msg)
                if (this.name === "楼栋") {
                    this.tableData = data.msg
                } else {
                    let arr = data.msg
                    console.log(arr)
                    let len = arr.length
                    let seriesLen = this.series2.length
                    for (var i = 0; i < len; i++) {//拆分数据结构
                        this.xAxis2.data[i] = arr[i].buildingNum //x轴坐标轴
                    }
                    for (var j = 0; j < seriesLen; j++) {
                        for (var i = 0; i < len; i++) {//拆分数据结构
                            if (j === 0) {
                                this.series2[j].data[i] = arr[i].rulesNum
                            } else if (j === 1) {
                                this.series2[j].data[i] = arr[i].lateNum
                            } else if (j === 2) {
                                this.series2[j].data[i] = arr[i].nightoutNum
                            } else {
                                this.series2[j].data[i] = arr[i].dwellNum
                            }


                        }

                    }

                    console.log(this.series2[0].data)
                    this.name = ""
                    this.ischart0 = true
                }


            },

            /*性别统计图、表格接口异步请求*/
            getSexCensusInfo() {
                axios.post(this.api + "/sbkp/census/getSexCensusInfo")
                    .then(this.getSexCensusInfoCallback)
                    .catch(function () {
                        console.log("出错了")
                    })
            },

            /*性别统计数据回调函数*/
            getSexCensusInfoCallback(res) {
                console.log("回调成功")
                let data = res.data
                if (this.name === "性别") {
                    this.tableData = data.msg
                } else {
                    let arr = data.msg
                    console.log(arr)
                    let seriesLen = this.series3.length
                    console.log(seriesLen + "666")
                    for (var j = 0; j < seriesLen; j++) {
                        for (var i = 0; i < 4; i++) {//拆分数据结构
                            if (i === 0) {
                                this.series3[j].data[i] = arr[j].rulesNum
                            } else if (i === 1) {
                                this.series3[j].data[i] = arr[j].lateNum
                            } else if (i === 2) {
                                this.series3[j].data[i] = arr[j].nightoutNum
                            } else {
                                this.series3[j].data[i] = arr[j].dwellNum
                            }
                        }
                    }
                    this.name = ""
                    this.ischart1 = true

                }

            },

            /*学院/楼栋/性别列表导出*/
            exportTable(url, num) {
                let myform = document.getElementsByTagName("form")
                myform[num].action = this.api + url
            },
        },
        mounted() {
            /*初始化首页*/
            this.getColleageCensusInfo()
        },

        data() {
            return {
                flag: "",
                isOk: false,
                isView: true,//图表与表格切换控制
                name: "学院",//头部
                tableData: [{
                    xueyuan: '计算机与软件工程学院',
                    weiguirenshu: 100,
                    wangui: 40,
                    yebuguisu: 20,
                    woju: 40
                },],
                ischart0: false,
                ischart1: false,
                activeName: 'second',
                activeName1: "xueyuan",
                a: '统计数据',
                b: '人数',
                c: ['管理工程学院', '计算机与软件工程学院', '大数据与人工智能学院', '艺术设计学院', '机械工程学院', '通识教育与外国语学院', "电气与电子工程学院"],
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
                    data: ['违规人员人数', '晚归', '夜不归宿', '蜗居'],
                    top: 680
                },
                // X轴
                xAxis: {
                    data: [],/*'管理工程学院', '计算机与软件工程学院', '大数据与人工智能学院', '艺术设计学院', '机械工程学院', '通识教育与外国语学院', "电气与电子工程学院"*/
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: -15
                    }
                },
                // Y轴
                yAxis: {},
                // 数据
                series: [
                    {
                        name: '违规人员人数',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [],//20, 50, 30, 10, 70, 80, 90

                    },
                    {
                        name: '晚归',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: []
                    },
                    {
                        name: '夜不归宿',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: []
                    },
                    {
                        name: '蜗居',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: []
                    },

                ],


                a2: '统计数据',
                b2: '人数',
                c2: [],
                d2: '统计',
                e2: [],
                s2: {},
                tooltipFormatter2: '人数',
                title2: {
                    text: '违规人数统计-楼栋',
                    top: -2,
                    left: 'center',
                    textStyle: {
                        fontWeight: 600,              //标题颜色
                        color: '#222',
                        fontSize: 15
                    }
                },
                legend2: {
                    data: ['违规人员人数', '晚归', '夜不归宿', '蜗居'],
                    top: 680
                },
                // X轴
                xAxis2: {
                    data: [],
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: -15
                    }
                },
                // Y轴
                yAxis2: {},
                // 数据
                series2: [
                    {
                        name: '违规人员人数',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [],

                    },
                    {
                        name: '晚归',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: []
                    },
                    {
                        name: '夜不归宿',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: []
                    },
                    {
                        name: '蜗居',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: []
                    },],


                a3: '统计数据',
                b3: '人数',
                c3: ['违规人数', '晚归', '夜不归宿', '蜗居'],
                d3: '统计',
                e3: [],
                s3: {},
                tooltipFormatter3: '人数',
                title3: {
                    text: '违规人数统计-性别',
                    top: -2,
                    left: 'center',
                    textStyle: {
                        fontWeight: 600,              //标题颜色
                        color: '#222',
                        fontSize: 15
                    }
                },
                legend3: {
                    data: ['男', '女',],
                    top: 680
                },
                // X轴
                xAxis3: {
                    data: [
                        '违规人数', '晚归', '夜不归宿', '蜗居'
                    ],
                    splitLine: {
                        show: false
                    },
                    axisTick: {length: 4},
                    axisLabel: {
                        interval: 0,
                        rotate: -15
                    }
                },
                // Y轴
                yAxis3: {},
                // 数据
                series3: [
                    {
                        name: '男',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [],
                    },
                    {
                        name: '女',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [],
                    },
                ]
            }
        },
    }
</script>

<style scoped>

    .main {
        min-width: 990px;
        margin-left: 230px;
        /*margin-right: 50px;*/
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

    #myChart {
        height: 500px;
        /*width: 300px;*/
    }

</style>