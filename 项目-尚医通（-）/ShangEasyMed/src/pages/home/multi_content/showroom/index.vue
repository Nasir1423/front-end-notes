<template>
    <div class="showroom">
        <HospitalCard v-for="(hospital) in hospitalInfo.content" :key="hospital.id" class="card" :hospital="hospital" />
    </div>
</template>

<script setup lang="ts">
import HospitalCard from "@/pages/home/multi_content/showroom/hospital_card/index.vue"
// import { onMounted } from "vue";
defineOptions({
    name: "Showroom"
})
let { hospitalInfo } = defineProps(["hospitalInfo"])
</script>

<style scoped>
.showroom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .card {
        width: 49%;
        margin: 10px 0;
    }
}
</style>