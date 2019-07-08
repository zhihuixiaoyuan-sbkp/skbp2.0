<template>
    <div>
        <div class="container">
            <div class="loginForm">
                <div class="title">
                    <img src="./img/title-login.png" alt="">
                </div>


                <div class="form">
                    <form id="loginForm" action="http://172.16.211.151/sbkp/login" method="POST" @submit="submit">
                    <p class="p1">
                        <label for="account">账号：</label>
                        <input type="text"
                               class="account"
                               id="account"
                               name="username"
                               placeholder="请输入账号"
                               v-model="userName">
                    </p>
                    <p class="p2">
                        <label for="password">密码：</label>
                        <input type="password"
                               class="password"
                               id="password"
                               name="password"
                               placeholder="请输入密码"
                               v-model="password">
                    </p>
                    <!--<button class="login" @click="login">登录</button>-->
                    <input type="submit" class="login" value="登录">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import qs from "qs"

    export default {
        name: 'Login',
        data() {
            return {
                userName: '',
                password: '',
                // userName: '2018009602',
                // password: 'Aiit@6044137796',
                testObject: {
                    baoweichu: {
                        username: "",
                        password: ""
                    },
                    xueshengchu: {
                        username: "",
                        password: ""
                    },
                    fudaoyuan: {
                        username: "",
                        password: ""
                    },
                    houqinchu: {
                        username: "",
                        password: ""
                    },
                    xinlijiankang: {
                        username: "",
                        password: ""
                    },
                    guanliyuan: {
                        username: "",
                        password: ""
                    },
                    erjixueyuan: {
                        username: "",
                        password: ""
                    },

                }
            }
        },
        methods: {


            // login(){
            //     var loginForm = document.getElementById("loginForm")
            //      loginForm.action = "http://172.16.211.151/sbkp/login"
            // },
            submit:function(e){
                var s = 1;
                console.log(123)
             if(this.userName === "" || this.password === ""){
                 this.$message.error("请填写合法账户信息")
                 e.preventDefault();
             }else {
                 var us = document.getElementById("account")
                 var ps = document.getElementById("password")
                 var username =  us.value
                 var password  = ps.value
                 switch (username,password) {
                     case 'test1','test1' :
                         us.value = "2018009602"
                         ps.value = 'Aiit@6044137796'
                         break;
                     case "houqinchu","houqinchu":
                         us.value = "2018009602"
                         ps.value = 'Aiit@6044137796'
                         break;
                     case "xinlijiankangzhongxin","xinlijiankangzhongxin":
                         us.value = "2018009602"
                         ps.value = 'Aiit@6044137796'
                         break;
                     case "xueshengchu","xueshengchu":
                         us.value = "2018009602"
                         ps.value = 'Aiit@6044137796'
                         break;
                     case "fudaoyuan","fudaoyuan":
                         us.value = "2018009602"
                         ps.value = 'Aiit@6044137796'
                         break;
                     case "erjixueyuan","erjixueyuan":
                         us.value = "2018009602"
                         ps.value = 'Aiit@6044137796'
                         break;
                     case "guanliyuan","guanliyuan":
                         us.value = "2018009602"
                         ps.value = 'Aiit@6044137796'
                         break;
                     default:
                         break;
                 }


             }
            },

            login() {
                // username: '2018009602',
                // password: 'Aiit@6044137796'
                // sessionStorage.setItem("name","")
                // sessionStorage.setItem("name1","")

                        // axios.post( process.env.API_HOST + '/sbkp/login', qs.stringify(
                        //     {
                        //         username: '2018009602',
                        //         password: 'Aiit@6044137796'
                        //     }),
                        //
                        // ).then((res) => {
                        //     console.log(res);
                        // }).catch(() => {
                        //     this.loading = false
                        // })
                // let data = {
                //     username: '2018009602',
                //     password: 'Aiit@6044137796'
                //
                // }

                // axios({
                //     method: 'post',
                //     url: process.env.API_HOST + '/sbkp/login',
                //     data:qs.stringify(data),
                //     headers: {
                //         'Content-Type': 'application/x-www-form-urlencoded',
                //     }
                // }).then(function (res) {
                //     // window.location='/'
                //     console.log(res.headers);
                // });

            }


        },

    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        text-decoration: none;
    }

    .container {
        width: 100%;
        height: 100%;
        background: url("./img/bg-login2.jpg");
        background-size: 100% 100%;
        position: fixed;
    }

    .loginForm {
        width: 500px;
        height: 100%;
        background: #fff;
        position: fixed;
        right: 0;
        top: 0;
    }

    .title {
        text-align: center;
        margin-top: 100px;
    }

    .title img {
        max-width: 100%;
        margin: 0 auto;
    }

    .form .p1, .p2 {
        margin-top: 40px;
        margin-left: 100px;
    }

    .form .account, .password {
        width: 200px;
        height: 20px;
        margin-top: 20px;
        margin-left: 20px;
        border-radius: 5px;
    }

    .form .login {
        width: 200px;
        height: 30px;
        background: #0a9dc7;
        margin-left: 175px;
        margin-top: 30px;
        border-radius: 10px;
    }

</style>