<template>
    <div class="content">
        <button class="iconfont back" @click="updateList">
            <span class="">&#xe63f;</span>&nbsp;历史轨迹
        </button>
        <hr class="boundary">
        <iframe class="body" src="http://ipark.iflytek.com/visual/personTrace"></iframe>
        <!--<iframe class="body" src="http://www.baidu.com"></iframe>-->
    </div>
</template>

<script>
    export default {
        name:"Footprint",
        methods:{
            // 返回重点人员表
            updateList() {
                this.$router.push({
                    path: '/List'
                })
            },
        }
    }
</script>

<style scoped>
    button {
        outline: none;
        cursor: pointer;
    }

    .content {
        margin-top: 17px;
        margin-left: 40px;
        margin-right: 40px;
        min-width: 990px;
    }

    /*返回人员表*/
    .back {
        margin: 0 15px;
        color: #101010;
        font-size: 20px;
        font-weight: bold;
        border: 0;
        background: transparent;
    }

    .back:hover {
        text-decoration: transparent
    }

    /*分界线*/
    .boundary {
        margin-top: 7px;
        margin-bottom: 25px;
        width: 100%;
        height: 3px;
        border: 0;
        background: #BBBBBB;
    }

    .body {
        width: 100%;
        height: 770px;
    }
</style>