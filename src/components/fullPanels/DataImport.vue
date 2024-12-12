<script setup>
import { ref, reactive } from 'vue';
import FileUpload from '@/components/common/FileUpload.vue'
import DataTable from '@/components/common/DataTable.vue'
import DataCheck from '@/components/common/DataCheck.vue'
import Step from '@/components/common/DataStep.vue'
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()
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
const multipleSelection = ref([])
const isStartCheck = ref(false)
const isImportSuccess = ref(false)
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: '1',
  type: '',
  resource: '',
  desc: '',
})


//开始质检
const startCheck = () => {
  isStartCheck.value = true
  console.log(multipleSelection.value)
}

//导出报告
const exportReport = () => {
  console.log('导出报告')
}

//开始入库
const startImport = () => {
  currentStep.value = 'insert'
  setTimeout(() => {
    // isImportSuccess.value = true
  }, 3000)
  console.log('开始入库')
}
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const onsuccess = () => {
  currentStep.value = 'select'
  isImportSuccess.value = false
  globalStore.setFullPanel(false)
}
</script>

<template>
  <div class="w-full  flex justify-center items-center">
    <Step :data="steps" :step="currentStep" />
  </div>
  <!-- 第一步：选择数据 -->
  <div v-if="currentStep === 'select'" class="w-1/3 m-auto p-4 mt-10">
    <el-form class="w-full" :model="form" label-width="auto">
      <!-- <el-form-item label="入库数据类型：">
        <el-radio v-model="form.type" size="large">普查</el-radio>
      </el-form-item> -->
      <el-form-item label="成果名称：">
        <el-input v-model="form.name" placeholder="请输入成果名称"></el-input>
      </el-form-item>
      <el-form-item label="所属区域：">
        <el-select v-model="form.region" placeholder="请选择成果区域">
          <el-option label="区域1" value="1"></el-option>
          <el-option label="区域2" value="2"></el-option>
          <el-option label="区域3" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="普查入库数据：">
        <FileUpload />
      </el-form-item>
      <el-form-item label="附件资料：">
        <FileUpload>
          <template v-slot:uploadRemark>
            <div>注：更新数据文件支持 Access Mdb 数据格式</div>
          </template>
        </FileUpload>
      </el-form-item>
      <el-form-item label="入库时间：">
        <el-date-picker class="w-full" v-model="form.date1" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-button class="m-auto" type="primary" @click="currentStep = 'check'">下一步</el-button>
    </el-form>
  </div>
  <!-- 第二步：数据质检 -->
  <div v-if="currentStep === 'check'" class="w-2/3 m-auto p-4 mt-10">
    <!-- 数据质检 -->
    <DataCheck :checkStatus="isStartCheck" />
    <div class="mt-8 flex justify-center items-center">
      <template v-if="!isStartCheck">
        <!-- 上一步 -->
        <el-button @click="currentStep = 'select'">上一步</el-button>
        <!-- 开始质检 -->
        <el-button type="primary" @click="startCheck">开始质检</el-button>
      </template>
      <template v-else>
        <!-- 上一步 -->
        <el-button @click="isStartCheck = false">上一步</el-button>
        <!-- 导出报告 -->
        <el-button type="primary" @click="exportReport">导出报告</el-button>
        <!-- 开始质检 -->
        <el-button type="primary" @click="startImport">开始入库</el-button>
      </template>
    </div>
  </div>
  <!-- 第三步：数据入库 -->
  <div v-if="currentStep === 'insert'" class="w-2/3 m-auto p-4 mt-10">
    <div v-if="isImportSuccess" class="text-primary-color text-2xl my-4 flex justify-center items-center">
      入库成功!
    </div>
    <div v-if="isImportSuccess" class="p-3">
      <span class="theme-text-color">入库信息统计：</span>本次入库更新数据表308个，管线数量94521条，管线长度1446235.254米，管点数量84521个，管线面0个
    </div>
    <el-progress class="w-1/2 m-auto mb-10" :percentage="50" v-if="!isImportSuccess" />
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
      <el-button type="primary" @click="onsuccess">完成</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>