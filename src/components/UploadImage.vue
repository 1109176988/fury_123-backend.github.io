<script setup lang="ts">
import {ref} from 'vue'

import api from '@/api'

// 是否在加载中
const loading = ref(false)

</script>

<template>
  <div class="upload-img-box" v-loading="loading">
    <span></span>
  </div>
</template>

<style scoped lang='less'>

</style>