<script setup>
import { ref, computed } from 'vue';
import { ArrowRightBold, Search } from '@element-plus/icons-vue'
import _ from 'lodash';


const fileInput = ref(null);
const searchVal = ref('');
const fileList = ref([]);

const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
}

const columns = [
    {
        label: '名称',
        key: 'name',
        align: 'center',
        slot: true
    },
    {
        label: '修改日期',
        key: 'updateTime',
        align: 'center',
    },
    {
        label: '大小',
        key: 'size',
        align: 'center',
    },

]

const tableData = ref([
    {
        name: '附件1',
        updateTime: '2022-01-01',
        size: '100KB',
        index: 1,
        data: [
            {
                name: '文件1',
                updateTime: '2022-01-01',
                type: 'doc',
                size: '100KB',
                index: 1,
            },
            {
                name: '文件2',
                updateTime: '2022-01-02',
                size: '200KB',
                type: 'pdf',
                index: 2,
            },
            {
                name: '文件3',
                updateTime: '2022-01-03',
                size: '300KB',
                type: 'ppt',
                index: 3,
            },
            {
                name: '文件4',
                updateTime: '2022-01-04',
                size: '400KB',
                type: 'txt',
                index: 4,
            },
        ]
    },
    {
        name: '附件2',
        updateTime: '2022-01-02',
        size: '200KB',
        data: [
            {
                name: '文件1',
                updateTime: '2022-01-01',
                size: '100KB',
                type: 'doc',
                index: 1,
            },
            {
                name: '文件2',
                updateTime: '2022-01-02',
                size: '200KB',
                type: 'pdf',
                index: 2,
            },
            {
                name: '文件3',
                updateTime: '2022-01-03',
                size: '300KB',
                type: 'ppt',
                index: 3,
            },
        ]
    },
    {
        name: '附件3',
        updateTime: '2022-01-03',
        size: '300KB'
    },
    {
        name: '文件4',
        updateTime: '2022-01-04',
        size: '400KB'
    },
]);

const handleSelectionChange = (selection) => {
    console.log(selection);
}

const handleOk = () => {
    ElMessageBox.confirm(
        '本次附件修改是否同步至项目“<span class="theme-text-color">XMBH20230314002</span>”?',
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            // type: 'info',
            dangerouslyUseHTMLString: true,
        }
    )
        .then(() => {
            // globalStore.setAttributePanel(false)
            // globalStore.setAttachmentView(false)
            // globalStore.setRightPanel(false)
            ElMessage({
                type: 'success',
                message: '保存成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
    console.log('确定');
}
const renderdata = computed(() => _.isEmpty(fileList.value) ? tableData.value : fileList.value)

const handleRowClick = (row) => {
    console.log(row);
    fileList.value = row.data;
}

const preStep = () => {
    fileList.value = [];
    console.log('上一步');
}
const nextStep = () => {
    console.log('下一步');
}
</script>

<template>
    <div class="flex justify-between items-center">
        <!-- 搜索 -->
        <el-input class="w-[60%] rounded-md" v-model="searchVal" placeholder="请输入关键字" clearable :prefix-icon="Search" />
        <div class="flex items-center">
            <div class="flex items-center theme-text-color"> <el-icon>
                    <Delete />
                </el-icon>删除</div>
            <input ref="fileInput" hidden type="file" name="file" id="file" @change="handleFileChange" />
            <div class="flex items-center mx-2 theme-text-color hover:cursor-pointer" @click="fileInput.click()">
                <el-icon>
                    <el-icon>
                        <Upload />
                    </el-icon>
                </el-icon>上传
            </div>
            <div class="flex items-center theme-text-color">
                <el-icon>
                    <Download />
                </el-icon>下载
            </div>
        </div>
    </div>
    <div class="flex primary-color my-4 border h-10 items-center mb-4">
        <el-icon class="mx-2  hover:cursor-pointer" @click="preStep">
            <ArrowLeftBold />
        </el-icon>
        <el-icon class="mx-2  hover:cursor-pointer" @click="nextStep">
            <ArrowRightBold />
        </el-icon>
        <el-icon class="mx-2 text-xl hover:cursor-pointer">
            <Refresh />
        </el-icon>
        <el-link class="mx-2  hover:cursor-pointer" type="primary">附件1/</el-link>
        <!-- <div class="theme-text-color mx-2">附件1/</div> -->
    </div>
    <DataTable class="mt-4" :data="renderdata" :columns="columns" @row-click="handleRowClick"
        @selection-change="handleSelectionChange" :tableProps="{ selectable: true, border: true }">
        <template #tableColumn="{ row }">
            <div class="flex items-center justify-center">
                <el-icon>
                    <Folder v-if="!row.type" />
                    <Document v-else />
                </el-icon>
                <span class="">{{ row.name }}</span>
            </div>
        </template>
    </DataTable>
    <div class="mt-4 flex justify-end items-center">
        <el-button type="primary" @click="handleOk">确定</el-button>
    </div>
</template>

<style scoped lang="scss"></style>