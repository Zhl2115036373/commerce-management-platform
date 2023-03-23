// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter)

import routes from '@/router/router'
// 配置路由
export default new  VueRouter({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
        },
})