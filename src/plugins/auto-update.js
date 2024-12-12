const p = import.meta.env.VITE_APP_PATH;
// 设置自动刷新的时间间隔（毫秒）
const DURATION = import.meta.env.VITE_APP_AUTO_UPDATE_DURATION;

// 存储上一次获取到的script地址数组
let lastSrcs = [];

// 正则表达式，用于匹配<script>标签中的src属性；m 表示多行匹配
const scriptReg = /<script.*?src=["'](?<src>[^"']+)/gm;

/**
 * 从最新页面中提取所有的script链接
 */
async function extractNewScripts() {
  // 通过添加时间戳参数来避免浏览器缓存
  const html = await fetch(`${p}?_timestamp=${Date.now()}`).then((resp) =>
    resp.text(),
  );
  // 重置正则表达式的lastIndex属性，以确保每次都能从头开始匹配
  scriptReg.lastIndex = 0;
  let result = [];
  let match;
  // 使用while循环和正则表达式的exec方法查找所有匹配项
  while ((match = scriptReg.exec(html)) !== null) {
    // 将匹配到的src属性值添加到结果数组中
    result.push(match.groups.src);
  }
  return result;
}

/**
 * 检查是否需要更新页面
 */
async function needUpdate() {
  // 获取最新的script链接数组
  const newScripts = await extractNewScripts();
  // 如果是第一次调用，则直接更新lastSrcs并返回false
  if (lastSrcs.length === 0) {
    lastSrcs = newScripts;
    return false;
  }
  // 比较新旧script链接数组，检查是否有更新
  let result = false;
  if (lastSrcs.length !== newScripts.length) {
    result = true;
  } else {
    for (let i = 0; i < lastSrcs.length; i++) {
      if (lastSrcs[i] !== newScripts[i]) {
        result = true;
        break;
      }
    }
  }
  // 更新lastSrcs为最新的script链接数组
  lastSrcs = newScripts;
  return result;
}

/**
 * 自动刷新页面的函数
 */
function autoRefresh() {
  setTimeout(async () => {
    // 检查是否需要更新页面
    const willUpdate = await needUpdate();
    if (willUpdate) {
      ElMessageBox.confirm('页面有更新，点击确定刷新页面', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '',
      }).then(() => {
        location.reload();
      });
    }
    autoRefresh();
  }, DURATION);
}

export default autoRefresh;
