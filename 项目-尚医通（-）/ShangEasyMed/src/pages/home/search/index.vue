<template>
  <div class="search">
    <el-autocomplete clearable placeholder="请选择医院名称" />
    <el-button type="primary" :icon="Search" />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "Search"
})
import { Search } from "@element-plus/icons-vue";
</script>

<style lang="less" scoped>
/* 设置搜索框组件的样式 */
.search {
  width: 100%;
  height: 50px;
  margin: 40px 0;

  /* 让搜索框中的输入框与按钮在主轴和侧轴上水平垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;

  /* 设置输入框样式 */
  :deep(.el-autocomplete) {
    width: 900px;
    height: 40px;
  }

  :deep(.el-input) {
    width: 100%;
    height: 100%;
  }

  /* 设置搜索按钮样式 */
  :deep(.el-button) {
    width: 50px;
    height: 40px;
  }
}
</style>