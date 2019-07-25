<template>
    <div class="content">
        <button class="iconfont back" @click="updateList">
            <span class="iconfont">&#xe63f;</span>&nbsp;搜索结果
        </button>
        <hr class="boundary">
        <el-col :span="24" class="table-wrapper">
            <!--表格-->
            <person-table :personList="list" :curPath="curPath" @getModyfyId="showModifyModal"
                          @getDeleteId="showDelModal"></person-table>
            <nav class="block">
                <el-pagination layout="prev, pager, next"
                               @current-change="pageNum"
                               :total=totalNum
                               background>
                </el-pagination>
            </nav>
        </el-col>
        <operate-modal :curPath="curPath" :modify="modifyDialog" :modifyNum="modifyNum" :delete="delDialog"
                       :delNum="delNum" :personList="list" @updateList="closeModal"></operate-modal>
    </div>
</template>

<script>
    import axios from 'axios'
    import personTable from '../../components/personTable/personTable'
    import operateModal from '../../components/operateModal/operateModal'

    export default {
        name: "stulistSearch",
        data() {
            return {
                // 当前页面路由path值
                curPath: '',
                // 搜索数据
                label: '',
                select: '',
                // 表格数据
                list: [],
                totalNum: 0,
                currentPage: 1,
                // 模态框
                addDialog: false,
                modifyDialog: false,
                delDialog: false,
                // 修改id号
                modifyNum: '',
                // 删除id号
                delNum: '',
            };
        },
        methods: {
            // 处理list数据
            searchList(res) {
                // 对数据的字段进行修改
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
                this.list = data;
            },

            // 返回重点人员表
            updateList() {
                // 返回并更新重点人员表
                this.$router.push({
                    path: '/keyPersonList'
                })
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
                this.modifyDialog = false;
                this.delDialog = false;
                this.changList();
            },

            // 获取正确的页码并更新数据表
            pageNum(currentPage) {
                this.currentPage = currentPage;
                this.changList();
            },

            // 操作完成更新数据表
            changList() {
                if (this.select === '1') {
                    axios.get(this.api1 + '/sbkp/personnel/personnelList/stu_num/' + this.label, {
                        params: {
                            pageNum: this.currentPage,
                        }
                    }).then(this.searchList)
                } else if (this.select === '2') {
                    axios.get(this.api1 + '/sbkp/personnel/personnelList/name/' + this.label, {
                        params: {
                            pageNum: this.currentPage,
                        }
                    }).then(this.searchList)
                } else if (this.select === '3') {
                    axios.get(this.api1 + '/sbkp/personnel/personnelList/college/' + this.label, {
                        params: {
                            pageNum: this.currentPage,
                        }
                    }).then(this.searchList)
                }
            },
        },
        mounted() {
            this.label = this.$route.params.label;
            this.select = this.$route.params.select;
            this.list = this.$route.params.list;
            this.totalNum = this.$route.params.totalNum;
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.curPath = to.matched[1].path;
            });
        },
        components: {
            personTable,
            operateModal
        },
    }
</script>

<style scoped>
    button {
        outline: none;
        cursor: pointer;
    }

    .content {
        margin-left: 230px;
        margin-right: 50px;
        min-width: 1300px;
    }

    /*返回人员表*/
    .back {
        color: #101010;
        font-size: 20px;
        margin-top: 20px;
        font-weight: bold;
        border: 0;
        background: transparent;
    }

    .back:hover {
        text-decoration: transparent
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