<template>
    <div>
        <!--头部组件-->
        <router-view name="top"></router-view>
        <!--侧边栏组件-->
        <router-view name="aside"></router-view>
        <!--主体-->
        <router-view></router-view>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "fudaoHome",
        methods:{
            getUserInfoCallback(res){
                var data = res.data
                var userNum = data.userNum
                sessionStorage.setItem("userNum",userNum)
            },
         getUserInfo(){
             axios.get(this.api + "/sbkp/userInfo")
                 .then(this.getUserInfoCallback)
         }
        },
        mounted() {
            this.getUserInfo()
        }
    }
</script>

<style scoped>

</style>