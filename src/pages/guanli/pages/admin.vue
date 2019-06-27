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
                <div class="tableBox">
                    <span class="dataText">今日</span>
                    <div class="rowBox">
                        <el-divider class="el-divider"></el-divider>
                        <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
                    </div>
                    <div class="rowBox">
                        <el-divider class="el-divider"></el-divider>
                    </div>

                </div>
            </el-tab-pane>
            <el-tab-pane label="删除" name="delete">
                <div class="tableBox">
                    <span class="dataText">今日</span>
                    <div class="rowBox">
                        <el-divider class="el-divider"></el-divider>
                        <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
                    </div>
                    <div class="rowBox">
                        <el-divider class="el-divider"></el-divider>
                    </div>

                </div>
            </el-tab-pane>


        </el-tabs>
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
    import axios from "axios"
    import qs from "qs"

    export default {
        name: "admin",
        data() {
            return {
                value: "保卫处",
                dept:"",
                valueTime: new Date(),
                logList: [],
                curPage: "",
                totalCount: 0,
                activeName: "dealWith",
                options: [
                    {
                    value: '保卫处',
                    label: '保卫处'
                },
                    {
                        value: '学生处',
                        label: '学生处'
                    },
                    {
                        value: '心理健康处',
                        label: '心理健康中心'
                    },]
            }
        },
        methods: {
            pageChange(val) {
                this.curPage = val
                this.getLogingHandleSearch()
            },
            handleClick(event) {
                console.log(event.name)

            },
            selectDate() {

            },
            searchInfo() {
                this.getLogingHandleSearch()
            },
            timeTool(date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            /*获取日志操作列表*/
            getLogingHandleSearch() {
                axios.post(this.api + "/sbkp/loging/getLogingHandleSearch", qs.stringify(
                    {
                        curPage: 1,
                        dept: this.value,
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
                this.curPage = data.msg.curPage
                this.dept = this.value
            }
        },
        mounted() {
            this.getLogingHandleSearch()
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