<script setup>
import { ref } from 'vue';
import _ from 'lodash';
import { useGlobalStore } from '@/stores/global'
const globalStore = useGlobalStore()

const props = defineProps({
    tabs: {
        type: Array,
        required: true,
        default: () => [
            { label: '导入范围', value: 'import' },
            { label: '绘制范围', value: 'draw' },
            { label: '行政区划', value: 'region' },
        ]
    },
    activeTab: {
        type: String,
        required: false,
    }
});

const emits = defineEmits(['onchage']);
const activeTab = ref(props.activeTab || props.tabs[0].value);

const tabChage = (key) => {
    globalStore.setDrawType(key === 'draw')
    activeTab.value = key;
    emits('onchage', _.find(props.tabs, { value: key }));
};

</script>

<template>
    <div class="">
        <div class="flex items-center justify-between  mt-2 ">
            <!-- <div v-for="tab in tabs" :key="props.tabs" @click="tabChage(tab)"
                :class="`flex items-center justify-center p-2 cursor-pointer flex-1 ${activeTab === tab.value ? 'theme-tab-active' : 'border-default'}`">
                <span>{{ tab.label }}</span>
            </div> -->
            <el-segmented block :model-value="activeTab" size="default" :options="tabs" @change="tabChage"
                class="h-10 w-full cursor-pointer" />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>