<template>
    <div id="bar" ref="bar"></div>
</template>
<style>
    #bar {
        width: 100%;
        height: 700px;
        top:-35px;
        margin-top: 20px;
        /*margin: 0 auto;*/
    }
</style>
<script>
    // 引入完整的echarts
    import echarts from 'echarts'
    export default {
        props:{
            flag:{
                type:String,
                default:"0"
            },
            echartStyle: {
                type: Object,
                default() {
                    return {}
                }
            },
            tooltipFormatter: {
                type: String,
                default: ''
            },
            seriesName: {
                type: String,
                default: ''
            },
            title:{
                text:String,
                top: Number,
                left: String
            },
            legend: {
                data: Array,
                top: Number
            },
            xAxis: {
                data: Array
            },
            yAxis: {},
            series: Array

        },
        mounted () {
            // 调用绘制图表的方法
            this.draw(this.flag);
        },
        methods: {
            draw (flag) {
                // 实例化echarts对象
                var myChart = echarts.init(this.$refs.bar)
                // 绘制条形图
                myChart.setOption({
                    title:this.title ,
                    grid:{
                        top:30,
                        y:40,
                        x:100,
                        x2:250,
                        borderWidth:1
                    },
                    tooltip: {
                        trigger: 'item',
                    },
                    legend: this.legend,
                    // X轴
                    xAxis: this.xAxis,
                    // Y轴
                    yAxis: flag === "0" ? [{
                        name: '人数',
                        minInterval: 1,
                        splitLine:{
                            show:true
                        },
                    },
                        {
                            type: 'value',
                            name: '违规人员',
                            axisLabel: {
                                formatter: '{value}人'
                            },
                            splitLine: {
                                show: true
                            }
                        }
                    ] : [{
                        name: '人数',
                        minInterval: 1,
                        splitLine:{
                            show:true
                        },
                    }
                    ],
                    // 数据
                    series: this.series
                })
            }
        }
    }
</script>
