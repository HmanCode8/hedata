import Polygon from 'ol/geom/Polygon';
// import { getArea, getLength } from 'ol/sphere'
import LineString from 'ol/geom/LineString';
// 截取url参数
function getQueryString(key) {
  const href = window.location.href;
  const reg = new RegExp(key + '=([^&^#]+)');
  const march = reg.exec(href);
  if (march != null) {
    const value = march[1];
    return value;
  }
  return '';
}

// 构建树结构的函数
function buildTree(data, parentId = 'pid', chilId = 'id') {
  const map = {}; // 存储所有节点的映射
  const result = []; // 用于存储最终的树结构

  // 创建一个映射，每个 id 对应一个对象
  data.forEach((item) => {
    map[item[chilId]] = { ...item, children: [] };
  });

  // 遍历数据并构建树结构
  data.forEach((item) => {
    if (item[parentId] === null) {
      // 根节点没有父节点，直接添加到结果数组
      result.push(map[item[chilId]]);
    } else {
      // 非根节点，找到其父节点并添加到父节点的 children 中
      if (map[item[parentId]]) {
        map[item[parentId]].children.push(map[item[chilId]]);
      }
    }
  });

  return result;
}

/**
 * @description: 计算获取polygon的面积
 * @param {Array} coordinates 面的坐标范围
 * @return {*}
 */
function getPolygonArea(coordinates) {
  let polygon = new Polygon(coordinates);
  let area = polygon.getArea().toFixed(3);
  return area;
}

/**
 * @description: 计算获取polygon的长度
 * @param {Array} coordinates 面还有线的坐标范围
 * @return {*}
 */
function getPolygonLength(coordinates) {
  let lineString = new LineString(coordinates);
  let length = lineString.getLength().toFixed(3);
  return length;
}
export { getQueryString, buildTree, getPolygonArea, getPolygonLength };
