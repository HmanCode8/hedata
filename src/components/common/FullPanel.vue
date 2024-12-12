<script setup>
import { onMounted } from 'vue';
import { useGlobalStore } from '@/stores/global'


const globalStore = useGlobalStore()
const props = defineProps({
  title: {
    type: String,
    default: '全屏面板'
  }
});

//绑定ESC按键关闭全屏面板
onMounted(() => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      globalStore.setFullPanel(false)
    } else if (event.key === 'F11') {
      globalStore.setFullPanelBody(false)
    }
  })
})

const goOn = () => {
  globalStore.isShowRightPanelBody && globalStore.setRightPanelBody(false)
  globalStore.isShowFullPanelBody && globalStore.setFullPanelBody(false)
}
</script>

<template>
  <div class="full-panel w-full h-map-container-height">
    <div class="h-[6%] flex justify-between items-center bg-[#f8f9fa] py-4 px-2">
      <h2 class="text-lg flex items-center font-bold">
        <!-- <div class="border flex items-center shadow-sm p-1 font-bold hover:cursor-pointer">
          <el-icon>
            <Back />
          </el-icon>
        </div> -->
        <span class="ml-2">
          {{ props.title }}
        </span>
      </h2>
      <div class="flex items-center">
        <el-button v-if="globalStore.isShowFullPanelBody || globalStore.isShowRightPanelBody" class="mx-2"
          type="primary" @click="goOn">继续</el-button>
        <el-icon class="text-gray-500 font-bold hover:cursor-pointer hover:scale-110" size="28"
          @click="globalStore.setFullPanel(false)">
          <Close />
        </el-icon>
      </div>
    </div>
    <div class="h-[94%]  w-full">
      <slot name="fullPanel"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>