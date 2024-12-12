import _ from 'lodash';
function useDataFormat() {
  const boundsToWKT = (bounds) => {
    if (bounds.length === 2) {
      // 如果是一个点的数据
      const [x, y] = bounds;
      return `POINT(${x} ${y})`;
    } else if (bounds.length === 4) {
      // 如果是一个范围的数据
      // 1.矩形左下角：(xmin, ymin)
      // 2.	矩形右下角：(xmax, ymin)
      // 3.	矩形右上角：(xmax, ymax)
      // 4.	矩形左上角：(xmin, ymax)
      const [xmin, ymin, xmax, ymax] = bounds;
      return `POLYGON((${xmin} ${ymin}, ${xmax} ${ymin}, ${xmax} ${ymax}, ${xmin} ${ymax}, ${xmin} ${ymin}))`;
    } else {
      // 处理非法输入
      throw new Error(
        'Invalid input: bounds must be an array of 2 (point) or 4 (bounding box) numbers.',
      );
    }
  };

  const wktToBounds = (wkt) => {
    const [type, coordinates] = _.filter(wkt.split('('), (s) => s !== '');
    const [x, y] = coordinates.split(' ');
    if (type === 'POINT') {
      return [parseFloat(x), parseFloat(y)];
    } else if (type === 'POLYGON') {
      const [xmin, ymin, xmax, ymax] = coordinates.split(', ');
      return [
        parseFloat(xmin),
        parseFloat(ymin),
        parseFloat(xmax),
        parseFloat(ymax),
      ];
    } else {
      // 处理非法输入
      throw new Error('Invalid input: wkt must be a valid WKT string.');
    }
  };

  const wktToGeoJSON = (wkt) => {
    const [type, coordinates] = _.filter(wkt.split('('), (s) => s !== '');
    if (type === 'POINT') {
      const [x, y] = coordinates.split(' ');
      return { type: 'Point', coordinates: [parseFloat(x), parseFloat(y)] };
    } else if (type === 'POLYGON') {
      const [xmin, ymin, xmax, ymax] = coordinates.split(', ');
      return {
        type: 'Polygon',
        coordinates: [
          [
            [parseFloat(xmin), parseFloat(ymin)],
            [parseFloat(xmax), parseFloat(ymin)],
            [parseFloat(xmax), parseFloat(ymax)],
            [parseFloat(xmin), parseFloat(ymax)],
            [parseFloat(xmin), parseFloat(ymin)],
          ],
        ],
      };
    } else {
      // 处理非法输入
      throw new Error('Invalid input: wkt must be a valid WKT string.');
    }
  };

  const geoJSONToWKT = (geojson) => {
    const { type, coordinates } = geojson;
    if (type === 'Point') {
      const [x, y] = coordinates;
      return `POINT(${x} ${y})`;
    } else if (type === 'Polygon') {
      const [
        [
          [xmin1, ymin1],
          [xmax2, ymin2],
          [xmax1, ymax1],
          [xmin2, ymax2],
          [xmin3, ymin3],
        ],
      ] = coordinates;
      return `POLYGON((${xmin1} ${ymin1}, ${xmax2} ${ymin2}, ${xmax1} ${ymax1}, ${xmin2} ${ymax2}, ${xmin3} ${ymin3}))`;
    } else {
      // 处理非法输入
      throw new Error('Invalid input: geojson must be a valid GeoJSON object.');
    }
  };
  return { boundsToWKT, wktToBounds, wktToGeoJSON, geoJSONToWKT };
}
export default useDataFormat;
