/**
 * Created by T550 on 2019/5/21.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*测试数据*/
const state = {
    Sidebar: 'Home'
}

/*从本地存储读取数据*/
for(var item in state) {
    localStorage.getItem(item)? state[item] = JSON.parse(localStorage.getItem(item)): false;
}

export default new Vuex.Store({
    state
})
