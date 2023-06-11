<template>
    <el-button @click="get">返回</el-button>
    <div style="margin: 80px 150px;">
        <div style="margin:10px 0px;">
            <el-button type="info" @click="toAdd" round>添加</el-button>
        </div>
        <el-table :data="rolePermissions" style="width: 100%;border-style:solid;border-width:medium;"
            :header-cell-style="{ 'text-align': 'center' }">
            <el-table-column fixed prop="id" label="ID" align="center" width="100" />
            <el-table-column prop="permissionIds" label="权限" align="center" width="200" />
            <el-table-column prop="roleId" label="角色编号" align="center" width="140" />
            <el-table-column prop="createTime" label="创建时间" align="center" width="250" />
            <el-table-column prop="updateTime" label="更新时间" align="center" width="250" />
            <el-table-column fixed="right" label="操作" align="center" width="220">
                <template #default="scope">
                    <el-button type="info" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button type="info" size="small" @click="dele(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :current-page="page.current" :total="page.total" :page-size="page.size"
            @current-change="getPermissionsPage" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="用户编辑">
        <el-form :model="rolePermission">
            <el-form-item label="权限" :label-width="140"><!-- :label-width="formLabelWidth" -->
                <el-input v-model="rolePermission.permissionIds" autocomplete="off" />
            </el-form-item>
            <el-form-item label="角色编号" :label-width="140"><!-- :label-width="formLabelWidth" -->
                <el-input v-model="rolePermission.roleId" autocomplete="off" />
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
import { rolePermissionPage, rolePermissionDelId, rolePermissionAdd, rolePermissionEdit } from "../../http/rolePermission"
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            rolePermissions: [],
            page: {
                total: 0,
                current: 1,
                size: 5
            },
            dialogFormVisible: false,
            rolePermission: {
                "createTime": "",
                "id": 0,
                "permissionIds": "",
                "roleId": 0,
                "updateTime": ""
            },
            formLabelWidth: 80,
        }
    },
    mounted() {
        this.getRolePermissionsPage(1)
    },
    methods: {
        get() {
            this.$router.push({ path: '/index', params: { id: 1 } })
        },
        toEdit(rolePermission) {
            console.log(rolePermission)
            this.dialogFormVisible = true
            this.rolePermission = cloneDeep(rolePermission);

        },
        getRolePermissionsPage(current) {
            // const data = {
            //     current: current,
            //     size: 5
            // }
            rolePermissionPage().then(res => {
                console.log(res);
                const page = res.data;
                console.log(page);
                this.rolePermissions = page.rolePermissions;
                //this.page = page;
            }).catch(err => {
                console.log(err)
            })
        },
        currentchange(current) {
            this.getRolePermissionsPage(current);
            this.page.current = current;
        },
        dele(id) {
            const params = {
                id: id
            }
            rolePermissionDelId(params).then(res => {
                console.log(id)
                if (res.success) {
                    this.getRolePermissionsPage(this.page.current)
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
            const rolePermission = this.rolePermission;
            if (rolePermission.id == 0) {
                rolePermissionAdd(rolePermission).then(res => {
                    console.log(res.success)
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false
                        this.getRolePermissionsPage(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员或者格式错误')
                })
            }
            else {
                rolePermissionEdit(rolePermission).then(res => {
                    console.log(res.success)
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false
                        this.getRolePermissionsPage(this.page.current)
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