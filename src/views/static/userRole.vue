<template>
    <el-button @click="get">返回</el-button>
    <div style="margin: 100px;">
        <h1>用户角色没找到，代替一下</h1>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
    methods: {
        get() {
            this.$router.push({ path: '/index', params: { id: 1 } })
        },
    }
});
</script>
<style lang='scss' scoped></style>