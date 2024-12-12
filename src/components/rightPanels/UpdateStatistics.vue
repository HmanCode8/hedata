<script setup>
import { ref } from 'vue';
import { useGlobalStore } from '@/stores/global'
import Tab from '@/components/common/DataTab.vue'
import AnalysisRangeForUpload from '@/components/common/AnalysisRangeForUpload.vue'
import AnalysisRangeForDraw from '@/components/common/AnalysisRangeForDraw.vue'
import AnalysisRangeForRegion from '@/components/common/AnalysisRangeForRegion.vue'

const globalStore = useGlobalStore()

const dateRange = ref([])
const dbTypes = ref([])
const activeTab = ref('import')

const tabs = [
    { label: '导入范围', value: 'import' },
    { label: '绘制范围', value: 'draw' },
    { label: '行政区划', value: 'region' },
]
const tabChange = (t) => {
    activeTab.value = t.value
}

const handleStatisc = () => {
    globalStore.setResultPanel(true)
}
</script>

<template>
    <div v-show="!globalStore.isShowResultPanel" class="mb-10">
        <div class="text-red-500 my-2"><span class="px-1">*</span>请先在左侧数据目录选择管线图层</div>
        <div class="p-2 theme-primary mt-4">选择时间</div>
        <div class="mt-4">
            选择统计时间：
            <el-date-picker v-model="dateRange" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" />
        </div>
        <div class="p-2 theme-primary mt-4">选择数据库类型</div>
        <div class="mt-4">
            <el-checkbox-group v-model="dbTypes">
                <el-row>
                    <el-col :span="12">
                        <el-checkbox value="原始库（普查）">原始库（普查）</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox value="原始库（竣工测量）">原始库（竣工测量）</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox value="生产库">生产库</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox value="成果库">成果库</el-checkbox>
                    </el-col>
                </el-row>
            </el-checkbox-group>
        </div>
        <Tab class="w-2/3" :tabs="tabs" @onchage="tabChange" />
        <AnalysisRangeForUpload v-show="activeTab === 'import'" class="mt-4" />
        <AnalysisRangeForDraw v-show="activeTab === 'draw'" class="mt-4" />
        <AnalysisRangeForRegion v-show="activeTab === 'region'" class="mt-4" />
        <div class="flex justify-end mt-4">
            <el-button type="default" class="mx-2">重置</el-button>
            <el-button type="primary" class="mx-2" @click="handleStatisc">统计</el-button>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>