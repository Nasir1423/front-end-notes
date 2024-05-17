const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  /* 关闭语法检查，否则单个单词命名组件时会报错：
  Component name xxx should always be multi-word vue/multi-word-component-names */
  lintOnSave: false
})
