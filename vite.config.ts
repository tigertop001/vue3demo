import { defineConfig, UserConfig,loadEnv } from 'vite'
import { warpperEnv } from "./build";
import { setAppInfo } from "./build/script/setAppInfo";
import path from 'path'
import dotenv from 'dotenv'
import { changeRoute } from "./build/script/changeRoute";
import { buildConfig, proxyFun } from "./build/buildConfig";
import { isBuildPc, isAppMode, setMode } from "./build/script/getEnv";
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgSfc from 'vite-plugin-svg-sfc'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { presetAttributify } from '@unocss/preset-attributify'
import { presetUno } from '@unocss/preset-uno'
import legacy from '@vitejs/plugin-legacy'
import removeConsole from "vite-plugin-remove-console";
import { viteBuildInfo } from "./build/info"; 
import compressPlugin from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import dayjs from "dayjs";
import { visualizer } from "rollup-plugin-visualizer";


const envDir = 'envs'

function loadEnvConfig(mode: string, command: string) {
  const envPath = path.resolve(__dirname, `${envDir}/.env.${mode}`)
  const loadedEnv = dotenv.config({ path: envPath })
  const envVars: Record<string, string> = {}
  if (loadedEnv && loadedEnv.parsed) {
    for (const key of Object.keys(loadedEnv.parsed)) {
      envVars[key] = loadedEnv.parsed[key]
    }
  }
  return {
    envVars,
    isBuild: command === 'build'
  }
}

export default defineConfig(({ command, mode }) => {
  setMode(mode);
  const { __APP_INFO__ } = setAppInfo(mode);
  const { envVars, isBuild } = loadEnvConfig(mode, command)
  const viteEnv = warpperEnv(loadEnv(mode, envDir));
  const entryJs = isBuildPc() ? "src/mainPc.ts" : "src/main.ts";
  const { VITE_BUILD_COMPRESS,VITE_ESBUILD,VITE_PROXY_API } = viteEnv;
   // 将 VITE_ESBUILD 转换为布尔值
   const esbuildEnabled = VITE_ESBUILD === true;
  // 动态修改路由配置
  changeRoute();

  return {
    plugins: [
      svgSfc(),
      vue(),
      vueJsx(),
      vueDevTools(),
      UnoCSS({
        presets: [
          presetUno(),
          presetAttributify(),
        ],
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
        dts: './types/auto-imports.d.ts',
        eslintrc: {
          enabled: false,
          filepath: './build/.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      // 线上环境删除console
      removeConsole(),
      // npm run report
      // 打包分析, 生成可视化报告，用于分析项目的依赖关系和包大小
      /*
        open: 构建完成后自动打开生成的可视化报表
        brotliSize: 在报告中显示经过Brotli压缩后的包大小
        filename: 生成的可视化报告的文件名
      **/
      process.env.REPORT === "true" ? visualizer({ open: true, brotliSize: true, filename: "report.html" }) : null,
      // gzip 压缩
      VITE_BUILD_COMPRESS === "yes" && isBuild && compressPlugin({ ext: ".gz",deleteOriginFile: false, }),
      // br 压缩
      VITE_BUILD_COMPRESS === "yes" && isBuild && compressPlugin({ext: ".br",algorithm: "brotliCompress",deleteOriginFile: false,}),
      // 打包时间，文件大小分析
      viteBuildInfo(),
      createHtmlPlugin({
        minify: isBuild,
        entry: entryJs, // 入口文件
        inject: {
          // Inject data into ejs template
          data: {
            lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          },
        },
        
      }),
    ],
    build: buildConfig(esbuildEnabled, isAppMode()),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    base: envVars.VITE_BASE_URL,
    server: {
      https: false,
      port: '8080',
      host: '0.0.0.0',
      proxy: proxyFun(VITE_PROXY_API),
    },
    css: {
      devSourcemap: !isBuild
    },
    define: {
      'process.env': envVars,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    }
  } as unknown as UserConfig
})