import Vue from 'vue'
import VueResource from 'vue-resource'
import Login from "./Login.vue";

Vue.use(VueResource);

new Vue({
    render: h => h(Login)
}).$mount('#login');