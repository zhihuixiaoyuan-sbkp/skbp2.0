<template>
    <div>
        <!--头部组件-->
        <router-view name="top"></router-view>
        <!--侧边栏组件-->
        <router-view name="aside"></router-view>
        <!--主体-->
        <router-view :list="keyPersonList"></router-view>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Home",
        data() {
            return {
                keyPersonList: []
            }
        },
        methods: {
            getStudentsInfo() {
                axios.get('http://rap2api.taobao.org/app/mock/210877/localhost/bwc-xsc/KeyPersonList?teacher_id=001')
                    .then(this.getHomeInfoSucc)
            },
            getHomeInfoSucc(res) {
                res = res.data
                const data = res.keyPersonList
                this.keyPersonList = data
                // console.log(res)
            }
        },
        mounted() {
            this.getStudentsInfo()//挂载组件
        }
    }
</script>

<style>

</style>