<script setup>
import { ref, reactive, computed } from 'vue';
import _ from 'lodash';

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    columns: {
        type: Array,
        required: true
    },
    tableProps: {
        type: Object,
        default: () => ({})
    }
});

const pageParams = ref({ page: 1, size: 2 });
const filterKey = ref('');
const filterValue = ref('');
const sortKey = reactive({ key: '', order: '' });

const handleSort = (sort) => {
    sortKey.key = sort.key;
    sortKey.order = sort.order;
};

const handleFilter = (item) => {
    console.log(item);
    filterKey.value = item.key;
};

const noSortAndFilter = computed(() => (k) => k.noSortAndFilter);

const nextColumns = computed(() => data => {
    return _.map(data, (c) => {
        let key = c.key;
        let label = c.label;
        if (!_.isEmpty(c.prop)) {
            key = c.prop
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

const handlePageChange = (page) => {
    pageParams.value.page = page;
};
const total = computed(() => props.data.length);

const filterData = computed(() => {
    let data = props.data;
    //刷选
    if (!_.isEmpty(filterKey.value) && !_.isEmpty(filterValue.value)) {
        data = _.filter(data, (item) => {
            return item[filterKey.value].toString().includes(filterValue.value);
        });
    }
    //排序
    if (!_.isEmpty(sortKey)) {
        data = _.orderBy(data, [sortKey.key], [sortKey.order]);
    }
    return data;
});

</script>

<template>
    <div class="">
        <el-table :height="tableProps.height || 260" border :data="filterData">
            <el-table-column v-if="tableProps.selectable" type="selection" width="55" />
            <el-table-column v-for="column in nextColumns(props.columns)" :key="column.key" :prop="column.key"
                :align="column.align || 'center'" :label="column.label" :width="column.width">
                <template #header>
                    <div class="flex justify-center text-md items-center">
                        <span>
                            {{ column.label }}
                        </span>
                        <div class="flex items-center" v-if="!noSortAndFilter(column)">
                            <div class="flex flex-col  items-center"> <el-icon>
                                    <CaretTop
                                        :class="`mt-[4px] hover:cursor-pointer ${sortKey.key === column.key && sortKey.order === 'asc' ? 'theme-text-color' : 'text-gray-400'}`"
                                        @click="handleSort({ key: column.key, order: 'asc' })" />
                                </el-icon>
                                <el-icon>
                                    <CaretBottom
                                        :class="`mt-[-4px] hover:cursor-pointer ${sortKey.key === column.key && sortKey.order === 'desc' ? 'theme-text-color' : 'text-gray-400'}`"
                                        @click="handleSort({ key: column.key, order: 'desc' })" />
                                </el-icon>
                            </div>
                            <el-popover placement="bottom" title="筛选" :width="200" trigger="click">
                                <template #reference>
                                    <el-icon>
                                        <Filter
                                            :class="`font-bold ${filterKey === column.key ? 'theme-text-color' : ''}`"
                                            @click="handleFilter(column)" class="hover:cursor-pointer" />
                                    </el-icon>
                                </template>
                                <template #default>
                                    <el-input clearable v-model="filterValue" placeholder="请输入关键字">
                                        <!-- <template #suffix>
                                            <el-icon class="el-input__icon">
                                                <Search />
                                            </el-icon>
                                        </template> -->
                                    </el-input>
                                </template>
                            </el-popover>
                        </div>
                    </div>
                </template>
                <template #default="scope">
                    <slot v-if="column.slot" :row="scope.row" :column="column" name="cell"></slot>
                    <span v-else>
                        {{ scope.row[column.key] }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <slot name="action" :row="scope.row"></slot>
                </template>
            </el-table-column>
        </el-table>
        <div class="mt-2 flex justify-end">
            <el-pagination layout="prev, pager, next, total" background :current-page="pageParams.page"
                :page-size="pageParams.size" :total="total" @current-change="handlePageChange"> </el-pagination>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>