<script setup>
import { ref } from 'vue';
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()
const isFullScreen = ref(false)
const isDragging = ref(false)
const startY = ref(0)
const startHeight = ref(0)
const elementHeight = ref(400)
const emits = defineEmits(['onClose'])
const props = defineProps({
  title: {
    type: String,
    default: 'Bottom Panel'
  },
  isAction: {
    type: Boolean,
    default: false
  },
  isNeedHeader: {
    type: Boolean,
    default: true
  }
});
const handleClose = () => {
  if (props.isAction) {
    emits('onClose');
    return;
  }
  globalStore.setBottomPanel(false)
}

const fullChange = () => {
  isFullScreen.value = !isFullScreen.value
}

// 鼠标按下事件
const onDragStart = (event) => {
  isDragging.value = true;
  startY.value = event.clientY;
  startHeight.value = elementHeight.value;

  // 添加全局事件监听
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', onDragEnd);
};

// 鼠标拖动事件
const onDrag = (event) => {
  if (isDragging.value) {
    const deltaY = startY.value - event.clientY; // 计算鼠标移动的距离
    // 设置最小高度限制

    elementHeight.value = Math.max(100, startHeight.value + deltaY); // 更新高度，最小高度限制为 100px
  }
};

// 鼠标释放事件
const onDragEnd = () => {
  isDragging.value = false;
  // 移除全局事件监听
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', onDragEnd);
};
</script>

<template>
  <!-- :style="{ height: elementHeight + 'px' }" -->
  <div :class="`absolute bottom-0 w-full ${isFullScreen ? 'h-full' : 'h-[50%]'} shadow-xl bg-white z-20`">
    <!-- 底部面板插槽组件 -->
    <div v-if="props.isNeedHeader"
      class="panel-header flex justify-between items-center border-b-2 border-gray-100 p-2 cursor-row-resize"
      @mousedown="onDragStart">
      <h2 class="text-xl font-bold">{{ props.title }}</h2>
      <div class="flex items-center">
        <div class="mx-10">
          <slot name="panelHeader"></slot>
          <el-button type="primary" @click="fullChange">全屏</el-button>
        </div>
        <div class="hover:cursor-pointer" @click="handleClose">
          <el-icon class="text-gray-500 font-bold hover:cursor-pointer hover:scale-110" size="28"
            @click="globalStore.setFullPanel(false)">
            <Close />
          </el-icon>
        </div>
      </div>
    </div>
    <div class="mx-1">
      <slot name="bottomPanel"></slot>

    </div>
  </div>
</template>

<style scoped lang="scss"></style>