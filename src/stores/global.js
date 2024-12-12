import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isShowDataTree: true,
    isShowFullPanel: false,
    isShowFullPanelBody: false,
    isShowRightPanelBody: false,
    isShowBottomPanel: false,
    isShowRightPanel: false,
    isShowResultPanel: false,
    isShowAttributePanel: false,
    isShowAttachmentView: false,
    themeVisible: false,
    themeName: '',
    drawType: false,
    userInfo: {},
  }),
  actions: {
    toggleDataTree() {
      this.isShowDataTree = !this.isShowDataTree;
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    // 设置全屏面板显示状态
    setFullPanel(val) {
      this.isShowFullPanel = val;
      this.isShowRightPanel = false;
      this.isShowBottomPanel = false;
      if (!val) {
        this.isShowFullPanelBody = false;
      }
    },
    // 设置全屏面板内容显示状态
    setFullPanelBody(val) {
      this.isShowFullPanelBody = val;
    },
    // 设置右侧面板内容显示状态
    setRightPanelBody(val) {
      this.isShowRightPanelBody = val;
    },
    // 设置底部面板显示状态
    setBottomPanel(val) {
      this.isShowBottomPanel = val;
      this.isShowFullPanel = false;
      this.isShowRightPanel = false;
    },
    // 设置左侧面板显示状态
    setRightPanel(val) {
      this.isShowRightPanel = val;
      this.isShowFullPanel = false;
      this.isShowBottomPanel = false;
    },
    // 设置属性面板显示状态
    setAttributePanel(val) {
      this.isShowAttributePanel = val;
    },
    // 设置附件查看状态
    setAttachmentView(val) {
      this.isShowAttachmentView = val;
    },
    // 设置结果面板显示状态
    setResultPanel(val) {
      this.isShowResultPanel = val;
    },
    // 设置主题面板显示状态
    setThemeVisible(val) {
      this.themeVisible = val;
    },
    // 设置主题名称
    setThemeName(name) {
      this.themeName = name;
    },
    setDrawType(val) {
      this.drawType = val;
    },
  },
});
