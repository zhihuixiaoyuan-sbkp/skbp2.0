
import Vue from 'vue'
var api ="http://172.16.211.152"
var api1 ="http://172.16.211.151"
export default {
    install () {
        Vue.prototype.api = api
        Vue.prototype.api1 = api1
    }
}