<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop />
    <!-- 主体路由组件 -->
    <main>
      <router-view></router-view>
    </main>
    <!-- 底部全局组件 -->
    <HospitalBottom />
  </div>
</template>

<script setup lang="ts">
import HospitalTop from "@/components/hospital_top/index.vue";
import HospitalBottom from "@/components/hospital_bottom/index.vue";
</script>

<style scoped lang="less">
.container {
  /* 让顶部、主体、底部组件三部分在网页中居中 */
  display: flex;
  flex-direction: column; // 主轴从上到下
  align-items: center;

  main {
    width: 1200px;
    min-height: 700px;
    margin-top: 70px;
  }
}
</style>