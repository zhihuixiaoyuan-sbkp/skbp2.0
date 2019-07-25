<template>
    <div class="content">
        <el-row>
            <el-col :span="24" class="toolbar">
                <!--按钮-添加、导入、导出-->
                <operate-button :curPath="curPath" @showAddModal="showAddModal"></operate-button>
                <!--分界线-->
                <hr class="boundary">
                <!--主体-->
                <el-col :span="24" class="table-wrapper">
                    <!--表格-->
                    <person-table :personList="personList" :curPath="curPath" @getModyfyId="getModyfyId"
                                  @getDeleteId="getDeleteId"></person-table>
                    <!--分页-->
                    <nav class="block">
                        <el-pagination layout="prev, pager, next"
                                       @current-change="pageNum"
                                       :total=totalNum
                                       background>
                        </el-pagination>
                    </nav>
                </el-col>
                <operate-modal :curPath="curPath" :add="addDialog" :modify="modifyDialog" :modifyNum="modifyNum"
                               :delete="delDialog" :delNum="delNum" :personList="personList"
                               @updateList="closeModal"></operate-modal>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    import personTable from '../../components/personTable/personTable'
    import operateButton from '../../components/operateButton/operateButton'
    import operateModal from '../../components/operateModal/operateModal'

    export default {
        name: "abnormalList",
        data() {
            return {
                // 当前页面路由path值
                curPath: "",
                // 人员列表
                personList: [],
                totalNum: 0,
                // 分页
                currentPage: 1,
                // 模态框
                addDialog: false,
                modifyDialog: false,
                delDialog: false,
                // 修改id号
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
                    if (data[i].mentalStatus === 1) {
                        data[i].mentalStatus = '轻度心理异常'
                    } else {
                        data[i].mentalStatus = '重度心理异常'
                    }
                }
                this.personList = data;
            },

            // 修改添加模态框状态
            showAddModal() {
                this.addDialog = true;
            },

            // 修改修改模态框状态
            getModyfyId(id) {
                this.modifyDialog = true;
                this.modifyNum = id;
            },

            // 修改删除模态框状态
            getDeleteId(id) {
                this.delDialog = true;
                this.delNum = id;
            },

            // 关闭模态框并更新表
            closeModal() {
                this.addDialog = false;
                this.modifyDialog = false;
                this.delDialog = false;
                this.getStudentsInfo();
            },

            // 获取当前页码
            pageNum(currentPage) {
                this.currentPage = currentPage;
                this.getStudentsInfo();
            },
        },
        mounted() {
            this.getStudentsInfo()//挂载组件
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.curPath = to.matched[1].path;
            });
        },
        components: {
            personTable,
            operateButton,
            operateModal
        },
    }
</script>

<style scoped>
    .content {
        margin-left: 230px;
        margin-right: 50px;
        min-width: 1300px;
    }

    /*分界线*/
    .boundary {
        margin-top: 7px;
        width: 100%;
        height: 3px;
        border: 0;
        background: #BBBBBB;
    }

    /*分页*/
    .block {
        text-align: center;
        margin-top: 20px;
    }
</style>