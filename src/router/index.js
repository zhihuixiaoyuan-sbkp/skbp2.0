import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/baowei/Home'
import Header from "@/pages/components/header/Header.vue"
import Sidebar from "@/pages/components/sidebar/Sidebar.vue"
import Message from "@/pages/baowei/pages/Message.vue"
import List from "@/pages/baowei/pages/List.vue"
import Log from "@/pages/baowei/pages/Log.vue"
import History from "@/pages/baowei/pages/History.vue"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            redirect: '/Message',
            component: Home,
            children: [
                {
                    path: '/Message',
                    name: '报警信息管理',
                    components: {
                        default: Message,
                        top: Header,
                        aside: Sidebar,
                    },
                    menuShow: true
                },
                {
                    path: '/List',
                    name: '重点人员名单管理',
                    components: {
                        default: List,
                        top: Header,
                        aside: Sidebar
                    },
                    menuShow: true,
                },
                {
                    path: '/Log',
                    name: '操作日志',
                    components: {
                        default: Log,
                        top: Header,
                        aside: Sidebar
                    },
                    menuShow: true,
                },
                {
                    path: '/History',
                    name: '历史记录',
                    components: {
                        default: History,
                        top: Header,
                        aside: Sidebar,
                    }
                }
            ]
        }
    ]
})
