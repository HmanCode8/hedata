import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    ignores: ['node_modules', 'dist', 'vite.config.js', 'commitlint.config'],
    rules: {
      'vue/multi-word-component-names': [
        'off',
        {
          ignores: ['index'],
        },
      ],
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ElMessageBox: 'readonly', // 声明 ElMessageBox 为只读全局变量
        ElMessage: 'readonly', // 声明 ElMessage 为只读全局变量
        ElNotification: 'readonly', // 声明 ElNotification 为只读全局变量
        ElLoading: 'readonly', // 声明 ElLoading 为只读全局变量
      },
    },
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
];
