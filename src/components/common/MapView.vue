<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { fromLonLat } from 'ol/proj';
import useMapTools from '@/hooks/useMap';
import useDataFormat from '@/hooks/useDataFormat';
import MapType from './MapType.vue';
import HomeMapType from '@/views/home/components/MapType.vue';
import { useGlobalStore } from '@/stores/global';
// import { FullScreen, Zoom, defaults as defaultControls } from 'ol/control.js';
import { Zoom } from 'ol/control.js';

const props = defineProps({
    pnode: {
        type: String,
        default: null,
    },
})
const { pnode } = props
// const emits = defineEmits('onchange')
// 全局状态
const globalStore = useGlobalStore();

const PROPERTY_TYPE = [
    { name: '点选', key: 'Point' },
    { name: '框选', key: 'Box' },
    { name: '多边形', key: 'Polygon' },
];
const MAP_TOOLS = [
    { name: 'full-extent', icon: 'icon-quantu', title: '全图' },
    { name: 'property-info', icon: 'icon-shuxing', title: '属性' },
    { name: 'measure-distance', icon: 'icon-ceju', title: '测距' },
    { name: 'draw-polygon', icon: 'icon-cemian', title: '画面' },
    { name: 'fresh', icon: 'icon-shuaxin', title: '刷新' },
    { name: 'clear', icon: 'icon-qingchu', title: '清除' },
];

// 天地图 WMTS 矢量底图配置
const tiandituKey = '8664a502eed8bdeb320ed534ddf372d4';
const wmtsLayer = new TileLayer({
    source: new WMTS({
        url: `http://t2.tianditu.gov.cn/vec_c/wmts?tk=${tiandituKey}`,
        layer: 'vec_c',
        matrixSet: 'c',
        format: 'tiles',
        projection: 'EPSG:3857', // Web Mercator 投影
        tileGrid: new WMTSTileGrid({
            origin: [116.40769, 39.89945], // 左上角坐标
            resolutions: [
                156543.03392800014, 78271.51696400007, 39135.758482000034,
                19567.879241000017, 9783.939620500008, 4891.969810250004,
                2445.984905125002, 1222.992452562501, 611.4962262812505,
                305.7481131406252, 152.8740565703126, 76.4370282851563,
                38.21851414257815, 19.109257071289075, 9.55,
                4.777314267822269, 2.38865, 1.1943,
            ],
            matrixIds: [
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
                '11', '12', '13', '14', '15', '16', '17', '18', '19',
            ],
        }),
        style: 'default',
    }),
});

// 数据与配置
const scale = ref('1:10000');
const selectedTool = ref(null);
const mapView = ref(null);
const map = ref(null);
const toolVisible = ref(false);
const mapType = ref('vector');
const vectorSource = new VectorSource(); // 用于存储绘制内容的矢量源
const vectorLayer = new VectorLayer({
    source: vectorSource,
});

// 使用自定义 Hook
const { initTools, addDrawInteraction, handleMeasure, clearAllFeatures, coordinates, addInteraction } = useMapTools();
const { boundsToWKT, wktToGeoJSON, geoJSONToWKT } = useDataFormat();

watch(() => globalStore.drawType, (val) => {
    val ? handleToolSelect(MAP_TOOLS.find((item) => item.name === 'draw-polygon')) : clearAllFeatures();
});
// 初始化地图
const initMap = () => {
    console.log('---地图初始化·---');
    if (mapView.value) {
        const m = new Map({
            // new FullScreen()
            controls: [new Zoom()],
            target: mapView.value,
            layers: [
                wmtsLayer, // 添加天地图矢量底图
                vectorLayer, // 添加矢量图层
            ],
            view: new View({
                center: fromLonLat([106.41, 38.39]), // 银川地区中心点
                projection: 'EPSG:3857', // Web Mercator 投影
                zoom: 6,
            }),
        });
        map.value = m;
        const view = m.getView();

        // 监听视图缩放级别变化
        view.on('change:resolution', () => {
            const zoom = view.getZoom();
            console.log('缩放级别变化：', zoom);
        })
        // 注册地图工具地图实例和矢量源到 Hook
        initTools(map.value, vectorSource);
        // emits('onchange', { map, vectorSource });
    } else {
        console.error('Map container not found!');
    }
    console.log(mapView, '---map');
};

// 工具选择逻辑
const handleToolSelect = (tool) => {
    selectedTool.value = tool instanceof String ? tool : tool.name;
    if (tool.name === 'draw-polygon') {
        addDrawInteraction('Polygon');
    } else if (tool.name === 'measure-distance') {
        handleMeasure(); // 启用测距功能
    } else if (tool.name === 'clear') {
        clearAllFeatures(); // 执行清除功能
    } else {
        map.value.removeInteraction(null); // 取消当前交互
    }
};

const handleAttributiQuery = async (type) => {
    const gem = await addInteraction(type.key);
    globalStore.setAttributePanel(true)
    console.log(boundsToWKT(gem), '---1');
    console.log(geoJSONToWKT(wktToGeoJSON(boundsToWKT(gem))), '---');
};
// 计算底部高度
const bottomHeight = computed(() => (globalStore.isShowBottomPanel || globalStore.isShowFullPanelBody) && !globalStore.isShowRightPanelBody ? 'bottom-[51%]' : 'bottom-2');

// 挂载时初始化地图
onMounted(() => {
    initMap();
});
</script>
<template>
    <div ref="mapView" class="w-full h-full relative bg-gray-500">
        <!-- <div class="absolute top-1 left-1 z-10 flex items-center">
            <el-input v-model="searchValue" />
            <div class="theme-bg h-10 w-10 flex items-center justify-center rounded-sm">
                <el-icon>
                    <Search />
                </el-icon>
            </div>
        </div> -->
        <div v-if="!(globalStore.isShowRightPanelBody || globalStore.isShowFullPanelBody)"
            class="map-tools flex shadow-md h-10 rounded-md bg-white items-center absolute top-4 right-10 z-10 duration-300 ease-in-out">
            <div v-show="!toolVisible" v-for="tool in MAP_TOOLS" :key="tool.name"
                class="tool-btn w-20 h-full flex items-center justify-center hover:cursor-pointer hover:bg-gray-100"
                @click="handleToolSelect(tool)">
                <el-dropdown>
                    <div class="flex items-center">
                        <i :class="`text-gray-600 px-1 theme-text-color text-xl font-bold iconfont ${tool.icon}`"></i>
                        <span class="tool-title">{{ tool.title }}</span>
                    </div>
                    <template v-if="tool.name === 'property-info'" #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="handleAttributiQuery(type)" v-for="type in PROPERTY_TYPE"
                                :key="type.key">
                                {{ type.name }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div class="hover:cursor-pointer flex justify-center items-center" @click="toolVisible = !toolVisible">
                <!-- 工具箱 -->
                <el-icon v-show="!toolVisible" class="mx-2">
                    <ArrowLeftBold />
                </el-icon>
                <el-icon v-show="toolVisible" class="mx-2">
                    <ArrowRightBold />
                </el-icon>
                <span class="pr-2">{{ !toolVisible ? '' : '工具箱' }}</span>
            </div>

        </div>
        <div :class="`absolute right-1 ${bottomHeight} z-10`">
            <MapType v-if="pnode === 'home'" v-model="mapType" />
            <HomeMapType v-else v-model="mapType" />
        </div>
        <slot name="mapContainter"></slot>
        <div :class="`absolute left-1 ${bottomHeight} text-md font-bold z-10`">
            <!-- 地图比例尺 -->
            <el-select v-model="scale" class="w-28">
                <el-option label="1:10000" value="1:10000"></el-option>
                <el-option label="1:5000" value="1:5000"></el-option>
                <el-option label="1:2500" value="1:2500"></el-option>
                <el-option label="1:1000" value="1:1000"></el-option>
                <el-option label="1:500" value="1:500"></el-option>
            </el-select>
            <span class="mx-1 theme-text-color">X：{{ coordinates.lon }}</span>
            <span class="mx-1 theme-text-color">Y：{{ coordinates.lat }}</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
::v-deep() {
    .el-select__wrapper {
        background: transparent;
        border: none;
    }
}

.ol-control {
    bottom: 10px;
    /* 距离底部10px */
    right: 10px;
    /* 距离右边10px */
    position: absolute;
    /* 绝对定位 */
}
</style>