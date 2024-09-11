/* main.js 是入口文件，这里定义 Vue 的实例对象，并引入使用 App.vue 组件 */
import App from "./App.vue"

new Vue({
  el: "root",
  template: "<App></App>",
  components: { App }
})