import { createApp } from 'vue' // createApp 用于创建应用实例方法
import App from './App.vue' // 引入根组件 APP

import 'reset-css' // 清楚默认样式
import router from './router'; // 引入路由器

// 调用 createApp 创建应用实例，并
createApp(App)
    .use(router) // 安装路由器
    .mount('#app'); // 将应用实例挂载到挂载点上（index.html 中的 id=app 的元素）