import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
import autoprefixer from 'autoprefixer'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    uni(),
    viteMockServe({
      localEnabled: true,
    }),
    AutoImport({
      imports: ['vue'],
      dts: 'auto-import.d.ts',
      eslintrc: {
        enabled: true, // Default `false`
      },
    }),
  ],
  resolve: {
    // 配置别名
    alias: {
      '~': resolve(__dirname, './'),
      '@': resolve(__dirname, './src'),
      components: resolve(__dirname, './src/components'),
    },
    extensions: ['.js', '.json', '.vue'], // 使用别名时可生省略的后缀
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            // 指定目标浏览器
            overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
          }),
        ],
      },
    },
    // 开发服务器配置
    server: {
      host: true,
      port: 8080,
      // 请求代理
      proxy: {
        // 个人习惯，这里就用/dev作为前缀了
        '/dev': {
          target: process.env.VITE_BASE_URL,
          changeOrigin: true,
          // 路径重写，去掉/dev
          rewrite: (path) => path.replace(/^\/dev/, ''),
        },
      },
    },
    build: {
      // 禁用 gzip 压缩大小报告，以提升构建性能
      brotliSize: false,
      /** 配置h5打包js,css,img分别在不同文件夹start */
      assetsDir: 'static/img/',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
      /** 配置h5打包js,css,img分别在不同文件夹end */
    },
  },
})
