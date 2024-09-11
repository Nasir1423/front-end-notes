import { createApp } from 'vue' // 引入工厂函数 createApp
import App from './App.vue'

/* 创建应用实例对象 app（类比 Vue2 中的 vm，但 app lighter than vm） */
createApp(App).mount('#app')
