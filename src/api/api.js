
import Vue from 'vue'
var api ="http://172.16.211.152"
<<<<<<< HEAD
var api1 ="http://172.16.211.151"
=======
>>>>>>> 51d69160c2ac98a2cd6e57acdde3d80b92a47194
export default {
    install () {
        Vue.prototype.api = api
        Vue.prototype.api1 = api1
    }
}