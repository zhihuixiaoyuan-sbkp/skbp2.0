<template>
    <div class="main">
        <div style="margin-right: 30px;text-align: right">
            <div class="block" style="display: inline-block">
                <span class="demonstration">选择日期</span>
                <el-date-picker
                        v-model="valueTime"
                        type="date"
                        placeholder="选择日期"
                        @change="selectDate"
                        value-format="yyyy-MM-dd"
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

            <label class="btn2" for="inputid4" v-if="isSearch">
                <svg class="icon icon-back icons" aria-hidden="true">
                    <use xlink:href="#icon-daoChu"></use>
                </svg>
                <form action="" method="get">
                    <input id="inputid4" type="submit" hidden @click="exportInfo" />
                </form>

            </label>
            <label class="btn2" for="inputid5" v-else>
                <svg class="icon icon-back icons" aria-hidden="true">
                    <use xlink:href="#icon-daoChu"></use>
                </svg>
                <form action="" method="get" @submit="exportInfo">
                    <input  type="text" v-model="valueTime" name="date" hidden />
                    <input  type="text" hidden v-model="value"  name="college"/>
                    <input id="inputid5" type="submit" hidden />
                </form>

            </label>

            <div style="display: inline-block;margin-left: 20px">
                <el-button icon="el-icon-search" @click="searchInfo">查询</el-button>
            </div>
        </div>
        <el-table
                :data="tableData"
                border
                style="width: 90%; margin-top: 40px">
            <el-table-column
                    align="center"
                    label="序号"
                    type=index
                    width="60">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="stuNum"
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
                    prop="gender"
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
                    prop="proClass"
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
                    prop="location"
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
                    prop="dateTime"
                    label="时间">
            </el-table-column>
        </el-table>
        <div class="foot">
            <el-pagination
                    background
                    @current-change="pageChange"
                    layout="prev, pager, next"
                    :total='totalCount'>
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
                isSearch: true,//是否搜索
                options: [{
                    value: '计算机与软件工程学院',
                    label: '计算机与软件工程学院'
                }, {
                    value: '机械工程学院',
                    label: '机械工程学院'
                }, {
                    value: '艺术设计学院',
                    label: '艺术设计学院'
                }, {
                    value: '大数据与人工智能学院',
                    label: '大数据与人工智能学院'
                }, {
                    value: '通识教育与外国语学院',
                    label: '通识教育与外国语学院'
                },
                    {
                        value: '管理工程学院',
                        label: '管理工程学院'
                    }],
                value: '',//选择学院值
                valueTime: "",//选择时间值
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
                pageSize: "",//每页大小
                curPage: ""   //当前页
            }
        },
        methods: {

            /*导出数据提示框*/

            /*提示框*/
            open() {//element模态框
                this.$message({
                    type: 'warning',
                    message: "请选择对应筛选条件"
                });
            },
            /*搜索异步请求*/
            searchInfo() {
                if (this.value === "" || this.valueTime === "") {
                    this.open()
                } else {
                    this.isSearch = true
                    let searchParams = {
                        curPage: this.curPage,
                        college: this.value,
                        date: this.valueTime
                    }
                    axios.post(this.api + "/sbkp/census/getRulesListBySearch", qs.stringify(searchParams))
                        .then(this.getSearchRulesListInfoCallback)
                        .catch(function () {
                            this.isSearch = false
                        })
                }

            },
            /*搜索回调函数*/
            getSearchRulesListInfoCallback(res) {
                this.isSearch = false
                let data = res.data
                console.log(data)
                this.tableData = data.msg.lists.reverse()
                this.totalCount = data.msg.totalCount
                this.curPage = data.msg.curPage

            },
            /*表格导出*/
            exportInfo() {
                if (this.isSearch) {
                    document.getElementsByTagName("form")[1].action = this.api + "/sbkp/census/exportAllRulesList"
                } else {
                    document.getElementsByTagName("form")[1].action = this.api + "/sbkp/census/exportRulesListBySearch"
                }

            },

            /*分页点击事件 */
            pageChange(val) { //翻页页码号
                this.params.curPage = val
                this.getRulesListInfo()
            },

            /*选择时间进行筛选*/
            selectDate() {
                // this.valueTime = new Date(this.valueTime)

                console.log(this.valueTime)
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
                console.log(data)
                this.tableData = data.msg.lists.reverse()
                this.totalCount = data.msg.totalCount
                this.curPage = data.msg.curPage
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

    .main .btn2 {
        width: 30px;
        position: absolute;
        display: inline-block;
        right: 109px;
        margin-top: 45px
    }

    .main .btn2 .icons {
        height: 30px;
        width: 30px;
    }

</style>