<script setup>
import { ref } from 'vue';
import { useGlobalStore } from '@/stores/global'
import _ from 'lodash'
import Tab from '@/components/common/DataTab.vue'
import AnalysisRangeForUpload from '@/components/common/AnalysisRangeForUpload.vue'
import AnalysisRangeForDraw from '@/components/common/AnalysisRangeForDraw.vue'
import AnalysisRangeForRegion from '@/components/common/AnalysisRangeForRegion.vue'

const tabs = [
  { label: '导入范围', value: 'import' },
  { label: '绘制范围', value: 'draw' },
  { label: '行政区划', value: 'region' },
]
const activeTab = ref('import')
const globalStore = useGlobalStore()
const tabChange = (t) => {
  activeTab.value = t.value
}

const WHERE_FIELD = {
  pipeType: '',
  pipeField: '',
  pipeValue: '',
  pipeOperator: '',
}
const wheres = ref([
  WHERE_FIELD
])

const handleAddWhere = (index) => {
  wheres.value.splice(index + 1, 0, _.cloneDeep(WHERE_FIELD))
}
const handleQuery = () => {
  console.log(wheres.value)
  globalStore.setResultPanel(true)
}
</script>

<template>
  <div v-show="!globalStore.isShowResultPanel" class="mb-10">
    <div class="text-red-500 my-2"><span class="px-1">*</span>请先在左侧数据目录选择管线图层</div>
    <div class="p-2 theme-primary mt-4">确定范围</div>
    <Tab class="w-2/3" :tabs="tabs" @onchage="tabChange" />
    <AnalysisRangeForUpload v-show="activeTab === 'import'" class="mt-4" />
    <AnalysisRangeForDraw v-show="activeTab === 'draw'" class="mt-4" />
    <AnalysisRangeForRegion v-show="activeTab === 'region'" class="mt-4" />
    <div class="p-2 theme-primary mt-4">选择条件</div>
    <div class="mt-5">
      <div v-for="w, index in wheres" :key="w" class=" p-2 mb-2">
        <div class="flex items-center justify-between my-2">
          <div>查询条件{{ index + 1 }}：</div>
          <el-icon>
            <Plus @click="handleAddWhere(index)" class="font-bold text-3xl theme-text-color cursor-pointer" />
          </el-icon>
        </div>
        <div class="flex items-center justify-between my-2">
          <div class="w-1/3"> 选择字段：</div>
          <el-select class="mx-1" v-model="w.pipeType" placeholder="请选择管线类型">
            <el-option label="字段1" value="字段1"></el-option>
            <el-option label="字段2" value="字段2"></el-option>
          </el-select>
          <el-select class="mx-1" v-model="w.pipeField" placeholder="请选择字段">
            <el-option label="字段1" value="字段1"></el-option>
            <el-option label="字段2" value="字段2"></el-option>
          </el-select>
        </div>
        <div class="flex items-center justify-between my-2">
          <div class="w-1/3"> 选择条件：</div>
          <el-select class="mx-1" v-model="w.pipeOperator" placeholder="请选择条件">
            <el-option label="等于" value="="></el-option>
            <el-option label="不等于" value="!="></el-option>
            <el-option label="大于" value=">"></el-option>
            <el-option label="小于" value="<"></el-option>
            <el-option label="大于等于" value=">="></el-option>
            <el-option label="小于等于" value="<="></el-option>
          </el-select>
          <el-input class="mx-1" v-model="w.pipeValue" placeholder="请输入值"></el-input>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <el-button type="default" class="mx-2">重置</el-button>
      <el-button type="primary" class="mx-2" @click="handleQuery">查询</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>