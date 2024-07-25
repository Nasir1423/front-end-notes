<template>
    <div class="options">
        <div class="title">医院</div>
        <div class="rank">
            <div class="left">等级：</div>
            <div class="right">
                <ul>
                    <li class="active">全部</li>
                    <li>三级甲等</li>
                    <li>三级乙等</li>
                    <li>二级甲等</li>
                    <li>二级乙等</li>
                    <li>一级</li>
                </ul>
            </div>
        </div>
        <div class="region">
            <div class="left">地区：</div>
            <div class="right">
                <ul>
                    <li class="active">全部</li>
                    <li>东城区</li>
                    <li>西城区</li>
                    <li>朝阳区</li>
                    <li>丰台区</li>
                    <li>石景山区</li>
                    <li>海淀区</li>
                    <li>门头沟区</li>
                    <li>房山区</li>
                    <li>通州区</li>
                    <li>顺义区</li>
                    <li>昌平区</li>
                    <li>大兴区</li>
                    <li>怀柔区</li>
                    <li>平谷区</li>
                    <li>密云区</li>
                    <li>延庆区</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: "Conditions"
})
</script>

<style lang="less" scoped>
.options {

    .title {
        font-weight: bold;
    }

    .title,
    .rank,
    .region {
        margin: 20px 0;
        color: #7f7f7f;


        &>.left {
            font-weight: bold;
            white-space: nowrap; // 防止内容换行
        }
    }

    .rank,
    .region {
        display: flex;

        .right ul {
            display: flex;
            flex-wrap: wrap;

            li {
                margin-right: 20px;
                cursor: pointer;

                &.active,
                &:hover {
                    color: #55a6fe;
                }
            }
        }

        &.region li {
            margin-bottom: 10px
        }
    }
}
</style>