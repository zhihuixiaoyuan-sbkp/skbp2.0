<template>
    <div class="content">
        <el-row>
            <el-col :span="24" class="toolbar">
                <!--按钮-添加重点人员-->
                <button class="addBtn" @click="showAddModal"><span class="iconfont add">&#xe64f;</span>&nbsp;添加重点人员
                </button>
                <!--模态框-添加重点人员-->
                <el-dialog title="添加重点人员"
                           class="addModal"
                           width="520px"
                           :visible.sync="addDialog"
                           :close-on-press-escape="false"
                           :close-on-click-modal="false"
                           :before-close="closeAddModal">
                    <hr class="boundaryModal">
                    <div class="bodyModal">
                        <el-form :model="formData">
                            <el-form-item
                                    label="学号: "
                                    prop="stuNum"
                            ><br/>
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
                                    prop="addReason"
                            ><br/>
                                <el-input
                                        type="addReason"
                                        ref="addReason"
                                        v-model="formData.addReason"
                                        @keyup.enter.native="handleInputConfirm"
                                >
                                </el-input>
                            </el-form-item>
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
                        <el-button @click.native="closeAddModal">取消</el-button>
                        <el-button type="primary" @click="submitForm(formData.stuNum,formData.addReason)">提交</el-button>
                    </div>
                </el-dialog>
                <!--搜索部分-->
                <div class="search">
                    <!--下拉框-搜索筛选-->
                    <el-input placeholder="请输入内容" v-model="label" class="input-with-select">
                        <el-select v-model="select" slot="prepend" placeholder="请选择">
                            <el-option label="餐厅名" value="1"></el-option>
                            <el-option label="订单号" value="2"></el-option>
                            <el-option label="用户电话" value="3"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
                <!--分界线-->
                <hr class="list-boundary">
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
    import axios from 'axios'

    export default {
        name: "List",
        components: {},
        data() {
            return {
                addDialog: false,
                // form表单数据
                formData: {
                    stuNum: '',
                    addReason: ''
                },
                // 添加原因数组
                addReasonArr: [],
                // 展示标签数组
                showTags: ["晚归", "夜不归宿", "蜗居"],
                label: '',
                select: '',
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

            closeAddModal() {
                // 关闭添加模态框
                this.addDialog = false;
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
                this.addDialog = false;
                return true;
            },

            handleInputConfirm() {
                // 增加添加原因标签
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
                            this.showTags.push(element);
                        }
                    });
                }
                // 获取学号数据
                let stuNum = $("#stuNum").val();
                // 提交表单
                this.submitForm(stuNum, inputValue);
            },

            // 选取标签后全部删除 再次选择时会出现之前选中的所有选项
            tagContent(tag) {
                // input框展示选中的标签
                this.addReasonArr.push(tag);
                // 存放去重后的数据
                let newArr = [];
                // 数组去重
                for (var i = 0; i < this.addReasonArr.length; i++) {
                    if (newArr.indexOf(this.addReasonArr[i]) == -1) {
                        newArr.push(this.addReasonArr[i]);
                    }
                }
                // 赋值给添加原因的数组，并将其转换为字符串
                this.addReasonArr = newArr;
                this.formData.addReason = this.addReasonArr.join(" ");
            },

            getLabel(command) {
                // 获取下拉框选择的数据
                this.label = command;
            },
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
        min-width: 990px;
        margin-left: 230px;
        margin-right: 50px;
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

    /*模态框*/
    .addModal {
    }

    .addModal >>> .el-dialog {
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
    }

    /*头部*/
    .addModal >>> .el-dialog__header {
        padding: 10px 17px;
    }

    .addModal >>> .el-dialog__headerbtn {
        top: 9px;
        font-size: 20px;
    }

    .addModal >>> .el-dialog__title {
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
        margin: 0px 26px;
        width: 90%;
        /*height: 230px;*/
        overflow: hidden;
    }

    .addModal >>> .el-form-item {
        margin-bottom: 5px;
    }

    .addModal >>> .el-dialog__body {
        padding: 0;
    }

    .addModal >>> .el-form-item__label {
        margin: 0;
    }

    .addModal >>> .el-form-item__content {
        line-height: 0;
    }

    .addModal >>> .el-input__inner {
        height: 30px;
    }

    .tags {
        margin-top: 15px;
    }

    .addModal >>> .el-tag {
        margin-right: 10px;
        margin-bottom: 15px;
    }

    .addModal >>> .el-dialog__footer {
        padding: 15px 20px;
    }

    /*搜索框*/
    .search {
        float: right;
        margin-top: 10px;
    }

    /*下拉框*/
    .el-dropdown {
        vertical-align: top;
    }

    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .el-dropdown-menu__item {
        width: 85px;
    }

    /*分界线*/
    .list-boundary {
        margin-top: 7px;
        width: 100%;
        height: 3px;
        border: 0;
        background: #BBBBBB;
    }

    /*表格*/
    .list {
        width: 100%;
        text-align: center;
        border: 0;
        border-collapse: collapse;
        color: #808080;
    }

    /*表头*/
    .header {
        font-size: 18px;
        height: 40px;
        color: #4D4C4D;
    }

    /*主体*/
    .body {
        height: 60px;
        font-size: 20px;
        color: #5C5B5C;
        border-left: 1px solid #BBBBBB;
        border-right: 1px solid #BBBBBB;
    }

    /*操作*/
    .operation {
        font-size: 25px;
        cursor: pointer;
    }
</style>