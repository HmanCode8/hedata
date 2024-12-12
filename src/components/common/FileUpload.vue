<script setup>
import { ref } from 'vue';
const props = defineProps({
    action: {
        type: String,
        default: '上传'
    },
    multiple: {
        type: Boolean,
        default: false
    },
    limit: {
        type: Number,
    }
})


const fileList = ref([]);

const handleUpload = (event) => {
    const files = event.target.files;
    fileList.value = [...fileList.value, ...Array.from(files)];
    console.log(files, 'files');
};
// const files = computed(() => fileList.value.map((file) => file.name).join(','))
const onFileDelete = (file, index) => {
    fileList.value.splice(index, 1);
};
</script>

<template>
    <div class="w-full flex justify-center items-center">
        <!-- 禁用 -->
        <div class="border text-[#b7b9be] px-1 min-h-8 flex flex-wrap w-full mr-1 max-h-20 overflow-auto">
            <div class="m-1 px-2 rounded-md border flex items-center justify-center" v-for="(file, index) in fileList"
                :key="index">
                <div class="flex items-center">
                    <span>
                        {{ file.name }}
                    </span>
                    <el-icon @click="onFileDelete(file, index)"
                        class="close mx-1 hover:cursor-pointer hover:scale-125 hover:text-orange-700 duration-300">
                        <CircleClose />
                    </el-icon>
                </div>
            </div>
        </div>
        <input ref="uploadInput" accept="mdb" hidden type="file" class="border" multiple @change="handleUpload" />
        <el-button type="primary" @click="$refs.uploadInput.click()">{{ props.action }}</el-button>
    </div>
    <!-- 定义上传文件类型插槽： -->
    <div class="mt-2 text-xs text-gray-500">
        <slot name="uploadRemark"></slot>
    </div>
</template>

<style scoped lang="scss">
.close {
    color: var(--el-color-primary);
}
</style>