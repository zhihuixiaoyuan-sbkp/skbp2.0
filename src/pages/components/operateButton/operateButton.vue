<template>
    <div>
        <el-button type="primary" class="addBtn" @click="showAddModal">添加</el-button>
        <el-button type="primary" class="addBtn" @click="showImportModal">导入</el-button>
        <el-button type="primary" class="addBtn" @click="exportList">导出</el-button>

        <div class="search">
            <!--下拉框-搜索筛选-->
            <el-input placeholder="请输入内容" v-model="label" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="姓名" class="select">
                    <el-option label="学号" value="1"></el-option>
                    <el-option label="姓名" value="2"></el-option>
                    <el-option label="学院" value="3"></el-option>
                    <el-option label="添加原因" value="4"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchStu"></el-button>
            </el-input>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "operateButton",
        data() {
            return {
                dept: 0,
                // 搜索框
                label: '',
                select: '2',
                // 搜索后的数据表
                stuList: [],
                defend: false,
                tutorship: false,
                mentality: false,
            }
        },
        props: {
            curPath: String,
        },
        methods: {
            // 获取关键词搜索的数据
            searchStu() {
                if (this.select === '1') {
                    axios.get(this.api1 + '/sbkp/personnel/personnelList/stu_num/' + this.label)
                        .then(this.searchList)
                } else if (this.select === '2') {
                    axios.get(this.api1 + '/sbkp/personnel/personnelList/name/' + this.label)
                        .then(this.searchList)
                } else if (this.select === '3') {
                    axios.get(this.api1 + '/sbkp/personnel/personnelList/college/' + this.label)
                        .then(this.searchList)
                } else if (this.select === '4') {
                    axios.get(this.api1 + '/sbkp/personnel/personnelList', {
                        params: {
                            reasonValue: this.label
                        }
                    }).then(this.searchList)
                }
            },

            // 处理搜索的数据并跳转至搜索页面
            searchList(res) {
                res = res.data;
                const data = res.personnelList;
                if (this.defend === true) {
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
                } else if (this.tutorship === true) {
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
                        name: '辅导员搜索结果',
                        params: {
                            select: this.select,
                            label: this.label,
                            list: this.stuList,
                            totalNum: res.totalNum,
                        }
                    })
                } else if (this.mentality === true) {
                    for (let i = 0; i < data.length; i++) {
                        data[i].reasonNames = data[i].reasonNames.join(' ');
                        if (data[i].mentalStatus === 1) {
                            data[i].mentalStatus = '轻度心理异常'
                        } else {
                            data[i].mentalStatus = '重度心理异常'
                        }
                    }
                    this.stuList = data;
                    this.$router.push({
                        name: '心理健康中心搜索结果',
                        params: {
                            select: this.select,
                            label: this.label,
                            list: this.stuList,
                            totalNum: res.totalNum,
                        }
                    })
                }
            },

            // 调用添加模态框
            showAddModal() {
                this.$emit('showAddModal');
            },

            // 调用导入模态框
            showImportModal() {
                this.$emit('showImportModal');
            },

            // 导出列表
            exportList() {
                if (this.dept === 1) {
                    window.location.href = this.api + '/sbkp/census/exportPersonnelList?dept=保卫处'
                }
                // 辅导员
                if (this.dept === 2) {
                    window.location.href = this.api + '/sbkp/census/exportPersonnelList?dept=辅导员'
                }
                // 心理健康中心
                if (this.dept === 3) {
                    window.location.href = this.api + '/sbkp/census/exportPersonnelList?dept=心理健康中心'
                }
            },
        },
        watch: {
            curPath: function (newVal) {
                // 保卫处
                if (newVal === '/List') {
                    this.defend = true;
                    this.tutorship = false;
                    this.mentality = false;
                    this.dept = 1;
                }
                // 辅导员
                if (newVal === '/keyPersonList') {
                    this.defend = false;
                    this.tutorship = true;
                    this.mentality = false;
                    this.dept = 2;
                }
                // 心理健康中心
                if (newVal === '/abnormalList') {
                    this.defend = false;
                    this.tutorship = false;
                    this.mentality = true;
                    this.dept = 3;
                }
            },

            select: function (newVal) {
                let domEmpty = document.getElementsByClassName('select');
                if (newVal === '4') {
                    // 改变select的长度
                    domEmpty[0].style.width = "103px";
                } else {
                    domEmpty[0].style.width = "75px";
                }
            }
        }
    }
</script>

<style scoped>
    button {
        outline: none;
        cursor: pointer;
    }

    /*按钮*/
    .addBtn {
        margin-top: 20px;
        /*font-size: 20px;*/
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

    .select {
        width: 75px;
    }
</style>