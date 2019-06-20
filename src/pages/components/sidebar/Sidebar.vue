<template>
    <div class="sider">
        <div class="sider-scroll">
            <!--default-active	当前激活菜单的 index-->
            <!--router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转-->
            <el-menu :default-active="$route.path" router>
                <template v-for="issue in $router.options.routes">
                    <!-- 当该值与router的根路由的name相等时加载相应菜单组 -->
                    <!--判断session中的值，pathname与pathname1两个值，pathname1为持久化存在的-->
                    <template v-if="issue.name === pathname || issue.name === pathname1">
                        <template v-for="item in issue.children">
                            <el-menu-item :index="item.path"
                                          :class="$route.path===item.path ? 'is-active':''" v-show="item.menuShow">
                                <span slot="title">{{item.name}}</span>
                            </el-menu-item>
                        </template>
                    </template>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Sidebar",
        data() {
            return {
                initPath: "",
                pathname: "",
                pathname1: sessionStorage.getItem("name") === 'undefined' ? sessionStorage.getItem("name1") : sessionStorage.getItem("name"),//数据持久化，解决侧边栏刷新后消失问题
                isFirst: true,//浏览器刷新标识，控制页面刷新导致session值变化
            }
        },
        methods: {
            defaultLeftNavOpened() {
                // let cur_path = this.$store.state.Sidebar; //获取当前路由
                let cur_path = this.$route.query.name //获取后端访问url参数
                if (this.isFirst || sessionStorage.getItem("name") === 'undefined') {
                    sessionStorage.setItem("name", cur_path)//将获取到的参数存入session
                    this.isFirst = false
                }
                this.pathname = cur_path
                let routers = this.$router.options.routes; // 获取路由对象
                console.log(routers)
                for (let i = 0; i < routers.length; i++) {//遍历所有父路由
                    if (cur_path === routers[i].name) {//匹配与后端传入角色主页值一致的父路由
                        let newRuoter = routers[i]
                        this.initPath = newRuoter.children[0].path
                        if (this.$route.path === "/loding") { //解决本页面刷新导致回到首页问题
                            this.$router.replace(this.initPath)
                        }
                        break;
                    }
                }
            },
        },
        mounted() {
            window.addEventListener("beforeunload", () => {  //浏览器刷新之前，将返回参数存入session
                sessionStorage.setItem("name1", this.pathname1)//浏览器刷新之前，将返回参数存入另外一个值中
            })
            this.defaultLeftNavOpened();
        },
    }
</script>

<style scoped>
    .sider {
        position: absolute;
        top: 60px;
        bottom: 0;
        overflow: hidden;
        width: 180px;
        height: 100%;
        background: #303030;
    }

    .sider-scroll {
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    .el-menu {
        border: 0;
        background: #303030;
    }

    .el-menu-item, .el-submenu__title {
        height: 52px;
        color: #fff;
        line-height: 52px;
        border-left: 3px solid #303030;
    }

    .el-menu-item.is-active,
    .el-menu-item:hover,
    .el-submenu__title:hover,
    .el-menu-item:hover {
        /*background-color: rgba(43,56,128,0.4);*/
        /*border-left:3px solid #457aec;*/
        color: #fff;
        border-left: 3px solid #457aec;
        background-color: #1C1C1C;
    }
</style>