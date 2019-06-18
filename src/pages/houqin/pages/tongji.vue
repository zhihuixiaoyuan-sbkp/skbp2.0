<template>
    <div class="main">
        <div style="height: 100%" v-if="isView">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="信息统计表-学院" name="second" style="height: 100%"  >
                    <div class="head_box">
                        <span class="text">更新时间: 2019/06/04 13:00</span>
                        <div class="btn">
                            <el-button type="success"  @click="initView">切换表格</el-button>
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
                </el-tab-pane>
                <el-tab-pane label="违规人数统计-楼栋" name="sss " style="height: 100%" >
                    <div>
                        <div class="head_box">
                            <span class="text">更新时间: 2019/06/04 13:00</span>
                            <div class="btn">
                                <el-button type="success"  @click="initView">切换表格</el-button>
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
                <el-tab-pane label="违规人数统计-性别" name="fourth" style="height: 100%" >
                    <div class="head_box">
                        <span class="text">更新时间: 2019/06/04 13:00</span>
                        <div class="btn">
                            <el-button type="success" @click="initView ">切换表格</el-button>
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
       <div v-else>
           <el-tabs v-model="activeName1" @tab-click="handleClick1">
               <el-tab-pane label="信息统计表-学院" name="xueyuan" >
                   <div class="head_box head_box1">
                       <span class="text">更新时间: 2019/06/04 13:00</span>
                       <div class="btn2">
                           <svg class="icon icon-back icons" aria-hidden="true">
                               <use xlink:href="#icon-daoChu"></use>
                           </svg>
                       </div>
                       <div class="btn">
                           <el-button type="success" @click="initView">切换图表</el-button>
                       </div>

                   </div>
                   <el-table
                           :data="tableData"
                           border
                           style="width: 90%; margin-top: 40px">
                       <el-table-column
                               prop="xueyuan"
                               :label='name'
                               width="180">
                       </el-table-column>
                       <el-table-column
                               prop="weiguirenshu"
                               label="违规人数"
                               width="180">
                       </el-table-column>
                       <el-table-column
                               prop="wangui"
                               label="晚归">
                       </el-table-column>
                       <el-table-column
                               prop="yebuguisu"
                               label="夜不归宿">
                       </el-table-column>
                       <el-table-column
                               prop="woju"
                               label="蜗居">
                       </el-table-column>
                   </el-table>
               </el-tab-pane>
               <el-tab-pane label="违规人数统计-楼栋" name="loudong" >
                   <div class="head_box head_box1">
                       <span class="text">更新时间: 2019/06/04 13:00</span>
                       <div class="btn2">
                           <svg class="icon icon-back icons" aria-hidden="true">
                               <use xlink:href="#icon-daoChu"></use>
                           </svg>
                       </div>
                       <div class="btn">
                           <el-button type="success" @click="initView">切换图表</el-button>
                       </div>

                   </div>
                   <el-table
                           :data="tableData"
                           border
                           style="width: 90%; margin-top: 40px">
                       <el-table-column
                               prop="xueyuan"
                               :label='name'
                               width="180">
                       </el-table-column>
                       <el-table-column
                               prop="weiguirenshu"
                               label="违规人数"
                               width="180">
                       </el-table-column>
                       <el-table-column
                               prop="wangui"
                               label="晚归">
                       </el-table-column>
                       <el-table-column
                               prop="yebuguisu"
                               label="夜不归宿">
                       </el-table-column>
                       <el-table-column
                               prop="woju"
                               label="蜗居">
                       </el-table-column>
                   </el-table>
               </el-tab-pane>
               <el-tab-pane label="违规人数统计-性别" name="xingbie" >
                   <div class="head_box head_box1">
                       <span class="text">更新时间: 2019/06/04 13:00</span>
                       <div class="btn2">
                           <svg class="icon icon-back icons" aria-hidden="true">
                               <use xlink:href="#icon-daoChu"></use>
                           </svg>
                       </div>
                       <div class="btn">
                           <el-button type="success" @click="initView">切换图表</el-button>
                       </div>

                   </div>
                   <el-table
                           :data="tableData"
                           border
                           style="width: 90%; margin-top: 40px">
                       <el-table-column
                               prop="xueyuan"
                               :label='name'
                               width="180">
                       </el-table-column>
                       <el-table-column
                               prop="weiguirenshu"
                               label="违规人数"
                               width="180">
                       </el-table-column>
                       <el-table-column
                               prop="wangui"
                               label="晚归">
                       </el-table-column>
                       <el-table-column
                               prop="yebuguisu"
                               label="夜不归宿">
                       </el-table-column>
                       <el-table-column
                               prop="woju"
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

    export default {
        name: "tongji",
        components: {
            bar
        },

        data() {
            return {
                isView:true,//图表与表格切换控制
                name:"学院",//头部
                tableData: [{
                    xueyuan: '计算机与软件工程学院',
                    weiguirenshu: 100,
                    wangui: 40,
                    yebuguisu:20,
                    woju:40
                },],
                    ischart0:false,
                ischart1:false,
                activeName: 'second',
                activeName1:"xueyuan",
                a: '统计数据',
                b: '人数',
                c: ['管理工程学院', '计算机与软件工程学院', '大数据与人工智能学院', '艺术设计学院', '机械工程学院', '通识教育与外国语学院'],
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
                    top: 660
                },
                // X轴
                xAxis: {
                    data: [
                        '管理工程学院', '计算机与软件工程学院', '大数据与人工智能学院', '艺术设计学院', '机械工程学院', '通识教育与外国语学院'
                    ],
                    splitLine: {
                        show: false
                    },
                },
                // Y轴
                yAxis: {},
                // 数据
                series: [
                    {
                        name: '违规人员人数',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [20, 50, 30, 10, 70, 80],

                    },
                    {
                        name: '晚归',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [30, 50, 30, 10, 40, 50]
                    },
                    {
                        name: '夜不归宿',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [20, 50, 40, 10, 20, 30]
                    },
                    {
                        name: '蜗居',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [20, 50, 30, 10, 20, 30]
                    },

                ],


                a2: '统计数据',
                b2: '人数',
                c2: ['管理工程学院', '计算机与软件工程学院', '大数据与人工智能学院', '艺术设计学院', '机械工程学院', '通识教育与外国语学院'],
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
                    top: 660
                },
                // X轴
                xAxis2: {
                    data: [
                        'A17', 'A18', 'A19', 'A20', 'A21', 'A22'
                    ],
                    splitLine: {
                        show: false
                    },
                },
                // Y轴
                yAxis2: {},
                // 数据
                series2: [
                    {
                        name: '违规人员人数',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [20, 50, 30, 10, 70, 80],

                    },
                    {
                        name: '晚归',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [30, 50, 30, 10, 40, 50]
                    },
                    {
                        name: '夜不归宿',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [20, 50, 40, 10, 20, 30]
                    },
                    {
                        name: '蜗居',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [20, 50, 30, 10, 20, 30]
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
                    top: 660
                },
                // X轴
                xAxis3: {
                    data: [
                        '违规人数', '晚归', '夜不归宿', '蜗居'
                    ],
                    splitLine: {
                        show: false
                    },
                    axisTick: {length:4},
                },
                // Y轴
                yAxis3: {},
                // 数据
                series3: [
                    {
                        name: '男',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [20, 50, 30, 10],
                    },
                    {
                        name: '女',
                        type: 'bar',
                        barMaxWidth: 20,
                        data: [30, 50, 30, 10],
                    },
                    ]
            }
        },
        mounted() {

        },
        methods: {
            handleClick(event) {
                console.log(event.index)
                if(event.index === '1') {
                    console.log(123)
                this.ischart0 = true
                }
                if(event.index === '2') {
                    console.log(123)
                    this.ischart1 = true
                }
            },
            handleClick1(event){
                // console.log(event.name)
                if(event.name === 'loudong'){
                    this.name = "楼栋"
                    console.log(this.name)
                }
                if(event.name === "xingbie"){
                    this.name = "性别"
                    console.log(this.name)
                }
                if(event.name === "xueyuan"){
                    this.name = "学院"
                    console.log(this.name)
                }
            },
            initView(){//图表表格切换
                console.log(123)
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
    }

    .main .head_box {
        width: 100%;
        position: relative;
        z-index: 999;
        top: 5px;
    }
    .main  .head_box1{
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
    .main .head_box .btn2 .icons{
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