import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import router from './router' // 路由器对象

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
