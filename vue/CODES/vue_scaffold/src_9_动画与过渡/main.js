/* 整个项目的入口文件 */
import Vue from 'vue' // 引入运行版 Vue：没有模板解析器，需要通过 render 渲染 Vue 实例上注册的组件
import App from './App.vue' // 引入所有组件的父组件 —— App 组件

Vue.config.productionTip = false // 关闭 Vue 的生产提示

/* 创建 Vue 实例对象 */
new Vue({
  render: h => h(App),
}).$mount('#app')
