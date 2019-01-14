import Vue from 'vue';
import Login from "./Login.vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {httpPost} from "@/utils/api";

Vue.use(ElementUI);
Vue.prototype.httpPost = httpPost;

new Vue({
    render: h => h(Login)
}).$mount('#login');