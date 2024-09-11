import VueRouter from "vue-router"

/* 路由组件 */
import About from "../pages/About.vue"
import Home from "../pages/Home.vue"
import News from "../pages/News.vue"
import Messages from "../pages/Messages.vue"
import Detail from "../pages/Detail.vue"

/* 路由器 */
const router = new VueRouter({
    /* 配置路由规则 */
    routes: [
        {
            path: "/about",
            component: About,
            meta: {
                title: "关于"
            }
        },
        {
            path: "/home",
            component: Home,
            meta: {
                title: "首页"
            },
            children: [
                {
                    path: "news",
                    component: News,
                    children: [
                        {
                            name: "xinwen",
                            path: "detail/:id/:title",
                            component: Detail
                        }
                    ],
                    meta: {
                        title: "新闻",
                        requiresAuth: true // 表示该组件的内容需要进行信息校验
                    }
                },
                {
                    path: "messages",
                    component: Messages,
                    children: [
                        {
                            name: "xiangqing",
                            path: "detail",
                            component: Detail
                        }
                    ],
                    meta: {
                        title: "消息",
                        requiresAuth: true // 表示该组件的内容需要进行信息校验
                    }
                }
            ]
        }
    ]
})

// 全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to, from, next) => {
    console.log("beforeEach");
    if (to.meta.requiresAuth) {
        if (localStorage.getItem("name") === "chuanyitu") {
            console.log("成功通过校验！");
            next();
        } else {
            console.log("暂无权限查看相关信息！！！");
        }
    } else {
        next();

    }
})

// 全局后置守卫：初始化时执行、每次路由切换后执行
router.afterEach((to, from) => {
    console.log("afterEach");
    document.title = to.meta.title || "路由守卫";
})

export default router;