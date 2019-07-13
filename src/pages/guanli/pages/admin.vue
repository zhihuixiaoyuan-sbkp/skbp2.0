<!--<script src="../../../../../SCC_2/.eslintrc.js"></script>-->
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
            <div style="display: inline-block;margin-left:20px">
                <span class="demonstration">选择部门</span>
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
                <el-button icon="el-icon-search" @click="searchInfo">查询</el-button>
            </div>
        </div>
        <el-divider class="el-divider"></el-divider>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="处理" name="dealWith">

                <div v-if="isnull">
                    <div class="tableBox">
                        <span class="dataText">{{nowDate}}</span>
                        <div class="rowBox" style="text-align: center">
                            <el-divider class="el-divider"></el-divider>
                            <span style="font-size: 20px;text-align: center">今日无数据</span>
                        </div>
                        <div class="rowBox">
                            <el-divider class="el-divider"></el-divider>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="tableBox">
                        <span class="dataText">{{nowDate}}</span>
                        <div class="rowBox" v-for="item in logList">
                            <el-divider class="el-divider"></el-divider>
                            <span style="font-size: 20px">
                            <span>{{item.dateTime}}</span>
                            <span>{{item.dept}}账号{{item.account}}处理{{item.name}}的报警信息</span>
                        </span>
                            <span style="position: absolute;right: 50px">
                            <el-button type="danger" icon="el-icon-delete" circle
                                       @click='opendelete(item.id)'></el-button>
                        </span>
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
                </div>

            </el-tab-pane>
            <el-tab-pane label="删除" name="delete">
                <div v-if="isnull">
                    <div class="tableBox">
                        <span class="dataText">{{nowDate}}</span>
                        <div class="rowBox" style="text-align: center">
                            <el-divider class="el-divider"></el-divider>
                            <span style="font-size: 20px;text-align: center">无数据</span>
                        </div>
                        <div class="rowBox">
                            <el-divider class="el-divider"></el-divider>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="tableBox">
                        <span class="dataText">{{nowDate}}</span>
                        <div class="rowBox" v-for="item in logList">
                            <el-divider class="el-divider"></el-divider>
                            <span style="font-size: 20px">
                            <span>{{item.dateTime}}</span>
                            <span>{{item.dept}}账号{{item.account}}处理{{item.name}}的报警信息</span>
                        </span>
                            <span style="position: absolute;right: 50px">
                            <el-button type="danger" icon="el-icon-delete" circle
                                       @click='opendelete(item.id)'></el-button>
                        </span>
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
                isSearch: true,//标记是否为查询后的状态
                isnull: false,
                nowDate: (new Date()).toLocaleDateString(),
                value: "保卫处",
                dept: "",
                notDelete: true,//标记是否为删除选项卡
                valueTime: new Date(),
                logList: [],
                curPage: 1,
                totalCount: 0,
                activeName: "dealWith",
                options: [
                    {
                        value: '保卫处',
                        label: '保卫处'
                    },
                    {
                        value: '心理健康中心',
                        label: '心理健康中心'
                    },
                    {
                        value: '辅导员',
                        label: '辅导员'
                    },
                ]
            }
        },
        methods: {
            opendelete(id) {//element模态框
                this.$alert('<div style="text-align: center;width: 100%;border-top: 1px solid gainsboro;border-bottom:1px solid gainsboro" >' +
                    '<div style="height: 100%;width: 180px;position: relative;right: 0;left: 0;margin: auto;text-align: left;">' +
                    '<span style="display: block;margin-top: 10px;color: red">确认删除这条日志信息吗?</span>' +
                    '</div>' +
                    '</div>', "确认删除", {
                    showConfirmButton: true,
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true
                })
                    .then(() => {
                            this.deleteInfo(id)
                        }
                        //

                    )
                    .catch(() => {
                            this.$message(
                                {
                                    type: "success",
                                    message: "已取消"
                                }
                            )
                        }
                    );
            },
            /*删除日志记录*/
            deleteInfo(id) {
                axios.post(this.api + "/sbkp/admin/adminDeleteLoging", qs.stringify({log_id: id}))
                    .then(this.deleteCallback)
                    .catch(function () {
                        console.log("请求失败")
                    })
            },
            deleteCallback(res) {
                if (this.notDelete && this.isSearch) { //处于处理选卡，且没有进行搜索
                    this.getAdminHandle()
                }
                if(this.notDelete && !this.isSearch){ //处于处理选项卡，且进行了搜索
                    this.getAdminHandleSearch()
                }
                if (!this.notDelete && this.isSearch) { //处于删除选卡，且没有进行搜索
                    this.getAdminDelete()
                }
                if(!this.notDelete && !this.isSearch){ //处于删除选项卡，且进行了搜索
                    this.getAdminDeleteSearch()
                }
                let data = res.data
                if (data.status === "ok") {
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    })
                }
            },

            /*点击分页事件*/
            pageChange(val) {
                this.curPage = val
                if (this.notDelete && this.isSearch) { //处于处理选卡，且没有进行搜索
                    this.getAdminHandle()
                }
                if(this.notDelete && !this.isSearch){ //处于处理选项卡，且进行了搜索
                    this.getAdminHandleSearch()
                }
                if (!this.notDelete && this.isSearch) { //处于删除选卡，且没有进行搜索
                    this.getAdminDelete()
                }
                if(!this.notDelete && !this.isSearch){ //处于删除选项卡，且进行了搜索
                    this.getAdminDeleteSearch()
                }
            },

            /*选项卡切换事件*/
            handleClick(event) {
                this.curPage = 1
                this.notDelete = !this.notDelete
                if (this.notDelete) {
                    this.getAdminHandle()
                } else {
                    this.getAdminDelete()
                }
            },

            /*日期选择触发事件*/
            selectDate() {

            },

            /*搜索触发事件*/
            searchInfo() {
                this.isSearch = false
                this.nowDate = this.valueTime.toLocaleDateString()
                if (this.notDelete) {
                    this.getAdminHandleSearch()
                } else {
                    this.getAdminDeleteSearch()
                }

            },

            /*时间转化函数*/
            timeTool(date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },

            /*搜索获取日志操作列表*/
            getAdminHandleSearch() {
                axios.post(this.api + "/sbkp/admin/getAdminHandleSearch", qs.stringify(
                    {
                        curPage: 1,
                        dept: this.value,
                        date: this.timeTool(this.valueTime)
                    }))
                    .then(
                        this.getAdminHandleSearchCallback
                    )
                    .catch(function () {
                        console.log('出错了')
                    })

            },
            getAdminHandleSearchCallback(res) {
                let data = res.data
                if (data.msg === "null") {
                    this.isnull = true
                } else {
                    this.isnull = false
                }
                console.log(data)
                this.logList = data.msg.lists
                this.totalCount = data.msg.totalCount
                this.curPage = data.msg.curPage
                this.dept = this.value
            },

            /*搜索删除日志列表*/
            getAdminDeleteSearch() {
                axios.post(this.api + "/sbkp/admin/getAdminDeleteSearch", qs.stringify(
                    {
                        curPage: 1,
                        dept: this.value,
                        date: this.timeTool(this.valueTime)
                    }))
                    .then(
                        this.getAdminDeleteSearchCallback
                    )
                    .catch(function () {
                        console.log('出错了')
                    })

            },
            getAdminDeleteSearchCallback(res) {
                let data = res.data
                if (data.msg === "null") {
                    this.isnull = true
                } else {
                    this.isnull = false
                }
                console.log(data)
                this.logList = data.msg.lists
                this.totalCount = data.msg.totalCount
                this.curPage = data.msg.curPage
                this.dept = this.value
            },

            /*未搜索初始化处理数据*/
            getAdminHandle() {
                axios.post(this.api + "/sbkp/admin/getAdminHandle", qs.stringify({curPage: this.curPage}))
                    .then(this.getAdminHandleCallback)
                    .catch(function () {
                        console.log("请求出错")
                    })
            },
            getAdminHandleCallback(res) {
                let data = res.data
                if (data.msg === "null") {
                    this.isnull = true
                } else {
                    this.isnull = false
                }
                console.log(data)
                this.logList = data.msg.lists
                this.totalCount = data.msg.totalCount
            },

            /*未搜索初始化删除数据*/
            getAdminDelete() {
                axios.post(this.api + "/sbkp/admin/getAdminDelete", qs.stringify({
                    curPage: this.curPage
                }))
                    .then(this.getAdminDeleteCallback)
                    .catch(function () {
                        console.log("出错了")
                    })
            },
            getAdminDeleteCallback(res) {
                let data = res.data
                if (data.msg === "null") {
                    this.isnull = true
                } else {
                    this.isnull = false
                }
                this.logList = data.msg.lists
                this.totalCount = data.msg.totalCount
            }
        },
        mounted() {
            this.getAdminHandle()
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
        margin-right: 30px;
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