<template>
  <div class="carousel">
    <el-carousel height="350px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="@/assets/images/banner.png" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
</script>
  
<style scoped>
/* 设置轮播图组件的样式 */
.carousel {
  /* 修改轮播图内放置的图片的大小 */
  img {
    height: 350px;
    width: 100%;
  }
}
</style>