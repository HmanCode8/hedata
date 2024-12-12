/**
 * 全局变量配置（开发环境）
 */
window.baseUrl = 'http://localhost:1101'; // 基础地址

window.oauthServerUrl = 'http://222.190.118.45:18080/authservice'; // 单点登录服务地址

window.clientId = '665'; // 客户端ID
window.clientSecret =
  '04651b873d4291c39fa574b13efe63dfd7988f39e6be362dde3c2ad2e5e4cd44a04ee5db6880d01e28f951f3f5d1ae1894779422359253e86600cf6feff2a83910acf3e10320254abd0f202196595ac2f588aff26094b5cd3764f5a0d867fd25cfbea435d000f5b24046d5ee7e157b5b'; // 客户端密钥

window.returnUrl = window.baseUrl; // 登录成功后跳转地址

window.isUseAuthority = true; // 是否使用权限管理

window.logoutUrl =
  window.oauthServerUrl +
  '/auth/session/logout?redirect_uri=' +
  window.returnUrl; // 退出登录地址

window.theme = 'green-theme'; // 主题
