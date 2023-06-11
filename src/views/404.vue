<template>
  <el-button @click="get">返回</el-button>
  <div style="font-size: 200px;margin: 220px 100px;">错误，请返回</div>
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
  methods: {
    get() {
      this.$router.push({ path: '/index', params: { id: 1 } })
    },
  }
});
</script>

<style lang="scss" scoped></style>
