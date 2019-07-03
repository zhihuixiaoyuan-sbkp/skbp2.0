
import Vue from 'vue'
var api ="http://172.16.211.152"
export default {
    install () {
        Vue.prototype.api = api
    }
}