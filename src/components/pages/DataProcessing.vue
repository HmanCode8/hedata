<script setup>
import { ref } from 'vue';
import _ from 'lodash'
import SortAndFilterTable from '@/components/common/SortAndFilterTable.vue'

const activeName = ref('1')
const activeProject = ref('1')

const projects = ref([
    {
        name: '2023市政项目',
        code: '1',
    },
    {
        name: '2022市政项目',
        code: '2',
    },
    {
        name: '2021市政项目',
        code: '3',
    },
    {
        name: '2020市政项目',
        code: '4',
    },
    {
        name: '2019市政项目',
        code: '5',
    },
])


const columns = [
    {
        prop: 'index',
        label: '序号',
        width: 180,
    },
    {
        prop: 'projectCode',
        label: '工程编号',
    },
    {
        prop: 'projectName',
        label: '工程名称',
    },
    {
        prop: 'exportTime',
        label: '迁出时间',
    },
    {
        prop: 'exportData',
        label: '迁出数据',
    },
    {
        prop: 'importTime',
        label: '迁入时间',
    },
    {
        prop: 'importStatus',
        label: '迁入情况',
    },
]

const tableData1 = [
    {
        index: 1,
        projectCode: '123456',
        projectName: '工程1',
        exportTime: '2022-01-01',
        exportData: '100000',
        importTime: '2022-01-01',
        importStatus: '已完成',
    },
    {
        index: 2,
        projectCode: '123456',
        projectName: '工程1',
        exportTime: '2022-01-01',
        exportData: '100000',
        importTime: '2022-01-01',
        importStatus: '已完成',
    },
    {
        index: 3,
        projectCode: '123456',
        projectName: '工程1',
        exportTime: '2022-01-01',
        exportData: '100000',
        importTime: '2022-01-01',
        importStatus: '已完成',
    },
    {
        index: 4,
        projectCode: '123456',
        projectName: '工程1',
        exportTime: '2022-01-01',
        exportData: '100000',
        importTime: '2022-01-01',
        importStatus: '已完成',
    },
    {
        index: 5,
        projectCode: '123456',
        projectName: '工程1',
        exportTime: '2022-01-01',
        exportData: '100000',
        importTime: '2022-01-01',
        importStatus: '已完成',
    },
    {
        index: 6,
        projectCode: '123456',
        projectName: '工程1',
        exportTime: '2022-01-01',
        exportData: '100000',
        importTime: '2022-01-01',
        importStatus: '已完成',
    },
]
const tableData2 = [
    {
        index: 1,
        projectCode: '123456',
        projectName: '工程1',
        exportTime: '2022-01-01',
        exportData: '100000',
        importTime: '2022-01-01',
        importStatus: '已完成',
    },
    {
        index: 2,
        projectCode: '123456',
        projectName: '工程1',
        exportTime: '2022-01-01',
        exportData: '100000',
        importTime: '2022-01-01',
        importStatus: '已完成',
    },
]
const tableData3 = [
    {
        index: 1,
        projectCode: '123456',
        projectName: '工程1',
        exportTime: '2022-01-01',
        exportData: '100000',
        importTime: '2022-01-01',
        importStatus: '已完成',
    },
    {
        index: 2,
        projectCode: '123456',
        projectName: '工程1',
        exportTime: '2022-01-01',
        exportData: '100000',
        importTime: '2022-01-01',
        importStatus: '已完成',
    },
    {
        index: 3,
        projectCode: '123456',
        projectName: '工程1',
        exportTime: '2022-01-01',
        exportData: '100000',
        importTime: '2022-01-01',
        importStatus: '已完成',
    },
]
const tableData4 = [
    {
        index: 1,
        projectCode: '123456',
        projectName: '工程1',
        exportTime: '2022-01-01',
        exportData: '100000',
        importTime: '2022-01-01',
        importStatus: '已完成',
    },
    {
        index: 2,
        projectCode: '123456',
        projectName: '工程1',
        exportTime: '2022-01-01',
        exportData: '100000',
        importTime: '2022-01-01',
        importStatus: '已完成',
    },
    {
        index: 3,
        projectCode: '123456',
        projectName: '工程1',
        exportTime: '2022-01-01',
        exportData: '100000',
        importTime: '2022-01-01',
        importStatus: '已完成',
    },
]
// 管线列表
const pipelines = [
    {
        name: '供电管线',
        code: '1',
        data: tableData1,
    },
    {
        name: '供电管点',
        code: '2',
        data: tableData2,
    },
    {
        name: '给水管线',
        code: '3',
        data: tableData3,
    },
    {
        name: '给水管点',
        code: '4',
        data: tableData4,
    },
    {
        name: '排水管线',
        code: '5',
        data: tableData1,
    },
    {
        name: '排水管点',
        code: '6',
        data: tableData2,
    },
]
const onChooseProject = (code) => {
    console.log('选择项目')
    activeProject.value = code
}
const handleClick = (tab, event) => {
    console.log(tab, event)
}
const handleDelete = ({ code }) => {
    projects.value = _.filter(projects.value, p => p.code !== code)
}
const handleLocate = (row) => {
    console.log(row)
}
</script>
<template>
    <div class="">
        <div class="flex items-center p-2 border">
            <span>项目列表</span>
            <div class="flex ">
                <div :class="`flex items-center p-2 border mx-1 hover:cursor-pointer ${activeProject === p.code ? 'theme-text-color' : ''}`"
                    @click="onChooseProject(p.code)" v-for="p in projects" :key="p.code">
                    <div class="mx-1">{{ p.name }}</div>
                    <el-icon>
                        <CircleClose @click="handleDelete(p)" />
                    </el-icon>
                </div>
            </div>
        </div>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane v-for="p in pipelines" :key="p.code" :label="p.name" :name="p.code">
                <SortAndFilterTable :data="p.data" :columns="columns">
                    <template #action="{ row }">
                        <el-link type="primary" class="mr-2" @click="handleLocate(row)"> 定位</el-link>
                        <el-link type="primary" @click="handleLocate(row)"> 选择</el-link>
                    </template>
                </SortAndFilterTable>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<style scoped lang="scss"></style>