<template>
    <div class="main">
        <el-tabs v-model="activeName" @tab-click="handleClick1">
            <el-tab-pane label="保卫处" name="保卫处">
                <div class="addclass" @click="add(0)">
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
                            prop="userNum"
                            label="账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="userName"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row.userName,scope.row.userNum,scope.row.id)">修改
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.userName,scope.row.userNum,scope.row.id)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="学生处" name="学生处">
                <div class="addclass" @click="add(0)">
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
                            prop="userNum"
                            label="账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="userName"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row.userName,scope.row.userNum,scope.row.id,scope.row.college)">
                                修改
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.userName,scope.row.userNum,scope.row.id)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="二级学院" name="二级学院">
                <div class="addclass" @click="add(1)">
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
                            prop="userNum"
                            label="账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="userName"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row.userName,scope.row.userNum,scope.row.id,scope.row.college)">
                                修改
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.userName,scope.row.userNum,scope.row.id)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="辅导员" name="辅导员">
                <div class="addclass" @click="add(1)">
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
                            prop="userNum"
                            label="账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="userName"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row.userName,scope.row.userNum,scope.row.id,scope.row.college)">
                                修改
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.userName,scope.row.userNum,scope.row.id)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="后勤处" name="后勤处">
                <div class="addclass" @click="add(0)">
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
                            prop="userNum"
                            label="账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="userName"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row.userName,scope.row.userNum,scope.row.id,scope.row.college)">
                                修改
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.userName,scope.row.userNum,scope.row.id)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="心理健康中心" name="心理健康中心">
                <div class="addclass" @click="add(0)">
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
                            prop="userNum"
                            label="账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="userName"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row.userName,scope.row.userNum,scope.row.id,scope.row.college)">
                                修改
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.userName,scope.row.userNum,scope.row.id)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import axios from "axios"
    import qs from "qs"

    export default {
        data() {
            return {
                dept: "保卫处",
                curPage: 1,
                name: "",//修改操作绑定值
                user_num: "",//修改绑定值
                activeName: "保卫处",//选项卡默认页面
                tableData: []
            }
        },
        methods: {
            handleDelete(name, user_num, id) {//element模态框
                this.$alert('<div style="text-align: center;width: 100%;border-top: 1px solid gainsboro;border-bottom:1px solid gainsboro" >' +
                    '<div style="height: 100%;width: 180px;position: relative;right: 0;left: 0;margin: auto;text-align: left;">' +
                    '<span style="display: block;margin-top: 10px;color: red">姓名：' + ' ' + name + '</span>' +
                    '<span style="display: block;margin-top: 10px;color: red;">账号：' + ' ' + user_num + id + '</span>' +
                    '</div>' +
                    '</div>', "确认删除" + " " + name + " " + "权限?", {
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true
                }).then(
                    () => {
                        this.deleteUser(id)
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
            handleEdit(name, user_num, id, college) {//element模态框
                if (college === undefined) {
                    this.$alert('<div style="text-align: center;width: 100%;border-top: 1px solid gainsboro;border-bottom:1px solid gainsboro" >' +
                        '<p style="margin-top: 10px;">姓名：<input style="border-radius: 5px" id="name" type="text" value="' + name + '"></p>' +
                        '<p style="margin-top: 10px;">账号：<input style="border-radius: 5px" id="user_num"  type="text" value="' + user_num + '"></p>' +
                        '</div>', "修改" + " " + name + " " + "信息", {
                        showCancelButton: true,
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true
                    }).then(
                        () => {
                            let text1 = document.getElementById("name").value        //姓名
                            let text2 = document.getElementById('user_num').value //工号
                            console.log(text1)
                            this.editUser(text1, text2, id, this.dept)
                        }
                    )
                        .catch(() => {
                                this.$message({
                                    type: 'warning',
                                    message: '已取消!'
                                })
                            }
                        );
                } else {
                    this.$alert('<div style="text-align: center;width: 100%;border-top: 1px solid gainsboro;border-bottom:1px solid gainsboro" >' +
                        '<p style="margin-top: 10px;">姓名：<input style="border-radius: 5px" id="name" type="text" value="' + name + '"></p>' +
                        '<p style="margin-top: 10px;">账号：<input style="border-radius: 5px" id="user_num"  type="text" value="' + user_num + '"></p>' +
                        '学院：<select  name="" id="selectValue"  style="margin-top: 10px;margin-bottom:4px;border: 1px soild #c0c0c0;border-radius: 5px;height: 30px;width: 154px">' +
                        '<option value="' + college + '">' + college + '</option>' +
                        '<option value="计算机与软件工程学院">计算机与软件工程学院</option>' +
                        '<option value="艺术设计学院">艺术设计学院</option>' +
                        '<option value="大数据与人工智能学院">大数据与人工智能学院</option>' +
                        '<option value="管理工程学院">管理工程学院</option>' +
                        '<option value="通识教育与外国语学院">通识教育与外国语学院</option>' +
                        '<option value="机械工程学院">机械工程学院</option>' +
                        '<option value="电气与电子工程学院">电气与电子工程学院</option>' +
                        '</select>' +
                        '</div>', "修改" + " " + name + " " + "信息", {
                        showCancelButton: true,
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true
                    }).then(
                        () => {
                            let text1 = document.getElementById("name").value        //姓名
                            let text2 = document.getElementById('user_num').value //工号
                            let text3 = document.getElementById("selectValue").value
                            console.log(text1)
                            this.editUser(text1, text2, id, this.dept, text3)
                        }
                    )
                        .catch(() => {
                                this.$message({
                                    type: 'warning',
                                    message: '已取消!'
                                })
                            }
                        );
                }

            },
            add(num) {//element模态框
                if (num === 1) {
                    this.$alert('<div style="text-align: center;width: 100%;border-top: 1px solid gainsboro;border-bottom:1px solid gainsboro" >' +
                        '<p style="margin-top: 10px;">姓名：<input style="border-radius: 5px" id="name" type="text" value=""></p>' +
                        '<p style="margin-top: 10px;">账号：<input style="border-radius: 5px" id="user_num"  type="text" value=""></p>' +
                        '<p >' +
                        '学院：<select  name="" id="selectValue"  style="margin-top: 10px;margin-bottom:4px;border: 1px soild #c0c0c0;border-radius: 5px;height: 30px;width: 154px">' +
                        '<option value="计算机与软件工程学院">计算机与软件工程学院</option>' +
                        '<option value="艺术设计学院">艺术设计学院</option>' +
                        '<option value="大数据与人工智能学院">大数据与人工智能学院</option>' +
                        '<option value="管理工程学院">管理工程学院</option>' +
                        '<option value="通识教育与外国语学院">通识教育与外国语学院</option>' +
                        '<option value="机械工程学院">机械工程学院</option>' +
                        '<option value="电气与电子工程学院">电气与电子工程学院</option></select></p>' +
                        '</div>', "添加信息", {
                        showCancelButton: true,
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true
                    }).then(
                        () => {
                            let text1 = document.getElementById("name").value        //姓名
                            let text2 = document.getElementById('user_num').value //工号
                            let text3 = document.getElementById("selectValue").value
                            if (text1 === "" || text2 === "") {
                                this.$message({
                                    type: 'warning',
                                    message: '请确认添加信息是否完整!'
                                })
                                setTimeout(() => {
                                    this.add(num)
                                }, 1000)

                            } else {
                                this.addUser(text2, text1, this.dept, text3)
                            }

                        }
                    )
                        .catch(() => {
                                this.$message({
                                    type: 'warning',
                                    message: '已取消!'
                                })
                            }
                        );
                } else {
                    this.$alert('<div style="text-align: center;width: 100%;border-top: 1px solid gainsboro;border-bottom:1px solid gainsboro" >' +
                        '<p style="margin-top: 10px;">姓名：<input style="border-radius: 5px" id="name" type="text" value=""></p>' +
                        '<p style="margin-top: 10px;">账号：<input style="border-radius: 5px" id="user_num"  type="text" value=""></p>' +
                        '</div>', "添加信息", {
                        showCancelButton: true,
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true
                    }).then(
                        () => {
                            let text1 = document.getElementById("name").value        //姓名
                            let text2 = document.getElementById('user_num').value //工号
                            if (text1 === "" || text2 === "") {
                                this.$message({
                                    type: 'warning',
                                    message: '请确认添加信息是否完整!'
                                })
                                setTimeout(() => {
                                    this.add(num)
                                }, 1000)
                            } else {
                                this.addUser(text2, text1, this.dept)
                            }

                        }
                    )
                        .catch(() => {
                                this.$message({
                                    type: 'warning',
                                    message: '已取消!'
                                })
                            }
                        );
                }

            },
            /*修改操作请求函数*/
            editUser(name, user_num, id, dept, college) {
                axios.post(this.api + "/sbkp/admin/updateAcoountInfo", qs.stringify({
                    userNum: user_num,
                    userName: name,
                    id: id,
                    dept: dept,
                    college: college
                }))
                    .then(this.editUserCallback)
                    .catch(function () {
                        console.log("请求出错")
                    })
            },
            editUserCallback() {
                this.getAccountInfo()
            },
            /*删除用户请求函数*/
            deleteUser(id) {
                axios.post(this.api + "/sbkp/admin/deleteAcoountInfo", qs.stringify({user_id: id}))
                    .then(() => {
                            this.$message(
                                {
                                    type: "success",
                                    message: "删除成功"
                                }
                            )
                        },
                        this.getAccountInfo()//回调更新列表
                    )
                    .catch(() => {
                        this.$message(
                            {
                                type: "danger",
                                message: "删除失败"
                            }
                        )
                    })
            },
            /*添加用户请求函数*/
            addUser(user_num, user_name, dept, college) {
                axios.post(this.api + "/sbkp/admin/saveAcoountInfo", qs.stringify({
                    userNum: user_num,
                    userName: user_name,
                    dept: dept,
                    college: college
                }))
                    .then(this.addUserCallback)
                    .catch(function () {
                        console.log("请求出错")
                    })
            },
            addUserCallback(res) {
                let data = res.data
                let status = data.status
                if (status === "ok") {
                    this.$message(
                        {
                            type: "success",
                            message: "添加成功"
                        }
                    )
                    this.getAccountInfo()
                } else if (status === 2) {
                    this.$message(
                        {
                            type: "warning",
                            message: "用户已存在"
                        })
                } else {
                    this.$message(
                        {
                            type: "danger",
                            message: "添加失败，请求错误"
                        })
                }
            },

            handleClick1(event) {//选项卡切换
                console.log(event.name)
                this.dept = event.name
                this.getAccountInfo()
            },


            /*获取各部门人员信息*/
            getAccountInfo() {
                axios.post(this.api + "/sbkp/admin/getAccountInfo", qs.stringify({
                    dept: this.dept,
                    curPage: this.curPage
                }))
                    .then(this.getAccountInfoCallback)
                    .catch(function () {
                        console.log("请求出错")
                    })
            },
            getAccountInfoCallback(res) {
                let data = res.data
                console.log(data)
                this.tableData = data.msg.lists
            }
        },
        mounted() {
            this.getAccountInfo()
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

    .addclass {
        width: 150px;
        cursor: pointer;
    }

    .addclass:hover {
        color: #02a774;
    }
</style>