<template>
    <table class="list">
        <!--表头-->
        <thead>
        <tr class="header">
            <td>序号</td>
            <td>学号</td>
            <td>姓名</td>
            <td>性别</td>
            <td>学院</td>
            <td>专业班级</td>
            <td>违规时间</td>
            <td>备注</td>
            <td>状态</td>
        </tr>
        </thead>
        <!--内容-->
        <tbody v-for="(item,index) in historyList" v-show="showList">
        <tr class="body">
            <td>{{index+1}}</td>
            <td>{{item.stuNum}}</td>
            <td>{{item.name}}</td>
            <td>{{item.gender}}</td>
            <td>{{item.college}}</td>
            <td>{{item.proClass}}</td>
            <td>{{item.dateTime}}</td>
            <td>{{item.remark}}</td>
            <td>{{item.statusName}}</td>
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
        name:'historyTable',
        props:{
            historyList:Array
        },
        data() {
            return {
                showList:false,
                showMessage:false
            }
        },
        watch: {
            historyList: function (newVal, oldVal) {
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
    td {
        border-bottom: 1px solid #BBBBBB;
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
        font-size: 16px;
        color: #6E6D6E;
    }

    /*主体*/
    .body {
        height: 60px;
        border-left: 1px solid #BBBBBB;
        border-right: 1px solid #BBBBBB;
        font-size: 18px;
        color: #5C5B5C;
    }

    .message {
        height: 140px;
        line-height: 140px;
        text-align: center;
        color: #909399;
    }
</style>