import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/baowei/Home'
import Header from "@/pages/components/header/Header.vue"
import Sidebar from "@/pages/components/sidebar/Sidebar.vue"
import Message from "@/pages/baowei/pages/Message.vue"
import List from "@/pages/baowei/pages/List.vue"
import Log from "@/pages/baowei/pages/Log.vue"
import History from "@/pages/baowei/pages/History.vue"
import tongji from "@/pages/houqin/pages/tongji.vue"
import loding from "@/pages/houqin/pages/loding.vue"
import weigui from "@/pages/houqin/pages/weigui.vue"
import houqinHome from "@/pages/houqin/houqinHome.vue"
import xueshengchu from '@/pages/xuesheng/pages/xuesheng.vue'
import detail from "@/pages/xuesheng/pages/detail.vue"
import xueshengHome from "@/pages/xuesheng/xueshengHome.vue"
import erjixueyuan from "@/pages/erji/pages/erjixueyuan.vue"
import instructor from "@/pages/erji/pages/instructor.vue"
import erjiHome from "@/pages/erji/erjiHome.vue"
import admin from "@/pages/guanli/pages/admin.vue"
import powerControl from "@/pages/guanli/pages/powerControl.vue"
import guanliHomw from "@/pages/guanli/guanliHome.vue"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'houqinHome',
            redirect: '/loding',
            component: houqinHome,
            children: [
                {
                    path: '/tongji',
                    name: '统计信息',
                    components: {
                        default: tongji,
                        top: Header,
                        aside: Sidebar,
                    },
                    menuShow: true
                },
                {
                    path: '/weigui',
                    name: '违规人员名单',
                    components: {
                        default: weigui,
                        top: Header,
                        aside: Sidebar
                    },
                    menuShow: true,
                },
                {
                    path: '/loding',
                    name: '加载页面',
                    components: {
                        default: loding,
                        top: Header,
                        aside: Sidebar
                    },
                    menuShow: false,
                }

            ],
        },
        {
            path: '/',
            name: 'xueshengHome',
            redirect: '/xueshengchu',
            component: xueshengHome,
            children: [
                {
                    path: '/xueshengchu',
                    name: '统计信息',
                    components: {
                        default: xueshengchu,
                        top: Header,
                        aside: Sidebar,
                    },
                    menuShow: true
                },
                {
                    path: '/detail',
                    name: '详细信息',
                    components: {
                        default: detail,
                        top: Header,
                        aside: Sidebar
                    },
                    menuShow: true,
                },

            ],
        },
        {
            path: '/',
            name: 'home',
            redirect: '/Message',
            component: home,
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
        },
        {
            path: '/',
            name: 'erjiHome',
            redirect: '/erjixueyuan',
            component: erjiHome,
            children: [
                {
                    path: '/erjixueyuan',
                    name: '统计信息',
                    components: {
                        default: erjixueyuan,
                        top: Header,
                        aside: Sidebar,
                    },
                    menuShow: true
                },
                {
                    path: '/instructor',
                    name: '辅导员列表',
                    components: {
                        default: instructor,
                        top: Header,
                        aside: Sidebar
                    },
                    menuShow: true,
                },

            ],
        },
        {
            path: '/',
            name: 'guanliHome',
            redirect: '/admin',
            component: guanliHomw,
            children: [
                {
                    path: '/admin',
                    name: '操作日志',
                    components: {
                        default: admin,
                        top: Header,
                        aside: Sidebar,
                    },
                    menuShow: true
                },
                {
                    path: '/powerControl',
                    name: '权限分配',
                    components: {
                        default: powerControl,
                        top: Header,
                        aside: Sidebar
                    },
                    menuShow: true,
                },

            ],
        },
    ]
})
