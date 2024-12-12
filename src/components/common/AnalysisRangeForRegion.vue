<script setup>
import { ref } from 'vue';
import _ from 'lodash'
const cities = ref([
    {
        name: '成华区',
        value: 'chenghuaqu'
    },
    {
        name: '崇州市',
        value: 'chongzhou'
    },
    {
        name: '大邑县',
        value: 'dayixian'
    },
    {
        name: '高新区',
        value: 'gaoxinxiqu'
    },
    {
        name: '金牛区',
        value: 'jinniuqu'
    },
    {
        name: '龙泉驿区',
        value: 'longquanyiqu'
    },
    {
        name: '郫都市',
        value: 'pudu'
    },
    {
        name: '青羊区',
        value: 'qingyangqu'
    },
    {
        name: '邛崃市',
        value: 'qionglai'
    },
    {
        name: '双流区',
        value: 'shuangliuqu'
    }
])
const isIndeterminate = ref(true)
const checkedCities = ref([])
const checkAll = ref(false)

const handleCheckAllChange = (val) => {
    checkedCities.value = val ? _.map(cities.value, 'value') : []
    isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === cities.value.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < cities.value.length
}
</script>

<template>
    <div class="">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
            全市
        </el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-row>
                <el-col :span="8" v-for="city in cities" :key="city.value">
                    <el-checkbox :value="city.value">
                        {{ city.name }}
                    </el-checkbox>
                </el-col>
            </el-row>
        </el-checkbox-group>
    </div>
</template>

<style scoped lang="scss"></style>