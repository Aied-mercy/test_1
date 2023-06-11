<template>
    <el-button @click="get">返回</el-button>
    <img src="../../image/1.jpg" style="width: 100%;height: 100%;">
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
    methods:{
        get() {
            this.$router.push({ path: '/index', params: { id: 1 } })
        },
    }
});
</script>
<style lang='scss' scoped></style>