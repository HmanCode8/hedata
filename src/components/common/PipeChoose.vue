<script setup>
import { ref, watch } from 'vue';
import { Search } from '@element-plus/icons-vue'

const props = defineProps({
    pipeList: {
        type: Array,
        default: () => [
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
        ]
    }
})
{/* <PipeChoose v-model="formData.taskLayer" :pipeList="pipes" /> */ }

const emits = defineEmits(['onchange'])
const searchVal = ref('')
const checkedPipe = ref([])
const isReverse = ref(false)

// const filterPipeList = (val) => {
//     return props.pipeList.filter(pipe => {
//         return pipe.name.includes(val)
//     })
// }

watch(() => checkedPipe.value, (val) => {
    emits('onchange', val)
})
const selectAll = () => {
    checkedPipe.value = props.pipeList.map(p => p.value)
    isReverse.value = false
}

const selectReverse = () => {
    checkedPipe.value = props.pipeList.filter(p => !checkedPipe.value.includes(p.value)).map(p => p.value)
    isReverse.value = true
}

const handleCheckedCitiesChange = (value) => {
    checkedPipe.value = value
}

</script>

<template>
    <div class="flex w-full justify-between mb-2">
        <!-- <span>任务图层：</span> -->
        <el-input class="w-2/3" clearable v-model="searchVal" placeholder="请输入关键字">
            <template #suffix>
                <el-icon class="el-input__icon">
                    <Search />
                </el-icon>
            </template>
        </el-input>
        <el-button :type="checkedPipe.length === props.pipeList.length ? 'primary' : ''"
            @click="selectAll">全选</el-button>
        <el-button :type="isReverse ? 'primary' : ''" @click="selectReverse">反选</el-button>
    </div>
    <div class="border p-2 w-full">
        <el-checkbox-group v-model="checkedPipe" @change="handleCheckedCitiesChange">
            <el-row>
                <el-col v-for="p in props.pipeList" :key="p.value" :span="8">
                    <el-checkbox :value="p.value">
                        {{ p.name }}
                    </el-checkbox>
                </el-col>
            </el-row>
        </el-checkbox-group>
    </div>
</template>

<style scoped lang="scss"></style>