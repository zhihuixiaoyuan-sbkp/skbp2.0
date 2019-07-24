<template>
    <div>
        <div class="tableBox">
                <span class="dataText">今日</span>
                <div class="rowBox">
                    <el-divider class="el-divider"></el-divider>
                    <el-table
                            :data="logList"
                            style="width: 100%"
                            align="center">
                        <el-table-column
                                align="center"
                                type=index
                                label="序号"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="stuNum"
                                label="学号"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="name"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="gender"
                                label="性别"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="proClass"
                                label="专业班级">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="actionName"
                                label="行为描述">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="dateTime"
                                label="处理时间">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="status"
                                label="状态"
                                width="90"
                                :formatter="filterStatus">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop=""
                                label="备注"
                                :formatter="filterStatus2">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        background="red"
                                        size="mini"
                                        @click="handleEdit(scope.row.id)">撤销
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="rowBox">
                    <el-divider class="el-divider"></el-divider>
                </div>

            </div>
    </div>
</template>

<script>
    export default {
        name: "handle",
        props:{
            logList:{
                type:Array,
                default:""
            }

        },
        methods:{
            filterStatus(row, cellValue) {
                console.log(row.status)
                if (row.status === '0') {
                    return "未处理"
                } else if (row.status === '1') {
                    return "已处理"
                } else {
                    return "已忽略"
                }
            },
            filterStatus1(row,val) {
                console.log(row.reason)
                return row.reason === "null" ? "无数据" : row.reason
            },
            filterStatus2(row,val) {
                console.log(row.remark)
                return row.remark === undefined ? "无备注" : row.remark
            },
            open(id) {
                this.$confirm('确认撤销?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit('handleEdit',id)
                    // this.$message({
                    //     type: 'success',
                    //     message: '撤销成功!'
                    // });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消撤销'
                    });
                });
            },
            handleEdit(id){
                this.open(id)
            },
        }
    }
</script>

<style scoped>

</style>