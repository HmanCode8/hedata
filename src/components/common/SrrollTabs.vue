<script setup>
import { ref, computed } from 'vue';

// Props
const props = defineProps({
    modelValue: {
        type: String,
        required: true, // 当前选中的 tab 的 name 值
    },
    tabs: {
        type: Array,
        required: true, // tab 数据列表，格式：[{ name: 'tab1', label: 'Tab 1' }]
    },
});

// Emits
// const emit = defineEmits(['update:modelValue']);

// 当前活动的 tab
const activeTab = computed(() => props.modelValue);

// 滚动条处理
const tabsRef = ref(null);

const scrollLeft = () => {
    if (tabsRef.value) tabsRef.value.scrollLeft -= 50;
};

const scrollRight = () => {
    if (tabsRef.value) tabsRef.value.scrollLeft += 50;
};
</script>

<template>
    <div class="">
        <div class="flex items-center duration-300">
            <el-icon>
                <ArrowLeftBold @click="scrollLeft"
                    class="hover:text-gray-500 hover:cursor-pointer hover:theme-text-color text-xl" />
            </el-icon>
            <div class="flex" ref="tabsRef">
                <div class="1">
                    <div v-for="tab, i in tabs" :key="tab.name + i"
                        :class="['tab-item', { active: activeTab === tab.name + i }]"
                        @click="$emit('update:modelValue', tab.name + i)">
                        {{ tab.label }}
                    </div>
                </div>
            </div>
            <el-icon>
                <ArrowRightBold @click="scrollRight"
                    class="hover:text-gray-500 hover:cursor-pointer hover:theme-text-color text-xl" />
            </el-icon>
        </div>

        <!-- Tabs Content -->
        <div class="tabs-content">
            dada
            <slot :name="activeTab" />
        </div>
    </div>
</template>

<style scoped>
.tabs-scroll {
    overflow-x: auto;
    flex: 1;
    white-space: nowrap;
    scrollbar-width: none;
    /* Hide scrollbar */
}

.tabs-scroll::-webkit-scrollbar {
    display: none;
}

.tabs-list {
    display: flex;
    align-items: center;
}

.tab-item {
    padding: 10px 20px;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
}

.tab-item.active {
    color: #409eff;
    border-bottom: 2px solid #409eff;
}

.tabs-content {
    padding: 20px;
}
</style>