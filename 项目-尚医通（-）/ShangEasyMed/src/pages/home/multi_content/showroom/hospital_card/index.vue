<template>
    <el-card shadow="hover" class="hospital-card">
        <div class="content">
            <div class="left">
                <div class="hospital-name">{{ hospital.hosname || "XXXXXX医院" }}</div>
                <div class="hospital-details">
                    <div class="rank">
                        <el-icon>
                            <FirstAidKit />
                        </el-icon>
                        <span>{{ hospital.param.hostypeString || "未知等级" }}</span>
                    </div>
                    <div class="release-time">
                        <el-icon>
                            <Clock />
                        </el-icon>
                        <span>每天{{ hospital.bookingRule.releaseTime || "xx:xx" }}放号</span>
                    </div>
                </div>
            </div>
            <div class="right">
                <!-- <img src="@/assets/images/logo.png" alt=""> -->
                <img :src="`data:image/jpeg;base64,${hospital.logoData}` || '@/assets/images/logo.png'" alt="" srcset="">
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { FirstAidKit, Clock } from "@element-plus/icons-vue"
defineOptions({
    name: "HospitalCard"
})
let { hospital } = defineProps(["hospital"])
</script>

<style lang="less" scoped>
.content {
    display: flex;
    justify-content: space-between;

    .left {
        width: 60%;

        .hospital-details {
            display: flex;
            justify-content: space-between;

            color: #7f7f7f;
            margin-top: 20px;

            .rank,
            .release-time {
                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    margin-left: 10px;
                }
            }
        }
    }

    .right {
        img {
            width: 50px;
            height: 50px
        }
    }
}
</style>