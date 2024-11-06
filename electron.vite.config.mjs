import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [vue()],
    server: {
      hmr: true,  //热更新
      //通过代理发送客户端请求给服务端
      port:5000,  //代理端口
      proxy: {
        "/api": {  //请求的api前缀
          target: "http://localhost:9999",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '') // 重写路径
        }
      }
    }
  }
})
