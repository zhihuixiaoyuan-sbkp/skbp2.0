<template>
    <div class="content">
        <router-link class="iconfont back" to="/List">&#xe63f;</router-link>
        <hr class="boundary">
    </div>
</template>

<script>
    export default {
        name: "History",
    }
</script>

<style scoped>
    .content {
        margin-top: 10px;
        margin-left: 220px;
        margin-right: 40px;
        min-width: 990px;
    }

    .back {
        color: #101010;
        font-size: 20px;
    }

    .boundary {
        margin-top: 5px;
        width: 100%;
        height: 3px;
        border: 0;
        background: #BBBBBB;
    }
</style>