import Vue from 'vue';
import Main from './Main.vue';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'element-ui/lib/theme-chalk/index.css';
import {httpGet, httpPost} from "@/utils/api";

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.httpGet = httpGet;
Vue.prototype.httpPost = httpPost;

import Land from './components/Land';
import Material from './components/Material';
import Fertilizer from './components/Fertilizer';

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/land',
            component: Land
        },
        {
            path: '/material',
            component: Material
        },
        {
            path: '/fertilizer',
            component: Fertilizer
        }
    ]
});


new Vue({
    router: router,
    render: h => h(Main),
}).$mount('#app');
