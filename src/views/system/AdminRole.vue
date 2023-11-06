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
// 调用接口获取数据
function queryData() {
  api.roleList.do(params, loading).then((res) => {
    console.log(res,'res')
    total.value = res.total
    console.log(total.value, 'total.value')
    tableData.value = res.list
  }).catch(api.errorPage)
}

{
  queryData()
}


// el-drawer的数据请求
{
  api.sysMenuList.do({}).then((res)=>{
    
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
            <el-button type="primary" link size="small" @click="">+ 新增</el-button>
          </el-space>
        </template>
        <template #default="{ row, $index }">
          <el-button type="primary" size="small" @click="">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination small v-model:current-page="params.page" v-model:page-size="params.size"
      :page-sizes="[10, 20, 30, 40, 50]" layout="total, prev, pager, next, sizes, jumper" :total="total"
      @current-change="queryData" @size-change="queryData"></el-pagination>


    <el-drawer v-model="">
      <el-form>
        <el-row>
          <!-- 第一列 col -->
          <el-col>
            <!-- 输入框 -->
            <el-form-item>
              <el-input></el-input>
            </el-form-item>
            <!-- tree组件 -->
            <el-form-item>
              <el-tree></el-tree>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item>
              <el-tree>
                <template>
                  <span></span>
                </template>
              </el-tree>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 按钮 -->
        <div class="center">
          <el-button type="primary">确定</el-button>
          <el-button>取消</el-button>
        </div>
      </el-form>
    </el-drawer>
  </div>
</template>

<style scoped lang='less'></style>