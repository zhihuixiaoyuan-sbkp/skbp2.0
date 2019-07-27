<template>
    <div class="content">
        <button class="iconfont back" @click="updateList">
            <span class="iconfont add">&#xe63f;</span>&nbsp;历史记录
        </button>
        <hr class="boundary">

        <el-tabs v-model="ruleType" type="card" @tab-click="selectionRules">
            <el-tab-pane label="晚归" name="first">
                <div class="tableBorder">
                    <history-table :historyList="historyList"></history-table>
                    <nav class="block">
                        <el-pagination layout="prev, pager, next"
                                       @current-change="pageNum"
                                       :total=totalNum
                                       background>
                        </el-pagination>
                    </nav>
                </div>
            </el-tab-pane>
            <el-tab-pane label="夜不归宿" name="second">
                <div class="tableBorder">
                    <history-table :historyList="historyList"></history-table>
                    <nav class="block">
                        <el-pagination layout="prev, pager, next"
                                       @current-change="pageNum"
                                       :total=totalNum
                                       background>
                        </el-pagination>
                    </nav>
                </div>
            </el-tab-pane>
            <el-tab-pane label="蜗居" name="third">
                <div class="tableBorder">
                    <history-table :historyList="historyList"></history-table>
                    <nav class="block">
                        <el-pagination layout="prev, pager, next"
                                       @current-change="pageNum"
                                       :total=totalNum
                                       background>
                        </el-pagination>
                    </nav>
                </div>
            </el-tab-pane>
            <el-tab-pane label="非正常时段离校" name="fourth">
                <div class="tableBorder">
                    <history-table :historyList="historyList"></history-table>
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
    </div>
</template>

<script>
    import axios from 'axios'
    import historyTable from '../../components/historyTable/historyTable'

    export default {
        name: "xinliHistory",
        data() {
            return {
                ruleType: 'first',
                rule: 1,
                totalNum: 0,
                historyList: [],
                currentPage: 1,
                id: 0
            };
        },
        methods: {
            // 获取历史记录
            getHistoryInfo() {
                axios.get(this.api1+'/sbkp/personnel/histories/' + this.rule, {
                    params: {
                        personnelId: this.id,
                        pageNum: this.currentPage,
                        pageSize: 10,
                    }
                }).then(this.getHistoryInfoSucc);
            },

            // 处理表格数据
            getHistoryInfoSucc(res) {
                res = res.data;
                this.totalNum = res.totalNum;
                this.historyList = res.personnelHistoryList;
            },

            // 切换规则
            selectionRules() {
                if (this.ruleType === 'first') {
                    // 晚归
                    this.rule = 1
                } else if (this.ruleType === 'second') {
                    // 夜不归宿
                    this.rule = 2
                } else if (this.ruleType === 'third') {
                    // 蜗居
                    this.rule = 3
                } else if (this.ruleType === 'fourth') {
                    // 非正常时段离校
                    this.rule = 4
                }
                this.getHistoryInfo();
            },

            // 获取当前页码
            pageNum(currentPage) {
                this.currentPage = currentPage;
                if (this.searchDetection === false) {
                    this.getMessageInfo();
                }else if(this.searchDetection === true) {
                    this.submitForm();
                }
            },

            // 返回重点人员表
            updateList() {
                this.$router.push({
                    path: '/abnormalList'
                })
            },
        },
        mounted() {
            this.id = this.$route.query.id;
            this.getHistoryInfo();
        },
        components: {
            historyTable
        }
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
        margin-top: 17px;
        margin-left: 220px;
        margin-right: 40px;
        min-width: 1300px;
    }

    /*返回人员表*/
    .back {
        color: #101010;
        font-size: 20px;
        font-weight: bold;
        border: 0;
        background: transparent;
    }

    .back:hover {
        text-decoration: transparent
    }

    .title {
        font-size: 25px;
        letter-spacing: 2px;
    }

    /*分界线*/
    .boundary {
        margin-top: 3px;
        width: 100%;
        height: 3px;
        border: 0;
        background: #BBBBBB;
    }

    .el-tabs--card >>> .el-tabs__header {
        border: 0;
        margin: 0;
    }

    .el-tabs--card >>> .el-tabs__item.is-active {
        color: #fff;
        background: #409EFF;
        border-radius: 3px 0 0 0;
    }

    .tableBorder {
        border: 1px solid #E4E7ED;
        padding: 20px 40px;
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
        font-size: 16px;
        color: #6E6D6E;
    }

    /*主体*/
    .body {
        height: 60px;
        border-left: 1px solid #BBBBBB;
        border-right: 1px solid #BBBBBB;
        font-size: 18px;
        color: #5C5B5C;
    }

    /*分页*/
    .block {
        text-align: center;
        margin-top: 20px;
    }
</style>