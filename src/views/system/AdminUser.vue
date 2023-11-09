<script setup lang="ts">

import { ref, reactive } from 'vue'

// 设置是否是 loading
const loading = ref(false)

// 设置 el-form 选中的数据
const searchFormState = reactive({
    username: '',
    role_id: 0,
    status: 0,
})

// 引进table.js
import { TableInstance, buildTable } from '@/types/table'

import api from '@/api'

// 使用 models
import { OptionItem, AdminListArgs, AdminItem, AdminSetRoleArgs, AdminSetPwdArgs, AdminCreateArgs } from 'models'

// 设置 角色 下拉框数据字段
const roleList = ref<OptionItem[]>([])

// 设置 roleOpt
const roleOpt = ref<TableInstance<number>>()


// 获取 角色 下拉框数据
{
    api.roleOption.do({}).then((res) => {
        console.log(res, 'res-角色下拉框数据')
        roleList.value = res.list
        roleOpt.value = buildTable(res.list)
        console.log(roleOpt.value, 'roleOpt.value')
    }).catch(api.errorPage)
}

// 设置

// 设置 查询 按钮参数
const params = reactive<AdminListArgs>({
    page: 1,
    size: 10,
    username: '',
    role_id: 0,
    status: 0,
})

// 设置 分页组件左边的 数据总条数
const total = ref(0)

// 设置表格数据字段
const tableData = ref<AdminItem[]>([])

// 查询按钮 调用接口 获取表格数据
function queryData() {
    api.adminList.do(params, loading).then((res) => {
        console.log(res, 'res-查询按钮表格数据')
        total.value = res.total
        tableData.value = res.list
    }).catch(api.errorPage)
}

// 请求一次表格数据
{
    queryData()
}

// 查询按钮 逻辑
function submitSearch() {
    params.role_id = searchFormState.role_id
    params.status = searchFormState.status
    params.username = searchFormState.username
    params.page = 1
    queryData()
}

import { FormInstance, ElMessage } from 'element-plus';

// 链接 el-form 元素
const searchFormRef = ref<FormInstance>()

// 启用/禁用 按钮逻辑
function setStatus(id: number, status: number, idx: number) {
    api.adminSetStatus.do({ id, status: status, }, loading).then(() => {
        tableData.value[idx].status = status
        ElMessage.success('操作成功')
    }).catch(api.errorMsg)
}

// 设置 index
let index = -1

// 设置 用户名字段
const user = ref('')

// el-drawer 显示隐藏
const roleVisible = ref(false)

// 设置el-form的节点
const roleFormRef = ref<FormInstance>()

// el-form 数据
const roleFormState = reactive<AdminSetRoleArgs>({
    id: 0,
    role_id: 0,
})

// 点击 变更角色
function openRole(item: AdminItem, idx: number) {
    index = idx
    user.value = item.username
    roleFormState.id = item.id
    roleFormState.role_id = item.role_id
    roleVisible.value = true
}

// 关闭 el-drawer
function closeRole() {
    roleVisible.value = false
}


// el-form 点击确定提交
function submitRole() {
    roleFormRef.value?.validate((valid) => {
        if (!valid) return false
        api.adminSetRole.do(roleFormState, loading).then(() => {
            tableData.value[index].role_id = roleFormState.role_id
            ElMessage.success('变更成功')
            closeRole()
        }).catch(api.errorMsg)
    })
}

// el-drawer 重置密码 显示隐藏
const pwdVisible = ref(false)

// 点击 重置密码
function openPwd(item: AdminItem) {
    user.value = item.username
    pwdFormState.id = item.id
    pwdVisible.value = true
}
// 重置密码表单节点
const pwdFormRef = ref<FormInstance>()

// 重置密码表单数据
const pwdFormState = reactive<AdminSetPwdArgs>({
    id: 0,
    password: ''
})

// 
import rand from '@/utils/rand'

// 重置密码表单确定按钮
function submitPwd() {
    pwdFormRef.value?.validate((valid) => {
        if (!valid) return false
        api.adminSetPwd.do(pwdFormState, loading).then(() => {
            ElMessage.success('重置成功')
            closePwd()
        }).catch(api.errorMsg)
    })
}


// 关闭重置密码表单
function closePwd() {
    pwdVisible.value = false
}

// 新增用户表单显示/隐藏
const addVisible = ref(false)

// 新增用户表单数据
const addFormState = reactive<AdminCreateArgs>({
    username: '',
    password: '',
    role_id: 0,
})

// 创建新增的el-form的节点
const addFormRef = ref<FormInstance>()

// 关闭新增表单
function closeAdd() {
    addVisible.value = false
}
// 新增用户表单确定按钮
function submitAdd() {
    addFormRef.value?.validate((valid) => {
        if (!valid) return false
        api.adminCreate.do(addFormState, loading).then(() => {
            ElMessage.success('创建成功')
            searchFormRef.value?.resetFields()
            submitSearch()
            closeAdd()
        }).catch(api.errorMsg)
    })
}
</script>

<template>
    <div v-loading="loading">
        <el-form inline :model="searchFormState" ref="searchFormRef">
            <!-- 输入框 -->
            <el-form-item label="用户名" prop="username">
                <el-input placeholder="可根据前缀模糊查询" :maxlength="33" v-model="searchFormState.username"></el-input>
            </el-form-item>
            <!-- 下拉框 -->
            <el-form-item label="角色" prop="role_id">
                <el-select v-model="searchFormState.role_id" filerable>
                    <el-option label="全部" :value="0"></el-option>
                    <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- 下拉框 -->
            <el-form-item label="状态" prop="status">
                <el-select v-model="searchFormState.status" style="width: 80px;">
                    <el-option label="全部" :value="0"></el-option>
                    <!-- 获取table.js 文件数据 -->
                    <el-option v-for="item in $table.instance.status.options()" :key="item.value" :label="item.text"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
                <el-button type="primary" @click="submitSearch">查询</el-button>
                <el-button @click="searchFormRef?.resetFields()">清空</el-button>
            </el-form-item>
        </el-form>
        <!-- el-table -->
        <el-table :data="tableData" border>
            <el-table-column prop="id" label="ID" :width="80"></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="role_id" label="角色">
                <template #default="{ row }">
                    {{ row.role_id ? roleOpt?.render(row.role_id) : '超级管理员' }}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" :width="80">
                <template #default="{ row }">
                    <el-tag :type="$table.map.status[row.status]">
                        {{ $table.instance.status.render(row.status) }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :width="244" label="操作">
                <!-- 第一个tamplate -->
                <template #header>
                    <el-space class="justify">
                        <span>操作</span>
                        <el-button link type="primary" size="small" @click="addVisible = true">+ 新增</el-button>
                    </el-space>
                </template>

                <!-- 第二个template -->
                <template #default="{ row, $index }">
                    <span v-if="row.role_id">
                        <template v-for="item in $table.instance.status.options()" :key="item.value">
                            <el-popconfirm v-if="row.status !== item.value && api.adminSetStatus.permit()"
                                :title="`确定要${$table.instance.status.render(item.value)}账号 「 ${row.username} 」吗? `"
                                cancel-button-type="default" width="auto" @confirm="setStatus(row.id, item.value, $index)">
                                <template #reference>
                                    <el-button :type="$table.map.status[item.value]" size="small">
                                        {{ $table.instance.status.render(item.value) }}
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                        <el-button type="primary" size="small" @click="openRole(row, $index)"
                            v-if="api.adminSetRole.permit()">变更角色</el-button>
                        <el-button type="warning" size="small" @click="openPwd(row)"
                            v-if="api.adminSetPwd.permit()">重置密码</el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <el-pagination small v-model:current-page="params.page" v-model:page-size="params.size"
            :page-sizes="[10, 20, 50, 100]" layout="total,prev,pager,next,sizes,jumper" :total="total"
            @current-change="queryData" @size-change="queryData">
        </el-pagination>



        <!-- el-drawer 变更角色 -->
        <el-drawer v-model="roleVisible" @close="roleFormRef?.resetFields()" title="变更角色">
            <el-form ref="roleFormRef" v-loading="loading" label-width="80px" :model="roleFormState">
                <el-form-item label="用户名">
                    <span>{{ user }}</span>
                </el-form-item>
                <el-form-item label="角色" prop="role_id"
                    :rules="[{ required: true, type: 'number', min: 1, message: '请选择角色!' }]">
                    <el-select v-model="roleFormState.role_id" filterable style="width: 100%;">
                        <el-option :value="0" label="请选择" disabled></el-option>
                        <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitRole">确定</el-button>
                    <el-button @click="closeRole()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>

        <!-- el-drawer 重置密码 -->
        <el-drawer v-model="pwdVisible" @close="pwdFormRef?.resetFields()" title="重置密码">
            <el-form ref="pwdFormRef" :model="pwdFormState" v-loading="loading" label-width="80px">
                <el-form-item label="用户名">
                    <span>{{ user }}</span>
                </el-form-item>
                <el-form-item label="新密码" prop="password" :rules="[{ require: true, min: 8, message: '请输入至少8字符的新密码' }]">
                    <el-input v-model="pwdFormState.password" :maxlength="33">
                        <template #append>
                            <el-button @click="pwdFormState.password = rand.strings()">生成</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitPwd">确定</el-button>
                    <el-button @click="closePwd">取消</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>

        <!-- el-drawer 新增用户 -->
        <el-drawer v-model="addVisible" title="新增用户" size="500" @close="addFormRef?.resetFields()">
            <el-form ref="addFormRef" :model="addFormState" v-loading="loading" label-width="80px">
                <el-form-item label="用户名" prop="username"
                    :rules="[{ required: true, min: 8, message: '请输入至少把字符的新密8字符的用户名' }]">
                    <el-input v-model="addFormState.username" :malength="33"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :rules="[{ required: true, min: 8, message: '请输入至少把字符的新密8字符的密码' }]">
                    <el-input v-model="addFormState.password" :maxlength="33">
                        <template #append>
                            <el-button @click="addFormState.password = rand.strings()">生成</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role_id" :rules="[{ required: true, type: 'number', min: 1, message: '请选择角色' }]">
                    <el-select v-model="addFormState.role_id" filterable style="width:100%">
                        <el-option :value="0" label="请选择" disabled></el-option>
                        <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitAdd" type="primary">确定</el-button>
                    <el-button @click="closeAdd">取消</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<style scoped lang='less'></style>