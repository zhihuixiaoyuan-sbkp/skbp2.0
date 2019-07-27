<template>
    <div>
        <!--导入-->
        <el-dialog title="批量导入"
                   class="allModal"
                   width="520px"
                   :visible.sync="importDialog"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false"
                   :before-close="updateList">
            <hr class="boundaryModal">
            <div class="bodyModal">
                <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </div>
            <hr class="boundaryModal">
            <div slot="footer" class="dialog-footer">
                <el-button class="download" type="warning" size="medium" @click="download">模板下载</el-button>
                <el-button @click.native="updateList">取消</el-button>
                <el-button type="primary" @click="">上传</el-button>
            </div>
        </el-dialog>
        <!--模态框-添加重点人员-->
        <el-dialog title="添加重点人员"
                   class="allModal"
                   width="520px"
                   :visible.sync="addDialog"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false"
                   :before-close="updateList">
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
                <el-button @click.native="updateList">取消</el-button>
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
                   :before-close="updateList">
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
                                  disabled
                                  @keyup.enter.native="submitModify(formData.addReason)"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                            label="添加原因（多个标签用空格分隔）:"
                            prop="addReason">
                        <el-input type="stuNum"
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
                <el-button @click.native="updateList">取消</el-button>
                <el-button type="primary" @click="submitModify(formData.addReason)">提交</el-button>
            </div>
        </el-dialog>
        <!--模态框-删除重点人员-->
        <el-dialog title="删除重点人员"
                   class="allModal"
                   width="520px"
                   :visible.sync="delDialog"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false"
                   :before-close="updateList">
            <hr class="boundaryModal">
            <!--提示文本-->
            <div class="bodyModaldel">
                <span class="tips">是否确认从列表删除该名重点人员？</span>
            </div>
            <div slot="footer" class="dialog-footer delbutton">
                <el-button @click="updateList">取 消</el-button>
                <el-button type="danger" @click="delStu">删 除</el-button>
            </div>
        </el-dialog>
        <!--模态框-添加心理异常人员-->
        <el-dialog title="添加心理异常人员"
                   class="allModal"
                   width="520px"
                   :visible.sync="xinliAddDialog"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false"
                   :before-close="updateList">
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
                    <div class="selection-state">
                        <span>状态：</span>
                        <el-radio v-model="formData.radio" label="1">轻度心理异常人员</el-radio>
                        <el-radio v-model="formData.radio" label="2">重度心理异常人员</el-radio>
                    </div>
                </el-form>
            </div>
            <hr class="boundaryModal">
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="updateList">取消</el-button>
                <el-button type="primary"
                           @click="submitAdd(formData.stuNum,formData.addReason,formData.radio)">提交
                </el-button>
            </div>
        </el-dialog>
        <!--模态框-修改心理异常人员-->
        <el-dialog title="修改心理异常人员信息"
                   class="allModal"
                   width="520px"
                   :visible.sync="xinliModifyDialog"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false"
                   :before-close="updateList">
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
                                  disabled
                                  @keyup.enter.native="submitModify(formData.addReason)"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                            label="添加原因（多个标签用空格分隔）:"
                            prop="addReason">
                        <el-input type="stuNum"
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
                        <div class="selection-state">
                            <span>状态：</span>
                            <el-radio v-model="formData.radio" label="1">轻度心理异常人员</el-radio>
                            <el-radio v-model="formData.radio" label="2">重度心理异常人员</el-radio>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <hr class="boundaryModal">
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="updateList">取消</el-button>
                <el-button type="primary" @click="submitModify(formData.addReason,formData.radio)">提交
                </el-button>
            </div>
        </el-dialog>
        <!--模态框-删除心理异常人员-->
        <el-dialog title="删除心理异常人员"
                   class="allModal"
                   width="520px"
                   :visible.sync="xinliDelDialog"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false"
                   :before-close="updateList">
            <hr class="boundaryModal">
            <!--提示文本-->
            <div class="bodyModaldel">
                <span class="tips">是否从列表删除该心理异常人员？</span>
            </div>
            <div slot="footer" class="dialog-footer delbutton">
                <el-button @click="updateList">取 消</el-button>
                <el-button type="danger" @click="delStu">删 除</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name: "operateModal",
        props: {
            curPath: String,
            personList: Array,
            import: Boolean,
            add: Boolean,
            modify: Boolean,
            delete: Boolean,
            modifyNum: String,
            delNum: String,
        },
        data() {
            return {
                curPath: '',
                personList: [],
                // 模态框
                importDialog: false,
                addDialog: false,
                modifyDialog: false,
                delDialog: false,
                xinliAddDialog: false,
                xinliModifyDialog: false,
                xinliDelDialog: false,
                // 修改id号
                modifyNum: '',
                // 删除id号
                delNum: '',
                // form表单数据
                formData: {
                    stuNum: '',
                    addReason: '',
                    radio: '1'
                },
                // 记录添加原因
                addReasonArr: [],
                addReasonId: [],
                // 历史添加原因标签
                historyAddReason: [],
                // 全部标签（对象数组）
                showTags: [],
            }
        },
        methods: {
            // 更新人员表
            updateList() {
                // 模态框数据清除
                this.formData.stuNum = '';
                this.formData.addReason = '';
                this.formData.radio = '1';
                this.addReasonId = [];
                // 更新表
                this.$emit("updateList")
            },

            download() {
                console.log(this.curPath)
                var _this = this;
                if (this.curPath === "/List"){
                    axios({
                        method: "get",
                        url: _this.api1 + "/dist/static/file/保卫处-批量导入模板.xlsx",
                    }).then(function (response) {
                        let filename = "保卫处-批量导入模板.xlsx";
                        // this.fileDownload(response.data, filename);
                    }.bind(this)).catch(function (error) {
                        alert("网络请求出错");
                    }.bind(this));
                }else if (this.curPath === "/List"){
                    axios({
                        method: "get",
                        url: _this.api1 + "/dist/static/file/辅导员-批量导入模板.xlsx",
                    }).then(function (response) {
                        let filename = "辅导员-批量导入模板.xlsx";
                        // this.fileDownload(response.data, filename);
                    }.bind(this)).catch(function (error) {
                        alert("网络请求出错");
                    }.bind(this));
                }else if (this.curPath === "/List"){
                    axios({
                        method: "get",
                        url: _this.api1 + "/dist/static/file/辅导员-批量导入模板.xlsx",
                    }).then(function (response) {
                        let filename = "辅导员-批量导入模板.xlsx";
                        // this.fileDownload(response.data, filename);
                    }.bind(this)).catch(function (error) {
                        alert("网络请求出错");
                    }.bind(this));
                }
            },

            fileDownload(data, fileName) {
                let blob = new Blob([data], {
                    type: "application/octet-stream"
                });
                let filename = fileName || "filename.xls";
                if (typeof window.navigator.msSaveBlob !== "undefined") {
                    window.navigator.msSaveBlob(blob, filename);
                } else {
                    var blobURL = window.URL.createObjectURL(blob);
                    var tempLink = document.createElement("a");
                    tempLink.style.display = "none";
                    tempLink.href = blobURL;
                    tempLink.setAttribute("download", filename);
                    if (typeof tempLink.download === "undefined") {
                        tempLink.setAttribute("target", "_blank");
                    }
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    window.URL.revokeObjectURL(blobURL);
                }
            },

            // 添加-提交操作数据处理
            submitAdd(stuNum, addReason, radio) {
                // 提交表单--点击提交or学号input框获得焦点时回车
                // 判断字符串是否为数字 ，判断正整数用/^[1-9]+[0-9]*]*$/
                var reg = /^[0-9]+.?[0-9]*$/;
                var _this = this;
                let newTag = {};
                let tags = [];
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
                    addReason = this.addReasonId.join(',');
                    this.addForm(stuNum, addReason, radio)
                }
            },

            // 添加-提交操作调用接口
            addForm(stuNum, addReason, radio) {
                var _this = this;
                axios.post(this.api1 + '/sbkp/personnel/postPersonal', qs.stringify({
                        studentNum: stuNum,
                        reasonIds: addReason,
                        mentalStatus: radio
                    }
                )).then(function (res) {
                    res = res.data;
                    if (res.status === 0) {
                        _this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        _this.updateList();
                    } else if (res.status === 4) {
                        _this.$message({
                            message: '请勿重复添加！',
                            type: 'warning'
                        });
                    } else if (res.status === 6) {
                        _this.$message({
                            message: '请检查学号信息是否有误！',
                            type: 'warning'
                        });
                    } else if (res.status === 1) {
                        _this.$message.error('添加失败,请重试！');
                        _this.updateList();
                    }
                }).catch(function () {
                    _this.$message.error('添加失败,请重试！');
                    _this.updateList();
                });
            },

            // 修改-提交操作数据处理
            submitModify(addReason, radio) {
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
                    addReason = this.addReasonId.join(',');
                    this.modifyForm(addReason, radio)
                }
            },

            // 修改-提交操作调用接口
            modifyForm(addReason, radio) {
                var _this = this;
                axios.post(this.api1 + '/sbkp/personnel/putReasons', qs.stringify({
                        personnelId: this.modifyNum,
                        reasonIds: addReason,
                        mentalStatus: radio
                    }
                )).then(function () {
                    _this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    _this.updateList();
                }).catch(function () {
                    _this.$message.error('修改失败,请重试！');
                });
                // // 关闭模态框
                this.updateList();
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
                    _this.updateList();
                }).catch(function () {
                    _this.$message.error('删除失败,请重试！');
                });
                // 关闭模态框
                this.updateList();
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
                // 新标签数组
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
                                    name: element
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
        },
        watch: {
            curPath: function (newVal) {
                this.curPath = newVal;
            },

            personList: function (newVel) {
                this.personList = newVel;
            },

            import: function (newVel) {
                this.importDialog = newVel;
            },

            add: function (newVel) {
                if (this.showTags.length === 0) {
                    axios.get(this.api1 + '/sbkp/personnel/reasons')
                        .then(this.getTagsInfoSucc);
                }
                if (this.curPath === '/abnormalList') {
                    this.xinliAddDialog = newVel;
                } else {
                    this.addDialog = newVel;
                }
            },

            modifyNum: function (newVel) {
                this.modifyNum = newVel
            },

            modify: function (newVel) {
                if (this.showTags.length === 0) {
                    axios.get(this.api1 + '/sbkp/personnel/reasons')
                        .then(this.getTagsInfoSucc);
                }
                //获取学生学号及添加原因的数据传入模态框
                if (this.curPath === '/abnormalList' || this.curPath === '/listSearch') {
                    for (let i = 0; i < this.personList.length; i++) {
                        if (this.modifyNum === this.personList[i].id) {
                            this.formData.stuNum = this.personList[i].stuNum;
                            this.formData.addReason = this.personList[i].reasonNames;
                            if (this.personList[i].mentalStatus === '轻度心理异常') {
                                this.formData.radio = '1';
                            } else {
                                this.formData.radio = '2';
                            }
                        }
                    }
                    this.historyAddReason = this.formData.addReason.split(" ");
                    this.xinliModifyDialog = newVel;
                } else {
                    for (let i = 0; i < this.personList.length; i++) {
                        if (this.modifyNum === this.personList[i].id) {
                            this.formData.stuNum = this.personList[i].stuNum;
                            this.formData.addReason = this.personList[i].reasonNames;
                        }
                    }
                    this.historyAddReason = this.formData.addReason.split(" ");
                    this.modifyDialog = newVel;
                }
            },

            delNum: function (newVel) {
                this.delNum = newVel
            },

            delete: function (newVel) {
                if (this.curPath === '/abnormalList' || this.curPath === '/listSearch') {
                    this.xinliDelDialog = newVel;
                } else {
                    this.delDialog = newVel
                }
            },
        }
    }
</script>

<style scoped>
    button {
        outline: none;
        cursor: pointer;
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

    .allModal >>> .el-upload {
        margin: 15px 54px;
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

    .download {
        float: left;
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