/**
 * Created by T550 on 2019/5/21.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)
export default new Vuex.Store({
    state,
    mutations,
    actions,
})


// /*从本地存储读取数据*/
for(var item in state) {
    localStorage.getItem(item)? state[item] = JSON.parse(localStorage.getItem(item)): false;
}


