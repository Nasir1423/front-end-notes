<template>
  <div>
    <!-- 轮播图组件 -->
    <Carousel />
    <!-- 搜索框组件 -->
    <Search />
    <!-- 多内容区组件 -->
    <MultiContent />
  </div>
</template>

<script setup lang="ts">
import Carousel from "@/pages/home/carousel/index.vue";
import Search from "@/pages/home/search/index.vue";
import MultiContent from "@/pages/home/multi_content/index.vue";
</script>

<style scoped>
</style>