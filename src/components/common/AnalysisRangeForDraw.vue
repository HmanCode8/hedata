<script setup>
import { ref } from 'vue';


const mappVisible = ref(false);
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
const mappables = [
    {
        label: '图幅1',
        value: 'fig',
    },
    {
        label: '图幅2',
        value: 'fig2',
    },
    {
        label: '图幅3',
        value: 'fig3',
    },

]
const checkList = ref([]);

const columns = [
    {
        label: '序号',
        property: 'index',
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

const handleSelectionChange = (selection) => {
    console.log(selection);
};

const handleDelete = (row) => {
    console.log(row);
};


</script>

<template>
    <div class="">
        <div class="flex items-center border-b pb-4 w-full">
            <el-icon>
                <QuestionFilled class="theme-text-color" />
            </el-icon>说明：单击地图开始绘制，双击结束绘制
        </div>
        <div class="my-4">数据范围列表</div>
        <div class="my-4">共计10个范围，总面积：0.00平方米</div>
        <DataTable :data="tableData" :columns="columns" @selection-change="handleSelectionChange"
            :tableProps="{ selectable: true }">
            <template #tableColumn="{ row }">
                <el-link type="danger" @click="handleDelete(row)">删除</el-link>
            </template>
        </DataTable>
        <!-- <div class="w-full flex justify-end">
            <el-pagination size="small" background layout="prev, pager, next" :total="50" class="mt-4" />
        </div> -->
        <div>
            <el-checkbox value="按图幅" v-model="mappVisible">
                按图幅
            </el-checkbox>
            <el-checkbox-group v-show="mappVisible" v-model="checkList">
                <el-checkbox v-for="item in mappables" :key="item.value" :value="item.label">
                    {{ item.label }}
                </el-checkbox>
            </el-checkbox-group>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>