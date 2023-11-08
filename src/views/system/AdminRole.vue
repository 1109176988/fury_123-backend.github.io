<script setup lang="ts">

import { ref, reactive } from 'vue'

import { ListArgs, RoleItem, RoleUpdateArgs, SysMenu, SystemAction } from 'models'

// 设置界面加载
const loading = ref(false);


// 设置table数据
const tableData = ref<RoleItem[]>([])

// 定义了一个对象用来存储 分页组件的值
const params = reactive<ListArgs>({
  page: 1,
  size: 10
})

// 设置total 分页组件数据总条数
const total = ref(0)







import api from '@/api'
import { nextTick } from 'vue';



// 调用接口获取table的数据
function queryData() {
  api.roleList.do(params, loading).then((res) => {
    console.log(res, 'res')
    total.value = res.total
    console.log(total.value, 'total.value')
    tableData.value = res.list
  }).catch(api.errorPage)
}


// 调用一次接口请求数据
{
  queryData()
  console.log('执行了queryData()')
}


// el-drawer的数据 menus 菜单权限
const menus = ref<SysMenu[]>([])

// el-drawer的数据 actions 功能权限
const actions = ref<SystemAction[]>([])

// el-drawer的数据请求
{
  api.sysMenuList.do({}).then((res) => {
    console.log(res, 'res-el-drawer')
    menus.value = res.menus
    console.log(menus, '菜单权限数据')
    actions.value = res.actions
    console.log(actions, '功能权限数据')
  }).catch(api.errorPage)
}
// 设置el-drawer的显示和隐藏
const visible = ref(false)



let index = -1




// 设置el-drawer 的el-form 的数据
const formState = reactive<RoleUpdateArgs>({
  id: 0,
  name: '',
  actions: [],
  menus: []
})

// 从elementui-plus引进 treeInstance FormInstance
import { TreeInstance, FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus';


const menuTreeRef = ref<TreeInstance>()
const actionTreeRef = ref<TreeInstance>()
// 点击 新建 或者编辑 按钮
function openForm(item: RoleItem, idx = -1) {
  index = idx
  console.log(item, 'item')
  console.log(idx, 'idx')
  console.log(item.id, 'item.id')
  formState.id = item.id
  console.log(formState.id, 'formState.id')
  formState.name = item.name
  visible.value = true
  nextTick(() => {
    menuTreeRef.value?.setCheckedKeys(item.menus)
    actionTreeRef.value?.setCheckedKeys(item.actions)
  })
}

// 设置 formRef 用来获取 el-form 的ref节点
const formRef = ref<FormInstance>()



// 关闭el-drawer 的事件
function closeForm() {
  console.log('关闭了el-drawer')
  visible.value = false
}
function submitForm() {
  formRef.value?.validate((valid) => {
    if (!valid) return false
    formState.menus = menuTreeRef.value?.getCheckedKeys(true) as string[]
    formState.actions = actionTreeRef.value?.getCheckedKeys(true) as string[]
    if (formState.id) {
      api.roleUpdate.do(formState, loading).then(() => {
        tableData.value[index].name = formState.name
        tableData.value[index].menus = formState.menus
        tableData.value[index].actions = formState.actions
        closeForm()
        ElMessage.success('操作成功')
      }).catch(api.errorMsg)
    } else {
      api.roleCreate.do(formState, loading).then(() => {
        ElMessage.success('操作成功')
        closeForm()
        params.page = 1
        queryData()
      }).catch(api.errorMsg)
    }
  })
}
</script>

<template>
  <div v-loading="loading">
    <el-table :data="tableData" border>
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column>
        <!-- 第一个template -->
        <template #header>
          <el-space class="justify">
            <span>操作</span>
            <el-button type="primary" link size="small" @click="openForm({ id: 0, name: '', actions: [], menus: [] })">+
              新增</el-button>
          </el-space>
        </template>
        <template #default="{ row, $index }">
          <el-button type="primary" size="small" @click="openForm(row, $index)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination small v-model:current-page="params.page" v-model:page-size="params.size"
      :page-sizes="[10, 20, 30, 40, 50]" layout="total, prev, pager, next, sizes, jumper" :total="total"
      @current-change="queryData" @size-change="queryData"></el-pagination>


    <el-drawer v-model="visible" size="800" :title="(formState.id ? '编辑' : '新增') + '角色'">
      <el-form ref="formRef" :model="formState" v-loading="loading" label-width="80px">
        <el-row>
          <!-- 第一列 col -->
          <el-col :span="10">
            <!-- 输入框 -->
            <el-form-item label="角色名称" prop="name"
              :rules="[{ required: true, min: 2, message: '请输入最少2个字符', trigger: 'blur' }]">
              <el-input :maxlength="33" v-model="formState.name"></el-input>
            </el-form-item>
            <!-- tree组件 -->
            <el-form-item label="菜单权限">
              <el-tree ref="menuTreeRef" :data="menus" node-key="name" :props="{ label: 'title', children: 'sub' }"
                default-expand-all show-checkbox></el-tree>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <!-- tree组件 -->
            <el-form-item label="功能权限" style="overflow: hidden">
              <el-tree ref="actionTreeRef" :data="actions" node-key="key_name" show-checkbox :props="{ children: 'sub' }">
                <template #default="{ data }">
                  <span :title="data.key_name">{{ data.title }} {{ data.key_name }}</span>
                </template>
              </el-tree>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 按钮 -->
        <div class="center">
          <el-button type="primary" @click="submitForm">确定</el-button>
          <el-button @click="closeForm">取消</el-button>
        </div>
      </el-form>
    </el-drawer>
  </div>
</template>

<style scoped lang='less'></style>