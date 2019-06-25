
import Vue from 'vue'
var api ="http://172.16.67.53:8080"
export default {
    install () {
        Vue.prototype.api = api
    }
}