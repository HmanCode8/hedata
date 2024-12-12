<script setup>
import { ref } from 'vue';
import AttachmentView from './AttachmentView.vue';
import { useGlobalStore } from '@/stores/global';

const globalStore = useGlobalStore()

const pipeList = ref([
    {
        name: '配水管线',
        value: 'ps',
        children: [
            {
                value: '2551',
                name: '配水管线1'
            },
            {
                value: '2552',
                name: '配水管线2'
            }
        ]
    },
    {
        name: '配电箱',
        value: 'pd',
        children: [
            {
                value: '2553',
                name: '配电箱1'
            },
            {
                value: '2554',
                name: '配电箱2'
            }
        ]
    }
]);

const data = ref([
    { file: '版本号', value: '1.0.0' },
    { file: '项目编号', value: '' },
    { file: '工程编号', value: '' },
    { file: '起点编号', value: '' },
    { file: '起点X坐标', value: '' },
    { file: '起点Y坐标', value: '' },
    { file: '起点高程', value: '' },
    { file: '起点埋深', value: '' },
    { file: '终点编号', value: '' },
    { file: '终点X坐标', value: '' },
    { file: '终点Y坐标', value: '' },
    { file: '终点高程', value: '' },
    { file: '终点埋深', value: '' },
    { file: '权属单位', value: '' },
    { file: '建设日期', value: '' },
    { file: '数据来源', value: '' },
]);
</script>

<template>
    <div class="flex justify-end m-1 items-center">
        <el-button type="primary" @click="globalStore.setAttachmentView(!globalStore.isShowAttachmentView)">{{
            globalStore.isShowAttachmentView ?
                '返回' : '附件管理' }}</el-button>
    </div>
    <template v-if="!globalStore.isShowAttachmentView">
        <div class="flex items-center h-[90%]  border ">
            <div class=" w-1/3 border-r h-full overflow-auto">
                <div class="w-full" v-for="item in pipeList" :key="item.value">
                    <div class="w-full border p-2 hover:cursor-pointer theme-expand "><span class="text-[#000]">
                            {{ item.name }}
                        </span></div>
                    <div v-for="child in item.children" :key="child.value">
                        <div class="w-full border-l pl-6 py-1">{{ child.value }}</div>
                    </div>
                </div>
            </div>
            <div class="flex-grow flex flex-col h-[90%] overflow-auto">
                <div class="flex" v-for="item in data" :key="item.file">
                    <div class="flex-1 border-b border-r p-1 flex items-center">
                        {{ item.file }}
                    </div>
                    <div class="flex-1 border-b p-1 flex items-cente">
                        <el-input v-model="item.value" placeholder="请输入"></el-input>
                    </div>
                </div>

            </div>
        </div>
        <div class="flex justify-end items-center mt-2 h-10">
            <el-button type="primary">保存</el-button>
        </div>
    </template>
    <attachment-view v-else></attachment-view>
</template>

<style scoped lang="scss"></style>