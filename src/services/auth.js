import request from '@/utils/request';

/**
 * 单点登录获取授权码
 *
 * @param {object} data
 * @returns {Promise}
 */
function getAuthorize(data) {
  return request.get('/authservice/oauth/authorize', data);
}
/**
 * 单点登录获取token
 *
 * @param {object} data
 * @returns {Promise}
 */
function getTokenApi(data) {
  return request.get('/authservice/oauth/token', data);
}
/**
 * 单点登录获取token
 *
 * @param {object} data
 * @returns {Promise}
 */
function getUserInfo(data) {
  return request.get('/authservice/user/userinfo', data);
}

export { getAuthorize, getTokenApi, getUserInfo };
