<template>
    <div class="content">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="重点人员报警通知" name="first">
                <div class="tableBorder">
                    <el-dropdown @command="getLabel"><span class="el-dropdown-link" v-model="label">{{label}}<i
                            class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="危险">危险</el-dropdown-item>
                            <el-dropdown-item command="紧急">紧急</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
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
                        <tbody>
                        <tr class="body">
                            <td>1</td>
                            <td>316202061035</td>
                            <td>张三</td>
                            <td>男</td>
                            <td>计算机与软件工程学院</td>
                            <td>软件1610</td>
                            <td>2019/06/03 23:45</td>
                            <td>无</td>
                            <td>已处理</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="非重点人员报警通知" name="second">
                <div class="tableBorder">夜不归宿</div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name: "List",
        data() {
            return {
                activeName: 'first',
                label: '请选择'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            getLabel(command) {
                this.label = command
            },
        }
    }
</script>

<style scoped>
    td {
        border-bottom: 1px solid #BBBBBB;
    }

    .content {
        margin-top: 17px;
        margin-left: 220px;
        margin-right: 40px;
        min-width: 990px;
    }

    .el-tabs--card >>> .el-tabs__header {
        border: 0;
        margin: 0;
    }

    .el-tabs--card >>> .el-tabs__item:hover {
        color: #AAA6A6;
    }

    .el-tabs--card >>> .el-tabs__item.is-active {
        color: #fff;
        background: #AAA6A6;
        border-radius: 3px 0 0 0;
    }

    .tableBorder {
        border: 1px solid #E4E7ED;
        padding: 20px 40px;
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
</style>