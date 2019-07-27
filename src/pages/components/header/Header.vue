<template>
    <div class="header">
        <span class="title">重点人员行为监管系统</span>
        <form action="http://172.16.211.152/sbkp/logout">
            <input class="exit" type="submit" @click="loginOut" value="退出登录" >
        </form>

        <!--<router-link to="/Message" class="iconfont message">&#xe606;</router-link>-->
        <el-button class="iconfont message" @click="loadMessage" v-show="warningMessage">&#xe606;</el-button>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                warningMessage: false,
                curName: ''
            }
        },
        methods: {
            loginOut(){
                var xhr = new XMLHttpRequest();
                xhr.open('GET', this.api1 + "/sbkp/logout");
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        console.log(xhr.responseText);
                    }
                }
                // if (method == 'POST') {
                //     //给指定的HTTP请求头赋值
                //     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                // }
                xhr.send()

            },
            loadMessage() {
                if (this.curName === 'home') {
                    // 保卫处报警信息跳转
                    this.$router.push({
                        path: '/Message'
                    })
                } else if (this.curName === 'fudaoHome') {
                    // 辅导员报警信息跳转
                    this.$router.push({
                        path: '/waringInfo'
                    })
                } else if (this.curName === 'xinliHome') {
                    // 心理健康中心报警信息跳转
                    this.$router.push({
                        path: '/waringMessage'
                    })
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            // 这里的vm指的就是vue实例，可以用来当做this使用
            next(vm => {
                vm.curName = to.matched[0].name;
                if (vm.curName === 'home' || vm.curName === 'fudaoHome' || vm.curName === 'xinliHome') {
                    vm.warningMessage = true
                }
            })
        },

    }
</script>

<style scoped>
    .header {
        position: relative;
        height: 60px;
        width: 100%;
        min-width: 1570px;
        background: #457aec;
        box-shadow: 0 0 4px #457aec;

        color: #fff;
        text-align: center;
        line-height: 60px;
    }

    .title {
        font-size: 26px;
        letter-spacing: 10px;
    }

    .exit {
        position: absolute;
        font-size: 18px;
        right: 40px;
        cursor: pointer;
        letter-spacing: 4px;
        top: 2px;
        border: 0;
        outline: none;
        color: #fff;
        background: transparent;
    }

    .message {
        position: absolute;
        font-size: 33px;
        top: 3px;
        right: 145px;
        font-weight: 600;

        outline: none;
        cursor: pointer;
        border: 0;
        background: transparent;
        color: #fff;
    }
</style>