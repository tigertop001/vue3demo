// vite plugin 类型
import type { Plugin } from "vite";
// JavaScript 日期库
import dayjs, { Dayjs } from "dayjs";
// duration 插件为 dayjs 提供了处理时间段（例如天数、小时数、分钟数等）的功能
import duration from "dayjs/plugin/duration";
// nodejs 可以在终端中输出彩色文本， green 绿色文本， bold 加粗文本
// import { green, bold } from "picocolors";
// 使用默认导入
import picocolors from 'picocolors';
const { green, bold } = picocolors;
// 导入自定义的 getFolderSize 函数
import { getFolderSize } from "./getFolderSize";




// 为dayjs添加duration插件
dayjs.extend(duration);

// 自定义打包时间，文件大小分析插件
export function viteBuildInfo(): Plugin {
  // 获取vite解析的配置对象
  let config: { command: string };
  // 打包开始时间
  let startTime: Dayjs;
  // 打包结束时间
  let endTime: Dayjs;
  // 打包输出后的文件夹 ./dist
  let outDir: string;
  
  return {
    name: "vite:buildInfo",
    // configResolved 钩子是在插件配置解析完成时调用的
    configResolved(resolvedConfig) {
      // 获取命令行参数 build, dev
      config = resolvedConfig;
      // 获取打包输出后的文件夹，默认为 "dist"
      outDir = resolvedConfig.build?.outDir ?? "dist";
    },
    // 构建流程开始时被调用
    buildStart() {
      if (config.command === "build") {
        startTime = dayjs(new Date());
      }
    },
    // rollup的钩子，在 Rollup 构建完成、输出文件生成之后，关闭输出文件束(bundle)之前被调用
    async closeBundle() {
      if (config.command === "build") {
        // 获取打包结束时间
        endTime = dayjs(new Date());
        // 获取文件夹大小
        const size = await getFolderSize(outDir);
        // 计算打包开始时间和结束时间的时间差
        const diffTime = dayjs.duration(endTime.diff(startTime)).format("mm分ss秒");
        console.log(bold(green(`🎉恭喜打包完成（总用时${diffTime}，打包后的大小为${size}）`)));
      }
    },
  };
}
