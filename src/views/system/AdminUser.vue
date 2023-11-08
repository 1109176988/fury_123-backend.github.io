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
import { OptionItem, AdminListArgs, AdminItem } from 'models'

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

}





</script>

<template>
    <div v-loading="loading">
        <el-form inline :model="searchFormState" ref="searchFormRef">
            <!-- 输入框 -->
            <el-form-item label="用户名" prop="usernaame">
                <el-input placeholder="可根据前缀模糊查询" :maxlength="33"></el-input>
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
                <el-button>清空</el-button>
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
                        <el-button link type="primary" size="small">+ 新增</el-button>
                    </el-space>
                </template>

                <!-- 第二个template -->
                <template #default="{ row, $index }">
                    <span v-if="row.role_id">
                        <template v-for="item in $table.instance.status.options()" :key="item.value">
                            <el-popconfirm v-if="row.status !== item.value && api.adminSetStatus.permit()"
                                :title="`确定要${$table.instance.status.render(item.value)}账号 「 ${row.username} 」吗? `"
                                cancel-button-type="default" width="auto" @confirm="">
                                <template #reference>
                                    <el-button :type="$table.map.status[item.value]" size="small">
                                        {{ $table.instance.status.render(item.value) }}
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                        <el-button type="primary" size="small" @click="">变更角色</el-button>
                        <el-button type="warning" size="small" @click="">重置密码</el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <el-pagination small v-model:current-page="params.page" v-model:page-size="params.size" :page-sizes="[10, 20, 50, 100]"
            layout="total,prev,pager,next,sizes,jumper" :total="total" @current-change="" @size-change=""></el-pagination>



        <!-- el-drawer -->
        <el-drawer>
            
        </el-drawer>

    </div>
</template>

<style scoped lang='less'></style>