<template>
    <div class="card">
        <div class="head">
            <i class="web-font">{{head}}</i>
        </div>
        <div class="body">
            <span class="text">{{collage}}</span>
            <span class="text">重点人员:{{count}}人</span>
            <span class="text">
                    <el-button type="success" @click="checkInfo">查看更多</el-button>
                </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "card",
        props:{
           head:{//学院简称名称
               type:String,
               default: ''
           },
            collage:{//学院名称
               type:String,
                default:""
            },
            count:{//重点人员人数
               type:Number,
                default:""
            }
        },
        methods:{
            checkInfo(){
                this.$emit("checkInfo")//调用伏父组件绑定事件
            }
        }
    }
</script>

<style scoped>
     .card {
        height: 250px;
        width: 200px;
        position: relative;
         display: inline-block;
         margin-left: 20px;
         margin-top: 20px;
        box-shadow: 0px 0px 15px 7px gainsboro;
        border:1px solid #96C2F1;
        background-color: #EFF7FF

        /*border:1px solid #9BDF70;*/
        /*background-color: #F0FBEB*/

        /*border:1px solid #BBE1F1;*/
        /*background-color: #EEFAFF*/

        /*border:1px solid #92B0DD;*/
        /*background-color: #FFFFFf*/

        /*border:1px solid #A9C9E2;*/
        /*background-color: #E8F5FE*/

        /*border:1px solid #A5B6C8;*/
        /*background-color: #EEF3F7*/
    }
   .card .head{
        position: absolute;
        height: 70px;
        width: 70px;
        text-align: center;
        background: #02a774;
        border-radius: 50%;
        right: 0;
        left: 0;
        margin: auto;
        top: 10px;
        box-shadow: 1px 1px 7px 3px pink;
    }
    .card .body{
        position: absolute;
        text-align: center;
        top: 90px;
        right: 0;
        left: 0;
        margin: auto;

    }
    .card .body .text{
        display: block;
        margin-top: 15px;
    }
    .web-font{
        font-family:"webfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        line-height: 70px;
    }
    @font-face {
        font-family: 'webfont';
        font-display: swap;
        src: url('//at.alicdn.com/t/webfont_zlxnsnzsp0r.eot'); /* IE9*/
        src: url('//at.alicdn.com/t/webfont_zlxnsnzsp0r.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('//at.alicdn.com/t/webfont_zlxnsnzsp0r.woff2') format('woff2'),
        url('//at.alicdn.com/t/webfont_zlxnsnzsp0r.woff') format('woff'), /* chrome、firefox */
        url('//at.alicdn.com/t/webfont_zlxnsnzsp0r.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
        url('//at.alicdn.com/t/webfont_zlxnsnzsp0r.svg#AlibabaPuHuiTiH') format('svg'); /* iOS 4.1- */
    }
</style>