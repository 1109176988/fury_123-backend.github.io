<script setup lang="ts">

import { ref, reactive } from 'vue'

import { MenuBranch, MenuItem } from '../../types/route';

import api from '@/api'

// 引入elementplus图标
import { Avatar, Expand, Fold, HomeFilled, Lock, SwitchButton } from '@element-plus/icons-vue'
// 引入router 引入这句话 才能使用$router.push()跳转路由
import { useRouter, onBeforeRouteUpdate, RouteLocationNormalizedLoaded } from 'vue-router'

import { useCoreStore } from '@/stores/core'

import RouteMenu from './RouteMenu.vue'

import { menus } from '@/router/menu'

// 设置default-active的值
const active = ref('')

// 是否是折叠的侧边栏
const collapse = ref(false)

// 右侧元素 折叠后的宽度
const minSide = ref('64px')

// 右侧元素 不折叠的宽度
const maxSide = ref('280px')

// 使用引入的router
const router = useRouter()

// 使用引入的useCoreStore
const store = useCoreStore()
// 递归函数
function dfs(mb: MenuBranch[]): MenuItem[] {
  // 它定义了一个名为 arr 的变量，其类型为 MenuItem[]，并将其初始化为空数组
  let arr: MenuItem[] = []
  for (let item of mb) {
    let mi: MenuItem = {
      name: item.name,
      title: item.title,
      icon: item.icon,
    }
    if (item.sub) {
      let sub = dfs(item.sub)
      if (sub.length > 0) {
        mi.sub = sub
        arr.push(mi)
      }
    } else {
      if (store.menuAllow(item.authKey)) {
        arr.push(mi)
      }
    }
  }
  return arr
}
// 设置传给侧边栏的数据参数
const menuItems = dfs(menus)
// 在路由切换时更新活动菜单项，以便在 UI 中正确地高亮当前活动的菜单项
function setActiveMenu(to: RouteLocationNormalizedLoaded) {
  if (to.name) {
    active.value = to.name.toString()
  }
}
{
  setActiveMenu(router.currentRoute.value)
  onBeforeRouteUpdate((to) => {
    setActiveMenu(to)
  })
}
// 退出方法
function logout() {
  api.logout.do({}).catch(api.void0)
  store.removeAuth()
  router.push('/login')
}
console.log({ ...store }, 'store')
</script>

<template>
  <!-- 最大容器 -->
  <el-container>
    <!-- 左侧列表 -->
    <el-aside class="aside" :width="collapse ? minSide : maxSide">
      <!-- 管理系统logo和名称 -->
      <div class="logo" @click="$router.push('/')">
        <img src="@/assets/logo.svg" alt="">
        <span>fury_123管理系统</span>
      </div>
      <!-- 滚动条 -->
      <el-scrollbar>
        <!-- 菜单 -->
        <el-menu class="menu" active-text-color="#ffd04b" background-color="#545c64" text-color="#fff" router
          :collapse="collapse" :collapse-transition="true" :default-active="active">
          <RouteMenu :items="menuItems" />
        </el-menu>
      </el-scrollbar>
      <!-- 侧边栏折叠的按钮 -->
      <div class="collapse" @click="collapse = !collapse">
        <el-icon v-if="collapse">
          <Expand />
        </el-icon>
        <el-icon v-else>
          <Fold />
        </el-icon>
      </div>
    </el-aside>
    <!-- 右侧内容 -->
    <el-container class="box" :style="{ 'margin-left': collapse ? minSide : maxSide }">
      <el-header class="header">
        <el-dropdown>
          <span>
            <el-icon>
              <Avatar />
            </el-icon>
            {{ store.auth.user }}
          </span>
          <!-- 鼠标悬浮显示的用户登录和退出下拉菜单 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Lock" @click="$router.push({ name: 'password' })">
                修改密码
              </el-dropdown-item>
              <el-dropdown-item :icon="SwitchButton" @click="logout">
                退出登陆
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
          <!-- <template>
            <el-dropdown-menu>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </template> -->
        </el-dropdown>
        <!-- 面包屑 -->
        <el-breadcrumb v-if="store.routeAllow($route)">
          <el-breadcrumb-item>
            <el-icon>
              <HomeFilled />
            </el-icon>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-for="(title, index) in $route.meta.title" :key="index">
            {{ title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>

      <!-- main部分 -->
      <el-main>
        <el-result v-if="store.error.code" :icon="store.error.icon" :title="store.error.title"
          :sub-title="store.error.subTitle">
          <template #extra>
            <el-button type="primary" @click="$router.push('/')">Back</el-button>
            <el-button v-show="store.error.code === '500' || store.error.code === 'error'"
              @click="$router.replace($route)">Retry</el-button>
          </template>
        </el-result>
        <RouterView v-else />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang='less'>
.aside {
  background-color: #545c64;
  color: #fff;
  position: fixed;
}

.logo {
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  overflow: hidden;
  cursor: pointer;
}

.logo img {
  width: 32px;
  margin: auto 16px;
  vertical-align: middle;
}

.el-menu {
  border-right: none;
}

.menu {
  height: calc(100vh - 110px);
}

.collapse {
  line-height: 50px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  transition: color 0.3s;
}

.collapse:hover {
  color: #ffd04b;
}

.box {
  min-height: 100vh;
  background-color: #f0f2f5;
}

.header {
  line-height: 60px;
  background-color: #fff;
}

.header .el-breadcrumb {
  line-height: 60px;
}

.header .el-dropdown {
  line-height: 60px;
  font-size: 18px;
  float: right;
  cursor: pointer;
}

.header *:focus {
  outline: 0;
}

.main {
  background-color: #fff;
  margin: 18px;
}
</style>