<script setup>
import { onMounted, ref } from 'vue'

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: {
        type: String,
        default: 'leave'
    }
})

const { modelValue } = props
const types = [
    { name: "全景", value: "scene" },
    { name: "影像", value: "raster" },
    { name: "矢量", value: "vector" },

]
const mapTypes = ref(types)
const typeTo = ref('leave')

const onMouse = (type) => {
    typeTo.value = type === 'enter' ? 'leave' : 'enter'
    const item1 = document.querySelector('.map-wrap-item-0')
    const item2 = document.querySelector('.map-wrap-item-1')
    const width1 = item1.offsetWidth
    const width2 = item2.offsetWidth
    item1.style.right = `${type === 'enter' ? width1 * 2 : 30}px`
    item2.style.right = `${type === 'enter' ? width2 : 15}px`
}

/**
 * 为了适配浏览器的仿真模式的hover事件效果，生产需要去掉
 */
const onMapTypeClick = () => {
    onMouse(typeTo.value)
}

onMounted(() => {
    onMouse('leave')
})
</script>

<template>
    <div class="">
        <div class="map-type relative bg-1 w-24 h-16  flex" @mouseenter="onMouse('enter')"
            @mouseleave="onMouse('leave')" @click="onMapTypeClick">
            <div :class="`map-wrap-item-${index} group absolute duration-300 ease-in-out px-1 rounded-sm w-24 h-16  ${modelValue === type.value ? 'active' : ''}`"
                @click="emits('update:modelValue', type.value)" v-for="(type, index) in mapTypes" :key="type.value">
                <div
                    :class="`map-type-item-${index} border-2 rounded-sm w-full h-full px-1 bg-size relative hover:cursor-pointer`">
                    <div
                        :class="`absolute ${modelValue === type.value ? 'theme-bg' : ''}  text-sm p-1 text-center text-white bottom-0 right-0`">
                        {{ type.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.map-wrap-item-0,
.ma p-1,
.map-wrap-item-2 {
    // border: 1px solid #0799d5;

    &:hover {
        // border-color: #5ae758;
    }
}

.active {
    // border: 3px solid #0799d5;
}

.map-type {

    .map-type-item-0 {
        background-image: url('@/assets/images/main/maptype-panorama.png');
        border-color: var(--el-color-primary);
    }

    .map-type-item-2 {
        background-image: url('@/assets/images/main/maptype-default.png');
        border-color: var(--el-color-primary);

    }

    .map-type-item-1 {
        background-image: url('@/assets/images/main/maptype-image.png');
        border-color: var(--el-color-primary);

    }
}
</style>