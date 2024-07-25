<template>
  <!-- 底部 -->
  <div class="bottom">
    <!-- 内容区 -->
    <div class="content">
      <!-- 内容区左侧 -->
      <div class="left">
        <p>京ICP备10095211号</p>
        <p>举报电话：4006666696</p>
      </div>
      <!-- 内容区右侧 -->
      <div class="right">
        <p>联系我们</p>
        <p>合作伙伴</p>
        <p>用户协议</p>
        <p>隐私协议</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">
/* 底部 */
.bottom {
  width: 100%;
  height: 50px;
  background-color: #f0f2f5;

  /* 让版心 content 在主轴上居中 */
  display: flex;
  justify-content: center;

  /* 内容区：版心 */
  .content {
    width: 1200px;
    height: 100%;

    font-size: 14px;
    color: #aaa;

    /* 让内容区左侧与右侧在主轴上靠边分散对齐 */
    display: flex;
    justify-content: space-between;

    /* 内容区左侧 */
    .left {
      /* 让内容区左侧中的两部分内容在主轴和侧轴上水平垂直居中 */
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        margin-right: 10px;
      }
    }

    /* 内容区右侧 */
    .right {
      /* 让内容区右侧中的四部分内容在主轴和侧轴上水平垂直居中 */
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        margin-left: 5px;
        cursor: pointer
      }
    }
  }
}
</style>