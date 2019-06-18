<template>
    <div class="main">
        <div style="margin-right: 30px;text-align: right">
            <div class="block" style="display: inline-block">
                <span class="demonstration">选择日期</span>
                <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期"
                        @change="selectDate"
                >
                </el-date-picker>
            </div>
            <div style="display: inline-block;margin-left:20px" >
                <span class="demonstration">选择学院</span>
                <el-select v-model="value" placeholder="请选择" >
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="display: inline-block;margin-left: 20px" >
                <el-button  icon="el-icon-search">查询</el-button>
            </div>
        </div>

        <el-table
                :data="tableData"
                border
                style="width: 90%; margin-top: 40px">
            <el-table-column
                    prop="number"
                    label="序号"
                    width="60">
            </el-table-column>
            <el-table-column
                    prop="stuNum"
                    label="学号"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="xueyuan"
                    label="学院">
            </el-table-column>
            <el-table-column
                    prop="className"
                    label="班级"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="instructor"
                    label="辅导员"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="buildNum"
                    label="楼栋号"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="breakReason"
                    label="原因">
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="时间">
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '计算机与软件工程学院'
                }, {
                    value: '选项2',
                    label: '机械工程学院'
                }, {
                    value: '选项3',
                    label: '艺术设计学院'
                }, {
                    value: '选项4',
                    label: '大数据与人工智能学院'
                }, {
                    value: '选项5',
                    label: '通识教育与外国语学院'
                },
                    {
                        value: '选项6',
                        label: '管理工程学院'
                    }],
                value: '计算机与软件工程学院',



                value1: new Date(),
                tableData: [{
                    number: 1,
                    stuNum: '316202060724',
                    name: '张三',
                    sex:"男",
                    xueyuan:"计算机与软件工程学院",
                    className:"软件1607",
                    instructor:"汤菲菲",
                    breakReason:"晚归",
                    buildNum:"A18",
                    time:"2019/03/06 24:00"

                }],
                search: ''
            }
        },
        methods: {
            selectDate(){
                console.log(new Date(this.value1).toLocaleDateString() )
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
    }
</script>
<style>
    .main {
        min-width: 990px;
        margin-left: 230px;
        margin-top: 10px;
    }

</style>