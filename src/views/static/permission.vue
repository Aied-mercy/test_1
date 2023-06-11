<template>
    <el-button @click="get">返回</el-button>
    <div style="margin: 80px 150px;">
        <div style="margin:10px 0px;">
            <el-button type="info" @click="toAdd" round>添加</el-button>
        </div>
        <el-table :data="permissions" style="width: 100%;border-style:solid;border-width:medium;"
            :header-cell-style="{ 'text-align': 'center' }">
            <el-table-column fixed prop="id" label="ID" align="center" width="60" />
            <el-table-column prop="code" label="法典" align="center" width="100" />
            <el-table-column prop="description" label="名称" align="center" width="100" />
            <el-table-column prop="url" label="路径" align="center" width="160" />
            <el-table-column prop="type" label="类型" align="center" width="100" />
            <el-table-column prop="pid" label="父编号" align="center" width="100" />
            <el-table-column prop="hasChildren" label="子权限" align="center" width="110" :formatter="formatterHasChildren" />
            <el-table-column prop="createTime" label="创建时间" align="center" width="140" />
            <el-table-column prop="updateTime" label="更新时间" align="center" width="140" />
            <el-table-column fixed="right" label="操作" align="center" width="140">
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
        <el-form :model="permission">
            <el-form-item label="法典" :label-width="140"><!-- :label-width="formLabelWidth" -->
                <el-input v-model="permission.code" autocomplete="off" />
            </el-form-item>
            <el-form-item label="名称" :label-width="140"><!-- :label-width="formLabelWidth" -->
                <el-input v-model="permission.description" autocomplete="off" />
            </el-form-item>
            <el-form-item label="路径" :label-width="140"><!-- :label-width="formLabelWidth" -->
                <el-input v-model="permission.url" autocomplete="off" />
            </el-form-item>
            <el-form-item label="类型" :label-width="140"><!-- :label-width="formLabelWidth" -->
                <el-input v-model="permission.type" autocomplete="off" />
            </el-form-item>
            <el-form-item label="父编号" :label-width="140"><!-- :label-width="formLabelWidth" -->
                <el-input v-model="permission.pid" autocomplete="off" />
            </el-form-item>
            <el-form-item label="子权限" :label-width="140"><!-- :label-width="formLabelWidth" -->
                <el-input v-model="permission.hasChildren" autocomplete="off" />
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
import { permissionPage, permissionDelId, permissionAdd, permissionEdit } from "../../http/permission"
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            permissions: [],
            page: {
                total: 0,
                current: 1,
                size: 5
            },
            dialogFormVisible: false,
            permission: {
                "code": "",
                "createTime": "",
                "deleted": 0,
                "description": "",
                "hasChildren": 0,
                "id": 0,
                "pid": 0,
                "type": "",
                "updateTime": "",
                "url": ""
            },
            formLabelWidth: 80,
        }
    },
    mounted() {
        this.getPermissionsPage(1)
    },
    methods: {
        get() {
            this.$router.push({ path: '/index', params: { id: 1 } })
        },
        formatterHasChildren(row) {
            if (row.hasChildren == 0) {
                return '无'
            }
            if (row.hasChildren == 1) {
                return '有'
            }
            return row.hasChildren
        },
        toEdit(permission) {
            console.log(permission)
            this.dialogFormVisible = true
            this.permission = cloneDeep(permission);

        },
        getPermissionsPage(current) {
            const data = {
                current: current,
                size: 5
            }
            permissionPage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.permissions = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err)
            })
        },
        currentchange(current) {
            this.getPermissionsPage(current);
            this.page.current = current;
        },
        dele(id) {
            const params = {
                id: id
            }
            permissionDelId(params).then(res => {
                console.log(id)
                if (res.success) {
                    this.getPermissionsPage(this.page.current)
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
            const permission = this.permission;
            if (permission.id == 0) {
                permissionAdd(permission).then(res => {
                    console.log(res.success)
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false
                        this.getPermissionsPage(this.page.current)
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
                permissionEdit(permission).then(res => {
                    console.log(res.success)
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false
                        this.getPermissionsPage(this.page.current)
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