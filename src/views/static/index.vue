<template>
  <el-button @click="get">返回</el-button>
  <div class="bg">
    <div class="norms">
      <h1>权限管理</h1>
      <div>
        <!-- <RouterLink to="/homepage">校园信息</RouterLink> -->
        <el-button type="info" @click="test1">查看校园信息</el-button>
      </div>
      <br>
      <div>
        <!-- <RouterLink to="/role">角色管理</RouterLink> -->
        <el-button type="info" @click="test2">查看角色管理</el-button>
      </div>
      <br>
      <div>
        <!-- <RouterLink to="/permission">权限管理</RouterLink> -->
        <el-button type="info" @click="test3">查看权限管理</el-button>
      </div>
      <br>
      <div>
        <!-- <RouterLink to="/userinfo">用户管理</RouterLink> -->
        <el-button type="info" @click="test4">查看用户管理</el-button>
      </div>
      <br>
      <div>
        <!-- <RouterLink to="/userRole">用户角色</RouterLink> -->
        <el-button type="info" @click="test5">查看用户角色</el-button>
      </div>
      <br>
      <div>
        <!-- <RouterLink to="/rolePermission">角色权限</RouterLink> -->
        <el-button type="info" @click="test6">查看角色权限</el-button>
      </div>
      <br>

    </div>
  </div>
</template>
<script>
import { ElMessage } from 'element-plus';
import { defineComponent } from 'vue'
import { mapActions } from "pinia";
import { useUserStore } from "@/store/user";
export default defineComponent({
  data() {
    return {
      LoginID: null,
      authority: 0,
    }
  },
  mounted() {
    const userStore = useUserStore();
    const { authority } = userStore;
    this.authority = authority
    console.log(this.authority);
  },
  methods: {
    get() {
            this.$router.push({ path: '/', params: { id: 1 } })
        },
    test1() {
      console.log(this.authority);
      const that = this;
      if (this.authority < 1) {
        ElMessage({ message: '权限不够', type: 'warning', })
        return
      }
      ElMessage({message: '操作成功', type: 'success',})
      this.$router.push({ path: '/homepage', params: { id: 1 } })
    },
    test2() {
      console.log(this.authority);
      if (this.authority < 3) {
        ElMessage({ message: '权限不够', type: 'warning', })
        return
      }
      ElMessage({ message: '操作成功', type: 'success', })
      this.$router.push({ path: '/role', params: { id: 2 } })
    },
    test3() {
      console.log(this.authority);
      if (this.authority < 3) {
        ElMessage({ message: '权限不够', type: 'warning', })
        return
      }
      ElMessage({ message: '操作成功', type: 'success' })
      this.$router.push({ path: '/permission', params: { id: 3 } })
    },
    test4() {
      console.log(this.authority);
      if (this.authority < 3) {
        ElMessage({ message: '权限不够', type: 'warning', })
        return
      }
      ElMessage({ message: '操作成功', type: 'success', })
      this.$router.push({ path: '/userinfo', params: { id: 4 } })
    },
    test5() {
      console.log(this.authority);
      if (this.authority < 1) {
        ElMessage({ message: '权限不够', type: 'warning', })
        return
      }
      ElMessage({ message: '操作成功', type: 'success', })
      this.$router.push({ path: '/userinfo', params: { id: 5 } })
    },
    test6() {
      console.log(this.authority);
      if (this.authority < 3) {
        ElMessage({ message: '权限不够', type: 'warning', })
        return
      }
      ElMessage({ message: '操作成功', type: 'success', })
      this.$router.push({ path: '/rolePermission', params: { id: 6 } })
    },

  },
});
</script>
<style lang="scss" scoped>
.bg {
  height: 100%;
  width: 100%;
  //background: url('../../src/assets/bg.png');
}

.norms {
  margin: 80px;
}
</style>
