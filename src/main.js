// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import './assets/styles/iconfont.css'
import G from './api/api'
import echarts from 'echarts'
import router from './router'

Vue.use(G);
Vue.use(ElementUI);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.use(Viewer);
Viewer.setDefaults({
    Options: {
        'inline': true,
        'button': true,
        'navbar': true,
        'title': true,
        'toolbar': true,
        'tooltip': true,
        'movable': true,
        'zoomable': true,
        'rotatable': true,
        'scalable': true,
        'transition': true,
        'fullscreen': true,
        'keyboard': true,
        'url': 'data-source'
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App),
    store,
    components: {App},
    template: '<App/>'
})
