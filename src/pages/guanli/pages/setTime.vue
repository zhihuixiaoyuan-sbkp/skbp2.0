<template>
    <div class="main">
        <div class="head">
            <span style="margin-top: 10px;display: inline-block">设置系统休眠时间： </span>
            <el-dialog title="修改信息" style="position: relative" :visible.sync="dialogFormVisible">
                <div class="info_box">
                    <div class="block">
                        <span class="demonstration">假期名称：</span>
                        <el-autocomplete
                                style="width: 220px"
                                class="inline-input"
                                v-model="setNames"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入假期名"
                                :trigger-on-focus="false"
                                @select="handleSelect"
                        ></el-autocomplete>
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
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="添加假期" style="position: relative" :visible.sync="dialogFormVisible1">
                <div class="info_box">
                    <div class="block">
                        <span class="demonstration">假期名称：</span>
                        <el-autocomplete
                                style="width: 220px"
                                class="inline-input"
                                v-model="setName"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入假期名"
                                :trigger-on-focus="false"
                                @select="handleSelect"
                        ></el-autocomplete>
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
                    <!--<div class="block">-->
                    <!--<el-button @click="searchInfo">添加</el-button>-->
                    <!--</div>-->
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
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
                        prop="date1"
                        label="开始时间"
                        width="220">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="date2"
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
                                @click="showDialog(0,scope.row.name)">修改
                        </el-button>
                        <el-button
                                v-if="scope.row.name !== '暑假' && scope.row.name !== '寒假'"
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row.userName,scope.row.userNum,scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div class="add" @click="showDialog(1)">添加假期</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "setTime",
        data() {
            return {
                setNames:'',
                valueTimeStart:"",//开始时间
                valueTimeEnd:"",//结束时间
                restaurants: [],
                setName: '',
                tableData: [{
                    name: "暑假",
                    date1: '2016-05-02',
                    date2: '2016-05-02',
                },
                    {
                        name: "寒假",
                        date1: '2016-05-02',
                        date2: '2016-05-02',
                    },
                    {
                        name: "端午节",
                        date1: '2016-05-02',
                        date2: '2016-05-02',
                    },

                ],
                dialogFormVisible: false,
                dialogFormVisible1: false,
                formLabelWidth: '200px'
            }
        },
        methods: {
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadAll() {
                return [
                    {"value": "国庆节"},
                    {"value": "端午节"},
                    {"value": "劳动节"},
                    {"value": "中秋节"},
                    {"value": "清明节"},
                ];
            },
            handleSelect(item) {
                console.log(item);
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            showDialog(flag,name){
                if(flag === 0){
                    this.setNames = name
                    this.dialogFormVisible = true
                }else {
                    this.dialogFormVisible1 = true
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
    .add{
        position: relative;
        left: 50%;
        cursor: pointer;
        color: #02a774;
    }

</style>