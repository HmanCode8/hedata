<script setup>
import { ref } from 'vue';
import SortAndFilterTable from '@/components/common/SortAndFilterTable.vue'
import PipeChoose from '@/components/common/PipeChoose.vue';
import DataTable from '@/components/common/DataTable.vue'


const dialogVisible = ref(false)
const activeName = ref('taskDetail')
const isShowManger = ref(false)
const startCreateModel = ref(false)

const formData = ref({
    taskName: '',
    taskType: 'now',
    taskLayer: [],
    plantTaskName: '',
    executionCycle: '',
    timeCycle: '',
    executionTime: '',
    executionDate: '',
    haveEnd: false,
})

const rules = {
    taskName: [
        { required: true, message: '请输入任务名称', trigger: 'blur' },
    ],
    taskLayer: [
        { required: true, message: '请选择任务图层', trigger: 'blur' },
    ],
}

const pipes = [
    {
        name: "给水",
        value: 'js'
    },
    {
        name: "排水",
        value: 'css'
    },
    {
        name: "电力",
        value: 'html'
    },
    {
        name: "暖通",
        value: 'python'
    },
    {
        name: "照明",
        value: 'java'
    },
    {
        name: "通风",
        value: 'php'
    },
    {
        name: "空调",
        value: 'ruby'
    },
    {
        name: "电梯",
        value: 'go'
    },
    {
        name: "电话",
        value: 'javascript'
    },
    {
        name: "路灯",
        value: 'typescript'
    },
]

const weeks = [
    {
        name: "周一",
        value: 'Monday'
    },
    {
        name: "周二",
        value: 'Tuesday'
    },
    {
        name: "周三",
        value: 'Wednesday'
    },
    {
        name: "周四",
        value: 'Thursday'
    },
    {
        name: "周五",
        value: 'Friday'
    },
    {
        name: "周六",
        value: 'Saturday'
    },
    {
        name: "周日",
        value: 'Sunday'
    },
]

const months = [
    {
        name: "一月",
        value: '1'
    },
    {
        name: "二月",
        value: '2'
    },
    {
        name: "三月",
        value: '3'
    },
    {
        name: "四月",
        value: '4'
    },
    {
        name: "五月",
        value: '5'
    },
    {
        name: "六月",
        value: '6'
    },
    {
        name: "七月",
        value: '7'
    },
    {
        name: "八月",
        value: '8'
    },
    {
        name: "九月",
        value: '9'
    },
    {
        name: "十月",
        value: '10'
    },
    {
        name: "十一月",
        value: '11'
    },
    {
        name: "十二月",
        value: '12'
    },
]
const columns = [
    {
        prop: 'index',
        label: '序号',
        width: 180,
    },
    {
        prop: 'projectCode',
        label: '工程编号',
        slot: true
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
const tableData = ref([
    {
        startTime: '2022-01-01',
        process: 20,
        remark: '开始对其他类型数据建模'
    },
    {
        startTime: '2022-01-02',
        process: 40,
        remark: '开始对其他类型数据建模'
    },
    {
        startTime: '2022-01-03',
        process: 60,
        remark: '开始对其他类型数据建模'
    },
    {
        startTime: '2022-01-04',
        process: 80,
        remark: '开始对其他类型数据建模'
    },
    {
        startTime: '2022-01-05',
        process: 100,
        remark: '开始对其他类型数据建模'
    },

])
const resultColumns = [
    {
        prop: 'index',
        label: '序号',
        width: 180,
    },
    {
        prop: 'pipeName',
        label: '管线名称',
    },
    {
        prop: 'pipeLine',
        label: '管线(条)',
    },
    {
        prop: 'pipeLength',
        label: '管线(米)',
    },
    {
        prop: 'pipePoint',
        label: '管点',
    },
]
const resultData = ref([
    {
        pipeName: '给水',
        pipeLine: 100,
        pipeLength: 1000,
        pipePoint: 10000
    },
    {
        pipeName: '排水',
        pipeLine: 100,
        pipeLength: 1000,
        pipePoint: 10000
    },
    {
        pipeName: '电力',
        pipeLine: 100,
        pipeLength: 1000,
        pipePoint: 10000
    },
    {
        pipeName: '暖通',
        pipeLine: 100,
        pipeLength: 1000,
        pipePoint: 10000
    },
    {
        pipeName: '照明',
        pipeLine: 100,
        pipeLength: 1000,
        pipePoint: 10000
    },
])
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
])
const handleNewTask = () => {
    dialogVisible.value = true
    console.log('新建任务')
}
const handleStopProject = () => {
    console.log('暂停工程')
}
const handleDeleteProject = () => {
    console.log('删除工程')
}
const handlePlanManagement = () => {
    isShowManger.value = true
    console.log('计划管理')
}
const handleCheck = (row) => {
    console.log('查看', row)
}
const handleApprol = (row) => {
    console.log('审批', row)
}
const handleClose = () => {
    dialogVisible.value = false
}

const handleSave = () => {
    console.log('保存')
    startCreateModel.value = true
}
const pipeOnchange = (value) => {
    console.log(value, '2')
}

</script>

<template>
    <div v-show="!isShowManger">
        <div class="m-4">
            <el-button type="primary" @click="handleNewTask">新建任务</el-button>
            <el-button type="primary" @click="handleStopProject">暂停</el-button>
            <el-button type="primary" @click="handleDeleteProject">删除</el-button>
            <el-button type="primary" @click="handlePlanManagement">新建计划管理</el-button>
        </div>
        <SortAndFilterTable class="m-1" :data="tableData1" :columns="columns" :tableProps="{ selectable: true }">
            <template #action="{ row }">
                <el-link type="primary" class="mr-2" @click="handleCheck(row)"> 查看</el-link>
                <el-link type="primary" @click="handleApprol(row)"> 审批</el-link>
            </template>
            <template #cell="{ row }">
                <el-button>{{ row.projectCode }}</el-button>
            </template>
        </SortAndFilterTable>
        <!-- 新建任务 -->
        <el-dialog v-model="dialogVisible" title="新建任务" width="30%" :before-close="handleClose">
            <el-form :form="formData" :rules="rules" ref="form">
                <el-form-item label="任务类型：" prop="taskType">
                    <el-radio-group v-model="formData.taskType">
                        <el-radio value="now" size="large">立即建模</el-radio>
                        <el-radio value="plant" size="large">计划建模</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="任务名称：" prop="taskName">
                    <el-input v-model="formData.taskName" placeholder="请输入任务名称"></el-input>
                </el-form-item>
                <el-form-item label="任务图层：" prop="taskLayer">
                    <PipeChoose @onchange="pipeOnchange" :pipeList="pipes" />
                </el-form-item>
                <template v-if="formData.taskType === 'plant'">
                    <el-form-item label="任务名称：" prop="plantTaskName">
                        <el-input v-model="formData.taskName" placeholder="请输入任务名称"></el-input>
                    </el-form-item>
                    <el-form-item label="执行周期：" prop="executionCycle">
                        <el-row class="w-full">
                            <el-col :span="6">
                                <el-radio-group v-model="formData.executionCycle">
                                    <el-radio value="week">周</el-radio>
                                    <el-radio value="month">月</el-radio>
                                </el-radio-group>
                            </el-col>
                            <el-col :span="18">
                                <el-select v-model="formData.timeCycle">
                                    <el-option v-for="d in formData.executionCycle === 'week' ? weeks : months"
                                        :label="d.name" :value="d.value" :key="d.value"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="执行时间：" prop="executionTime">
                        <el-time-select v-model="formData.executionTime" style="" start="08:30" step="00:15" end="18:30"
                            placeholder="选择执行时间" />
                    </el-form-item>
                    <el-form-item label="开始日期：" prop="executionDate">
                        <el-date-picker v-model="formData.executionDate" type="date"
                            placeholder="选择开始日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="" prop="executionDate">
                        <el-radio-group v-model="formData.haveEnd">
                            <el-radio value="hasEnd" size="large">结束日期</el-radio>
                            <el-radio value="noEnd" size="large">无结束日期</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </template>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
    <!-- 计划管理 -->
    <div class="w-full h-full" v-show="isShowManger">
        <template v-if="!startCreateModel">
            <div class="m-4 flex justify-between items-center">
                <div>计划管理</div>
                <el-button type="primary" @click="isShowManger = false">
                    <el-icon>
                        <Back />
                    </el-icon>返回</el-button>
            </div>
            <el-row class="h-full">
                <el-col :span="16" class="mx-1 border-r">
                    <SortAndFilterTable class="m-1" :data="tableData1" :columns="columns"
                        :tableProps="{ selectable: true }">
                        <template #action="{ row }">
                            <el-link type="primary" class="mr-2" @click="handleCheck(row)"> 查看</el-link>
                            <el-link type="primary" @click="handleApprol(row)"> 审批</el-link>
                        </template>
                        <template #cell="{ row }">
                            <el-button>{{ row.projectCode }}</el-button>
                        </template>
                    </SortAndFilterTable>
                </el-col>
                <el-col :span="7" class="mx-1 px-1">
                    <div class="pb-2 mb-2 font-bold text-xl border-b border-gray-300">
                        计划建模：
                    </div>
                    <el-form class="h-full" :form="formData" :rules="rules" ref="form">
                        <el-form-item label="任务名称：" prop="taskName">
                            <el-input v-model="formData.taskName" placeholder="请输入任务名称"></el-input>
                        </el-form-item>
                        <el-form-item label="任务图层：" prop="taskLayer">
                            <PipeChoose @onchange="pipeOnchange" :pipeList="pipes" />
                        </el-form-item>
                        <el-form-item label="任务名称：" prop="plantTaskName">
                            <el-input v-model="formData.taskName" placeholder="请输入任务名称"></el-input>
                        </el-form-item>
                        <el-form-item label="执行周期：" prop="executionCycle">
                            <el-row class="w-full">
                                <el-col :span="6">
                                    <el-radio-group v-model="formData.executionCycle">
                                        <el-radio value="week">周</el-radio>
                                        <el-radio value="month">月</el-radio>
                                    </el-radio-group>
                                </el-col>
                                <el-col :span="18">
                                    <el-select v-model="formData.timeCycle">
                                        <el-option v-for="d in formData.executionCycle === 'week' ? weeks : months"
                                            :label="d.name" :value="d.value" :key="d.value"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="执行时间：" prop="executionTime">
                            <el-time-select v-model="formData.executionTime" style="" start="08:30" step="00:15"
                                end="18:30" placeholder="选择执行时间" />
                        </el-form-item>
                        <el-form-item label="开始日期：" prop="executionDate">
                            <el-date-picker v-model="formData.executionDate" type="date"
                                placeholder="选择开始日期"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="" prop="executionDate">
                            <el-radio-group v-model="formData.haveEnd">
                                <el-radio value="hasEnd" size="large">结束日期</el-radio>
                                <el-radio value="noEnd" size="large">无结束日期</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <div class="flex  w-full justify-end">
                                <el-button @click="isShowManger = false">取消</el-button>
                                <el-button type="primary" @click="handleSave">
                                    保存
                                </el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </template>
        <template v-else>
            <div class="m-4 flex justify-end items-center">
                <el-button type="primary" @click="startCreateModel = false">
                    <el-icon>
                        <Back />
                    </el-icon>返回</el-button>
            </div>
            <el-row class="h-full">
                <el-col class="border-r h-full" :span="6">
                    <div class="flex justify-between items-center m-2"><span class="text-lg">任务基本信息：</span>
                        <div class="text-xs text-gray-400 px-2"> 进行中</div>
                    </div>
                    <!-- <div class="flex justify-around items-center mb-2">
                        <span> 任务名称：</span>
                        <span class="ml-2 text-gray-400"> 建模任务1</span>
                    </div> -->
                    <el-row justify="space-between" class="w-full mb-2 px-1">
                        <el-col class="text-center my-2" :span="12">
                            任务名称：
                        </el-col>
                        <el-col class="text-gray-400 my-2" :span="12">
                            建模任务1
                        </el-col>
                        <el-col class="text-center my-2" :span="12">
                            任务图层：
                        </el-col>
                        <el-col class="text-gray-400 my-2" :span="12">
                            给水、热力、工业、综合管廊（沟）、雨水、排水、电力、通信、燃气、供热、冶炼、水利、环保、公共设施、供气、供水、供电、公路、铁路、港口、港务、港内、港外、物流、农业、农村、林业、矿产、煤炭、化工、采矿、电力、通信、燃气、供热、冶炼、水利、环保、公共设施、供气、供水、供电、公路、铁路、港口、港务、港内、港外、物流、农业、农村、林业、矿产、煤炭、化工、采矿、电力、通信、燃气、供热、冶炼、水利、环保、公共设施、供气、供水、
                        </el-col>
                        <el-col class="text-center my-2" :span="12">
                            综合管线建模：
                        </el-col>
                        <el-col class="text-gray-400 my-2" :span="12">
                            10923
                        </el-col>
                        <el-col class="text-center my-2" :span="12">
                            开始时间：
                        </el-col>
                        <el-col class="text-gray-400 my-2" :span="12">
                            2022-01-01
                        </el-col>
                        <el-col class="text-center my-2" :span="12">
                            结束时间：
                        </el-col>
                        <el-col class="text-gray-400 my-2" :span="12">
                            2022-01-31
                        </el-col>
                    </el-row>
                </el-col>
                <el-col class="px-2" :span="18">
                    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane name="taskDetail" label="任务详情：">
                            <el-table :data="tableData">
                                <el-table-column prop="startTime" label="开始时间" width="180" />
                                <el-table-column prop="process" label="建模进度">
                                    <template #default="scope">
                                        <el-progress class="w-60" :percentage="scope.row.process" :stroke-width="15"
                                            :text-inside="true"
                                            :status="scope.row.process >= 100 ? 'success' : 'active'"></el-progress>
                                    </template>

                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane name="taskPlan" label="结果统计：">
                            <DataTable :data="resultData" :columns="resultColumns"
                                @selection-change="handleSelectionChange"
                                :tableProps="{ selectable: true, border: true }">
                            </DataTable>
                        </el-tab-pane>
                    </el-tabs>

                </el-col>
            </el-row>
        </template>
    </div>
</template>

<style scoped lang="scss"></style>