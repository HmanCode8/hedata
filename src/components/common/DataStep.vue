<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
    data: {
        type: Array,
    },
    step: {
        type: String
    }
});
const currentStep = ref('');

const emits = defineEmits(['stepOnchage']);
console.log('emits', emits)
watchEffect(() => {
    currentStep.value = props.step
});
const onchange = (step) => {
    console.log('step', step)
    // currentStep.value = step.key
};
</script>

<template>
    <div class="flex w-full m-auto mt-4  p-4 justify-center items-center h-16">
        <div v-for="s, index in props.data" :key="s.key" class="step-item" :class="`flex items-center px-1`"
            @click="onchange(s)">
            <div class="flex items-center">
                <div
                    :class="`h-8 w-8 shadow-sm rounded-full bg-gray-300 flex justify-center items-center ${currentStep === s.key ? 'theme-bg' : ''}`">
                    {{ index + 1 }}</div>
                <div class="px-1">{{ s.title }}</div>
            </div>
            <div v-if="index < props.data.length - 1" class="step-line mx-1 items-center">
                <el-icon class="theme-text-color" v-for="i, index in 20" :key="index">
                    <MoreFilled />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>