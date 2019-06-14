<template>
    <div class="header">
        <span class="title">重点人员行为监管系统</span>
        <span class="exit">退出登录</span>
        <router-link to="/Message" class="iconfont message">&#xe606;</router-link>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    a {
        color: #fff;
    }

    a:hover {
        color: lightpink;
        text-decoration: transparent
    }

    .header {
        position: relative;
        height: 60px;
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
    }

    .message {
        position: absolute;
        font-size: 30px;
        right: 140px;
        font-weight: 600;
        cursor: pointer;
    }
</style>