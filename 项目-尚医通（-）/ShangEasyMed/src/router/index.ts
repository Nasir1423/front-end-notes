import { createRouter, createWebHistory } from "vue-router"

const routes = [ // 配置一组路由规则
    {
        name: "Home",
        path: "/home",
        component: () => import("@/pages/home/index.vue") // 路由的懒加载
    },
    {
        name: "Hospital",
        path: "/hospital",
        component: () => import("@/pages/hospital/index.vue") // 路由的懒加载
    },
    {
        path: "/",
        redirect: "/home" // 重定向到 /home 路由
    }
]

/* 创建并暴露路由器对象 router，用于管理一组路由规则 */
export default createRouter({
    history: createWebHistory(), // 指定路由工作模式为 history 模式
    routes,
    scrollBehavior() { // 路由跳转后的滚动行为
        return {
            left: 0,
            top: 0
        }
    }
})