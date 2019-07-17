<template>
    <table class="list" id="table">
        <!--表头-->
        <thead>
        <tr class="header">
            <td>序号</td>
            <td>学号</td>
            <td>姓名</td>
            <td>性别</td>
            <td>学院</td>
            <td>专业班级</td>
            <td>添加原因</td>
            <td v-show="showSchoolStatus">在校状态</td>
            <td v-show="showXinli">状态</td>
            <td>更多操作</td>
        </tr>
        </thead>
        <!--内容-->
        <tbody v-for="(item,index) in personList" v-show="showList">
        <tr class="body">
            <td>{{index+1}}</td>
            <td>{{item.stuNum}}</td>
            <td>{{item.name}}</td>
            <td>{{item.gender}}</td>
            <el-tooltip class="item" effect="light" :content=item.college placement="right">
                <td>{{item.college}}</td>
            </el-tooltip>
            <td>{{item.proClass}}</td>
            <el-tooltip class="item" effect="light" :content=item.reasonNames placement="right">
                <td>{{item.reasonNames}}</td>
            </el-tooltip>
            <!--在校状态-->
            <td v-show="showSchoolStatus">{{item.schoolStatus}}</td>
            <!--状态-->
            <td v-show="showXinli">{{item.mentalStatus}}</td>
            <!--操作-->
            <td>
                <router-link class="iconfont operation" :to="{path:historyPath,query:{id:item.id}}">
                    &#xe685;
                </router-link>
                <router-link class="iconfont operation" to="/Footprint" v-show="showFootprint">&#xe677;
                </router-link>
                <span class="iconfont operation" @click="modyfyId(item.id)">&#xe64b;</span>
                <span class="iconfont operation" @click="deleteId(item.id)">&#xe639;</span>
            </td>
        </tr>
        </tbody>
        <tbody v-show="showMessage">
        <td class="message" colspan="9">
            暂无数据
        </td>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "personTable",
        data() {
            return {
                showList: false,
                historyPath: '',
                showFootprint: false,
                showSchoolStatus: true,
                showXinli: false,
                showMessage: false,
            }
        },
        props: {
            personList: Array,
            curPath: String
        },
        methods: {
            // 操作完成更新数据表
            modyfyId(id) {
                this.$emit('getModyfyId', id);
            },

            deleteId(id) {
                this.$emit('getDeleteId', id);
            }
        },
        watch: {
            curPath: function (newVal, oldVal) {
                // 保卫处
                if (newVal === '/List' || newVal === '/Search') {
                    this.showFootprint = true;
                    this.historyPath = '/History';
                }
                // 辅导员
                if (newVal === '/keyPersonList' || newVal === '/stulistSearch') {
                    this.historyPath = '/fudaoHistory';
                }
                // 心理健康中心
                if (newVal === '/abnormalList' || newVal === '/listSearch') {
                    this.showXinli = true;
                    this.showSchoolStatus = false;
                    this.historyPath = '/xinliHistory';
                }
            },

            personList: function (newVal, oldVal) {
                if (newVal.length === 0) {
                    this.showList = false;
                    this.showMessage = true;
                } else {
                    this.showList = true;
                    this.showMessage = false;
                }
            }
        },
    }
</script>

<style scoped>
    table {
        table-layout: fixed;
    }

    td {
        width: 100%;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-bottom: 1px solid #BBBBBB;
        outline: none;
    }

    /*表格*/
    .list {
        width: 100%;
        border: 0;
        border-collapse: collapse;
        text-align: center;
    }

    /*表头*/
    .header {
        height: 40px;
        font-size: 18px;
        color: #4D4C4D;
    }

    /*主体*/
    .body {
        height: 60px;
        border-left: 1px solid #BBBBBB;
        border-right: 1px solid #BBBBBB;
        font-size: 20px;
        color: #5C5B5C;
    }

    .item {
        margin: 4px;
    }

    /*操作*/
    .operation {
        font-size: 25px;
        cursor: pointer;
        color: #5C5B5C;
    }

    .operation:hover {
        color: #457aec;
        text-decoration: transparent
    }

    .message {
        height: 200px;
        line-height: 200px;
        text-align: center;
        color: #909399;
    }
</style>