<template>
    <div class="warp-main">
        <el-row>
            <el-col :span="24" class="toolbar">
                <button class="add" @click="showAdd"><span class="iconfont add">&#xe64f;</span>&nbsp;添加重点人员</button>
                <div class="search">
                    <el-dropdown trigger="click" @command="getLabel">
                        <el-button type="primary" v-model="label">{{label}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="学号">学号</el-dropdown-item>
                                <el-dropdown-item command="姓名">姓名</el-dropdown-item>
                                <el-dropdown-item command="学院">学院</el-dropdown-item>
                            </el-dropdown-menu>
                    </el-dropdown>
                    <input type="text">
                    <button>搜索</button>
                </div>
                <hr>
                <el-col :span="24" class="table-wrapper">
                    <!--表格-->
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
                            <td>添加原因</td>
                            <td>在校状态</td>
                            <td>更多操作</td>
                        </tr>
                        </thead>
                        <!--内容-->
                        <tbody v-for="(item,index) in list">
                        <tr class="body">
                            <!--<td>1</td>-->
                            <td>{{index+1}}</td>
                            <td>{{item.keyPerson.stuNum}}</td>
                            <td>{{item.keyPerson.name}}</td>
                            <td>{{item.keyPerson.gender}}</td>
                            <td>{{item.keyPerson.college}}</td>
                            <td>{{item.keyPerson.class}}</td>
                            <td>{{item.keyPerson.addReason}}</td>
                            <td>{{item.keyPerson.schoolStatus}}</td>
                            <td>
                                <router-link class="iconfont operation" to="/History">&#xe685;</router-link>
                                <span class="iconfont operation">&#xe677;</span>
                                <span class="iconfont operation">&#xe64b;</span>
                                <span class="iconfont operation">&#xe639;</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: "List",
        components: {

        },
        data() {
            return {
                label: '请输入需要搜索的标签',
                addDialog:false
            }
        },
        props: {
            list: Array
        },
        methods: {
            showAdd() {
                this.addDialog = true
            },
            getLabel(command) {
                this.label = command
            }
        }
    }
</script>

<style scoped>
    button {
        outline: none;
        cursor: pointer;
    }

    hr {
        margin-top: 7px;
        border: 0;
        background-color: #BBBBBB;
        height: 3px;
        width: 100%;
    }

    td {
        border-bottom: 1px solid #BBBBBB;
    }

    .warp-main {
        margin-left: 230px;
        margin-right: 50px;
        min-width: 990px;
    }

    /*人员添加*/
    .add {
        background: transparent;
        border: 0;
        font-size: 20px;
        color: #607D8B;
        font-weight: bold;
        margin-top: 20px;
    }

    .search {
        float: right;
        margin-top: 20px;
    }

    .el-dropdown {
        vertical-align: top;
    }

    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    /*表格*/
    .list {
        width: 100%;
        text-align: center;
        border: 0;
        border-collapse: collapse;
        color: #808080;
    }

    .header {
        font-size: 18px;
        height: 40px;
        color: #4D4C4D;
    }

    .body {
        height: 60px;
        font-size: 20px;
        color: #5C5B5C;
        border-left: 1px solid #BBBBBB;
        border-right: 1px solid #BBBBBB;
    }

    .operation {
        font-size: 25px;
        cursor: pointer;
    }
</style>