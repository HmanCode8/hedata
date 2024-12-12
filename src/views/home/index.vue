<script setup>
import { ref, watch } from 'vue';
import _ from 'lodash';

// // Home组件
import Header from './components/DataHeader.vue';
import DataTree from './components/DataTree.vue';
import MapView from '@/components/common/MapView.vue';

// 公共组件
import RightPanel from '@/components/common/RightPanel.vue';
import BottomPanel from '@/components/common/BottomPanel.vue';
import FullPanel from '@/components/common/FullPanel.vue';
import AnalysisResult from '@/components/common/AnalysisResult.vue';

import { useGlobalStore } from '@/stores/global';

const globalStore = useGlobalStore()

const fullPanels = import.meta.glob('../../components/fullPanels/*.vue', {
  eager: true,
  import: 'default'
})
const rightPanels = import.meta.glob('../../components/rightPanels/*.vue', {
  eager: true,
  import: 'default'
})
const bottomPanels = import.meta.glob('../../components/bottomPanels/*.vue', {
  eager: true,
  import: 'default'
})

const pages = {
  ...fullPanels,
  ...rightPanels,
  ...bottomPanels
}
const componentMap = {}
Object.entries(pages).forEach(([key, value]) => {
  const k = key.replace('../../components/', '').split('/')[0]
  componentMap[key.replace(`../../components/${k}/`, '').replace('.vue', '')] = value
})
console.log(pages)
const conponentKey = ref('');
const panelTitle = ref('');

const panelVisibleMap = {
  fullPanel: 'setFullPanel',
  rightPanel: 'setRightPanel',
  bottomPanel: 'setBottomPanel',
}
const onMuneChange = (mune) => {
  const { extendatt = '{}', title, execute } = mune
  const { panel = '{}' } = JSON.parse(extendatt)
  if (_.isEmpty(panel) || _.isEmpty(execute)) {
    ElMessage.error('此菜单没有配置面板组件')
    return
  } else {
    globalStore[panelVisibleMap[panel]](true)
    conponentKey.value = execute
  }
  panelTitle.value = title
};

//属性查询
watch(() => globalStore.isShowAttributePanel, () => {
  globalStore.setRightPanel(true)
  conponentKey.value = 'AttributeQuery'
  panelTitle.value = '属性查询'
})

</script>

<template>
  <div class="home-page h-full w-full">
    <Header @onMuneChange="onMuneChange" />
    <div v-show="!globalStore.isShowFullPanel" class="h-content flex h-home-container-height w-full">
      <div class="flex w-full h-full">
        <DataTree />
        <div class="flex-grow border h-full text-zinc-900 relative">
          <MapView pnode="home" />
          <template v-if="!globalStore.isShowResultPanel">
            <RightPanel :title="panelTitle" v-if="globalStore.isShowRightPanel">
              <template v-slot:rightPanel>
                <!-- 动态组件渲染 -->
                <component :is="componentMap[conponentKey]" />
              </template>
            </RightPanel>
            <BottomPanel :title="panelTitle" v-if="globalStore.isShowBottomPanel" :isNeedHeader="false">
              <template v-slot:panelHeader>
                <!-- 动态组件渲染 -->
              </template>
              <template v-slot:bottomPanel>
                <!-- 动态组件渲染 -->
                <component :is="componentMap[conponentKey]" />
              </template>
            </BottomPanel>
          </template>
          <AnalysisResult v-else />
        </div>
      </div>
    </div>
    <div v-show="globalStore.isShowFullPanel" class="w-full">
      <FullPanel :title="panelTitle">
        <template v-slot:panelHeader>
          <!-- <div>啊大大</div> -->
        </template>
        <template v-slot:fullPanel>
          <component :is="componentMap[conponentKey]" />
        </template>
      </FullPanel>
    </div>
  </div>

  <!-- 主题切换 -->
  <ThemeSwitcher />
</template>

<style scoped lang="scss"></style>