<template>
    <div>
        <!--头部组件-->
        <router-view name="top"></router-view>
        <!--侧边栏组件-->
        <router-view name="aside"></router-view>
        <!--主体-->
        <router-view :list="personList" :totalNum="totalNum" @pageNum="getStudentsInfo"
                     @getStudentsInfo="getStudentsInfo"></router-view>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Home",
        data() {
            return {
                personList: [],
                totalNum: 0
            }
        },
        methods: {
            getStudentsInfo(data) {
                axios.get('http://172.16.211.151/sbkp/personnel/personnelList', {
                    params: {
                        pageNum: data,
                        pageSize: 10,
                    }
                }).then(this.getStudentsInfoSucc)
            },
            getStudentsInfoSucc(res) {
                // console.log(res);
                res = res.data;
                // console.log(res);
                this.totalNum = res.totalNum;
                // console.log(this.totalNum);
                const data = res.personnelList;
                // console.log(data);
                for (let i = 0; i < data.length; i++) {
                    data[i].reasonNames = data[i].reasonNames.join(' ');
                    if (data[i].schoolStatus === 0) {
                        data[i].schoolStatus = '是'
                    } else {
                        data[i].schoolStatus = '否'
                    }
                }
                this.personList = data;
            }
        },
        mounted() {
            this.getStudentsInfo()//挂载组件
        }
    }
</script>

<style>

</style>