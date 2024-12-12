<script setup>
import { ref } from 'vue';
import DataTable from '@/components/common/DataTable.vue'
import { Search } from '@element-plus/icons-vue'



const form = ref({
    delivery: '',
})
const searchVal = ref('')
const checkActive = ref('all')
//质检标准
const rules = ref([
    {
        name: '全部',
        key: 'all',
        value: 100
    },
    {
        name: '格式一致性',
        key: 'format',
        value: 1
    },
    {
        name: '概念一致性',
        key: 'concept',
        value: 38
    },
    {
        name: '拓扑一致性',
        key: 'topology',
        value: 3
    },
])

//质检项表格
const ruleTable = [
    {
        id: 1,
        index: 1,
        ruleName: '规则1',
        ruleDesc: '规则1描述',
    },
    {
        id: 2,
        index: 2,
        ruleName: '规则2',
        ruleDesc: '规则2描述',
    },
    {
        id: 3,
        index: 3,
        ruleName: '规则3',
        ruleDesc: '规则3描述',
    },
]
// 质检项表格列
const ruleColumns = [
    {
        align: "center",
        property: "index",
        label: "序号",
        width: 120
    },
    {
        align: "center",
        property: "ruleName",
        label: "规则名称",
    },
    {
        align: "center",
        property: "ruleDesc",
        label: "规则说明",
    }
];

//质检结果
const resultData = [
    {
        id: 1,
        index: 1,
        ruleName: '布局点平面位置合理性检查',
        result: 100,
        time: '2022-01-01'
    },
    {
        id: 2,
        index: 2,
        ruleName: '布局点平面位置合理性检查',
        result: 100,
        time: '2022-01-01'
    },
    {
        id: 3,
        index: 3,
        ruleName: '布局点平面位置合理性检查',
        result: 100,
        time: '2022-01-01'
    },
]
// 质检结果表格列
const resultColumns = [
    {
        align: "center",
        property: "index",
        label: "序号",
        width: 120
    },
    {
        align: "center",
        property: "ruleName",
        label: "规则名称",
    },
    {
        align: "center",
        property: "result",
        label: "质检结果",
        slot: true
    },
    {
        align: "center",
        property: "time",
        label: "时间",
    }
];

const handleSelectionChange = (selection) => {
    console.log(selection)
}

const handleSizeChange = (size) => {
    console.log(size)
}

const handleCurrentChange = (currentPage) => {
    console.log(currentPage)
}
</script>

<template>
    <div class="w-1/3 flex justify-center my-4 items-center m-auto">
        <el-form class="w-full" :model="form" label-width="auto">
            <el-form-item label="质检方案：">
                <el-select v-model="form.delivery" placeholder="请选择质检方案">
                    <el-option label="方案1" value="1"></el-option>
                    <el-option label="方案2" value="2"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
    <div class="flex w-full text-primary-color  justify-between items-center mb-4">
        <div class="flex items-center">
            <div :class="`${checkActive === rule.key ? 'theme-tab-active' : 'border'} px-2  rounded-sm hover:cursor-pointer border-stone-300 mx-1 p-1`"
                @click="checkActive = rule.key" v-for="rule in rules" :key="rule.key">
                {{ rule.name }} <span class="mx-1">({{ rule.value }})</span>
            </div>
        </div>
        <div>
            搜索当前目录：
            <el-input v-model="searchVal" style="width: 240px" placeholder="请输入关键字" :prefix-icon="Search" />
        </div>
    </div>
    <!-- 质检结束 -->
    <DataTable v-if="checkStatus" :data="resultData" :columns="resultColumns" @selection-change="handleSelectionChange"
        :tableProps="{ selectable: true, border: true }">
        <template v-slot:tableColumn>
            <div class="flex justify-center items-center">
                <el-icon class="theme-text-color">
                    <CircleCheck />
                </el-icon>
            </div>
        </template>
    </DataTable>
    <!-- 质检之前 -->
    <DataTable v-else :data="ruleTable" :columns="ruleColumns" @selection-change="handleSelectionChange"
        :tableProps="{ selectable: true, border: true }">
    </DataTable>
    <div class="my-2 flex justify-end items-center">
        <el-pagination background layout="sizes, prev, pager, next" :total="100" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<style scoped lang="scss"></style>