import { getTokenApi, getUserInfo } from '@/services/auth';
import { getQueryString } from '@/utils';

// 获取token
const getToken = async (code) => {
  let path = getQueryString('path');
  const tokenParams = {
    client_id: window.clientId,
    client_secret: window.clientSecret,
    grant_type: 'authorization_code',
    redirect_uri: window.returnUrl + (path ? '?path=' + path : ''),
    code,
  };
  const res = await getTokenApi(tokenParams);
  const { access_token } = res.data;
  sessionStorage.setItem('casToken', access_token);
  const userInfo = await getUserInfoFunc();
  sessionStorage.setItem('userInfo', JSON.stringify(userInfo.data));
  // 跳转到原页面
  window.location.replace(window.returnUrl + '/#' + path);
};

// 获取用户信息
const getUserInfoFunc = async () => {
  const token = sessionStorage.getItem('casToken');
  const userInfo = await getUserInfo({ access_token: token });
  return userInfo;
};

// 单点登录函数
function goToCasLogin(path) {
  sessionStorage.setItem('casToken', '');
  const loginUrl = window.oauthServerUrl + '/oauth/authorize';
  const returnUrl = window.returnUrl + (path ? '?path=' + path : '');
  const url =
    loginUrl +
    '?client_id=' +
    window.clientId +
    '&response_type=code&scopr=all' +
    '&redirect_uri=' +
    returnUrl;
  window.location.href = url;
}

//路由钩子
function registerRouterHook(router) {
  router.beforeEach(async (to, from, next) => {
    const token = sessionStorage.getItem('casToken');
    if (token) {
      // 权限判断
      next();
    } else {
      const code = getQueryString('code');
      if (code) {
        getToken(code);
      } else {
        goToCasLogin(to.path);
      }
    }
  });
}

export default registerRouterHook;
