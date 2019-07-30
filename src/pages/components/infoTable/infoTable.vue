<template>
    <table class="list">
        <!--表头-->
        <thead>
        <tr class="header">
            <td>编号</td>
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
        <!--重点人员表-->
        <tbody v-for="(item,index) in messageList" v-show="showList1">
        <tr class="body">
            <td>{{index+1}}</td>
            <td class="showInfo" @click="searchstuLink(item.stuNum)">
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
                    <span slot="reference">{{item.name}}</span>
                </el-popover>
            </td>
            <td class="showInfo" @click="searchLink(item.counsellorName)" v-show="showFudao">
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
                    <span slot="reference">{{item.counsellorName}}</span>
                </el-popover>
            </td>
            <td v-show="showClass">{{item.proClass}}</td>
            <td>{{item.dateTime}}</td>
            <td>{{item.actionName}}</td>
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
                        <span>无</span>
                    </div>
                </viewer>
            </td>
            <td>
                <!--重点人员展示-->
                <el-button type="info" plain @click="handleId(item.id)">处理状态</el-button>
            </td>
        </tr>
        </tbody>
        <!--非重点人员表-->
        <tbody v-for="(item,index) in messageList" v-show="showList2">
        <tr class="body">
            <td>{{index+1}}</td>
            <td class="showInfo" @click="searchstuLink(item.stuNum)">
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
                    <span slot="reference">{{item.stuName}}</span>
                </el-popover>
            </td>
            <td class="showInfo" @click="searchLink(item.counsellorName)" v-show="showFudao">
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
                    <span slot="reference">{{item.counsellorName}}</span>
                </el-popover>
            </td>
            <td v-show="showClass">{{item.proClass}}</td>
            <td>{{item.dateTime}}</td>
            <td>{{item.actionName}}</td>
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
                        <span>无</span>
                    </div>
                </viewer>
            </td>
            <td>
                <el-button type="info" plain @click="addId(item.id)">添加至名单</el-button>
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
                // 内容
                showList1: true,
                showList2: false,
                showMessage: false,
                // 学生信息
                stuLink: '',
                // 辅导员信息
                tchInfo: [],
                // 展示列切换
                showFudao: true,
                showClass: false,
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

            // 获取处理信息的id
            handleId(id) {
                this.$emit('getHandleId', id);
            },

            // 获取添加的id
            addId(id) {
                this.$emit('getAddId', id);
            }
        },
        watch: {
            curPath: function (newVal) {
                if (newVal === '/waringInfo') {
                    // 辅导员-修改展示字段
                    this.showFudao = false;
                    this.showClass = true;
                }
            },

            messageList: function (newVal) {
                // 展示内容切换
                if (newVal.length === 0) {
                    this.showList1 = false;
                    this.showList2 = false;
                    this.showMessage = true;
                } else if (this.curPath === '/Message' && this.personnelType === 'second') {
                    this.showList1 = false;
                    this.showList2 = true;
                    this.showMessage = false;
                } else if (this.curPath === '/waringInfo' && this.personnelType === 'second') {
                    this.showList1 = false;
                    this.showList2 = true;
                    this.showMessage = false;
                } else {
                    this.showList1 = true;
                    this.showList2 = false;
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

    .showInfo {
        cursor: pointer;
    }

    .message {
        height: 160px;
        line-height: 160px;
        text-align: center;
        color: #909399;
    }
</style>