<script setup>
import { ref } from 'vue';
import SortAndFilterTable from '@/components/common/SortAndFilterTable.vue'
import DataCompare from '../pages/DataCompare.vue';
import MapView from '@/components/common/MapView.vue';
import BottomPanel from '@/components/common/BottomPanel.vue';
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()
const approlVisible = ref(false)
const form = ref({
    status: 'no'
})
const textarea = ref('')

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
    {
        prop: 'approvalStatus',
        label: '审批状态',
        noSortAndFilter: true
    },
]

const tableData1 = ref([
    {
        index: 1,
        projectCode: '123456',
        projectName: '工程1',
        exportTime: '2022-01-01',
        exportData: '数据1',
        importTime: '2022-01-02',
        importStatus: '已完成',
        approvalStatus: '已审批'
    },
    {
        index: 2,
        projectCode: '654321',
        projectName: '工程2',
        exportTime: '2022-01-03',
        exportData: '数据2',
        importTime: '2022-01-04',
        importStatus: '已完成',
        approvalStatus: '待审批'
    },
    {
        index: 3,
        projectCode: '987654',
        projectName: '工程3',
        exportTime: '2022-01-05',
        exportData: '数据3',
        importTime: '2022-01-06',
        importStatus: '已完成',
        approvalStatus: '已审批'
    },
    {
        index: 4,
        projectCode: '321654',
        projectName: '工程4',
        exportTime: '2022-01-07',
        exportData: '数据4',
        importTime: '2022-01-08',
        importStatus: '已完成',
        approvalStatus: '待审批'
    },
    {
        index: 5,
        projectCode: '789456',
        projectName: '工程5',
        exportTime: '2022-01-09',
        exportData: '数据5',
        importTime: '2022-01-10',
        importStatus: '已完成',
        approvalStatus: '已审批'
    },
    {
        index: 6,
        projectCode: '543216',
        projectName: '工程6',
        exportTime: '2022-01-11',
        exportData: '数据6',
        importTime: '2022-01-12',
        importStatus: '已完成',
        approvalStatus: '待审批'
    },
    {
        index: 7,
        projectCode: '165432',
        projectName: '工程7',
        exportTime: '2022-01-13',
        exportData: '数据7',
        importTime: '2022-01-14',
        importStatus: '已完成',
        approvalStatus: '已审批'
    },
    {
        index: 8,
        projectCode: '456789',
        projectName: '工程8',
        exportTime: '2022-01-15',
        exportData: '数据8',
        importTime: '2022-01-16',
        importStatus: '已完成',
        approvalStatus: '待审批'
    },
    {
        index: 9,
        projectCode: '216543',
        projectName: '工程9',
        exportTime: '2022-01-17',
        exportData: '数据9',
        importTime: '2022-01-18',
        importStatus: '已完成',
        approvalStatus: '已审批'
    },
    {
        index: 10,
        projectCode: '894567',
        projectName: '工程10',
        exportTime: '2022-01-19',
        exportData: '数据10',
        importTime: '2022-01-20',
        importStatus: '已完成',
        approvalStatus: '待审批'
    },
])
const rules = {
    status: [
        { required: true, message: '请选择审批状态', trigger: 'blur' },
    ],
}

const handleDataUPdate = () => {
    console.log('更新数据')
}

const handleCheck = row => {
    console.log('查看', row)
    globalStore.setFullPanelBody(true)

}
const handleApprol = row => {
    approlVisible.value = true
    console.log('审批', row)
}

</script>

<template>
    <div v-show="!globalStore.isShowFullPanelBody" class=" m-4">
        <SortAndFilterTable :data="tableData1" :columns="columns" :tableProps="{ height: '300px', pageSize: 4 }">
            <template #action="{ row }">
                <el-link type="primary" class="mr-2" @click="handleCheck(row)"> 查看</el-link>
                <el-link type="primary" @click="handleApprol(row)"> 审批</el-link>
            </template>
        </SortAndFilterTable>
    </div>
    <div v-show="globalStore.isShowFullPanelBody" class="w-full relative h-full flex justify-center items-center">
        <MapView>
            <template v-slot:mapContainter>
            </template>
        </MapView>
        <BottomPanel title="数据审批管理" :isAction="true" @onClose="globalStore.setFullPanelBody(false)">
            <template v-slot:panelHeader>
                <!-- 动态组件渲染 -->
                <el-button type="primary" @click="handleDataUPdate">更新数据</el-button>
            </template>
            <template v-slot:bottomPanel>
                <DataCompare />
            </template>
        </BottomPanel>
    </div>

    <el-dialog v-model="approlVisible" title="审批信息" width="500" draggable>
        <el-form :model="form" label-width="auto" :rules="rules" prop="approlStatus">
            <el-form-item label="审批状态：">
                <el-radio-group v-model="form.status">
                    <el-radio value="yes">通过</el-radio>
                    <el-radio value="no">不通过</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="审批意见：">
                <el-input v-model="textarea" :rows="4" type="textarea" placeholder="请输入" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="approlVisible = false">
                    完成
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped lang="scss"></style>