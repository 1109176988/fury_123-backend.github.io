<script setup lang="ts">
// import {ref} from 'vue'
import api from '@/api'
import { User, Unlock, Key } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { LoginArgs } from 'models'
import { FormInstance } from 'element-plus';
import { useRouter } from 'vue-router';
import { useCoreStore } from '@/stores/core';
const formRef = ref<FormInstance>()
// 定义表单字段
const formState = reactive<LoginArgs>({
  username: '',
  password: '',
  captcha: '',
  session_key: '',
})
const router = useRouter()
// 设置是否显示loading
const loading = ref(false)
// 验证码图片
const base64_image = ref('iVBORw0KGgoAAAANSUhEUgAAAAwAAAAFCAIAAAD+GJp4AAAAGUlEQVR4nGJ5//49AyHARFAF/RUBAgAA//8HKgLavlPODwAAAABJRU5ErkJggg==')
// 设置验证码是否可以点击
const disabled = ref(true)
// 设置store为引入的useCoreStore()方法
const store = useCoreStore()
// 点击验证码图片获取验证码
const getCaptcha = () => {
  console.log('点击了验证码')
  api.captcha.do({}, disabled).then((res) => {
    formState.session_key = res.session_key
    base64_image.value = res.base64_image
  })
}
// 界面加载后调用一次验证码接口
{
  getCaptcha()
}
// 点击登录按钮
const submitForm = () => {
  formRef.value?.validate((valid) => {
    if (!valid) return false
    api.login.do(formState, loading).then((res) => {
      store.setAuth({
        token: res.token,
        user: res.username,
        super: res.is_super,
        actions: res.actions,
        menus: res.menus
      })
      router.push('/')
    })
    .catch(api.errorMsg)
  })
}
</script>

<template>
  <div id="login">
    <el-form class="login-form" ref="formRef" :model="formState" @keyup.enter="submitForm" size="large">
      <div class="center">
        <img src="@/assets/logo.svg" alt="" width="50" height="50" />
      </div>
      <br>

      <el-form-item prop="username" :rules="[{required:true,message:'请输入你的用户名'}]">
        <el-input placeholder="用户名" :prefix-icon="User" size="large" :maxlength="32" v-model="formState.username"></el-input>
      </el-form-item>

      <el-form-item prop="password" :rules="[{required:true,message:'请输入你的用户密码'}]">
        <el-input placeholder="密码" :prefix-icon="Unlock" size="large" type="password" :maxlength="32"
          autocomplete="new-password" show-password v-model="formState.password"></el-input>
      </el-form-item>

      <el-form-item prop="captcha" :rules="[{required:true,message:'请你输入验证码'}]">
        <el-input placeholder="验证码" :prefix-icon="Key" size="large" v-model="formState.captcha" :disabled="!formState.session_key" :maxlength="4">
          <template #append>
            <el-button style="padding: 0;height: var(--el-button-size);" @click="getCaptcha" :disabled="disabled">
              <img :src="'data:image/jpg;base64,' + base64_image" alt="点击获取" title="点击获取" style="height: 38px;">
            </el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="loading" class="full-width" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
#login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f0f2f5 url('@/assets/bg.svg') no-repeat fixed center;
  background-size: 90%;
}

.login-form {
  width: 330px;
}
</style>