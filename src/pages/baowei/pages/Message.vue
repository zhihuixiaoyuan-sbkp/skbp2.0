<template>
    <div class="content">
        <el-button type="primary" @click="showScreenModal">筛选查询</el-button>
        <el-tabs v-model="personnelType" type="card" @tab-click="handleClick">
            <el-tab-pane label="重点人员报警通知" name="first">
                <div class="tableBorder">
                    <el-dropdown @command="getLabel" @click="handleClick"><span class="el-dropdown-link"
                                                                                v-model="label">{{label}}<i
                            class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="危险">危险</el-dropdown-item>
                            <el-dropdown-item command="紧急">紧急</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <hr class="boundary">
                    <!--表格-->
                    <info-table :messageList="messageList" :personnelType="personnelType"
                                @getHandleId="showHandleDialog"></info-table>
                    <!--分页-->
                    <nav class="block">
                        <el-pagination layout="prev, pager, next"
                                       @current-change="pageNum"
                                       :total=totalNum
                                       background>
                        </el-pagination>
                    </nav>
                </div>
            </el-tab-pane>
            <el-tab-pane label="非重点人员报警通知" name="second">
                <div class="tableBorder">
                    <el-dropdown @command="getLabel"><span class="el-dropdown-link" v-model="label">{{label}}<i
                            class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="危险">危险</el-dropdown-item>
                            <el-dropdown-item command="紧急">紧急</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <hr class="boundary">
                    <!--表格-->
                    <info-table :messageList="messageList" :personnelType="personnelType"
                                @getAddId="showAddDialog"></info-table>
                    <!--分页-->
                    <nav class="block">
                        <el-pagination layout="prev, pager, next"
                                       @current-change="pageNum"
                                       :total=totalNum
                                       background>
                        </el-pagination>
                    </nav>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!--模态框-完善筛选条件-->
        <el-dialog title="完善筛选条件"
                   class="allModal"
                   width="520px"
                   :visible.sync="screenDialog"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false"
                   :before-close="closeModal">
            <hr class="boundaryModal">
            <div class="bodyModal">
                <!--表单-->
                <el-form :model="screenData">
                    <!--1.时间-->
                    <el-form-item label="时间: ">
                        <el-col :span="9">
                            <el-date-picker v-model="screenData.time1"
                                            type="date"
                                            placeholder="请选择日期"
                                            style="width: 100%">
                            </el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">------</el-col>
                        <el-col :span="9">
                            <el-date-picker placeholder="请选择日期"
                                            v-model="screenData.time2"
                                            style="width: 100%;">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                    <!--2.关键词-->
                    <el-form-item label="关键词: ">
                        <el-select v-model="screenData.screenReason" multiple placeholder="请选择">
                            <el-option
                                    v-for="item in keyword"
                                    :key="item.id"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!--3.姓名-->
                    <el-form-item label="其他信息: " prop="stuName">
                        <el-col :span="3">姓名:</el-col>
                        <el-col :span="12">
                            <el-input type="stuName"
                                      ref="stuName"
                                      v-model="screenData.stuName"
                                      autocomplete="off"
                                      @keyup.enter.native="submitForm"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>
            <hr class="boundaryModal">
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="closeModal">取 消</el-button>
                <el-button type="primary" @click="submitForm">提 交</el-button>
            </div>
        </el-dialog>
        <!--模态框-处理报警信息（重点人员）-->
        <el-dialog title="处理状态"
                   class="allModal"
                   width="520px"
                   :visible.sync="handleDialog"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false"
                   :before-close="closeModal">
            <hr class="boundaryModal">
            <!--提示文本-->
            <div class="bodyModalhandle">
                <span class="tips">是否标记为已处理？</span>
                <el-input type="textarea"
                          v-model="remark"
                          placeholder="请输入内容"
                          :autosize="{ minRows: 3, maxRows: 4}">
                </el-input>
            </div>
            <hr class="boundaryModal">
            <div slot="footer" class="dialog-footer">
                <el-button @click="ignoreMessage">忽 略</el-button>
                <el-button type="primary" @click="handleMessage">处 理</el-button>
            </div>
        </el-dialog>
        <!--模态框-处理报警信息（非重点人员）-->
        <el-dialog title="添加"
                   class="allModal"
                   :visible.sync="addDialog"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false"
                   :before-close="closeModal"
                   width="520px">
            <hr class="boundaryModal">
            <!--提示文本-->
            <div class="bodyModalhandle">
                <span class="tips">是否将其添加为重点人员？</span>
            </div>
            <div slot="footer" class="dialog-footer delbutton">
                <el-button @click="closeModal">取 消</el-button>
                <el-button type="primary" class="add" @click="addNew">添 加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    import infoTable from '../../components/infoTable/infoTable'

    export default {
        name: "Message",
        data() {
            return {
                label: '危险',
                messageList: [],
                totalNum: 0,
                currentPage: 1,
                personnelType: 'first',
                screenDialog: false,
                handleDialog: false,
                addDialog: false,
                searchDetection: false,
                p(s) {
                    return s < 10 ? '0' + s : s
                },
                screenData: {
                    time1: '',
                    time2: '',
                    screenReason: [],
                    stuName: '',
                },
                keyword: [],
                remark: '',
                messageId: '',
            }
        },
        methods: {
            // 初始化列表
            getMessageInfo() {
                axios.get(this.api1 + '/sbkp/message/messageList/0/1', {
                    params: {
                        pageNum: this.currentPage,
                        pageSize: 10,
                    }
                }).then(this.getMessageInfoSucc);
            },

            // 处理表格数据
            getMessageInfoSucc(res) {
                res = res.data;
                this.totalNum = res.totalNum;
                this.messageList = res.messageList;
            },

            // 切换重点&非重点
            handleClick() {
                var _this = this;
                this.searchDetection = false;
                this.label = '危险';
                if (this.personnelType === 'first') {
                    axios.get(this.api1 + '/sbkp/message/messageList/0/1', {
                        params: {
                            pageNum: this.currentPage,
                            pageSize: 10,
                        }
                    }).then(function (res) {
                        _this.getMessageInfoSucc(res);
                    });
                } else if (this.personnelType === 'second') {
                    axios.get(this.api1 + '/sbkp/message/messageList/1/1', {
                        params: {
                            pageNum: this.currentPage,
                            pageSize: 10,
                        }
                    }).then(function (res) {
                        _this.getMessageInfoSucc(res);
                    });
                }
            },

            // 切换危险&紧急类型
            getLabel(command) {
                var _this = this;
                this.searchDetection = false;
                this.label = command;
                if (this.personnelType === 'first') {
                    if (this.label === '危险') {
                        axios.get(this.api1 + '/sbkp/message/messageList/0/1', {
                            params: {
                                pageNum: this.currentPage,
                                pageSize: 10,
                            }
                        }).then(function (res) {
                            _this.getMessageInfoSucc(res);
                        });
                    } else if (this.label === '紧急') {
                        axios.get(this.api1 + '/sbkp/message/messageList/0/2', {
                            params: {
                                pageNum: this.currentPage,
                                pageSize: 10,
                            }
                        }).then(function (res) {
                            _this.getMessageInfoSucc(res);
                        });
                    }
                } else if (this.personnelType === 'second') {
                    if (this.label === '危险') {
                        axios.get(this.api1 + '/sbkp/message/messageList/1/1', {
                            params: {
                                pageNum: this.currentPage,
                                pageSize: 10,
                            }
                        }).then(function (res) {
                            _this.getMessageInfoSucc(res);
                        });
                    } else if (this.label === '紧急') {
                        axios.get(this.api1 + '/sbkp/message/messageList/1/2', {
                            params: {
                                pageNum: this.currentPage,
                                pageSize: 10,
                            }
                        }).then(function (res) {
                            _this.getMessageInfoSucc(res);
                        });
                    }
                }
            },

            // 展示完善筛选条件模态框
            showScreenModal() {
                axios.get(this.api1 + '/sbkp/message/messageListBySearch/rules')
                    .then(this.getTagsInfoSucc);
                this.screenDialog = true;
            },

            // 完善筛选条件-提交操作
            submitForm() {
                var _this = this;
                let screenDataId = [];
                let time1, time2;
                if (this.screenData.time1 == null || this.screenData.time2 == null) {
                    time1 = 'NaN-NaN-NaN';
                    time2 = 'NaN-NaN-NaN';
                } else {
                    const d1 = new Date(this.screenData.time1);
                    const d2 = new Date(this.screenData.time2);
                    time1 = d1.getFullYear() + '-' + this.p((d1.getMonth() + 1)) + '-' + this.p(d1.getDate());
                    time2 = d2.getFullYear() + '-' + this.p((d2.getMonth() + 1)) + '-' + this.p(d2.getDate());
                }
                for (let i = 0; i < this.screenData.screenReason.length; i++) {
                    for (let j = 0; j < this.keyword.length; j++) {
                        if (this.screenData.screenReason[i] === this.keyword[j].name) {
                            screenDataId.push(this.keyword[j].id)
                        }
                    }
                }
                let personnelType = 0;
                let levelId = 1;
                if (this.personnelType === 'first') {
                    personnelType = 0;
                } else if (this.personnelType === 'second') {
                    personnelType = 1;
                }
                if (this.label === '紧急') {
                    levelId = 2;
                } else {
                    levelId = 1;
                }
                if (time1 === 'NaN-NaN-NaN' || time2 === 'NaN-NaN-NaN') {
                    axios.post(this.api1 + "/sbkp/message/messageListBySearch", qs.stringify({
                            isKey: personnelType,
                            levelCode: levelId,
                            actionIds: screenDataId,
                            name: this.screenData.stuName,
                            pageNum: this.currentPage,
                            pageSize: 10
                        }),
                    ).then(function (res) {
                        _this.getSearchInfoSucc(res);
                    });
                } else {
                    axios.post(this.api1 + "/sbkp/message/messageListBySearch", qs.stringify({
                            isKey: personnelType,
                            levelCode: levelId,
                            startTime: time1,
                            endTime: time2,
                            actionIds: screenDataId,
                            name: this.screenData.stuName,
                            pageNum: this.currentPage,
                            pageSize: 10
                        }),
                    ).then(function (res) {
                        _this.getSearchInfoSucc(res);
                    });
                }
                // 关闭模态框
                this.closeModal();
                return true;
            },

            // 展示处理模态框
            showHandleDialog(id) {
                this.messageId = id;
                this.handleDialog = true;
            },

            // 处理报警信息
            handleMessage() {
                var _this = this;
                axios.post(this.api1 + '/sbkp/message/putKeyMessageStatus/1', qs.stringify({
                        messageId: this.messageId,
                        remark: this.remark
                    }
                )).then(function () {
                    _this.$message({
                        message: '消息处理成功！',
                        type: 'success'
                    });
                }).catch(function () {
                    _this.$message.error('消息处理失败,请重试！');
                });
                this.getLabel(this.label);
                this.closeModal();
            },

            // 忽略报警信息
            ignoreMessage() {
                var _this = this;
                axios.post(this.api1 + '/sbkp/message/putKeyMessageStatus/2', qs.stringify({
                        messageId: this.messageId,
                        remark: this.remark
                    }
                )).then(function () {
                    _this.$message({
                        message: '消息忽略成功！',
                        type: 'success'
                    });
                }).catch(function () {
                    _this.$message.error('消息忽略失败,请重试！');
                });
                this.getLabel(this.label);
                this.closeModal();
            },

            // 展示添加重点人员模态框
            showAddDialog(id) {
                this.messageId = id;
                this.addDialog = true;
            },

            // 非重点人员添加至名单
            addNew() {
                var _this = this;
                axios.post(this.api1 + '/sbkp/message/putMessageStatus', qs.stringify({
                        messageId: this.messageId,
                    }
                )).then(function () {
                    _this.$message({
                        message: '添加重点人员成功！',
                        type: 'success'
                    });
                }).catch(function () {
                    _this.$message.error('添加重点人员失败,请重试！');
                });
                this.getLabel(this.label);
                this.closeModal();
            },

            // 关闭模态框
            closeModal() {
                // 处理模态框数据清空
                this.remark = '';
                this.screenDialog = false;
                this.handleDialog = false;
                this.addDialog = false;
            },

            // 获取标签
            getTagsInfoSucc(res) {
                res = res.data;
                this.keyword = res.rules;
            },

            // 获取筛选结果
            getSearchInfoSucc(res) {
                res = res.data;
                this.totalNum = res.totalNum;
                this.messageList = res.messageList;
                this.searchDetection = true;
            },

            // 获取当前页码
            pageNum(currentPage) {
                this.currentPage = currentPage;
                if (this.searchDetection === false) {
                    // 筛选字段模态框数据清空
                    this.screenData.time1 = '';
                    this.screenData.time2 = '';
                    this.screenData.screenReason = [];
                    this.screenData.name = '';
                    this.getMessageInfo();
                } else if (this.searchDetection === true) {
                    this.submitForm();
                }
            },
        },
        mounted() {
            this.getMessageInfo();
        },
        components: {
            infoTable
        }
    }
</script>

<style scoped>
    button {
        outline: none;
        cursor: pointer;
    }

    .content {
        position: relative;
        margin-top: 12px;
        margin-left: 220px;
        margin-right: 40px;
        min-width: 1300px;
    }

    .content >>> .el-button--primary {
        /*float: right;*/
        position: absolute;
        top: -13px;
        right: 30px;
        z-index: 999;
    }

    .el-tabs--card >>> .el-tabs__header {
        border: 0;
        margin: 27px 0 0;
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
        padding: 7px 55px 20px;
    }

    .el-dropdown {
        font-size: 24px;
        float: left;
        margin: 0 0 15px 15px;
        outline: none;
        cursor: pointer;
    }

    /*分界线*/
    .boundary {
        margin-top: 45px;
        margin-bottom: 0;
        width: 100%;
        height: 3px;
        border: 0;
        background: #E0E0E0;
    }

    /*分页*/
    .block {
        text-align: center;
        margin-top: 20px;
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
    }

    /*表单部分*/
    .bodyModal {
        margin: 15px 26px 0;
        width: 90%;
    }

    .allModal >>> .el-col-9 {
        margin: 0 6px;
    }

    .allModal >>> .el-col-2 {
        text-align: center;
    }

    .allModal >>> .el-form-item {
        margin-bottom: 15px;
    }

    .allModal >>> .el-dialog__body {
        padding: 0;
    }

    .allModal >>> .el-form-item__label {
        margin: 0;
    }

    .allModal >>> .el-select {
        width: 370px;
    }

    .allModal >>> .el-input__inner {
        height: 38px;
    }

    .allModal >>> .el-dialog__footer {
        padding: 15px 20px;
    }

    .allModal >>> .el-button--primary {
        position: relative;
        top: 0;
        right: 0;
    }

    .bodyModalhandle {
        margin: 20px 66px;
        width: 75%;
        text-align: center;
    }

    .tips {
        margin-bottom: 10px;
        color: #101010;
        font-size: 24px;
    }

    .el-textarea {
        margin-top: 30px;
    }

    .delbutton {
        margin-bottom: 10px;
        text-align: center;
    }

    .add {
        margin-left: 35px;
    }
</style>