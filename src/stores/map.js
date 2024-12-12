import { defineStore } from 'pinia';

export const mapGlobalStore = defineStore('map', {
  state: () => ({
    mapRefs: [],
    drawType: 'Polygon1',
  }),
  actions: {
    setMapRefs(val) {
      this.mapRefs.push(val);
    },
    setDrawType(val) {
      this.drawType = val;
    },
  },
});
