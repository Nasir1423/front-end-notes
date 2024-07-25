<template>
  <!-- 多内容区 -->
  <div class="multi-content">
    <el-row :gutter="20" justify="space-between">
      <!-- 左侧/第一列 -->
      <el-col :span="18">
        <!-- 条件筛选组件 -->
        <Conditions />
        <!-- 医院展示组件 -->
        <Showroom :hospitalInfo="hospitalInfo" />
        <!-- 分页筛选组件 -->
        <Pagination :hospitalInfo="hospitalInfo" @update="handleUpdate" />
      </el-col>
      <!-- 右侧/第二列  -->
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import Conditions from "@/pages/home/multi_content/conditions/index.vue"
import Showroom from "@/pages/home/multi_content/showroom/index.vue"
import Pagination from "@/pages/home/multi_content/pagination/index.vue"

defineOptions({
  name: "MultiContent"
})

/* 获取医院列表数据，并进行处理，然后传递给 showroom 和 pagination 组件进行页面渲染 */
import { onMounted, reactive } from "vue";
import { getHospitalList } from "@/api/home/index.ts";

let hospitalInfo = reactive({ content: [], currentPage: 1, pageSize: 10, totalElements: 10, totalPages: 1 });

async function updateHospitalInfo() {
  /* 当分页组件中的 currentPage、pageSize 更改后，会反映到当前组件的 hospitalInfo 身上的 currentPage、pageSize */
  let response = await getHospitalList(hospitalInfo.currentPage, hospitalInfo.pageSize);
  const { content, totalElements, totalPages } = response.data;
  Object.assign(hospitalInfo, { content, totalElements, totalPages });

}

onMounted(async () => {
  updateHospitalInfo();
})

function handleUpdate() {
  updateHospitalInfo();
}
</script>
