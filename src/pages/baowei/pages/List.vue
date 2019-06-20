<template>
    <div class="content">
        <el-row>
            <el-col :span="24" class="toolbar">
                <!--按钮-添加重点人员-->
                <button class="addBtn" @click="showAddModal">
                    <span class="iconfont add">&#xe64f;</span>&nbsp;添加重点人员
                </button>
                <!--搜索部分-->
                <div class="search">
                    <!--下拉框-搜索筛选-->
                    <el-input placeholder="请输入内容" v-model="label" class="input-with-select">
                        <el-select v-model="select" slot="prepend" placeholder="请选择">
                            <el-option label="学号" value="1"></el-option>
                            <el-option label="姓名" value="2"></el-option>
                            <el-option label="学院" value="3"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
                <!--分界线-->
                <hr class="boundary">
                <!--主体-->
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
                            <td>{{index+1}}</td>
                            <td>{{item.keyPerson.stuNum}}</td>
                            <td>{{item.keyPerson.name}}</td>
                            <td>{{item.keyPerson.gender}}</td>
                            <td>{{item.keyPerson.college}}</td>
                            <td>{{item.keyPerson.class}}</td>
                            <td>{{item.keyPerson.addReason}}</td>
                            <td>{{item.keyPerson.schoolStatus}}</td>
                            <!--操作-->
                            <td>
                                <router-link class="iconfont operation" to="/History">&#xe685;</router-link>
                                <router-link class="iconfont operation" to="/">&#xe677;</router-link>
                                <span class="iconfont operation" @click="showModifyModal">&#xe64b;</span>
                                <span class="iconfont operation" @click="showDelModal">&#xe639;</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </el-col>
                <!--模态框-添加重点人员-->
                <el-dialog title="添加重点人员"
                           class="allModal"
                           width="520px"
                           :visible.sync="addDialog"
                           :close-on-press-escape="false"
                           :close-on-click-modal="false"
                           :before-close="closeModal">
                    <hr class="boundaryModal">
                    <div class="bodyModal">
                        <!--表单-->
                        <el-form :model="formData">
                            <el-form-item
                                    label="学号: "
                                    prop="stuNum">
                                <el-input type="stuNum"
                                          ref="stuNum"
                                          v-model="formData.stuNum"
                                          autocomplete="off"
                                          id="stuNum"
                                          @keyup.enter.native="submitForm(formData.stuNum,formData.addReason)"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                    label="添加原因（多个标签用空格分隔）:"
                                    prop="addReason">
                                <el-input
                                        type="addReason"
                                        ref="addReason"
                                        v-model="formData.addReason"
                                        @keyup.enter.native="handleInputConfirm">
                                </el-input>
                            </el-form-item>
                            <!--标签-->
                            <div class="tags">
                                <span>推荐添加原因：</span>
                                <el-tag
                                        :key="tag"
                                        v-for="tag in showTags"
                                        :disable-transitions="false"
                                        @click="tagContent(tag)">
                                    {{tag}}
                                </el-tag>
                            </div>
                        </el-form>
                    </div>
                    <hr class="boundaryModal">
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="closeModal">取消</el-button>
                        <el-button type="primary" @click="submitForm(formData.stuNum,formData.addReason)">提交</el-button>
                    </div>
                </el-dialog>
                <!--模态框-修改重点人员-->
                <el-dialog title="修改重点人员"
                           class="allModal"
                           width="520px"
                           :visible.sync="modifyDialog"
                           :close-on-press-escape="false"
                           :close-on-click-modal="false"
                           :before-close="closeModal">
                    <hr class="boundaryModal">
                    <div class="bodyModal">
                        <!--表单-->
                        <el-form :model="formData">
                            <el-form-item
                                    label="添加原因（多个标签用空格分隔）:"
                                    prop="addReason">
                                <el-input>
                                </el-input>
                                <!--上次使用的标签-->
                                <div class="tags">
                                    <span>我的添加原因：</span>
                                    <el-tag></el-tag>
                                </div>
                                <!--所有标签-->
                                <div class="tags">
                                    <span>推荐添加原因：</span>
                                    <el-tag
                                            :key="tag"
                                            v-for="tag in showTags"
                                            :disable-transitions="false">
                                        {{tag}}
                                    </el-tag>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                    <hr class="boundaryModal">
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="closeModal">取消</el-button>
                        <el-button type="primary" @click="submitForm(formData.stuNum,formData.addReason)">提交</el-button>
                    </div>
                </el-dialog>
                <!--模态框-删除重点人员-->
                <el-dialog title="删除重点人员"
                           class="allModal"
                           :visible.sync="delDialog"
                           width="520px">
                    <hr class="boundaryModal">
                    <!--提示文本-->
                    <div class="bodyModaldel">
                        <span class="tips">是否确认从列表删除该名重点人员？</span>
                    </div>
                    <div slot="footer" class="dialog-footer delbutton">
                        <el-button @click="closeModal">取 消</el-button>
                        <el-button type="danger" @click="closeModal">删 除</el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "List",
        data() {
            return {
                label: '',
                select: '',
                addDialog: false,
                modifyDialog: false,
                delDialog: false,
                // form表单数据
                formData: {
                    stuNum: '',
                    addReason: ''
                },
                // 记录添加原因
                addReasonArr: [],
                // 全部标签
                showTags: ["晚归", "夜不归宿", "蜗居"],
            }
        },
        props: {
            list: Array
        },
        methods: {
            showAddModal() {
                // 展示添加模态框
                this.addDialog = true;
            },

            showModifyModal() {
                // 展示修改模态框
                this.modifyDialog = true;
            },

            showDelModal() {
                // 展示删除模态框
                this.delDialog = true;
            },

            closeModal() {
                // 关闭添加模态框
                this.addDialog = false;
                this.modifyDialog = false;
                this.delDialog = false;
            },

            submitForm(stuNum, addReason) {
                // 添加操作
                // 提交表单--点击提交or学号input框获得焦点时回车
                // 判断字符串是否为数字 ，判断正整数用/^[1-9]+[0-9]*]*$/
                var reg = /^[0-9]+.?[0-9]*$/;
                if (stuNum === "") {
                    // 判断学号是否为空
                    this.$nextTick(() => {
                        this.$refs.stuNum.focus()
                    });
                    this.$message.error('学号不能为空');
                    return false;
                } else if (addReason === "") {
                    // 判断添加原因是否为空
                    this.$nextTick(() => {
                        this.$refs.addReason.focus()
                    });
                    this.$message.error('添加原因不能为空');
                    return false;
                } else if (!reg.test(stuNum)) {
                    // 判断学号是否为数字
                    this.$nextTick(() => {
                        this.$refs.stuNum.focus()
                    });
                    this.$message.error('学号必须为数字值');
                    return false;
                }
                // 清空学号、添加原因的数值
                this.formData.stuNum = '';
                this.formData.addReason = '';
                // 清空添加原因数组
                this.addReasonArr = [];
                // 关闭模态框
                this.closeModal();
                return true;
            },

            handleInputConfirm() {
                // 增加推荐添加原因标签
                let inputValue = this.formData.addReason;
                if (inputValue) {
                    // 获取输入的数据
                    var values = inputValue.split(" ").filter(item => {
                        return item != '' && item != undefined;
                    });
                    // 循环数据进行对比
                    values.forEach(element => {
                        // 获取索引位置，获取不到添加进数组
                        var index = this.showTags.findIndex(i => {
                            return i == element;
                        });
                        if (index < 0) {
                            this.addReasonArr.push(element)
                            this.showTags.push(element);
                        }
                    });
                }
                // 获取学号数据
                let stuNum = $("#stuNum").val();
                // 提交表单
                this.submitForm(stuNum, inputValue);
            },

            tagContent(tag) {
                // 选择标签
                if (this.addReasonArr.length == 0) {
                    // 记录的添加原因为空
                    this.addReasonArr.push(tag);
                    this.formData.addReason += tag;
                } else {
                    // 将已有的addReasonArr拆分数组存放至addReasonArr判断tag是否重复
                    this.addReasonArr = this.formData.addReason.split(" ");
                    for (let i = 0; i < this.addReasonArr.length; i++) {
                        if (tag === this.addReasonArr[i]) {
                            return false;
                        }
                    }
                    // 拼接addReason字符串
                    this.formData.addReason = this.formData.addReason + " " + tag + " ";
                }
            }
        },
    }
</script>

<style scoped>
    button {
        outline: none;
        cursor: pointer;
    }

    td {
        border-bottom: 1px solid #BBBBBB;
    }

    .content {
        margin-left: 230px;
        margin-right: 50px;
        min-width: 990px;
    }

    /*人员添加*/
    /*按钮*/
    .addBtn {
        margin-top: 20px;
        font-size: 20px;
        color: #607D8B;
        font-weight: bold;
        border: 0;
        background: transparent;
    }

    /*搜索框*/
    .search {
        float: right;
        margin-top: 15px;
        margin-right: 20px;
    }

    .input-with-select {
        width: 370px;
    }

    .search >>> .el-select {
        width: 90px;
    }

    /*分界线*/
    .boundary {
        margin-top: 7px;
        width: 100%;
        height: 3px;
        border: 0;
        background: #BBBBBB;
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

    /*模态框*/
    .allModal >>> .el-dialog {
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
    }

    /*头部*/
    .allModal >>> .el-dialog__header {
        padding: 13px 17px;
    }

    .allModal >>> .el-dialog__headerbtn {
        top: 9px;
        font-size: 20px;
        outline: none;
    }

    .allModal >>> .el-dialog__title {
        font-size: 22px;
        color: #77A2FB;
    }

    /*分界线*/
    .boundaryModal {
        margin: 0 13px;
        width: 95%;
        background: #BBBBBB;
    }

    /*表单部分*/
    .bodyModal {
        margin: 0 26px;
        width: 90%;
    }

    .bodyModaldel {
        margin: 45px 26px 25px;
        width: 90%;
        text-align: center;
    }

    .allModal >>> .el-form-item {
        margin-bottom: 5px;
    }

    .allModal >>> .el-dialog__body {
        padding: 0;
    }

    .allModal >>> .el-form-item__label {
        margin: 0;
    }

    .allModal >>> .el-form-item__content {
        line-height: 0;
    }

    .allModal >>> .el-input__inner {
        height: 30px;
    }

    .tags {
        margin-top: 15px;
    }

    .allModal >>> .el-tag {
        margin-right: 10px;
        margin-bottom: 15px;
        cursor: pointer;
    }

    .allModal >>> .el-dialog__footer {
        padding: 15px 20px;
    }

    .tips {
        color: #101010;
        font-size: 24px;
    }

    .delbutton {
        margin-bottom: 10px;
        text-align: center;
    }

    .allModal >>> .el-button--danger {
        margin-left: 35px;
    }
</style>