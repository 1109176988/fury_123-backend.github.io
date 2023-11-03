<script setup lang="ts">

import { ref} from 'vue'
import { ListArgs, RoleItem, RoleUpdateArgs, SysMenu, SystemAction } from 'models'

// 设置界面加载
const loading = ref(false);


// 设置table数据
const tableData = ref<RoleItem[]>([])


</script>

<template>
  <div v-loading="loading">
    <el-table :data="tableData" border></el-table>
  </div>
</template>

<style scoped lang='less'></style>