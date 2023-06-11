<template>
  <el-button type="primary" @click="test1">Primary</el-button>
  <el-button type="success" @click="test2">Success</el-button>
  <el-button type="info"    @click="test3">Info</el-button>
</template>

<script>

import { defineComponent } from 'vue'
import {mapActions} from "pinia";
import {useUserStore} from "@/store/user";
export default defineComponent({
  data() {
    return {
      LoginID:null,
      authority:0,
    }
  },
  mounted(){
    const userStore=useUserStore();
    const {authority}=userStore;
    this.authority = authority
    console.log(this.authority);
  },
  methods: {
    test1(){
      console.log(this.authority);
      if(this.authority < 1){
        ElMessage({message: '权限不够', type: 'warning',})
        return
      }
      ElMessage({message: '操作成功', type: 'success',
      })
    },
    test2(){
      console.log(this.authority);
      if(this.authority < 2){
        ElMessage({message: '权限不够', type: 'warning',})
        return
      }
      ElMessage({message: '操作成功', type: 'success',})
      },
    test3(){
      console.log(this.authority);
      if(this.authority <  3){
        ElMessage({message: '权限不够', type: 'warning',})
        return
      }
        ElMessage({message: '操作成功', type: 'success'})
      }

  },
});
</script>

<style scoped>

</style>
