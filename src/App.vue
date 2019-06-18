<template>
    <div id="app">
        <router-view style="height: 100%"></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    /*#app{*/
        /*height: 100%;*/
    /*}*/
    /*html {*/
        /*min-height: 100%;*/
        /*width:100%;*/
        /*height: 100%;*/
        /*overflow-x:hidden;*/
    /*}*/

    /*html,body {*/
        /*min-height: 100%;*/
        /*margin: 0;*/
        /*min-width: 1300px;*/
        /*height: 100%;*/
    /*}*/

    html {
        position:relative;
        min-height: 100%;
        /*padding-bottom: 108px;*/
    }

    body {
        margin: 0;
        min-width: 1300px;
        height: 100%;
    }



</style>
