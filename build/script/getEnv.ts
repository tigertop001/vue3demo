import nodelocalStorage from "node-localstorage";

// 适配 Node.js 环境的 localStorage 实现
let localStorage: nodelocalStorage.LocalStorage | undefined;

if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = nodelocalStorage.LocalStorage;
  // node 环境的localStorage
  // eslint-disable-next-line no-global-assign
  localStorage = new LocalStorage("build/script/scratch");
}

// 使用 Node.js 环境的 localStorage
export function getLocalStorage(key: string) {
  return localStorage ? localStorage.getItem(key) : null;
}

export function setLocalStorage(key: string, val: string) {
  if (localStorage) {
    localStorage.setItem(key, val);
  }
}

let mode = "";

const pcEnv = ["pc", "devpc", "testpc", "uatpc", "prodpc"];

const ROUTE_TYPE__ = "routeType";

export function setRouteType(ty: string) {
  setLocalStorage(ROUTE_TYPE__, ty);
}



// 是否打包pc
export function isBuildPc() {
  const routeType = getLocalStorage(ROUTE_TYPE__);
  return pcEnv.includes(routeType || "");
}

const appEnv = ["dev_app", "test_app", "uat_app", "prod_app"];

// 是否是打包app
export function isAppMode() {
  return appEnv.includes(mode);
}

export function setMode(modeType: string) {
  mode = modeType;
}

// 是否本地开发环境
export function isBuildLocal() {
  return mode == "development";
}

// 是否打包dev
export function isBuildDev() {
  return mode == "dev" || mode == "dev_app";
}

// 是否打包test
export function isBuildTest() {
  return mode == "test" || mode == "test_app";
}

// 是否打包uat
export function isBuildUat() {
  return mode == "uat" || mode == "uat_app";
}

// 是否打包Prod
export function isBuildProd() {
  return mode == "prod" || mode == "prod_app";
}
