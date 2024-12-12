module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 Bug
        'docs', // 文档更新
        'style', // 样式更新
        'refactor', // 代码重构
        'test', // 增加/修改测试
        'chore', // 工具/依赖更新
        'perf', // 性能优化
      ],
    ],
    'subject-case': [2, 'never', ['sentence-case']], // 标题不强制大写
  },
};
