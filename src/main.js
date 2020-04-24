import Vue from 'vue';
import Main from './Main.vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'element-ui/lib/theme-chalk/index.css';
import {
    httpGet,
    httpPost
} from "./utils/http";
import Login from './components/Login';
import Navigation from './components/Navigation';
import Home from './components/nav/Home';
import Land from './components/nav/Land';
import Material from './components/nav/Material';
import Fertilizer from './components/nav/Fertilizer';

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.httpGet = httpGet;
Vue.prototype.httpPost = httpPost;

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/login',
            component: Login
        },
        {
            path: '/navigation',
            component: Navigation,
            children: [{
                    path: '',
                    component: Home
                },
                {
                    path: 'land',
                    component: Land
                },
                {
                    path: 'material',
                    component: Material
                },
                {
                    path: 'fertilizer',
                    component: Fertilizer
                }
            ]
        },
        // 这里捕捉 404 页面，暂时先用登录页面顶着
        {
            path: '/*',
            component: Login
        }
    ]
});

new Vue({
    router: router,
    render: h => h(Main),
}).$mount('#app');