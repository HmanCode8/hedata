import { defineConfig } from 'vite';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import eslintPlugin from 'vite-plugin-eslint';

import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue'], // 检查范围
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: 'src/auto-imports.d.ts', // 自动生成类型声明文件
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  build: {
    outDir: 'dataman',
    // 根据环境加载不同的配置
    /*global process, */
    /*eslint no-undef: "error"*/
    sourcemap: process.env.NODE_ENV === 'production' ? false : true,
    rollupOptions: {
      output: {
        entryFileNames: `js/[name].[hash].js`,
        chunkFileNames: `js/[name].[hash].js`,
        assetFileNames: `css/[name].[hash].css`,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
  },
  base: './',
  envDir: 'env',
  server: {
    port: 1101,
    open: true,
    proxy: {
      '/authservic': {
        target: 'http://222.190.118.45:18080', // 目标基础路径
        changeOrigin: true, // 允许跨域
      },
      '/oauthtokenapigateway': {
        target: 'http://222.190.118.45:18080', // 目标基础路径
        changeOrigin: true, // 允许跨域
        // rewrite: (path) =>
        //   path.replace(/^\/api/, 'oauthtokenapigateway/modelservice/api'),
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "@/theme/themes.scss" as *;`,
      },
    },
  },
});
