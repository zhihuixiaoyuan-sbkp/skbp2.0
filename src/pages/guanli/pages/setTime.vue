<template>
    <div class="main">
        <div class="head">
            <span style="margin-top: 10px;display: inline-block">设置系统休眠时间： </span>
            <el-dialog title="修改信息" style="position: relative" :visible.sync="dialogFormVisible">
                <div class="info_box">
                    <div class="block">
                        <span class="demonstration">假期名称：</span>
                        <el-input style="width: 220px"
                                  class="inline-input"
                                  v-model="setNames"
                                  placeholder="请输入假期名"
                                  :trigger-on-focus="false"
                        ></el-input>
                        <!--<el-autocomplete-->
                        <!--style="width: 220px"-->
                        <!--class="inline-input"-->
                        <!--v-model="setNames"-->
                        <!--:fetch-suggestions="querySearch"-->
                        <!--placeholder="请输入假期名"-->
                        <!--:trigger-on-focus="false"-->
                        <!--@select="handleSelect"-->
                        <!--&gt;</el-autocomplete>-->
                    </div>
                    <div class="block">
                        <span class="demonstration">开始时间:&nbsp&nbsp&nbsp</span>
                        <el-date-picker
                                v-model="valueTimeStart"
                                type="date"
                                placeholder="选择日期"
                                @change="selectDate"
                                value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                    </div>
                    <div class="block">
                        <span class="demonstration">结束时间：</span>
                        <el-date-picker
                                v-model="valueTimeEnd"
                                type="date"
                                placeholder="选择日期"
                                @change="selectDate"
                                value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleEdit">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="添加假期" style="position: relative" :visible.sync="dialogFormVisible1">
                <div class="info_box">
                    <div class="block">
                        <span class="demonstration">假期名称：</span>
                        <el-input style="width: 220px"
                                  class="inline-input"
                                  v-model="setNames"
                                  placeholder="请输入假期名"
                                  :trigger-on-focus="false"
                        ></el-input>
                    </div>
                    <div class="block">
                        <span class="demonstration">开始时间:&nbsp&nbsp&nbsp</span>
                        <el-date-picker
                                v-model="valueTimeStart"
                                type="date"
                                placeholder="选择日期"
                                @change="selectDate"
                                value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                    </div>
                    <div class="block">
                        <span class="demonstration">结束时间：</span>
                        <el-date-picker
                                v-model="valueTimeEnd"
                                type="date"
                                placeholder="选择日期"
                                @change="selectDate"
                                value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeModal">取 消</el-button>
                    <el-button type="primary" @click="handleAdd">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="删除" style="position: relative" :visible.sync="dialogDelete">
                <div class="info_box">
                    <div class="block">
                        <span style="font-size: 20px">是否确认删除该条节假日信息？</span>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeModal">取 消</el-button>
                    <el-button type="primary" @click="handleDelete">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="body_box">
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    align="center">
                <el-table-column
                        align="center"
                        prop="name"
                        label="假期名称"
                        width="220">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="startDate"
                        label="开始时间"
                        width="220">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="endDate"
                        width="220"
                        label="结束时间">
                </el-table-column>
                <el-table-column
                        width="550"
                        align="center"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showDialog(0,scope.row.id,scope.row.name,scope.row.startDate,scope.row.endDate)">
                            修改
                        </el-button>
                        <el-button
                                v-if="scope.row.name !== '暑假' && scope.row.name !== '寒假'"
                                size="mini"
                                type="danger"
                                @click="showDialog(2,scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span class="add" @click="showDialog(1)">添加假期</span>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name: "setTime",
        data() {
            return {
                setId: 0,
                setNames: '',
                valueTimeStart: "",//开始时间
                valueTimeEnd: "",//结束时间
                restaurants: [],
                setName: '',
                tableData: [],
                dialogFormVisible: false,
                dialogFormVisible1: false,
                dialogDelete:false,
                formLabelWidth: '200px'
            }
        },
        methods: {
            // 初始化列表
            loadAll() {
                axios.get(this.api1 + '/sbkp/additional/holidays', {}).then(this.getAllSucc)
            },

            // 数据处理
            getAllSucc(res) {
                res = res.data;
                const data = res.data;
                this.tableData = data;
            },

            // 添加
            handleAdd() {
                var _this = this;
                axios.post(this.api1 + '/sbkp/additional/addHoliday', qs.stringify({
                        name: this.setNames,
                        startDate: this.valueTimeStart,
                        endDate: this.valueTimeEnd
                    }
                )).then(function (res) {
                    if (res.status === 0) {
                        _this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        _this.closeModal();
                    } else if (res.status === 4) {
                        _this.$message({
                            message: '假期名不能重复！',
                            type: 'warning'
                        });
                    } else if (res.status === 1) {
                        _this.$message.error('添加失败,请重试！');
                        _this.closeModal();
                    }
                }).catch(function () {
                    _this.$message.error('添加失败,请重试！');
                    _this.closeModal();
                });
            },

            // 修改
            handleEdit() {
                var _this = this;
                axios.post(this.api1 + '/sbkp/additional/updateHoliday', qs.stringify({
                        id: this.setId,
                        name: this.setNames,
                        startDate: this.valueTimeStart,
                        endDate: this.valueTimeEnd
                    }
                )).then(function (res) {
                    if (res.status === 0) {
                        _this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                        _this.closeModal();
                    } else if (res.status === 4) {
                        _this.$message({
                            message: '假期名不能重复！',
                            type: 'warning'
                        });
                    } else if (res.status === 1) {
                        _this.$message.error('修改失败,请重试！');
                        _this.closeModal();
                    }
                }).catch(function () {
                    _this.$message.error('修改失败,请重试！');
                    _this.closeModal();
                });
            },

            // 删除
            handleDelete() {
                var _this = this;
                axios.get(this.api1 + '/sbkp/additional/deleteHoliday', {
                    params: {
                        id: this.setId
                    }
                }).then(function () {
                    _this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                }).catch(function () {
                    _this.$message.error('删除失败,请重试！');
                });
                // 关闭模态框
                this.closeModal();
            },

            // 关闭
            closeModal() {
                this.dialogFormVisible1 = false;
                this.dialogFormVisible = false;
                this.dialogDelete = false;
                this.loadAll();
            },

            // 展示
            showDialog(flag, id, name, date1, date2) {
                if (flag === 0) {
                    // 修改
                    this.setId = id;
                    this.setNames = name;
                    this.valueTimeStart = date1;
                    this.valueTimeEnd = date2;
                    this.dialogFormVisible = true
                }
                if (flag === 1) {
                    // 添加
                    this.setId = '';
                    this.setNames = '';
                    this.valueTimeStart = '';
                    this.valueTimeEnd = '';
                    this.dialogFormVisible1 = true
                }
                if (flag === 2) {
                    // 删除
                    this.setId = id;
                    this.dialogDelete = true
                }
            }

        },
        mounted() {
            this.restaurants = this.loadAll();
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

    .head {
        width: 100%;
        height: 40px;
    }

    li {
        line-height: normal;
        padding: 7px;
    }

    .block {
        margin-top: 10px;
    }

    .body_box {
        margin-top: 20px;
    }

    .info_box {
        /* margin-left: 150px; */
        position: relative;
        left: 50%;
        transform: translateX(-138px);
    }

    .add {
        position: relative;
        left: 43%;
        top: 10px;
        font-size: 16px;
        cursor: pointer;
        color: #02a774;
    }

</style>