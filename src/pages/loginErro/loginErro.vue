<template>
    <div class="box_err">
        <div class="pic_box">
            <svg class="icon icon-back icons" aria-hidden="true">
                <use xlink:href="#icon-yihanliulei1-copy"></use>
            </svg>
            <span class="text">{{errInfo[code]}}</span>
            <span class="text_login" @click="goto">返回登录页</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "loginErro",
        data(){
            return {
                code:"",
                errInfo:["角色名不正确","学生账号无法登陆此系统","账号或密码错误",]
            }
        },

        methods:{
            goto(){
                this.$router.replace({
                    path:"/login",
                })
            },
            getCode(){
                this.code = this.$route.query.code
            }
        },
        mounted(){
            this.getCode()
        }
    }
</script>

<style scoped>

.box_err{
    height: 100%;
    width: 100%;
    position: relative;
}
.box_err .pic_box{
    position: relative;
    width: 500px;
    height: 500px;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 0;
    margin: auto;

}

.text{
    color: #666666;
    display: inline-block;
    width: 100%;
    text-align: center;
    font-weight: normal;
}

.text_login{
    color: #666666;
    display: block;
    width: 100%;
    text-align: center;
    font-weight: normal;
    margin-top: 20px;
    cursor: pointer;
}
.text_login:hover{
    color: blue;
}
    .box_err .pic_box .icons{
        width: 500px;
        height: 500px;
    }

</style>