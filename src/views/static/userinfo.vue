<template>
    <el-button @click="get">返回</el-button>
    <div style="margin: 80px 150px;">
        <div style="margin:10px 0px;">
            <el-button type="info" @click="toAdd" round>添加</el-button>
        </div>
        <el-table :data="userinfos" style="width: 100%;border-style:solid;border-width:medium;"
            :header-cell-style="{ 'text-align': 'center' }">
            <el-table-column fixed prop="id" label="ID" width="60" />
            <el-table-column prop="userName" label="用户名" width="80" />
            <el-table-column prop="userType" label="用户类型" width="100" />mobile
            <el-table-column prop="mobile" label="电话" width="60" />
            <el-table-column prop="binding" label="绑定" width="60" :formatter="formatterBinding" />
            <el-table-column prop="state" label="状态" width="60" :formatter="formatterState" />
            <el-table-column prop="createTime" label="创建时间" width="100" />
            <el-table-column prop="updateTime" label="更新时间" width="100" />
            <el-table-column prop="token" label="token" width="380" />
            <el-table-column fixed="right" label="操作" width="140">
                <template #default="scope">
                    <el-button type="info" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button type="info" size="small" @click="dele(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :current-page="page.current" :total="page.total" :page-size="page.size"
            @current-change="getUserinfosPage" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="用户编辑">
        <el-form :model="controller">
            <el-form-item label="用户名" :label-width="140"><!-- :label-width="formLabelWidth" -->
                <el-input v-model="userinfo.userName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户类型" :label-width="140">
                <el-input v-model="userinfo.userType" autocomplete="off" />
            </el-form-item>
            <el-form-item label="邮箱地址" :label-width="140">
                <el-input v-model="userinfo.email" autocomplete="off" />
            </el-form-item>
            <el-form-item label="手机号" :label-width="140">
                <el-input v-model="userinfo.mobile" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" :label-width="140">
                <el-input v-model="userinfo.password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="token" :label-width="140">
                <el-input v-model="userinfo.token" autocomplete="off" />
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
import { useUserStore } from "@/store/user";
import { defineComponent } from 'vue'
import { userinfoPage, userinfoDelId, userinfoAdd, userinfoEdit } from "../../http/userinfo"
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            userinfos: [],
            page: {
                total: 0,
                current: 1,
                size: 3
            },
            dialogFormVisible: false,
            // disabled: false,
            userinfo: {
                "binding": 0,
                "createTime": "",
                "deleted": 0,
                "email": "",
                "id": 0,
                "mobile": "",
                "password": "",
                "state": 0,
                "token": "",
                "updateTime": "",
                "userName": "",
                "userType": ""
            },
            formLabelWidth: 80,
        }
    },
    mounted() {
        this.getUserinfosPage(1)
        const userStore = useUserStore();
        const { authority } = userStore;
        this.authority = authority
        console.log(this.authority);
    },
    methods: {
        get() {
            this.$router.push({ path: '/index', params: { id: 1 } })
        },
        formatterState(row) {
            if (row.state == 0) {
                return '未激活'
            }
            if (row.state == 1) {
                return '激活'
            }
            return row.state
        },
        formatterBinding(row) {
            if (row.binding == 0) {
                return '未绑定'
            }
            if (row.binding == 1) {
                return '绑定'
            }
            return row.state
        },
        toEdit(userinfo) {
            console.log(this.authority);
            if (this.authority < 2) {
                ElMessage({ message: '权限不够', type: 'warning', })
                return
            }
            ElMessage({ message: '操作成功', type: 'success', })
            console.log(userinfo)
            this.dialogFormVisible = true
            this.userinfo = cloneDeep(userinfo);

        },
        getUserinfosPage(current) {
            const data = {
                current: current,
                size: 3
            }
            userinfoPage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.userinfos = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err)
            })
        },
        currentchange(current) {
            this.getUserinfosPage(current);
            this.page.current = current;
        },
        dele(id) {
            console.log(this.authority);
            if (this.authority < 3) {
                ElMessage({ message: '权限不够', type: 'warning', })
                return
            }
            ElMessage({ message: '操作成功', type: 'success', })
            const params = {
                id: id
            }
            userinfoDelId(params).then(res => {
                console.log(id)
                if (res.success) {
                    this.getUserinfosPage(this.page.current)
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
            console.log(this.authority);
            if (this.authority < 2) {
                ElMessage({ message: '权限不够', type: 'warning', })
                return
            }
            ElMessage({ message: '操作成功', type: 'success', })
            //到添加页面
            this.dialogFormVisible = true
        },
        save() {
            const userinfo = this.userinfo;
            if (userinfo.id == 0) {
                userinfoAdd(userinfo).then(res => {
                    console.log(res.success)
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false
                        this.getUserinfosPage(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员或格式错误')
                })
            }
            else {
                console.log(userinfo)
                userinfo.updateTime = ""
                userinfo.createTime = ""
                userinfoEdit(userinfo).then(res => {
                    console.log(res.success)
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false
                        this.getUserinfosPage(this.page.current)
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