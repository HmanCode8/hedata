<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import _ from 'lodash';
const props = defineProps({
    data: {
        type: Array,
        default: () => []
    },
    columns: {
        type: Array,
        default: () => []
    },
    tableProps: {
        type: Object,
        default: () => ({})
    }
});

const { data, columns, tableProps } = props;

const emits = defineEmits(['row-click', 'selection-change', 'sort-change']);

const selectedRows = ref([]);

function handleSelectionChange(selection) {
    selectedRows.value = selection;
    emits('selection-change', selection);
}

function handleSortChange(sort) {
    console.log(sort);
}
function handleRowClick(row) {
    console.log(row);
    emits('row-click', row);
}

const tableRef = ref(null);

const nextColumns = computed(() => data => {
    return _.map(data, (c) => {
        let key = c.key;
        let label = c.label;
        if (!_.isEmpty(c.prop)) {
            key = c.prop
        }
        if (!_.isEmpty(c.property)) {
            key = c.property
        }
        if (!_.isEmpty(c.label)) {
            label = c.label
        }
        return {
            ...c,
            label,
            key
        }
    })
});
onMounted(() => {
    nextTick(() => {
        console.log('高度', tableRef.value.getBoundingClientRect().height)
    });
});
</script>

<template>
    <div id="table-container" ref="tableRef" class="">
        <el-table header-row-class-name="table-header-row" v-bind="tableProps" :data="data" :height="200"
            highlight-current-row @row-click="handleRowClick" @selection-change="handleSelectionChange"
            @sort-change="handleSortChange">
            <!-- 选择列 -->
            <el-table-column v-if="tableProps.selectable" type="selection" width="55" />
            <!-- 动态生成其他列 -->
            <el-table-column v-for="column in nextColumns(columns)" :key="column.key" :prop="column.key"
                :align="column.align" :label="column.label" :width="column.width">
                <template v-if="column.slot" #default="scope">
                    <slot name="tableColumn" :row="scope.row" :column="column"></slot>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<style scoped lang="scss"></style>
