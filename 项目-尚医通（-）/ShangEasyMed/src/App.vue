<template>
  <el-config-provider :locale="locale">
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
  </el-config-provider>
</template>

<script setup lang="ts">
import HospitalTop from "@/components/hospital_top/index.vue";
import HospitalBottom from "@/components/hospital_bottom/index.vue";

/* 国际化设置 */
import { ref } from "vue";
import { ElConfigProvider } from 'element-plus';
import zhCn from "element-plus/es/locale/lang/zh-cn";
const locale = ref(zhCn);

/* 封装 Axios 的测试 */
/* import request from "@/utils/request"
import { onMounted } from "vue"
onMounted(() => {
  request.get('/hosp/hospital/1/10')
    .then((response) => {
      console.log("SUCCESS: 封装后的 Axios 成功获取到了数据");
      console.log(response)
    }).catch((error) => {
      console.warn("ERROR: 封装后的 Axios 未成功获取数据");
      console.log(error);
    })
}) */

/* 封装 Axios 接口的测试 */
/* import { getHospitalList } from "@/api/home/index.ts"
import { onMounted } from "vue";
onMounted(() => {
  getHospitalList(1, 10)
    .then((response) => {
      console.log("SUCCESS: 封装后的 Axios 成功获取到了数据");
      console.log(response)
    }).catch((error) => {
      console.warn("ERROR: 封装后的 Axios 未成功获取数据");
      console.log(error);
    })
}) */
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