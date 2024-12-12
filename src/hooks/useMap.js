import { ref } from 'vue';
import Draw, { createBox } from 'ol/interaction/Draw.js';
import { unByKey } from 'ol/Observable';

import { getLength } from 'ol/sphere';
import Overlay from 'ol/Overlay';

function useMapTools() {
  const map = ref(null); // 地图实例
  const vectorSource = ref(null); // 矢量源
  const draw = ref(null); // 当前绘制交互
  const attDrawer = ref(null); // 属性编辑器
  const measureTooltipElement = ref(null); // 测距工具的 DOM 元素
  const measureTooltip = ref(null); // 测距工具的 Overlay
  const coordinates = ref({ lon: 0, lat: 0 }); // 鼠标位置的经纬度

  // 注册地图实例和矢量源
  const initTools = (mapInstance, vectorSourceInstance) => {
    map.value = mapInstance;
    vectorSource.value = vectorSourceInstance;

    // 添加鼠标移动事件监听
    map.value.on('pointermove', (event) => {
      const coordinate = map.value.getEventCoordinate(event.originalEvent);
      const [lon, lat] = coordinate;
      coordinates.value = {
        lon: lon.toFixed(6), // 保留 6 位小数
        lat: lat.toFixed(6),
      };
    });
  };

  // 创建测距结果的 Overlay
  const createMeasureTooltip = () => {
    measureTooltipElement.value = document.createElement('div');
    measureTooltipElement.value.className = 'ol-tooltip ol-tooltip-measure';
    measureTooltip.value = new Overlay({
      element: measureTooltipElement.value,
      offset: [0, -15],
      positioning: 'bottom-center',
    });
    map.value.addOverlay(measureTooltip.value);
  };

  // 添加绘制交互
  const addDrawInteraction = (type) => {
    if (!map.value || !vectorSource.value) return;
    if (draw.value) {
      map.value.removeInteraction(draw.value);
    }
    draw.value = new Draw({
      source: vectorSource.value,
      type,
    });
    map.value.addInteraction(draw.value);

    draw.value.on('drawend', () => {
      map.value.removeInteraction(draw.value);
    });
  };

  // 启用测距功能
  const handleMeasure = () => {
    if (!map.value || !vectorSource.value) return;

    if (draw.value) {
      map.value.removeInteraction(draw.value);
    }
    draw.value = new Draw({
      source: vectorSource.value,
      type: 'LineString',
    });
    map.value.addInteraction(draw.value);

    createMeasureTooltip();

    draw.value.on('drawstart', (event) => {
      const geometry = event.feature.getGeometry();
      geometry.on('change', () => {
        const length = getLength(geometry);
        const output =
          length > 1000
            ? (length / 1000).toFixed(2) + ' km'
            : length.toFixed(2) + ' m';
        measureTooltipElement.value.innerHTML = output;
        measureTooltip.value.setPosition(geometry.getLastCoordinate());
      });
    });

    draw.value.on('drawend', () => {
      map.value.removeInteraction(draw.value);
    });
  };

  // 清除所有要素
  const clearAllFeatures = () => {
    if (vectorSource.value) {
      vectorSource.value.clear(); // 清除所有绘制的要素
    }
    if (measureTooltipElement.value) {
      measureTooltipElement.value.innerHTML = ''; // 清空测距结果
    }
  };

  // 属性选择器
  const addInteraction = (type) => {
    return new Promise((resolve, reject) => {
      try {
        // 清除之前的图形
        if (vectorSource.value) {
          vectorSource.value.clear(); // 清除图层中的所有要素
        }

        // 移除之前的绘制交互
        if (attDrawer.value) {
          map.value.removeInteraction(attDrawer.value);
          attDrawer.value = null;
        }

        // 创建新的绘制交互
        let drawInteraction;
        if (type === 'Box') {
          drawInteraction = new Draw({
            source: vectorSource.value,
            type: 'Circle',
            geometryFunction: createBox(),
          });
        } else {
          drawInteraction = new Draw({
            source: vectorSource.value,
            type,
          });
        }

        // 监听绘制结束事件，获取范围数据
        const drawEndListener = drawInteraction.on('drawend', (event) => {
          const feature = event.feature; // 获取当前绘制的要素
          const geometry = feature.getGeometry(); // 获取几何对象

          // 获取范围数据（例如：多边形的边界框或中心点）
          const extent = geometry.getExtent(); // 获取边界框

          // 如果需要范围中心点，可以计算
          const center = [
            (extent[0] + extent[2]) / 2, // x 坐标
            (extent[1] + extent[3]) / 2, // y 坐标
          ];

          // 清除事件监听器以避免重复触发
          unByKey(drawEndListener);
          map.value.removeInteraction(attDrawer.value);
          attDrawer.value = null;
          resolve(type === 'Point' ? center : extent); // 点选返回中心点，其他类型返回范围数据
        });

        attDrawer.value = drawInteraction;
        map.value.addInteraction(drawInteraction);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    map, // 地图实例
    initTools, // 注册地图实例和矢量源
    addDrawInteraction, // 添加绘制交互
    handleMeasure, // 启用测距功能
    clearAllFeatures, // 清除绘制内容
    coordinates, // 实时经纬度
    addInteraction, // 属性选择器
  };
}
export default useMapTools;
