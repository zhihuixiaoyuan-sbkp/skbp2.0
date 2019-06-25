<template>
    <div class="main">
        <div style="margin-right: 30px;text-align: right">
            <div class="block" style="display: inline-block">
                <span class="demonstration">选择日期</span>
                <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期"
                        @change="selectDate"
                >
                </el-date-picker>
            </div>
            <div style="display: inline-block;margin-left:20px">
                <span class="demonstration">选择学院</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="display: inline-block;margin-left: 20px">
                <el-button icon="el-icon-search">查询</el-button>
            </div>
        </div>
        <el-table
                :data="tableData"
                border
                style="width: 90%; margin-top: 40px">
            <el-table-column
                    align="center"
                    prop="num"
                    label="序号"
                    width="60">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="stu_Num"
                    label="学号"
                    width="140">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="name"
                    label="姓名"
                    width="80">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="sex"
                    label="性别"
                    width="80">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="college"
                    label="学院">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="className"
                    label="班级"
                    width="120">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="instructor"
                    label="辅导员"
                    width="80">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="buildNum"
                    label="楼栋号"
                    width="80">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="reason"
                    label="原因">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="time"
                    label="时间">
            </el-table-column>
        </el-table>
        <div class="foot">
            <el-pagination
                    background
                    @current-change="pageChange"
                    layout="prev, pager, next"
                    :total='22'>
            </el-pagination>
        </div>

    </div>

</template>

<script>
    import axios from 'axios'
    import qs from 'qs'

    export default {
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '计算机与软件工程学院'
                }, {
                    value: '选项2',
                    label: '机械工程学院'
                }, {
                    value: '选项3',
                    label: '艺术设计学院'
                }, {
                    value: '选项4',
                    label: '大数据与人工智能学院'
                }, {
                    value: '选项5',
                    label: '通识教育与外国语学院'
                },
                    {
                        value: '选项6',
                        label: '管理工程学院'
                    }],
                value: '计算机与软件工程学院',
                value1: new Date(),
                tableData: [{//初始数据结构
                    college: "",
                    date_time: "",
                    instructor: "",
                    name: "",
                    num: "",
                    reason: "",
                    stu_num: ""

                }],
                search: '',
                params: {//请求参数
                    curPage: 1
                },
                totalCount: 0,//总条数
                totalPage: "",//总页数
                pageSize: ""//每页大小
            }
        },
        methods: {
            /*分页点击事件 */
            pageChange(val) { //翻页页码号
               this.params.curPage = val
                this.getRulesListInfo()
            },

            /*选择时间进行筛选*/
            selectDate() {
                console.log(new Date(this.value1).toLocaleDateString())
            },

            /*获取违规名单异步请求*/
            getRulesListInfo() {
                axios.post(this.api + "/sbkp/census/getRulesListInfo", qs.stringify(this.params))
                    .then(this.getRulesListInfoCallback)
                    .catch(
                        function () {
                            console.log("请求出错")
                        }
                    )
            },

            /*获取违规名单回调函数*/
            getRulesListInfoCallback(res) {
                let data = res.data
                this.tableData = data.list
                this.totalCount = data.totalCount
            }


        },
        mounted() {
            this.getRulesListInfo()
        }
    }
</script>
<style>
    .main {
        min-width: 990px;
        margin-left: 230px;
        margin-top: 10px;
    }

    .main .foot {
        width: 90%;
        text-align: center;
        margin-top: 30px;
    }

</style>