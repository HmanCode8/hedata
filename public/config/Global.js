/**
 * 全局配置（生产环境）
 */

window.baseUrl = location.protocol + '//' + location.host; // 基础地址

window.oauthServerUrl = 'http://222.190.118.45:18080/authservice'; // 单点登录服务地址

window.clientId = '663'; // 客户端ID

window.clientSecret =
  '0465b989ee79c98736511337f872ad68f938248142c4971bcf43546f731e49563479a06347c0eb55ec6d2e68a69e61e6de3a2ffb9409172b541987b332971d5f94b63a3ed93d01ad42f732e90db749eff4ac08e7b12272467c406b337cc5a1c3e4db542c2e24fed5897ff4327cfdb6a6'; // 客户端密钥

window.returnUrl = window.baseUrl + '/dataman'; // 登录成功后跳转地址

window.isUseAuthority = true; // 是否使用权限管理

window.logoutUrl =
  window.oauthServerUrl +
  '/auth/session/logout?redirect_uri=' +
  window.returnUrl; // 退出登录地址

window.theme = 'blue-green-theme'; // 主题
