<script setup>
import { ref } from 'vue';
// import FileUpload from '@/components/common/FileUpload.vue'
import Tab from '@/components/common/DataTab.vue'
import AnalysisRangeForUpload from '@/components/common/AnalysisRangeForUpload.vue'
import AnalysisRangeForDraw from '@/components/common/AnalysisRangeForDraw.vue'
import DataTable from '@/components/common/DataTable.vue'
import SortAndFilterTable from '@/components/common/SortAndFilterTable.vue'
import RightPanel from '@/components/common/RightPanel.vue';
import MapView from '@/components/common/MapView.vue';
import Step from '@/components/common/DataStep.vue'
import { useGlobalStore } from '@/stores/global'


const props = {
  id: 'id',
  label: 'name',
  children: 'children',
}
const treeData = [
  {
    id: 1,
    name: '工程1',
    children: [
      {
        id: 2,
        name: '图幅1',
        children: [],
      },
      {
        id: 3,
        name: '图幅2',
        children: [],
      },
      {
        id: 4,
        name: '图幅3',
        children: [],
      },
    ],
  },
  {
    id: 5,
    name: '工程2',
    children: [
      {
        id: 6,
        name: '图幅1',
        children: [],
      },
      {
        id: 7,
        name: '图幅2',
        children: [],
      },
      {
        id: 8,
        name: '图幅3',
        children: [],
      },
    ],
  },
]
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
const globalStore = useGlobalStore()
const activeTab = ref('import')
const form = ref({
  range: '',
  data: '',
  conflict: '',
})
const chooseDataForm = ref({
  data: '',
  format: '',
  code: '',
  name: '',
  date: '',
})
const chooseDataFormRules = {
  data: [
    { required: true, message: '请选择数据', trigger: 'change' },
  ],
  format: [
    { required: true, message: '请选择数据格式', trigger: 'change' },
  ],
  code: [
    { required: true, message: '请输入工程编号', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请输入工程名称', trigger: 'blur' },
  ],
  date: [{ required: true, message: '请选择迁出时间', trigger: 'change' }],
}

const tabs = [
  { label: '导入范围', value: 'import' },
  { label: '绘制范围', value: 'draw' },
  // { label: '行政区划', value: 'region' },
]

const tabChange = (t) => {
  // globalStore.setDrawType(t.value === 'draw')
  activeTab.value = t.value
}
const columns = [
  {
    label: '序号',
    key: 'index',
    width: 60,
    align: 'center',
  },
  {
    label: '工程编号',
    key: 'code',
    width: 120,
    align: 'center',
  },
  {
    label: '工程名称',
    key: 'name',
    width: 120,
    align: 'center',
  },
  {
    label: '迁出时间',
    key: 'date',
    width: 120,
    align: 'center',
  },
  {
    label: '迁出数据',
    key: 'data',
    width: 120,
    align: 'center',
  },
  {
    label: '迁入时间',
    key: 'inDate',
    width: 120,
    align: 'center',
  },
  {
    label: '迁入情况',
    key: 'inStatus',
    width: 120,
    align: 'center',
  },
]
const filterTableData = [
  {
    index: 1,
    code: '123456',
    name: '工程1',
    date: '2022-01-01',
    data: '图幅1',
    inDate: '2022-01-01',
    inStatus: '已迁入',
  },
  {
    index: 2,
    code: '123456',
    name: '工程1',
    date: '2022-01-01',
    data: '图幅2',
    inDate: '2022-01-01',
    inStatus: '已迁入',
  },
  {
    index: 3,
    code: '123456',
    name: '工程1',
    date: '2022-01-01',
    data: '图幅3',
    inDate: '2022-01-01',
    inStatus: '已迁入',
  },
]
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

const steps = [
  {
    title: '选择范围',
    key: 'select',
  },
  {
    title: '选择数据',
    key: 'data',
  },
  {
    title: '数据迁出',
    key: 'export',
  },
]
const currentStep = ref('select')
const checkList = ref([])

// 定位
const handleLocate = (index, row) => {
  console.log(index, row)
  globalStore.setRightPanelBody(true)
}

// 确认
const handleOk = () => {
  //绘制导出页面
  globalStore.setRightPanelBody(true)

}
// 关闭
const handleClose = () => {
  console.log('关闭')
  globalStore.setRightPanelBody(false)

}
const onsuccess = () => {
  currentStep.value = 'export'
  globalStore.setFullPanel(false)
}
const handleCheckChange = (data) => {
  console.log(data)
}

</script>

<template>
  <div class="w-full h-full">
    <div v-show="!globalStore.isShowRightPanelBody" class="w-full flex justify-center items-center ">
      <Step :data="steps" :step="currentStep" />
    </div>
    <div v-show="!globalStore.isShowRightPanelBody" class="w-1/2 h-full m-auto mt-10">
      <!-- 第一步：选择范围 -->
      <template v-if="currentStep === 'select'">
        <el-form :model="form" label-width="auto">
          <el-form-item label="迁出范围：">
            <div class="w-full flex justify-center items-center">
              <el-input class="mr-1" disabled v-model="form.range" placeholder="请输入范围" />
              <el-button type="primary" @click="handleOk">导入范围</el-button>
              <el-button type="primary" @click="handleOk">绘制范围</el-button>
            </div>
          </el-form-item>
          <el-form-item label="按图幅：">
            <el-checkbox-group v-model="checkList">
              <!-- <el-checkbox value="按图幅"></el-checkbox> -->
              <el-checkbox v-for="item in mappables" :key="item.value" :value="item.label">
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="冲突工程：">
            <el-tooltip class="item" effect="dark" content="说明：冲突工程是指与本次工程空间范围重叠的已迁出且未迁入的工程。" placement="right">
              <el-icon>
                <QuestionFilled class="theme-text-color" />
              </el-icon>
            </el-tooltip>
          </el-form-item>
        </el-form>
        <div class="p-2">
          <SortAndFilterTable :data="filterTableData" :columns="columns">
            <template #action="{ row }">
              <el-link type="primary" @click="handleLocate(row)"> 定位</el-link>
            </template>
          </SortAndFilterTable>
        </div>
        <div class="w-full flex justify-center items-center mt-10">
          <el-button type="primary" @click="currentStep = 'data'">下一步</el-button>
        </div>
      </template>
      <!-- 第二步：选择数据 -->
      <div class="w-2/3 mx-auto mt-4 p-12 h-[80%] overflow-auto " v-if="currentStep === 'data'">
        <el-form class="w-full" label-width="auto" :model="chooseDataForm" :rules="chooseDataFormRules">
          <el-form-item label="迁出数据：" prop="data">
            <div class=" bg-[#eee1]  w-full">
              <div class="flex justify-between ">
                <el-input class="w-[50%] h-full" v-model="chooseDataForm.data" placeholder="请输入数据名称"></el-input>
                <div class=" flex justify-end items-center">
                  <div class="h-full px-5 mx-2 border theme-border">全选</div>
                  <div class="h-full px-5 mx-2 border theme-border">反选</div>
                </div>
              </div>

              <div class="mt-4 flex justify-between flex-wrap">
                <div class="w-1/2">
                  <el-tree style="max-width: 600px" :props="props" :data="treeData" :multiple="true" show-checkbox
                    @check-change="handleCheckChange" />
                </div>
                <div class="w-1/2">
                  <el-tree style="max-width: 600px" :props="props" :data="treeData" :multiple="true" show-checkbox
                    @check-change="handleCheckChange" />
                </div>
                <div class="w-1/2">
                  <el-tree style="max-width: 600px" :props="props" :data="treeData" :multiple="true" show-checkbox
                    @check-change="handleCheckChange" />
                </div>
                <div class="w-1/2">
                  <el-tree style="max-width: 600px" :props="props" :data="treeData" :multiple="true" show-checkbox
                    @check-change="handleCheckChange" />
                </div>
                <div class="w-1/2">
                  <el-tree style="max-width: 600px" :props="props" :data="treeData" :multiple="true" show-checkbox
                    @check-change="handleCheckChange" />
                </div>
                <div class="w-1/2">
                  <el-tree style="max-width: 600px" :props="props" :data="treeData" :multiple="true" show-checkbox
                    @check-change="handleCheckChange" />
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="迁出格式：" prop="format">
            <el-radio-group v-model="chooseDataForm.format">
              <el-radio label="MDB">MDB</el-radio>
              <el-radio label="CAD">CAD</el-radio>
              <el-radio label="Both"> MDB和CAD</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label=" 工程编号：" prop="code">
            <el-input v-model="chooseDataForm.code"></el-input>
          </el-form-item>
          <el-form-item label=" 工程名称：" prop="name">
            <el-input v-model="chooseDataForm.name"></el-input>
          </el-form-item>
          <el-form-item label=" 迁出时间：" prop="date">
            <el-date-picker v-model="chooseDataForm.date" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-form>
        <div class="flex justify-center items-center w-full mt-10">
          <el-button type="" @click="currentStep = 'select'">上一步</el-button>
          <el-button type="primary" @click="currentStep = 'export'">下一步</el-button>
        </div>
      </div>
      <!-- 第三步：数据迁出 -->
      <div class="w-full  m-auto p-2 mt-10" v-if="currentStep === 'export'">
        <h2 class="text-center text-xl">迁出成功！</h2>
        <div class="mt-5">
          <span class="theme-text-color">迁出信息统计：</span>本次迁出数据表308个，管线数量94521条，管线长度1446235.254米，管点数量84521个，管线面0个。
        </div>
        <div class="mt-10">
          <DataTable :data="ruleTable" :columns="ruleColumns" @selection-change="handleSelectionChange"
            :tableProps="{ selectable: false, border: true }">
          </DataTable>
        </div>
        <div class="text-center mt-10">
          <el-button type="primary" @click="onsuccess">完成</el-button>
        </div>
      </div>

    </div>
    <div v-show="globalStore.isShowRightPanelBody" class="w-full relative h-full flex justify-center items-center">
      <MapView>
        <template v-slot:mapContainter>
          <RightPanel title="确定范围" :isAction="true" @onClose="handleClose">
            <template v-slot:rightPanel>
              <Tab class="w-2/3" :tabs="tabs" @onchage="tabChange" />
              <AnalysisRangeForUpload v-show="activeTab === 'import'" class="mt-4" />
              <AnalysisRangeForDraw v-show="activeTab === 'draw'" class="mt-4" />
            </template>
          </RightPanel>
        </template>
      </MapView>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>