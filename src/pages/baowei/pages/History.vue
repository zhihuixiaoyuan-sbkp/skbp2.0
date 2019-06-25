<template>
    <div class="content">
        <router-link class="iconfont back" to="/List">&#xe63f;</router-link>
        &nbsp;
        <span class="title">历史记录</span>
        <hr class="boundary">

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="晚归" name="first">
                <div class="tableBorder">
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
            <el-tab-pane label="夜不归宿" name="second"><div class="tableBorder">夜不归宿</div></el-tab-pane>
            <el-tab-pane label="蜗居" name="third"><div class="tableBorder">蜗居</div></el-tab-pane>
            <el-tab-pane label="非正常时段离校" name="fourth"><div class="tableBorder">非正常时段离校</div></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "History",
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
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

    /*返回人员表*/
    .back {
        color: #101010;
        font-size: 20px;
    }

    .back:hover {
        text-decoration: transparent
    }

    .title {
        font-size: 25px;
        letter-spacing: 2px;
    }

    /*分界线*/
    .boundary {
        margin-top: 3px;
        width: 100%;
        height: 3px;
        border: 0;
        background: #BBBBBB;
    }

    .el-tabs--card >>> .el-tabs__header {
        border: 0;
        margin: 0;
    }

    .el-tabs--card >>> .el-tabs__item.is-active {
        color: #fff;
        background: #409EFF;
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