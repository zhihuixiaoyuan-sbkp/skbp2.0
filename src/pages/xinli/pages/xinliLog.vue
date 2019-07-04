<template>
    <div class="main">
        <div style="text-align: right;margin-right: 10px">
            <div class="block" style="display: inline-block">
                <span class="demonstration">选择日期</span>
                <el-date-picker
                        v-model="valueTime"
                        type="date"
                        placeholder="选择日期"
                        @change="selectDate"
                >
                </el-date-picker>
            </div>
            <div style="display: inline-block;margin-left: 20px" v-if="notDelete">
                <el-button icon="el-icon-search" @click="searchInfo">查询</el-button>
            </div>
            <div style="display: inline-block;margin-left: 20px" v-else>
                <el-button icon="el-icon-search" @click="searchInfo1">查询</el-button>
            </div>
        </div>
        <el-divider class="el-divider"></el-divider>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="处理" name="dealWith">
                <div class="tableBox">
                    <span class="dataText">今日</span>
                    <div class="rowBox">
                        <el-divider class="el-divider"></el-divider>
                        <el-table
                                :data="logList"
                                style="width: 100%"
                                align="center">
                            <el-table-column
                                    align="center"
                                    type=index
                                    label="序号"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="stuNum"
                                    label="学号"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="name"
                                    label="姓名">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="gender"
                                    label="性别"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="proClass"
                                    label="专业班级">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="actionName"
                                    label="行为描述">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="dateTime"
                                    label="违规时间">
                            </el-table-column>

                            <el-table-column
                                    align="center"
                                    prop="status"
                                    label="状态"
                                    width="80"
                                    :formatter="filterStatus">
                            </el-table-column>
                            <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop=""-->
                            <!--label="备注">-->
                            <!--</el-table-column>-->
                            <el-table-column
                                    align="center"
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                            background="red"
                                            size="mini"
                                            @click="handleEdit(scope.row.id)">撤销
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="rowBox">
                        <el-divider class="el-divider"></el-divider>
                    </div>

                </div>
                <div class="foot">
                    <el-pagination
                            background
                            @current-change="pageChange"
                            layout="prev, pager, next"
                            :total='totalCount'>
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="删除" name="delete">
                <div class="tableBox">
                    <span class="dataText">今日</span>
                    <div class="rowBox">
                        <el-divider class="el-divider"></el-divider>
                        <el-table
                                :data="logList"
                                style="width: 100%"
                                align="center">
                            <el-table-column
                                    align="center"
                                    type=index
                                    label="序号"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="stuNum"
                                    label="学号"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="name"
                                    label="姓名">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="gender"
                                    label="性别"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="proClass"
                                    label="专业班级">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="reason"
                                    label="原因">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="deleteTime"
                                    label="删除时间">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="mindStatus"
                                    label="状态"

                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="操作"
                                    width="80">
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            @click="handleEdit(scope.row.id)">撤销
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="rowBox">
                        <el-divider class="el-divider"></el-divider>
                    </div>

                </div>
                <div class="foot">
                    <el-pagination
                            background
                            @current-change="pageChange1"
                            layout="prev, pager, next"
                            :total='totalCount'>
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import axios from "axios"
    import qs from "qs"

    export default {
        name: "admin",
        data() {
            return {
                notSearch:true,
                notDelete: true,
                dept: "",
                valueTime: new Date(),
                logList: [],
                curPage: 1,
                totalCount: 0,
                activeName: "dealWith",
                selectValue: ""//选项卡切换

            }
        },
        methods: {

            filterStatus(row, cellValue) {
                if (cellValue === 0) {
                    return "未处理"
                } else if (cellValue === 1) {
                    return "已处理"
                } else {
                    return "已忽略"
                }
            },
            /*选项卡切换*/
            handleClick(event) {
                this.notSearch = true
                this.valueTime = new Date()
                if(event.name === "delete"){
                    this.notDelete = false
                }
                if(event.name === 'dealWith'){
                    this.notDelete = true
                }
                console.log(this.notDelete)
                if(this.notDelete){
                    console.log(1)
                    this.getLogingHandle()
                }else {
                    console.log(2)
                    this.getLogingDelete()
                }


            },
            /*撤销操作*/
            handleEdit(id) {
                axios.post(this.api + "/sbkp/loging/logingRevoke", qs.stringify({log_id: id}))
                    .then(this.handleEditCallback)
                    .catch(() =>{
                        this.$message({
                            type: "danger",
                            message
                        })
                    })
            },
            /*撤销刷新列表*/
            handleEditCallback(){
                this.$message({
                    type: "success",
                    message:"撤销成功"
                })
                if (this.notDelete && this.notSearch) { //处于处理选卡，且没有进行搜索
                    this.getLogingHandle()
                }
                if(this.notDelete && !this.notSearch){ //处于处理选项卡，且进行了搜索
                    this.getLogingHandleSearch()
                }
                if (!this.notDelete && this.notSearch) { //处于删除选卡，且没有进行搜索
                    this.getLogingDelete()
                }
                if(!this.notDelete && !this.notSearch){ //处于删除选项卡，且进行了搜索
                    this.getLogingDeleteSearch()
                }
            },
            pageChange(val) {
                this.curPage = val
                if(this.notSearch){
                    this.getLogingHandle()
                }else{
                    this.getLogingHandleSearch()
                }
            },
            pageChange1(val) {
                console.log("123")
                this.curPage = val
                if(this.notSearch){
                    this.getLogingDelete()
                }else{
                    this.getLogingDeleteSearch()
                }
            },
            selectDate() {

            },
            searchInfo() {
                this.notSearch = false
                this.getLogingHandleSearch()
            },
            searchInfo1() {
                this.notSearch = false
                this.getLogingDeleteSearch()
            },
            timeTool(date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            /*获取日志处理列表*/
            getLogingHandleSearch() {
                axios.post(this.api + "/sbkp/loging/getLogingHandleSearch", qs.stringify(
                    {
                        curPage: this.curPage,
                        dept: "心理健康中心",
                        date: this.timeTool(this.valueTime)
                    }))
                    .then(
                        this.getLogingHandleSearchCallback
                    )
                    .catch(function () {
                        console.log('出错了')
                    })

            },
            getLogingHandleSearchCallback(res) {
                let data = res.data
                console.log(data)
                this.logList = data.msg.lists
                this.totalCount = data.msg.totalCount
            },
            /*获取删除日志列表*/
            getLogingDeleteSearch() {
                axios.post(this.api + "/sbkp/loging/getLogingDeleteSearch", qs.stringify(
                    {
                        curPage: this.curPage,
                        dept: "心理健康中心",
                        date: this.timeTool(this.valueTime)
                    }))
                    .then(
                        this.getLogingDeleteSearchCallback
                    )
                    .catch(function () {
                        console.log('出错了')
                    })

            },
            getLogingDeleteSearchCallback(res) {
                let data = res.data
                console.log(data)
                this.logList = data.msg.lists
                this.totalCount = data.msg.totalCount
            },
            /*初始化日志处理列表*/
            getLogingHandle(){
                axios.post(this.api + "/sbkp/loging/getLogingHandle",qs.stringify({
                    curPage:this.curPage,
                    dept:"心理健康中心"
                }))
                    .then(this.getLogingHandleSearchCallback)
                    .catch(function () {
                        console.log("请求出错")
                    })
            },
            getLogingDelete(){
                axios.post(this.api + "/sbkp/loging/getLogingDelete",qs.stringify({
                    curPage:this.curPage,
                    dept:"心理健康中心"
                }))
                    .then(this.getLogingDeleteSearchCallback)
                    .catch(function () {
                        console.log("请求出错")
                    })
            }
        },
        mounted() {
            this.getLogingHandle()
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

    .main .foot {
        width: 90%;
        text-align: center;
        margin-top: 30px;
    }

    .tableBox {
        border: 1px solid #ebedf0;
        /*text-align: center;*/
        position: relative
    }

    .tableBox .rowBox {
        width: 95%;
        position: relative;
        left: 0;
        right: 0;
        margin: auto;
    }

    .tableBox .rowBox span {
        display: inline-block;
        margin-left: 20px;
    }

    .tableBox .rowBox .el-divider {
        margin: 15px 0;
    }

    .main .el-divider {
        margin: 10px 0;
    }

    .tableBox .dataText {
        margin-left: 30px;
        margin-top: 10px;
        display: inline-block;
    }

</style>