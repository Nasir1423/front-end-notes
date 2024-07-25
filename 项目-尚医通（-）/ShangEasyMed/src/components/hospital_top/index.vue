<template>
  <!-- 顶部 -->
  <div class="top">
    <!-- 内容区 -->
    <div class="content">
      <!-- 内容区左侧 -->
      <div class="left">
        <img src="@/assets/images/logo.png" alt="尚医通网站图标" />
        <p>尚医通 预约挂号统一平台</p>
      </div>
      <!-- 内容区右侧 -->
      <div class="right">
        <p class="help">帮助中心</p>
        <p class="auth">
          <span class="login">登录</span>
          /
          <span class="registry">注册</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "HospitalTop"
})
</script>

<style scoped lang="less">
/* 顶部：宽度 100%，高度 70px */
.top {
  /* 为顶部开启固定定位，其位置永远固定 */
  position: fixed;
  z-index: 999;

  width: 100%;
  height: 70px;
  background-color: #fff;

  /* 让版心 content 在主轴上居中 */
  display: flex;
  justify-content: center;

  /* 内容区：版心；宽度 1200px，高度 70px；网页置中（flex 实现） */
  .content {
    width: 1200px;
    height: 100%;

    /* 让内容区左侧和右侧在主轴上靠边分散对齐 */
    display: flex;
    justify-content: space-between;

    /* 内容区左侧 */
    .left {
      /* 让内容区左侧中的两部分内容在主轴和侧轴上水平垂直居中 */
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 50px;
        height: 50px;

        margin-right: 10px;
      }

      p {
        font-size: 20px;
        color: #55a6fe;
      }
    }

    /* 内容区右侧 */
    .right {
      /* 让内容区右侧中的两部分内容在主轴和侧轴上水平垂直居中 */
      display: flex;
      justify-content: space;
      align-items: center;

      font-size: 14px;
      color: #bbb;

      .help {
        margin-right: 10px;
        cursor: pointer;
      }

      .auth {
        cursor: pointer;
      }
    }
  }
}
</style>