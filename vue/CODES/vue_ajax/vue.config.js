const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭语法检查
  /* 代理服务器的配置 —— 方式一 */
  // devServer: {
  //   proxy: 'http://localhost:5000' // 配置将用户的请求转发到该服务器
  // }
  /* 代理服务器的配置 —— 方式二 */
  devServer: {
    proxy: {
      /* 匹配所有以 /demo 开头的请求 */
      "/demo": {
        target: 'http://localhost:5000', // 配置将用户的请求转发到该服务器
        changeOrigin: true, // true（默认值），则表示后端服务器收到的请求头是 5000（欺骗后端服务器）；false，则表示后端服务器收到的请求头是 8080（真诚）
        ws: true, // true 表示支持 websocket
        pathRewrite: { '^/demo': '' } // 用于将转发的请求路径中的 demo 删除掉
      },
      /* 匹配所有以 /api 开头的请求 */
      "/api": {
        target: 'http://localhost:5001',
        changeOrigin: true,
        ws: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
})
