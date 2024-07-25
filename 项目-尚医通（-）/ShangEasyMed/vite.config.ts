import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    /* 自动引入组件 */
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    /* 自动注册组件 */
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    /* 路径别名 */
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    /* 代理跨域 */
    proxy: {
      /* 匹配以 `/api` 开头的请求路径 */
      "/api": {
        target: "http://syt.atguigu.cn", // 代理目标地址 / 实际请求的后端服务器地址
        changeOrigin: true  // 修改请求头中的 Host 字段为目标地址的域名（有助于避免由于 Host 字段不匹配而导致的跨域问题或请求失败。）
      }
    }
  }
})