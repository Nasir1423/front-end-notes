import Vue from 'vue'
import App from './App.vue'
import store from './store' // 当导入路径为一个文件夹时，则会自动导入对应文件夹下的 index.js 文件

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  /* 当使用 Vue.use(Vuex) 后，创建 Vue 实例时可以传入一个 store 配置项，
  并且之后在 Vue 实例和组件实例对象身上出现 $store 属性 */
  store
}).$mount('#app')
