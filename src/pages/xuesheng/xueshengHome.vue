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
    export default {
        name: "xueshengHome"
    }
</script>

<style scoped>

</style>