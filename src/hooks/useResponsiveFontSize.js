import { onMounted, onUnmounted, ref } from 'vue';

export default function useResponsiveFontSize() {
  const fontSize = ref(16); // 默认基准字体大小

  const updateFontSize = () => {
    const width = window.innerWidth;

    // 根据分辨率设置固定字体大小
    if (width >= 1920) {
      fontSize.value = 16; // 1920px 及以上，基准字体 16px
    } else if (width >= 1512) {
      fontSize.value = 12; // 1512px - 1919px，基准字体 14px
    } else {
      fontSize.value = 12; // 小于 1512px，基准字体 12px
    }

    // 更新到 HTML 根节点
    document.documentElement.style.fontSize = `${fontSize.value}px`;
  };

  onMounted(() => {
    updateFontSize();
    window.addEventListener('resize', updateFontSize); // 监听窗口大小变化
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateFontSize); // 清理事件监听
  });

  return fontSize; // 返回当前字体大小
}
