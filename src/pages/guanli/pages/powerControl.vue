<template>
    <div class="main">
        <el-tabs v-model="activeName" @tab-click="handleClick1">
            <el-tab-pane label="保卫处" name="baowei">
                <div class="addclass" @click="add">
                    <svg class="icon icon-back icons" aria-hidden="true">
                        <use xlink:href="#icon-tianjia1"></use>
                    </svg>
                    <span style="vertical-align: -2px">添加新用户</span>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        align="center">
                    <el-table-column
                            align="center"
                            type=index
                            label="编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="username"
                            label="账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row.name,scope.row.username)">修改
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.name,scope.row.username)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="学生处" name="xueshengchu">
                 <div class="addclass" @click="add">
                    <svg class="icon icon-back icons" aria-hidden="true">
                        <use xlink:href="#icon-tianjia1"></use>
                    </svg>
                    <span style="vertical-align: -2px">添加新用户</span>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        align="center">
                    <el-table-column
                            align="center"
                            type=index
                            label="编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="username"
                            label="账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row.name,scope.row.username)">修改
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.name,scope.row.username)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="二级学院" name="erjixuyuan">
                 <div class="addclass" @click="add">
                    <svg class="icon icon-back icons" aria-hidden="true">
                        <use xlink:href="#icon-tianjia1"></use>
                    </svg>
                    <span style="vertical-align: -2px">添加新用户</span>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        align="center">
                    <el-table-column
                            align="center"
                            type=index
                            label="编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="username"
                            label="账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row.name,scope.row.username)">修改
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.name,scope.row.username)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="辅导员" name="fudaoyuan">
                <div class="addclass" @click="add">
                    <svg class="icon icon-back icons" aria-hidden="true">
                        <use xlink:href="#icon-tianjia1"></use>
                    </svg>
                    <span style="vertical-align: -2px">添加新用户</span>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        align="center">
                    <el-table-column
                            align="center"
                            type=index
                            label="编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="username"
                            label="账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row.name,scope.row.username)">修改
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.name,scope.row.username)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="后勤处" name="houqinchu">
               <div class="addclass" @click="add">
                    <svg class="icon icon-back icons" aria-hidden="true">
                        <use xlink:href="#icon-tianjia1"></use>
                    </svg>
                    <span style="vertical-align: -2px">添加新用户</span>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        align="center">
                    <el-table-column
                            align="center"
                            type=index
                            label="编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="username"
                            label="账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row.name,scope.row.username)">修改
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.name,scope.row.username)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="心理健康中心" name="xinlijiankang">
                <div class="addclass" @click="add">
                    <svg class="icon icon-back icons" aria-hidden="true">
                        <use xlink:href="#icon-tianjia1"></use>
                    </svg>
                    <span style="vertical-align: -2px">添加新用户</span>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        align="center">
                    <el-table-column
                            align="center"
                            type=index
                            label="编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="username"
                            label="账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row.name,scope.row.username)">修改
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.name,scope.row.username)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: "",//修改操作绑定值
                username: "",//修改绑定值
                activeName: "baowei",//选项卡默认页面

                tableData: [{
                    username: '2018060101',
                    name: '汤菲菲',
                },
                    {
                        username: '2018060102',
                        name: '朱伟杰',
                    },
                    {
                        username: '2018060103',
                        name: '高超',
                    },
                    {
                        username: '2018060104',
                        name: '伍祥',
                    }, {
                        username: '2018070602',
                        name: '朱洪军',
                    }, {
                        username: '2018030210',
                        name: '袁卫家',
                    },


                ]
            }
        },
        methods: {
            opendelete(name, username) {//element模态框
                this.$alert('<div style="text-align: center;width: 100%;border-top: 1px solid gainsboro;border-bottom:1px solid gainsboro" >' +
                    '<div style="height: 100%;width: 180px;position: relative;right: 0;left: 0;margin: auto;text-align: left;">' +
                    '<span style="display: block;margin-top: 10px;color: red">姓名：' + ' ' + name + '</span>' +
                    '<span style="display: block;margin-top: 10px;color: red;">账号：' + ' ' + username + '</span>' +
                    '</div>' +
                    '</div>', "确认删除" + " " + name + " " + "权限?", {
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true
                }).then(
                    () => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    }
                )
                    .catch(
                        () => {
                            this.$message({
                                type: 'warning',
                                message: '已取消!'
                            })
                        }
                    );
            },
            openEdit(name, username) {//element模态框
                this.$alert('<div style="text-align: center;width: 100%;border-top: 1px solid gainsboro;border-bottom:1px solid gainsboro" >' +
                    '<p style="margin-top: 10px;">姓名：<input style="border-radius: 5px" id="name" type="text" value="' + name + '"></p>' +
                    '<p style="margin-top: 10px;">账号：<input style="border-radius: 5px" id="username"  type="text" value="' + username + '"></p>' +
                    '</div>', "修改" + " " + name + " " + "信息", {
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true
                }).then(
                    () => {
                        let text1 = document.getElementById("name").value        //姓名
                        let text2 = document.getElementById('username').value //工号
                        console.log(text1)
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        })
                    }
                )
                    .catch(() => {
                            this.$message({
                                type: 'warning',
                                message: '已取消!'
                            })
                        }
                    );
            },
            openadd() {//element模态框
                this.$alert('<div style="text-align: center;width: 100%;border-top: 1px solid gainsboro;border-bottom:1px solid gainsboro" >' +
                    '<p style="margin-top: 10px;">姓名：<input style="border-radius: 5px" id="name" type="text" value=""></p>' +
                    '<p style="margin-top: 10px;">账号：<input style="border-radius: 5px" id="username"  type="text" value=""></p>' +
                    '</div>', "添加信息", {
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true
                }).then(
                    () => {
                        let text1 = document.getElementById("name").value        //姓名
                        let text2 = document.getElementById('username').value //工号
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        })
                    }
                )
                    .catch(() => {
                            this.$message({
                                type: 'warning',
                                message: '已取消!'
                            })
                        }
                    );
            },
            add(){
                this.openadd()
            },
            handleClick1() {//选项卡切换

            },
            handleEdit(name, username) {//修改信息
                this.openEdit(name, username)
            },
            handleDelete(name, username) {//删除信息
                this.opendelete(name, username)
            }
        }

    }
</script>

<style scoped>
    .main {
        min-width: 990px;
        margin-left: 200px;
        /*margin-right: 50px;*/
        margin-top: 10px;
    }

    .icons {
        height: 18px;
        width: 18px;
    }
    .addclass{
        width: 150px;
        cursor: pointer;
    }
    .addclass:hover{
        color: #02a774;
    }
</style>