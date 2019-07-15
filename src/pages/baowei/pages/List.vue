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
                        <el-button slot="append" icon="el-icon-search" @click="searchStu"></el-button>
                    </el-input>
                </div>
                <!--分界线-->
                <hr class="boundary">
                <!--主体-->
                <el-col :span="24" class="table-wrapper">
                    <!--表格-->
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
                            <td>在校状态</td>
                            <td>更多操作</td>
                        </tr>
                        </thead>
                        <!--内容-->
                        <tbody v-for="(item,index) in personList">
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
                            <td>{{item.schoolStatus}}</td>
                            <!--操作-->
                            <td>
                                <router-link class="iconfont operation" :to="{path:'/History',query:{id:item.id}}">
                                    &#xe685;
                                </router-link>
                                <router-link class="iconfont operation" to="/Footprint">&#xe677;</router-link>
                                <span class="iconfont operation" @click="showModifyModal(item.id)">&#xe64b;</span>
                                <span class="iconfont operation" @click="showDelModal(item.id)">&#xe639;</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <!--分页-->
                    <nav class="block">
                        <el-pagination layout="prev, pager, next"
                                       @current-change="pageNum"
                                       :total=totalNum
                                       background>
                        </el-pagination>
                    </nav>
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
                                          @keyup.enter.native="submitAdd(formData.stuNum,formData.addReason)"
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
                                <el-tag v-for="tag in showTags"
                                        :key="tag.id"
                                        :disable-transitions="false"
                                        @click="tagContent(tag.id,tag.name)">
                                    {{tag.name}}
                                </el-tag>
                            </div>
                        </el-form>
                    </div>
                    <hr class="boundaryModal">
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="closeModal">取消</el-button>
                        <el-button type="primary" @click="submitAdd(formData.stuNum,formData.addReason)">提交</el-button>
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
                                    label="学号: "
                                    prop="stuNum">
                                <el-input type="stuNum"
                                          id="stuNum"
                                          ref="stuNum"
                                          v-model="formData.stuNum"
                                          autocomplete="off"
                                          disabled
                                          @keyup.enter.native="submitModify(formData.addReason)"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                    label="添加原因（多个标签用空格分隔）:"
                                    prop="addReason">
                                <el-input type="stuNum"
                                          id="addReason"
                                          ref="addReason"
                                          v-model="formData.addReason"
                                          autocomplete="off"
                                          @keyup.enter.native="handleInputConfirm"
                                ></el-input>
                                <!--上次使用的标签-->
                                <div class="tags">
                                    <span>我的添加原因：</span>
                                    <el-tag v-for="historytag in historyAddReason"
                                            :key="historytag"
                                            :disable-transitions="false"
                                            type="info"
                                    >{{historytag}}
                                    </el-tag>
                                </div>
                                <!--所有标签-->
                                <div class="tags">
                                    <span>推荐添加原因：</span>
                                    <el-tag v-for="tag in showTags"
                                            :key="tag.id"
                                            :disable-transitions="false"
                                            @click="tagContent(tag.id,tag.name)">
                                        {{tag.name}}
                                    </el-tag>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                    <hr class="boundaryModal">
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="closeModal">取消</el-button>
                        <el-button type="primary" @click="submitModify(formData.addReason)">提交</el-button>
                    </div>
                </el-dialog>
                <!--模态框-删除重点人员-->
                <el-dialog title="删除重点人员"
                           class="allModal"
                           :visible.sync="delDialog"
                           :close-on-press-escape="false"
                           :close-on-click-modal="false"
                           width="520px">
                    <hr class="boundaryModal">
                    <!--提示文本-->
                    <div class="bodyModaldel">
                        <span class="tips">是否确认从列表删除该名重点人员？</span>
                    </div>
                    <div slot="footer" class="dialog-footer delbutton">
                        <el-button @click="closeModal">取 消</el-button>
                        <el-button type="danger" @click="delStu">删 除</el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name: "List",
        data() {
            return {
                personList: [],
                totalNum: 0,
                // 下拉框
                label: '',
                select: '',
                // 搜索后的数据表
                stuList: [],
                // 分页
                currentPage: 1,
                // 模态框
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
                addReasonId: [],
                // 历史添加原因标签
                historyAddReason: [],
                // 全部标签（对象数组）
                showTags: [],
                modifyNum: '',
                // 删除id号
                delNum: '',
            }
        },
        methods: {
            // 初始化列表
            getStudentsInfo() {
                axios.get(this.api1 + '/sbkp/personnel/personnelList', {
                    params: {
                        pageNum: this.currentPage,
                        pageSize: 10,
                    }
                }).then(this.getStudentsInfoSucc)
            },

            // 处理表格数据
            getStudentsInfoSucc(res) {
                res = res.data;
                this.totalNum = res.totalNum;
                const data = res.personnelList;
                for (let i = 0; i < data.length; i++) {
                    data[i].reasonNames = data[i].reasonNames.join(' ');
                    if (data[i].schoolStatus === 0) {
                        data[i].schoolStatus = '是'
                    } else {
                        data[i].schoolStatus = '否'
                    }
                }
                this.personList = data;
            },

            // 获取关键词搜索的数据
            searchStu() {
                if (this.select === '1') {
                    axios.get(this.api1 + '/sbkp/personnel/personnelList/stu_num/' + this.label)
                        .then(this.searchList)
                } else if (this.select === '2') {
                    axios.get(this.api1 + '/sbkp/personnel/personnelList/name/' + this.label)
                        .then(this.searchList)
                } else if (this.select === '3') {
                    console.log(this.label);
                    axios.get(this.api1 + '/sbkp/personnel/personnelList/college/' + this.label)
                        .then(this.searchList)
                } else {
                    this.$message({
                        showClose: true,
                        message: '请选择要查找的信息类型',
                        type: 'error'
                    });
                }
            },

            // 处理搜索的数据并跳转至搜索页面
            searchList(res) {
                res = res.data;
                const data = res.personnelList;
                for (let i = 0; i < data.length; i++) {
                    data[i].reasonNames = data[i].reasonNames.join(' ');
                    if (data[i].schoolStatus === 0) {
                        data[i].schoolStatus = '是'
                    } else {
                        data[i].schoolStatus = '否'
                    }
                }
                this.stuList = data;
                this.$router.push({
                    name: '搜索结果',
                    params: {
                        select: this.select,
                        label: this.label,
                        list: this.stuList,
                        totalNum: res.totalNum,
                    }
                })
            },

            // 展示添加模态框
            showAddModal() {
                if (this.showTags.length === 0) {
                    axios.get(this.api1 + '/sbkp/personnel/reasons')
                        .then(this.getTagsInfoSucc);
                }
                this.addDialog = true;
            },

            // 添加-提交操作数据处理
            submitAdd(stuNum, addReason) {
                // 提交表单--点击提交or学号input框获得焦点时回车
                // 判断字符串是否为数字 ，判断正整数用/^[1-9]+[0-9]*]*$/
                var reg = /^[0-9]+.?[0-9]*$/;
                var _this = this;
                let tags = [];
                let newTag = {};
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
                this.addReasonId = [];
                this.addReasonArr = addReason.split(" ");
                for (let i = 0; i < this.addReasonArr.length; i++) {
                    for (let j = 0; j < this.showTags.length; j++) {
                        if (this.addReasonArr[i] === this.showTags[j].name) {
                            this.addReasonId.push(this.showTags[j].id)
                        }
                    }
                }
                if (addReason) {
                    // 判断数组不为空
                    this.addReasonArr.filter(item => {
                        return item !== '' && item !== undefined;
                    });
                    // 循环数据进行对比
                    this.addReasonArr.forEach(element => {
                        // 取出对象中的name
                        for (let i = 0; i < this.showTags.length; i++) {
                            tags[i] = this.showTags[i].name
                        }
                        // 获取索引位置，获取不到添加进数组
                        let index = tags.findIndex(i => {
                            return i === element;
                        });
                        if (index < 0) {
                            $.ajax({
                                url: _this.api1 + '/sbkp/personnel/postDefinedReason',
                                async: false,
                                data: {"reasonName": element},
                                // contentType: 'application/json;charset=utf-8',
                                type: 'POST',
                                dataType: 'json',
                                success(data) {
                                    newTag = {
                                        id: data.id,
                                        name: element,
                                    };
                                    _this.showTags.push(newTag);
                                    _this.addReasonId.push(data.id)
                                }
                            })
                        }
                    });
                    addReason = this.addReasonId.join(',')
                    this.addForm(stuNum,addReason)
                }
            },

            // 添加-提交操作调用接口
            addForm(stuNum, addReason) {
                var _this = this;
                axios.post(this.api1 + '/sbkp/personnel/postPersonal', qs.stringify({
                        studentNum: stuNum,
                        reasonIds: addReason
                    }
                )).then(function () {
                    _this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                    _this.getStudentsInfo();
                }).catch(function () {
                    _this.$message.error('添加失败,请重试！');
                });
                // 关闭模态框
                this.closeModal();
            },

            // 展示修改模态框
            showModifyModal(id) {
                this.modifyNum = id;
                //获取学生学号及添加原因的数据传入模态框
                for (let i = 0; i < this.personList.length; i++) {
                    if (id === this.personList[i].id) {
                        this.formData.stuNum = this.personList[i].stuNum;
                        this.formData.addReason = this.personList[i].reasonNames;
                    }
                }
                this.historyAddReason = this.formData.addReason.split(" ");
                if (this.showTags.length === 0) {
                    axios.get(this.api1 + '/sbkp/personnel/reasons')
                        .then(this.getTagsInfoSucc);
                }
                this.modifyDialog = true;
            },

            // 修改-提交操作数据处理
            submitModify(addReason) {
                var _this = this;
                let newTag = {};
                let tags = [];
                if (addReason === "") {
                    // 判断添加原因是否为空
                    this.$nextTick(() => {
                        this.$refs.addReason.focus()
                    });
                    this.$message.error('添加原因不能为空');
                    return false;
                }
                this.addReasonId = [];
                this.addReasonArr = addReason.split(" ");
                for (let i = 0; i < this.addReasonArr.length; i++) {
                    for (let j = 0; j < this.showTags.length; j++) {
                        if (this.addReasonArr[i] === this.showTags[j].name) {
                            this.addReasonId.push(this.showTags[j].id)
                        }
                    }
                }
                if (addReason) {
                    // 判断数组不为空
                    this.addReasonArr.filter(item => {
                        return item !== '' && item !== undefined;
                    });
                    // 循环数据进行对比
                    this.addReasonArr.forEach(element => {
                        // 取出对象中的name
                        for (let i = 0; i < this.showTags.length; i++) {
                            tags[i] = this.showTags[i].name
                        }
                        // 获取索引位置，获取不到添加进数组
                        let index = tags.findIndex(i => {
                            return i === element;
                        });
                        if (index < 0) {
                            $.ajax({
                                url: _this.api1 + '/sbkp/personnel/postDefinedReason',
                                async: false,
                                data: {"reasonName": element},
                                // contentType: 'application/json;charset=utf-8',
                                type: 'POST',
                                dataType: 'json',
                                success(data) {
                                    // console.log(data)
                                    newTag = {
                                        id: data.id,
                                        name: element,
                                    };
                                    _this.showTags.push(newTag);
                                    _this.addReasonId.push(data.id)
                                }
                            })
                        }
                    });
                    addReason = this.addReasonId.join(',')
                    this.modifyForm(addReason)
                }
            },

            // 修改-提交操作调用接口
            modifyForm(addReason) {
                var _this = this;
                axios.post(this.api1 + '/sbkp/personnel/putReasons', qs.stringify({
                        personnelId: this.modifyNum,
                        reasonIds: addReason
                    }
                )).then(function () {
                    _this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    _this.getStudentsInfo();
                }).catch(function () {
                    _this.$message.error('修改失败,请重试！');
                });
                // 关闭模态框
                this.closeModal();
            },

            // 展示删除模态框
            showDelModal(id) {
                this.delNum = id;
                this.delDialog = true;
            },

            // 删除-提交操作
            delStu() {
                var _this = this;
                axios.get(this.api1 + '/sbkp/personnel/deletePersonal', {
                    params: {
                        personnelId: this.delNum
                    }
                }).then(function () {
                    _this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    _this.getStudentsInfo();
                }).catch(function () {
                    _this.$message.error('删除失败,请重试！');
                });
                // 关闭模态框
                this.closeModal();
            },

            // 关闭添加模态框
            closeModal() {
                // 添加模态框数据清除
                this.formData.stuNum = '';
                this.formData.addReason = '';
                this.addReasonId = [];
                // 删除模态框数据清除
                this.delNum = '';
                // 关闭添加模态框
                this.addDialog = false;
                this.modifyDialog = false;
                this.delDialog = false;
            },

            // 处理标签数据并赋值
            getTagsInfoSucc(res) {
                res = res.data;
                const data = res.reasons;
                this.showTags = data;
            },

            // 增加标签
            handleInputConfirm() {
                let inputValue = this.formData.addReason;
                let tags = [];
                let newTag = {};
                var _this = this;
                if (inputValue) {
                    // 获取输入的数据
                    let values = inputValue.split(" ").filter(item => {
                        return item !== '' && item !== undefined;
                    });
                    // 循环数据进行对比
                    values.forEach(element => {
                        // 取出对象中的name
                        for (let i = 0; i < this.showTags.length; i++) {
                            tags[i] = this.showTags[i].name
                        }
                        // 获取索引位置，获取不到添加进数组
                        let index = tags.findIndex(i => {
                            return i === element;
                        });
                        if (index < 0) {
                            axios.post(this.api1 + '/sbkp/personnel/postDefinedReason', qs.stringify({
                                    reasonName: element
                                }
                            )).then(function (res) {
                                newTag = {
                                    id: res.data.id,
                                    name: element,
                                };
                                _this.showTags.push(newTag);
                            });
                        }
                    });
                }
            },

            // 选择标签
            tagContent(id, name) {
                let addReasonArr = [];
                if (this.formData.addReason === '') {
                    // 记录的添加原因为空
                    this.addReasonId.push(id);
                    this.formData.addReason = name;
                } else {
                    addReasonArr = this.formData.addReason.split(" ");
                    // 判断name是否重复
                    for (let i = 0; i < addReasonArr.length; i++) {
                        if (name === addReasonArr[i]) {
                            return false;
                        }
                    }
                    // 拼接addReason字符串
                    this.formData.addReason = this.formData.addReason + " " + name;
                    this.addReasonId.push(id);
                }
            },

            // 获取当前页码
            pageNum(currentPage) {
                this.currentPage = currentPage;
                this.getStudentsInfo();
                // this.$emit('pageNum', this.currentPage);
            },

            // 操作完成更新数据表
            // changList() {
            //     // this.$emit('getStudentsInfo', this.currentPage);
            //
            // },
        },
        mounted() {
            this.getStudentsInfo()//挂载组件
        }
    }
</script>

<style scoped>
    button {
        outline: none;
        cursor: pointer;
    }

    table {
        /*width:30em;*/
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

    .content {
        margin-left: 230px;
        margin-right: 50px;
        min-width: 990px;
    }

    /*人员添加*/
    /*按钮*/
    .addBtn {
        outline: none;
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
        margin-top: 13px;
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