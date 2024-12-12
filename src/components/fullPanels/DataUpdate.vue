<script setup>
import { ref } from 'vue';
import { useGlobalStore } from '@/stores/global'
import Step from '@/components/common/DataStep.vue'
import FileUpload from '@/components/common/FileUpload.vue'
import MapView from '@/components/common/MapView.vue';
import DataTable from '@/components/common/DataTable.vue'
import SortAndFilterTable from '@/components/common/SortAndFilterTable.vue'
import RightPanel from '@/components/common/RightPanel.vue';
import BottomPanel from '@/components/common/BottomPanel.vue';
import Tab from '@/components/common/DataTab.vue'
import AnalysisRangeForUpload from '@/components/common/AnalysisRangeForUpload.vue'
import AnalysisRangeForRegion from '@/components/common/AnalysisRangeForRegion.vue'
import DataCompare from '../pages/DataCompare.vue';
import DataProcessing from '../pages/DataProcessing.vue';

const actionComponentMap = {
  dataCompare: DataCompare,
  processing: DataProcessing,
}
const tabs = [
  { label: '导入范围', value: 'import' },
  { label: '绘制范围', value: 'draw' },
  // { label: '行政区划', value: 'region' },
]

const steps = [
  {
    title: '选择数据',
    key: 'select',
  },
  {
    title: '数据质检',
    key: 'check',
  },
  {
    title: '数据入库',
    key: 'insert',
  },
]
const currentStep = ref('select')
const isImportSuccess = ref(false)
const isStartCheck = ref(false)
const globalStore = useGlobalStore()
const dataComponent = ref('')
const panelTitle = ref('')
const panelType = ref('')

const formData = ref({
  dataType: 'fixDraw',
  updateType: 'add',
  updateProject: '',
})


const form = ref({
  delivery: '',
})

const activeTab = ref(tabs[0].value)

//入库后数据
const importData = [
  {
    id: 1,
    index: 1,
    name: '数据1',
    progress: 10,
    time: '2022-01-01'
  },
  {
    id: 2,
    index: 2,
    name: '数据2',
    progress: 30,
    time: '2022-01-01'
  },
  {
    id: 3,
    index: 3,
    name: '数据3',
    progress: 90,
    time: '2022-01-01'
  },
  {
    id: 4,
    index: 4,
    name: '数据4',
    progress: 100,
    time: '2022-01-01'
  },
]

// 入库后数据表格列
const importColumns = [
  {
    align: "center",
    property: "index",
    label: "序号",
    width: 120
  },
  {
    align: "center",
    property: "name",
    label: "数据名称",
  },
  {
    align: "center",
    property: "progress",
    label: "入库进度",
    slot: true,
  },
  {
    align: "center",
    property: "time",
    label: "时间",
  },
]

// 入库成功的数据
const successData = [
  {
    id: 1,
    name: '数据1',
    pipeLineNum: 100,
    pipeLength: 1000,
    pipePointNum: 10000,
    pipeMeterNum: 100000
  },
  {
    id: 2,
    name: '数据2',
    pipeLineNum: 200,
    pipeLength: 2000,
    pipePointNum: 20000,
    pipeMeterNum: 200000
  },
  {
    id: 3,
    name: '数据3',
    pipeLineNum: 300,
    pipeLength: 3000,
    pipePointNum: 30000,
    pipeMeterNum: 300000
  },
  {
    id: 4,
    name: '数据4',
    pipeLineNum: 400,
    pipeLength: 4000,
    pipePointNum: 40000,
    pipeMeterNum: 400000
  },
]

// 入库成功表格列
const successColumns = [

  {
    align: "center",
    property: "name",
    label: "数据名称",
  },
  {
    align: "center",
    property: "pipeLineNum",
    label: "管线（条）",
  },
  {
    align: "center",
    property: "pipeLength",
    label: "管线（米）",
  },
  {
    align: "center",
    property: "pipePointNum",
    label: "管点（个）",
  },
  {
    align: "center",
    property: "pipeMeterNum",
    label: "管线面（个）",
  },
]

const rules = {
  dataType: [
    { required: true, message: '请选择更新数据类型', trigger: 'blur' },
  ],
  updateType: [
    { required: true, message: '请选择更新方式', trigger: 'blur' },
  ],
  updateProject: [
    { required: true, message: '请输入工程名称', trigger: 'blur' },
  ],
}
const columns = [
  {
    prop: 'index',
    label: '序号',
    width: 80,
  },
  {
    prop: 'projectCode',
    label: '工程编号',
    width: 120,
  },
  {
    prop: 'projectName',
    label: '工程名称',
    width: 120,
  },
  {
    prop: 'exportTime',
    label: '迁出时间',
    width: 120,
  },
  {
    prop: 'exportData',
    label: '迁出数据',
    width: 120,
  },
  {
    prop: 'importTime',
    label: '迁入时间',
    width: 120,
  },
  {
    prop: 'importStatus',
    label: '迁入情况',
    width: 120,
  },
]

const tableData = [
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

const handleLocate = (row) => {
  console.log(row)
}

const handleSelectionChange = (selection) => {
  console.log(selection)
}
const dataACtion = (key) => {
  globalStore.setFullPanelBody(true)
  panelType.value = 'bottom'
  panelTitle.value = key === 'dataCompare' ? '数据对比' : '数据接边'
  dataComponent.value = actionComponentMap[key]
}
const chooseRange = () => {
  globalStore.setFullPanelBody(true)
  panelType.value = 'full'
}

const tabChange = (t) => {
  activeTab.value = t.value
}
const handleDataUPdate = () => {
  globalStore.setFullPanelBody(false)
  startImport()
  console.log('数据更新')
}
//导出报告
const exportReport = () => {
  console.log('导出报告')
}

//开始入库
const startImport = () => {
  currentStep.value = 'insert'
  setTimeout(() => {
    isImportSuccess.value = true
  }, 3000)
  console.log('开始入库')
}

// 入库更新
const onsuccess = () => {
  currentStep.value = 'select'
  isImportSuccess.value = false
  globalStore.setFullPanel(false)
}
</script>

<template>
  <div v-show="!globalStore.isShowFullPanelBody" class="w-full h-full m-auto">
    <div class="flex justify-center items-center">
      <Step :data="steps" :step="currentStep" />
    </div>
    <!-- 第一步：选择数据 -->
    <div v-if="currentStep === 'select'" class="w-2/3 m-auto h-[80%] overflow-auto  p-4 mt-10">
      <el-form class="m-auto mt-5" label-width="auto" :model="formData" :rules="rules">
        <div class="w-2/3 m-auto">
          <el-form-item label="更新数据类型：">
            <el-radio-group v-model="formData.dataType">
              <el-radio value="fixDraw">补测补绘</el-radio>
              <el-radio value="finalMeasure">竣工测量</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formData.dataType === 'fixDraw'" label="迁出范围：">
            <div class="w-full flex justify-center items-center">
              <el-input class="mr-1" disabled v-model="form.range" placeholder="请输入范围" />
              <el-button type="primary" @click="chooseRange('import')">导入范围</el-button>
              <el-button type="primary" @click="chooseRange('draw')">绘制范围</el-button>
            </div>
          </el-form-item>
          <el-form-item label="更新方式：">
            <el-radio-group v-model="formData.updateType">
              <el-radio value="replace"> 迁入更新</el-radio>
              <el-radio value="add">直接更新</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="更新工程：">
            <el-input v-model="formData.updateProject" placeholder="请输入工程名称"></el-input>
          </el-form-item>
        </div>
        <el-form-item v-if="formData.dataType === 'finalMeasure'">
          <SortAndFilterTable class="m-auto" :data="tableData" :columns="columns">
            <template #action="{ row }">
              <el-link type="primary" class="mr-2" @click="handleLocate(row)"> 定位</el-link>
              <el-link type="primary" @click="handleLocate(row)"> 选择</el-link>
            </template>
          </SortAndFilterTable>
        </el-form-item>
        <div class="w-2/3 m-auto">
          <el-form label-width="auto">
            <el-form-item label="附件资料：">
              <FileUpload>
                <template v-slot:uploadRemark>
                  <div>注：更新数据文件支持 Access Mdb 数据格式</div>
                </template>
              </FileUpload>
            </el-form-item>
            <el-form-item label="普查入库数据:">
              <FileUpload />
            </el-form-item>
            <el-form-item label="入库时间：">
              <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <div class="text-center mt-10">
              <el-button type="primary" @click="currentStep = 'check'"> 下一步 </el-button>
            </div>
          </el-form>
        </div>
      </el-form>


    </div>
    <!-- 第二步：数据质检 -->
    <div v-if="currentStep === 'check'" class="w-2/3 m-auto p-4 mt-10">
      <!-- 数据质检 -->
      <DataCheck :checkStatus="isStartCheck" />
      <template v-if="!isStartCheck">
        <!-- 上一步 -->
        <el-button @click="currentStep = 'select'">上一步</el-button>
        <!-- 开始质检 -->
        <el-button type="primary" @click="isStartCheck = true">开始质检</el-button>
      </template>
      <template v-else>
        <!-- 上一步 -->
        <el-button @click="isStartCheck = false">上一步</el-button>
        <!-- 导出报告 -->
        <el-button type="primary" @click="exportReport">导出报告</el-button>
        <el-button type="primary" @click="dataACtion('dataCompare')">数据对比</el-button>
        <!-- 开始质检 -->
        <el-button type="primary" @click="startImport">开始入库</el-button>
      </template>
    </div>
  </div>

  <!-- 更新入库 -->
  <div v-if="currentStep === 'insert' && !globalStore.isShowFullPanelBody" class="w-2/3 m-auto p-4 mt-10">
    <div v-if="isImportSuccess" class="text-primary-color text-2xl my-4 flex justify-center items-center">
      入库成功!
    </div>
    <div class="p-3" v-if="isImportSuccess">
      <span class="theme-text-color">入库信息统计：</span>本次入库更新数据表308个，管线数量94521条，管线长度1446235.254米，管点数量84521个，管线面0个
    </div>
    <el-progress class=" w-1/2 m-auto mb-10" :percentage="50" v-if="!isImportSuccess" />
    <DataTable :data="isImportSuccess ? successData : importData"
      :columns="isImportSuccess ? successColumns : importColumns" @selection-change="handleSelectionChange"
      :tableProps="{ border: true }">
      <template v-if="!isImportSuccess" #tableColumn="{ row }">
        <el-progress v-if="row.progress < 100" :percentage="row.progress" />
        <div v-else class="flex justify-center theme-text-color items-center">
          已入库
        </div>
      </template>
    </DataTable>
    <div class="text-center mt-8">
      <el-button>导出报告</el-button>
      <el-button type="primary" @click="dataACtion('processing')">接边处理</el-button>
      <el-button type="primary" @click="onsuccess">完成</el-button>
    </div>
  </div>
  <!-- 数据对比 -->
  <div v-show="globalStore.isShowFullPanelBody" class="w-full relative h-full flex justify-center items-center">
    <MapView>
      <template v-slot:mapContainter>
      </template>
    </MapView>
    <BottomPanel v-if="panelType === 'bottom'" :title="panelTitle" :isAction="true" :isNeedHeader="false"
      @onClose="globalStore.setFullPanelBody(false)">
      <template v-slot:panelHeader>
        <!-- 动态组件渲染 -->
        <el-button type="primary" @click="handleDataUPdate">更新数据</el-button>
      </template>
      <template v-slot:bottomPanel>
        <!-- <DataCompare />
        <DataProcessing /> -->
        <component :is="dataComponent" />
      </template>
    </BottomPanel>
    <RightPanel v-if="panelType === 'full'" title="确定范围" :isAction="true" @onClose="handleClose">
      <template v-slot:rightPanel>
        <Tab class="w-2/3" :tabs="tabs" @onchage="tabChange" />
        <AnalysisRangeForUpload v-show="activeTab === 'import'" class="mt-4" />
        <AnalysisRangeForRegion v-show="activeTab === 'draw'" class="mt-4" />
      </template>
    </RightPanel>
  </div>
</template>

<style scoped lang="scss"></style>