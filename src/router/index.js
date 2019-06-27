import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/baowei/Home'
import Header from "@/pages/components/header/Header.vue"
import Sidebar from "@/pages/components/sidebar/Sidebar.vue"
import Message from "@/pages/baowei/pages/Message.vue"
import List from "@/pages/baowei/pages/List.vue"
import Log from "@/pages/baowei/pages/Log.vue"
import History from "@/pages/baowei/pages/History.vue"
import Search from "@/pages/baowei/pages/Search.vue"
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
import guanliHome from "@/pages/guanli/guanliHome.vue"
import abnormalList from "@/pages/xinli/pages/abnormalList"
import waringMessage from "@/pages/xinli/pages/waringMessage.vue"
import xinliLog from "@/pages/xinli/pages/xinliLog.vue"
import xinliHome from "@/pages/xinli/xinliHome.vue"
import waringInfo from "@/pages/fudao/pages/waringInfo.vue"
import keyPersonList from "@/pages/fudao/pages/keyPersonList.vue"
import instructorLog from "@/pages/fudao/pages/instructorLog.vue"
import fudaoHome from "@/pages/fudao/fudaoHome.vue"

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
                },
                {
                    path: '/Search',
                    name: '搜索结果',
                    components: {
                        default: Search,
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
            component: guanliHome,
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
        {
            path: '/',
            name: 'xinliHome',
            redirect: '/abnormalList',
            component: xinliHome,
            children: [
                {
                    path: '/abnormalList',
                    name: '报警信息管理',
                    components: {
                        default: abnormalList,
                        top: Header,
                        aside: Sidebar,
                    },
                    menuShow: true
                },
                {
                    path: '/waringMessage',
                    name: '心理异常人员名单',
                    components: {
                        default: waringMessage,
                        top: Header,
                        aside: Sidebar
                    },
                    menuShow: true,
                },
                {
                    path: '/xinliLog',
                    name: '操作日志',
                    components: {
                        default: xinliLog,
                        top: Header,
                        aside: Sidebar
                    },
                    menuShow: true,
                },

            ],
        },
        {
            path: '/',
            name: 'fudaoHome',
            redirect: '/waringInfo',
            component: fudaoHome,
            children: [
                {
                    path: '/waringInfo',
                    name: '报警信息管理',
                    components: {
                        default: waringInfo,
                        top: Header,
                        aside: Sidebar,
                    },
                    menuShow: true
                },
                {
                    path: '/keyPersonList',
                    name: '重点人员名单管理',
                    components: {
                        default: keyPersonList,
                        top: Header,
                        aside: Sidebar
                    },
                    menuShow: true,
                },
                {
                    path: '/instructorLog',
                    name: '操作日志',
                    components: {
                        default: instructorLog,
                        top: Header,
                        aside: Sidebar
                    },
                    menuShow: true,
                },

            ],
        },
    ]
})
