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
                            prop="reason"
                            label="原因"
                            :formatter="filterStatus1">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="deleteTime"
                            label="删除时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="mindStatus"
                            label="状态"
                            v-if="isMind"
                            :formatter="filterStatus2">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作"
                            width="80">
                        <template slot-scope="scope">
                            <el-button
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
        name: "deleteTable",
        props:{
            logList:{
                type:Array,
                default:""
            },
            isMind:{
                type:Boolean,
                default: false
            }

        },
        methods:{

            filterStatus1(row,val) {
                console.log(row.reason)
                return row.reason === "null" ? "无数据" : row.reason
            },
            filterStatus2(row,val) {
                if (row.mindStatus === '0') {
                    return "心理正常"
                } else if (row.mindStatus === '1') {
                    return "轻度异常"
                }else{
                    return "重度异常"
                }
            },
            handleEdit(id){
                this.$emit('handleEdit',id)
            },
        }
    }
</script>

<style scoped>

</style>