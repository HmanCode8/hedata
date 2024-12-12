import request from '@/utils/request';

/**
//获取当前用户菜单
 * @param {*} params 
 * @returns 
 */
function getMuneTree(params) {
  return request.post(
    '/oauthtokenapigateway/modelservice/api/Function/PostTreeFunction',
    params,
    {
      requestType: 'param',
    },
  );
}

/**
 * 获取当前用户资源树
 * @returns
 */
function getResourceTree(params) {
  return request.get(
    '/oauthtokenapigateway/modelservice/api/User/ServiceResourceTree',
    params,
  );
}
export { getMuneTree, getResourceTree };
