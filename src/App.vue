<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import useResponsiveFontSize from '@/hooks/useResponsiveFontSize';
// const fontSize = useResponsiveFontSize();
// console.log(fontSize);
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="h-full w-full text-sm">
      <router-view />
    </div>
  </el-config-provider>
</template>
