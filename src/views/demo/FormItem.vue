<script setup lang="ts">
import { ref, reactive } from 'vue'

// 定义form表单 数据
const formState = reactive({
    switch: false,
    date: '2023-06-01',
    date_begin: '2023-01-01',
    date_end: '2023-12-31',
    datetime: '2023-06-01 12:34:56',
    datetime_begin: '2023-01-01 00:00:00',
    datetime_end: '2023-12-31 23:59:59',
    inputs: ['input1', 'input2'],
    image: 'https://element-plus.org/apple-touch-icon.png',
    pictures: ['https://vuejs.org/images/logo.png'],
    audio: '',
    video: ''
})

// 设置 日期短 字段
const dateValues = reactive({
    date_range: [formState.date_begin, formState.date_end],
    datetime_range: [formState.datetime_begin, formState.datetime_end],
})

// 引进GroupInput组件
import GroupInput from '@/components/GroupInput.vue'
</script>

<template>
    <div>
        <el-form label-width="120px" style="width: 800px;">
            <el-form-item label="开关">
                <el-switch v-model="formState.switch"></el-switch>
            </el-form-item>
            <el-form-item label="日期">
                <el-date-picker type="date" v-model="formState.date" value-format="YYYY-MM-DD"
                    @change="(v: any) => (formState.date = v || '')"></el-date-picker>
            </el-form-item>
            <el-form-item label="日期段">
                <el-date-picker type="daterange" range-separator="~" v-model="dateValues.date_range"
                    value-format="YYYY-MM-DD"
                    @change="(v: any) => ([formState.date_begin, formState.date_end] = v || ['', ''])"></el-date-picker>
            </el-form-item>
            <el-form-item label="日期时间">
                <el-date-picker type="datetime" v-model="formState.datetime" value-formate="YYYY-MM-DD HH:mm:ss"
                    @change="(v: any) => (formState.datetime = v || '')"></el-date-picker>
            </el-form-item>
            <el-form-item label="日期时间段">
                <el-date-picker type="datetimerange" range-separator="~" v-model="dateValues.datetime_range"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    @change="(v: any) => ([formState.datetime_begin, formState.datetime_end] = v || ['', ''])"></el-date-picker>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped lang='less'></style>