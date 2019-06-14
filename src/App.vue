<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    html {
        position:relative;
        min-height: 100%;
        padding-bottom: 108px;
    }

    body {
        margin: 0;
        min-width: 1300px;
        height: 100%;
    }
</style>
