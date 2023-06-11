<template>
    <el-button @click="get">返回</el-button>
    <div style="margin: 80px 150px;">
        <div style="margin:10px 0px;">
            <el-button type="info" @click="toAdd" round>添加</el-button>
        </div>
        <el-table :data="roles" style="width: 100%;border-style:solid;border-width:medium;" :header-cell-style="{'text-align': 'center'}">
            <el-table-column fixed prop="id" label="ID" align="center" width="120" />
            <el-table-column prop="roleName" label="角色名" align="center" width="210" />
            <el-table-column prop="status" label="状态" align="center" width="120" :formatter="formatterState" />
            <el-table-column prop="createTime" label="创建时间" align="center" width="250" />
            <el-table-column prop="updateTime" label="更新时间" align="center" width="250" />
            <el-table-column fixed="right" label="操作" align="center" width="200">
                <template #default="scope">
                    <el-button type="info" size="small" @click="toEdit(scope.row)" >更新</el-button>
                    <el-button type="info" size="small" @click="dele(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :current-page="page.current" :total="page.total" :page-size="page.size"
            @current-change="getRolesPage" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="用户编辑">
        <el-form :model="role">
            <el-form-item label="角色名" :label-width="140"><!-- :label-width="formLabelWidth" -->
                <el-input v-model="role.roleName" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="save">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>

import { defineComponent } from 'vue'
import { rolePage, roleDelId, roleAdd, roleEdit } from "../../http/role"
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            roles: [],
            page: {
                total: 0,
                current: 1,
                size: 5
            },
            dialogFormVisible: false,
            role: {
                "createTime": "",
                "deleted": 0,
                "description": "",
                "id": 0,
                "roleName": "",
                "status": 0,
                "updateTime": ""
            },
            formLabelWidth: 80,
        }
    },
    mounted() {
        this.getRolesPage(1)
    },
    methods: {
        get(){
            this.$router.push({path:'/index',params:{id:1}})
        },
        formatterState(row) {
            if (row.status == 0) {
                return '未激活'
            }
            if (row.status == 1) {
                return '激活'
            }
            return row.status
        },
        toEdit(role) {
            console.log(role)
            this.dialogFormVisible = true
            this.role = cloneDeep(role);

        },
        getRolesPage(current) {
            const data = {
                current: current,
                size: 5
            }
            rolePage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.roles = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err)
            })
        },
        currentchange(current) {
            this.getRolesPage(current);
            this.page.current = current;
        },
        dele(id) {
            const params = {
                id: id
            }
            roleDelId(params).then(res => {
                console.log(id)
                if (res.success) {
                    this.getRolesPage(this.page.current)
                }
                else {
                    console.log(res.msg)
                    return false
                }
            }).catch(err => {

            })
            this.dialogFormVisible1 = false;
        },
        toAdd() {
            //到添加页面
            this.dialogFormVisible = true
        },
        save() {
            const role = this.role;
            if (role.id == 0) {
                roleAdd(role).then(res => {
                    console.log(res.success)
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false
                        this.getRolesPage(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }
            else {
                roleEdit(role).then(res => {
                    console.log(res.success)
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false
                        this.getRolesPage(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员Edit')
                })
            }
        },

    },
});
</script>
<style lang='scss' scoped></style>