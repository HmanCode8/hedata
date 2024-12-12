<script setup>
import { ref } from 'vue';
import { getPolygonArea, getPolygonLength } from '@/utils'
import _ from 'lodash'
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
const fileInput = ref(null);
const checkList = ref([]);
const mappVisible = ref(false);


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
const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
        const data = event.target.result;
        const lines = data.split('\n');
        for (let i = 1; i < lines.length; i++) {
            const line = _.filter(lines[i].split(','), (item) => item.trim() !== '');
            const rule = {
                index: i,
                name: line[0],
                perimeter: getPolygonLength(line),
                area: getPolygonArea(line)
            };
            tableData.value.push(rule);
        }
    };

};

const handleSelectionChange = (selection) => {
    console.log(selection);
};
</script>

<template>
    <div class="">
        <div class="flex items-center justify-between border-b pb-4 w-full">
            <div>
                范围文件：
                <input type="file" hidden ref="fileInput" @change="handleFileChange" />
                <el-button type="primary" @click="$refs.fileInput.click()">导入</el-button>
                <el-button @click="tableData = []; $refs.fileInput.value = ''">清除</el-button>
            </div>
            <div>
                <el-tooltip class="border" effect="dark" content="说明：支持 shp、cad 数据格式。" placement="right">
                    <el-icon>
                        <QuestionFilled class="theme-text-color" />
                    </el-icon>
                </el-tooltip>
            </div>
        </div>
        <div class="my-4">数据范围列表</div>
        <div class="my-4">共计10个范围，总面积：0.00平方米</div>
        <DataTable :data="tableData" :columns="columns" @selection-change="handleSelectionChange"
            :tableProps="{ selectable: true }">
            <template #tableColumn="{ row }">
                <el-link type="danger" @click="handleDelete(row)">删除</el-link>
            </template>
        </DataTable>
        <div class="w-full flex justify-end">
            <el-pagination size="small" background layout="prev, pager, next" :total="50" class="mt-4" />
        </div>
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