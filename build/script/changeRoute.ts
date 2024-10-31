import fs from "fs";
import { isBuildLocal, isBuildPc, isBuildProd } from "./getEnv";

export function jsContent(path: string) {
  return `export default import.meta.glob("@/views/**/router/${path}/**/*.ts", { eager: true });
`;
}

type CreatRoute = "dynamicRoute" | "modulesRoute" | "modulesHomeRoute" | "setRoute";
type FoldType = "devh5" | "prodh5" | "devpc" | "prodpc";

// 定义 foldObj 的类型
interface FoldConfig {
  [key: string]: string;
}

export function createFold(type: CreatRoute, foldType: FoldType) {
  let foldObj: FoldConfig = {};
  
  if (type === "dynamicRoute") {
    foldObj = {
      devh5: "h5",
      prodh5: "h5",
      devpc: "pc",
      prodpc: "pc",
    };
  } else if (type === "modulesRoute") {
    foldObj = {
      devh5: "h5",
      prodh5: "h5",
      devpc: "pc",
      prodpc: "pc",
    };
  } else if (type === "modulesHomeRoute") {
    foldObj = {
      devh5: "h5",
      prodh5: "h5",
      devpc: "pc",
      prodpc: "pc",
    };
  } else if (type === "setRoute") {
    foldObj = {
      devh5: "h5",
      prodh5: "h5",
      devpc: "pc",
      prodpc: "pc",
    };
  }
  
  // 确保 foldType 存在于 foldObj 中
  const fold = foldObj[foldType];
  return jsContent(fold);
}

export const changeRoute = async () => {
  try {
    console.log("changeRoute.ts isBuildPc", isBuildPc());
    const foldTypeH5: FoldType = isBuildProd() ? "prodh5" : "devh5";
    const foldTypePc: FoldType = isBuildProd() ? "prodpc" : "devpc";
    const foldType: FoldType = isBuildPc() ? foldTypePc : foldTypeH5;
    
    // 这个只本地打包
    fs.writeFileSync(`src/router/dynamicRoute.ts`, createFold("dynamicRoute", isBuildLocal() ? "devh5" : "prodh5"));
    // 这个是为了分开打包pc h5 的首页
    fs.writeFileSync(`src/router/dynamicModulesRoute.ts`, createFold("modulesRoute", foldType));
    // 这个是为了分开打包pc h5 除首页之外的动态路由
    fs.writeFileSync(`src/router/dynamicModulesHomeRoute.ts`, createFold("modulesHomeRoute", foldType));
    // 这个是为了分开打包pc h5 set 页面路由
    fs.writeFileSync(`src/router/dynamicSetRoute.ts`, createFold("setRoute", foldType));
    
    console.log("动态路由文件修改成功");
  } catch (error) {
    console.log(error);
  }
};
