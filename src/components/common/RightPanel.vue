<script setup>
import { ref, defineProps, onMounted, onBeforeUnmount } from 'vue';
import { useGlobalStore } from "@/stores/global";

const globalStore = useGlobalStore();

const emits = defineEmits(['onClose']);
const props = defineProps({
  title: {
    type: String,
    default: 'Home'
  },
  panelWidth: {
    type: String,
    default: '40%'
  },
  isAction: {
    type: Boolean,
    default: false
  }
});

// 拖拽状态与偏移量
const isDragging = ref(false);
const position = ref({ top: 60, right: 40 }); // 修改为 right
const dragStart = ref({ x: 0, y: 0 });

// 初始化拖拽事件
const onMouseDown = (event) => {
  isDragging.value = true;
  dragStart.value = { x: event.clientX, y: event.clientY };
};

// 拖拽过程
const onMouseMove = (event) => {
  if (!isDragging.value) return;

  const deltaX = event.clientX - dragStart.value.x;
  const deltaY = event.clientY - dragStart.value.y;

  position.value.right -= deltaX; // 修改为 right
  position.value.top += deltaY;

  dragStart.value = { x: event.clientX, y: event.clientY };
};

// 结束拖拽
const onMouseUp = () => {
  isDragging.value = false;
};

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
});

const handleClose = () => {
  if (props.isAction) {
    emits('onClose');
    return;
  }
  globalStore.setRightPanel(false)
  if (globalStore.isShowAttributePanel) {
    globalStore.setAttributePanel(false)
  }

} // 关闭面板事件
</script>

<template>
  <!-- dad -->
  <div :style="{ top: position.top + 'px', right: position.right + 'px' }"
    :class="`absolute w-[600px] shadow-sm rounded-sm p-2 h-[85%] bg-white z-20 `">
    <!-- 左面板插槽组件 -->
    <div class="panel-header h-[6%] flex justify-between items-center border-b-2 border-gray-300 py-1 cursor-move"
      @mousedown="onMouseDown">
      <h2 class="text-lg font-bold">{{ props.title }}</h2>
      <div class="hover:cursor-pointer" @click="handleClose">
        <el-icon class="text-gray-500 font-bold hover:cursor-pointer hover:scale-110" size="28"
          @click="globalStore.setFullPanel(false)">
          <Close />
        </el-icon>
      </div>
    </div>
    <div class="overflow-auto h-[94%]">
      <slot name="rightPanel"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
