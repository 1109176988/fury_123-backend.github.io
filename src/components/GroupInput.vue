<script setup lang="ts">
import { ref } from 'vue'

// 从element-plus 使用删除
import { Delete } from '@element-plus/icons-vue'

// props
const props = defineProps<{
  values?: string[],
  limit?: number,
  maxlength?: number,
}>()

// 设置 el-input的 数组
const state = ref<string[]>(props.values || [])

// 删除 el-input
function remove(index: number) {
  state.value.splice(index, 1)
  emit('ok', state.value)
}
// emit
const emit = defineEmits<{
  (e: 'ok', values: string[]): void
}>()

// 编辑输入框
function editInput(index: number) {
  let val = state.value[index].trim()
  if (val) {
    state.value[index] = val
    emit('ok', state.value)
  } else {
    remove(index)
  }
}

// 设置 字段
const inputValue = ref('')

// 回车触发事件
function handleInputConfirm() {
  let val = inputValue.value.trim()
  if (val) {
    state.value.push(val)
    emit('ok', state.value)
  }
  inputValue.value = ''
}
</script>

<template>
  <div class="full-width">
    <el-input v-for="(_, index) in state" :key="index" v-model="state[index]" @blur="editInput(index)">
      <template #append>
        <el-button :icon="Delete" @click="remove(index)"></el-button>
      </template>
    </el-input>
    <el-input v-if="!limit || state.length < limit" v-model="inputValue" @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm" :maxlength="maxlength"></el-input>
  </div>
</template>

<style scoped lang='less'></style>