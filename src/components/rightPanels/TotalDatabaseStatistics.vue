<script setup>
import { useGlobalStore } from '@/stores/global'
const globalStore = useGlobalStore()

const handleStatisc = () => {
    globalStore.setResultPanel(true)
}
</script>

<template>
    <div v-show="!globalStore.isShowResultPanel" class="mb-10">
        <div class="p-2 theme-primary mt-4">选择数据库类型</div>
        <div class="mt-4">
            <el-radio-group v-model="radio">
                <el-row>
                    <el-col :span="12">
                        <el-radio :value="1">始库（普查</el-radio>
                    </el-col>
                    <el-col :span="12">
                        <el-radio :value="2">原始库（竣工测量）</el-radio>
                    </el-col>

                    <el-col :span="12">
                        <el-radio :value="3">生产库</el-radio>
                    </el-col>
                    <el-col :span="12">
                        <el-radio :value="4">成果库</el-radio>
                    </el-col>

                </el-row>
            </el-radio-group>
        </div>

        <div class="flex justify-end mt-4">
            <el-button type="default" class="mx-2">重置</el-button>
            <el-button type="primary" class="mx-2" @click="handleStatisc">统计</el-button>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>