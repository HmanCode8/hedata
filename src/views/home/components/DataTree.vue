<script setup>
import { ref } from 'vue';
import { getResourceTree } from '@/services/userData'
import { buildTree } from '@/utils';

import { useGlobalStore } from '@/stores/global';

const globalStore = useGlobalStore()
const treeData = ref([])
const currentDb = ref({})
const expandKeys = ref(['pipeline'])
const props = {
    value: 'layerid',
    label: 'layername',
    children: 'children'
}
/**
 * 获取资源树
 */
const handleGetResourceTree = async () => {
    const res = await getResourceTree({ syskey: window.clientId })
    if (res.code === 200) {
        const { Data = [] } = res.data
        if (Data.length === 0) {
            ElNotification({
                title: '提示',
                message: '当前用户没有任何数据服务',
            })
            return
        }
        const d = buildTree(Data)
        treeData.value = d
        currentDb.value = d[0].children[0]
    }
}

handleGetResourceTree()


const changeDb = (db) => {
    console.log(db)
    currentDb.value = db
    db.resourceAndLayers[0].layerinfos
}
const onExpand = ({ key }) => {
    if (expandKeys.value.includes(key)) {
        expandKeys.value = expandKeys.value.filter(k => k !== key)
    } else {
        expandKeys.value.push(key)
    }
}

</script>

<template>
    <div
        :class="`${globalStore.isShowDataTree ? 'w-[20%]' : 'w-0'} bg-white h-[full] overflow-auto duration-200 ease-in-out`">
        <template v-if="treeData.length > 0">
            <div class="flex w-full my-2 flex-col items-center justify-between cursor-pointer"
                v-for="d, index in [...treeData, ...treeData]" :key="d.key" @click="onExpand(d)">
                <div class="w-full theme-expand border-b border-gray-200 h-10 flex items-center justify-between">
                    <div class="flex text-black h-full items-center">
                        <div class="w-1 h-full theme-bg"></div>
                        <span class="ml-2"> {{ d.title }}</span>
                    </div>
                    <div class="theme-text-color mr-1 flex" v-if="index === 0">
                        <el-dropdown>
                            <div class="theme-text-color mx-1">
                                <el-icon>
                                    <Switch />
                                </el-icon>{{ currentDb.title }}
                            </div>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="changeDb(c)" v-for="c in d.children" :key="c.id">
                                        {{ c.title }}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        <el-icon>
                            <CaretBottom v-if="expandKeys.includes(d.key)" />
                            <CaretRight v-else />
                        </el-icon>
                    </div>
                </div>
                <transition name="el-zoom-in-top">
                    <div v-if="expandKeys.includes(d.key)" class="tree-container w-full pr-2">
                        <el-tree-v2 style="max-width: 600px" :data="currentDb.resourceAndLayers[0].layerinfos"
                            :props="props" show-checkbox :height="808" />
                    </div>
                </transition>
            </div>
        </template>
        <div v-else class="flex border h-[90%] text-primary-color my-2 flex-col items-center justify-center">
            暂无数据~~
        </div>
    </div>
</template>

<style scoped lang="scss"></style>