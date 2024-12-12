// import { ElLoading, ElNotification } from 'element-plus';

const BASE_URL = window.baseUrl || import.meta.env.VITE_BASE_URL; // 基础 URL
// 加载loading
let loadingInstance = null;

// 定义拦截器对象
const interceptors = {
  request: [],
  response: [],
};

/**
 * 添加请求拦截器
 * @param {function} callback 拦截器回调函数
 */
export function addRequestInterceptor(callback) {
  interceptors.request.push(callback);
}

/**
 * 添加响应拦截器
 * @param {function} callback 拦截器回调函数
 */
export function addResponseInterceptor(callback) {
  interceptors.response.push(callback);
}

/**
 * 发送HTTP请求
 * @param {string} url 请求的URL
 * @param {object} options 请求选项，包括method（方法）、headers（头部）、body（数据）
 * @returns {Promise} 返回一个Promise对象，用于处理请求的结果
 */
async function request(url, options = {}) {
  const showLoading = options.showLoading || true;

  try {
    const newUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    const token = sessionStorage.getItem('casToken');
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        Clientid: window.clientId,
      };
    }

    for (const interceptor of interceptors.request) {
      options = await interceptor(options);
    }

    if (showLoading) {
      loadingInstance = ElLoading.service({
        fullscreen: true,
        lock: true,
        text: '请求加载中...',
        background: 'rgba(0, 0, 0, 0.7)',
      });
    }

    let response = await fetch(newUrl, options);
    // let response = await fetch(newUrl, { ...options, credentials: 'omit' });

    let loaded = 0;
    const decoder = new TextDecoder();
    let streamData = '';
    const reader = response.body.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      loaded += value.length;
      console.log(`Received ${loaded} bytes of data.`);
      streamData += decoder.decode(value);
    }

    if (showLoading) {
      loadingInstance.close();
    }

    for (const interceptor of interceptors.response) {
      response = await interceptor(response);
    }

    const data = JSON.parse(streamData);

    if (!response.ok) {
      ElNotification({
        title: '提示',
        message: response.statusText || data.message,
        type: 'warning',
      });
      return data;
    }

    return {
      code: response.status,
      status: response.ok,
      data,
    };
  } catch (error) {
    // ElNotification({
    //   title: 'Error',
    //   message: error.message,
    //   type: 'error',
    // });
    console.error(error);
    ElMessageBox.confirm('登录可能失效，请重新登录，或者联系管理员?', '提示', {
      distinguishCancelAndClose: true,
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
    })
      .then(() => {
        sessionStorage.setItem('casToken', '');
        window.location.href = window.logoutUrl;
      })
      .catch((action) => {
        console.log(action);
      });
    if (showLoading) {
      loadingInstance.close();
    }
  }
}

// 定义GET请求方法
export function get(url, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  return request(fullUrl, { method: 'GET', redirection: 'follow' });
}

// 定义POST请求方法
// 定义POST请求方法
export function post(url, data = {}, config = {}) {
  const { requestType = '' } = config;

  const queryString = new URLSearchParams(data).toString();
  const fullUrl = requestType === 'param' ? `${url}?${queryString}` : url;

  let formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  const isUpload = requestType === 'form';
  const ops = {
    method: 'POST',
    body: isUpload ? formData : JSON.stringify(data),
  };
  if (!isUpload) {
    ops.headers = {
      'Content-Type': 'application/json',
    };
  }
  return request(fullUrl, ops);
}

export default { get, post };
