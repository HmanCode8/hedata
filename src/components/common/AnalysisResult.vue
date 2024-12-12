<script setup>
import { ref } from 'vue';
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()
// 原水管点

// 原水管线

// 配水管点

// 配水管线

// 煤气管点

// 煤气管线

// 天然气管点

// 天然气管线
const pipeList = ref([
    {
        name: '原水管点',
        value: 'sourcePipePoint',
        points: [],
        lines: []
    },
    {
        name: '原水管线',
        value: 'sourcePipeLine',
        points: [],
        lines: []
    },
    {
        name: '配水管点',
        value: 'pipePoint',
        points: [],
        lines: []
    },
    {
        name: '配水管线',
        value: 'pipeLine',
        points: [],
        lines: []
    },
    {
        name: '煤气管点',
        value: 'gasPipePoint',
        points: [],
        lines: []
    },
    {
        name: '煤气管线',
        value: 'gasPipeLine',
        points: [],
        lines: []
    },
    {
        name: '天然气管点',
        value: 'natGasPipePoint',
        points: [],
        lines: []
    },
    {
        name: '天然气管线',
        value: 'natGasPipeLine',
        points: [],
        lines: []
    }

])

const tableData = ref([
    {
        index: 1,
        name: '1',
        perimeter: '1',
        area: '1',
    },
    {
        index: 2,
        name: '2',
        perimeter: '2',
        area: '2',
    },
    {
        index: 3,
        name: '3',
        perimeter: '3',
        area: '3',
    },
]);

const columns = [
    {
        label: '序号',
        property: 'index',
        align: 'center',
    },
    {
        label: '要素',
        property: 'name',
        align: 'center',
    },
    {
        label: '周长(m)',
        property: 'perimeter',
        align: 'center',
    },
    {
        label: '面积(㎡)',
        property: 'area',
        align: 'center',
    },
    {
        label: '操作',
        slot: true
    }
]
const handleClose = () => {
    globalStore.setResultPanel(false)
}
</script>

<template>
    <div class="absolute bottom-0 left-0 w-full  bg-white shadow-md h-[50%] z-10">
        <div class="w-full h-full p-2 relative">
            <el-tabs type="card">
                <el-tab-pane label="汇总">
                    <div class="p-2">啊大大</div>
                </el-tab-pane>
                <el-tab-pane v-for="item in pipeList" :key="item.value" :label="item.name">
                    <DataTable class="p-2" :data="tableData" :columns="columns"
                        @selection-change="handleSelectionChange" :tableProps="{ border: true }">
                    </DataTable>
                </el-tab-pane>
            </el-tabs>
            <div class="absolute top-0 mb-1 right-0 border-b  p-2">
                <el-button type="default" @click="handleClose">全屏</el-button>
                <el-button type="default" @click="handleClose">导出</el-button>
                <el-button type="default" @click="handleClose">返回</el-button>
            </div>
            <div class="w-full flex justify-center">
                <el-pagination size="small" background layout="prev, pager, next" :total="50" class="mt-4" />
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
::v-deep(.el-tabs__header) {
    width: 85%;
    border-bottom: 1px solid #e4e4e4;
}
</style>