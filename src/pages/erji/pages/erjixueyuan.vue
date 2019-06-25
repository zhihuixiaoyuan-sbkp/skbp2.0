<template>
    <div class="main">
        <div v-if="isView">
            <div class="head_box">
                <span class="text">更新时间: 2019/06/04 13:00</span>
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
                    <span class="text">更新时间: 2019/06/04 13:00</span>
                    <div class="btn2">
                        <svg class="icon icon-back icons" aria-hidden="true">
                            <use xlink:href="#icon-daoChu"></use>
                        </svg>
                    </div>
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
                            prop="personCount"
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
                                prop="undisposed"
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

    export default {
        name: "erjixueyuan",
        data() {
            return {
                isView:true,//切换表格/图表
                tableData: [
                    {
                        college: "汤菲菲",
                        personCount: 60,
                        processed: 30,
                        undisposed: 30
                    },
                    {
                        college: "夏琳",
                        personCount: 80,
                        processed: 40,
                        undisposed: 40
                    },
                    {
                        college: "袁卫家",
                        personCount: 100,
                        processed: 30,
                        undisposed: 70
                    },
                    {
                        college: "伍祥",
                        personCount: 90,
                        processed: 40,
                        undisposed: 50
                    },
                    {
                        college: "朱洪军",
                        personCount: 90,
                        processed: 40,
                        undisposed: 50
                    },
                    {
                        college: "高超",
                        personCount: 90,
                        processed: 40,
                        undisposed: 50
                    },
                    {
                        college: "朱伟杰",
                        personCount: 90,
                        processed: 40,
                        undisposed: 50
                    }

                ],
                a: '统计数据',
                b: '人数',
                c: ['汤菲菲', '夏琳', '袁卫家', '伍祥', '朱洪军', '高超',"朱伟杰"],
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
                    data: ['汤菲菲', '夏琳', '袁卫家', '伍祥', '朱洪军', '高超',"朱伟杰"],
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
                        data: [20, 50, 30, 10, 70, 80,30],

                    },
                    {
                        name: '报警通知已处理',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [30, 50, 30, 10, 40, 50,40]
                    },
                    {
                        name: '报警通知未处理',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [20, 50, 40, 10, 20, 30,50]
                    },

                ],
            }
        },
        components: {
            bar
        },
        methods:{
            clickView(){
                this.isView = !this.isView
            }
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