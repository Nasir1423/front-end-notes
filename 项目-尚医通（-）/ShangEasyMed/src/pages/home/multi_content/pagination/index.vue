<template>
    <!-- 分页条组件 -->
    <el-pagination v-model:current-page=currentPage v-model:page-size=pageSize :total="totalElements"
        :page-sizes="[10, 20, 30, 40]" :background="true" layout="prev, pager, next, jumper, ->,sizes,total"
        @change="handleChange" class="pagination" />
</template>

<script setup lang="ts">
defineComponent({
    name: "Pagination"
})

import { defineComponent, toRefs } from 'vue';

/* 接收父组件传来的医院信息数据，并将当前页，每页数量，总数量解构出来后通过 toRefs 映射为响应式数据，与分页条组件进行双向绑定。 */
/* 注意：currentPage, pageSize, totalElements 这三个响应式数据的变化，会影响到父组件中的 hospitalInfo 中数据的变化 */
let { hospitalInfo } = defineProps(["hospitalInfo"]);
let { currentPage, pageSize, totalElements } = toRefs(hospitalInfo);

/* 父组件在子组件中绑定了 update 事件，一旦子组件中有数据修改（如当前页，每页数量），就通知父组件重新发送给 AJAX 请求，重新渲染医院信息 */
const emit = defineEmits(["update"]);

/* 当分页组件对应的当前页、每页数量改变，则触发 change 事件，以下函数调用：触发分页组件的 update 事件，传递相关参数，父组件中针对 update 事件的回调也随之执行 */
function handleChange(currentPage: number, pageSize: number) {
    emit("update", currentPage, pageSize)
}
</script>

<style lang="less" scoped>
.pagination {
    margin: 10px 0;
}
</style>