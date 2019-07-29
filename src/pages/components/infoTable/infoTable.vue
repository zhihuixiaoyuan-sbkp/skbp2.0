<template>
    <table class="list">
        <!--表头-->
        <thead>
        <tr class="header">
            <td>序号</td>
            <td>姓名</td>
            <td v-show="showFudao">辅导员</td>
            <td v-show="showClass">班级</td>
            <td>时间</td>
            <td>行为描述</td>
            <td>位置</td>
            <td>现场照片</td>
            <td>操作</td>
        </tr>
        </thead>
        <!--内容-->
        <tbody v-for="(item,index) in messageList" v-show="showList">
        <tr class="body">
            <td>{{index+1}}</td>
            <td @click="searchstuLink(item.stuNum)">
                <el-popover
                        placement="right"
                        trigger="click">
                    <table class="table" v-show="showFudao">
                        <tr>
                            <td>班级:</td>
                            <td>{{item.proClass}}</td>
                        </tr>
                        <tr>
                            <td>学号:</td>
                            <td>{{item.stuNum}}</td>
                        </tr>
                        <tr>
                            <td>联系方式:</td>
                            <td v-cloak>{{stuLink}}</td>
                        </tr>
                    </table>
                    <table class="table" v-show="showClass">
                        <tr>
                            <td>学号:</td>
                            <td>{{item.stuNum}}</td>
                        </tr>
                        <tr>
                            <td>联系方式:</td>
                            <td v-cloak>{{stuLink}}</td>
                        </tr>
                    </table>
                    <span class="mes" slot="reference">{{item.name}}</span>
                </el-popover>
            </td>
            <td @click="searchLink(item.counsellorName)" v-show="showFudao">
                <el-popover
                        placement="right"
                        trigger="click">
                    <table class="table">
                        <tr>
                            <td>工号:</td>
                            <td>{{tchInfo.number}}</td>
                        </tr>
                        <tr>
                            <td>联系方式:</td>
                            <td>{{tchInfo.link}}</td>
                        </tr>
                    </table>
                    <span class="mes" slot="reference">{{item.counsellorName}}</span>
                </el-popover>
            </td>
            <td v-show="showClass">{{item.proClass}}</td>
            <td>{{item.dateTime}}</td>
            <td v-show="keyPoint">{{item.actionName}}</td>
            <td v-show="nonKey">{{item.reasonName}}</td>
            <td>{{item.location}}</td>
            <td>
                <viewer>
                    <div v-if="item.singleImgUrl !== null">
                        <img style="height: 50px;" :src="item.singleImgUrl"/>
                    </div>
                    <div v-if="item.globalImgUrl !== null">
                        <img style="height: 50px;" :src="item.globalImgUrl"/>
                    </div>
                    <div v-if="item.singleImgUrl===null&&item.globalImgUrl === null">
                        <span>空</span>
                    </div>
                </viewer>
            </td>
            <td>
                <!--重点人员展示-->
                <el-button type="info" plain @click="handleId(item.id)" v-show="showHandle">处理状态</el-button>
                <!--非重点人员展示-->
                <el-button type="info" plain @click="addId(item.id)" v-show="showAdd">添加至名单</el-button>
            </td>
        </tr>
        </tbody>
        <tbody v-show="showMessage">
        <td class="message" colspan="8">
            暂无数据
        </td>
        </tbody>
    </table>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'infoTable',
        props: {
            messageList: Array,
            personnelType: String,
            curPath: String
        },
        data() {
            return {
                showList: false,
                stuLink: '',
                tchInfo: [],
                showFudao: true,
                showClass: false,
                showHandle: true,
                showAdd: false,
                showMessage: false,
                keyPoint: true,
                nonKey: false
            }
        },
        methods: {
            // 展示学生信息
            searchstuLink(number) {
                var _this = this;
                this.stuLink = '';
                axios.get(this.api1 + '/sbkp/message/personnelDetail', {
                    params: {
                        number: number,
                    }
                }).then(function (res) {
                    res = res.data;
                    res = res.data;
                    _this.stuLink = res.link;
                });
            },

            // 展示辅导员信息
            searchLink(name) {
                var _this = this;
                axios.get(this.api1 + '/sbkp/message/counsellorDetail', {
                    params: {
                        counsellorName: name,
                    }
                }).then(function (res) {
                    res = res.data;
                    _this.tchInfo = res.data;
                });
            },

            handleId(id) {
                this.$emit('getHandleId', id);
            },

            addId(id) {
                this.$emit('getAddId', id);
            }
        },
        watch: {
            curPath: function (newVal) {
                if (newVal === '/waringInfo') {
                    this.showFudao = false;
                    this.showClass = true;
                }
            },

            personnelType: function (newVal) {
                if (this.curPath === '/waringMessage' && newVal === 'second') {
                    // 心理健康中心-轻度异常展示处理按钮
                    this.showHandle = true;
                    this.showAdd = false;
                } else if (newVal === 'second') {
                    this.keyPoint = false;
                    this.nonKey = true;
                    // 非重点人员展示添加按钮
                    this.showHandle = false;
                    this.showAdd = true;
                } else {
                    // 复位
                    this.keyPoint = true;
                    this.nonKey = false;
                    this.showHandle = true;
                    this.showAdd = false;
                }
            },

            messageList: function (newVal) {
                if (newVal.length === 0) {
                    this.showList = false;
                    this.showMessage = true;
                } else {
                    this.showList = true;
                    this.showMessage = false;
                }
            }
        },
    }
</script>

<style scoped>
    [v-cloak] {
        display: none !important;
    }

    img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }

    td {
        border-bottom: 1px solid #DEDEDE;
    }

    /*表格*/
    .list {
        width: 100%;
        border: 0;
        border-spacing: 0;
        border-collapse: collapse;
        text-align: center;
        padding: 0 20px;
        white-space: nowrap;
    }

    /*表头*/
    .header {
        height: 45px;
        font-size: 18px;
        color: #101010;
    }

    /*主体*/
    .body {
        height: 60px;
        font-size: 18px;
        color: #5C5B5C;
    }

    .table {
        margin-bottom: 0;
        border: 1px solid #dedede;
        color: grey;
        font-size: 15px;
    }

    .message {
        height: 160px;
        line-height: 160px;
        text-align: center;
        color: #909399;
    }
</style>