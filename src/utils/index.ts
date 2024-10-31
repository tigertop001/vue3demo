// import { autoTcode } from "@/utils/auth/token";
// import { appOriginDomain, getApiUrl, setApiUrl } from "@/utils/domain";
// import { isUatBuild } from "@/utils/env";
// import { appAgentParams, isApp, isIos, isNullOrUnDefOrNoth } from "@/utils/is";
// import { navRouter } from "@/router/navRouter";
// import { deviceType, deviceId, publicKey, appVersion, appVersionWeb, dividendCode, channelId, fourAppUserForm, isFourAppVar, rebateAgentId } from "@/enums/cacheEnum";
// import { refreshToken } from "@/enums/cacheEnum";

// export const noop = () => {};

// // 给链接后面添加参数
// export function setObjToUrlParams(baseUrl: string, obj: any): string {
//   let parameters = "";
//   for (const key in obj) {
//     parameters += key + "=" + encodeURIComponent(obj[key]) + "&";
//   }
//   parameters = parameters.replace(/&$/, "");
//   return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, "") + parameters;
// }

// 从#链接后面获取参数
export function getHashFromUrl(): any {
  let hashBack = "";
  const hash = location.hash;
  if (hash.indexOf("#") !== -1) {
    const hashSplit = hash.split("#");
    if (hashSplit.length == 2) {
      if (hashSplit[1].indexOf("?") !== -1) {
        const qesSplit = hashSplit[1].split("?");
        hashBack = qesSplit[0] == "/" ? "" : qesSplit[0];
      } else {
        hashBack = hashSplit[1] == "/" ? "" : hashSplit[1];
      }
    } else {
      hashBack = hashSplit[1] == "/" ? "" : hashSplit[1];
    }
  }
  return hashBack;
}

// // 把?参数后面的，转化成对象
// export function getObjFromUrlParams(str): any {
//   const objUrl = {};
//   if (!isNullOrUnDefOrNoth(str)) {
//     const splitArr = str.split("?");
//     if (splitArr.length === 1) return objUrl;
//     const arrUrl = str.split("?")[1].split("&");
//     for (let m = 0; m < arrUrl.length; m++) {
//       objUrl[arrUrl[m].split("=")[0]] = arrUrl[m].split("=")[1];
//     }
//   }
//   return objUrl;
// }

// // 获取Hash参数
// export function getQueryHash() {
//   return location.hash;
// }

// // 获取History 参数
// export function getQueryHistory() {
//   return window.location.search;
// }
// const goResister = token => {
//   if (!token) {
//     navRouter("/account/register", { isReplace: true });
//   }
// };

// // 页面初始化，获取地址栏的参数
// export function initUrlParams() {
//   // const search = window.location.search.replace('/', '');
//   let search = "";
//   const hashParam = getQueryHash();
//   const historyParam = getQueryHistory();
//   if (hashParam.indexOf("?") !== -1) {
//     search = hashParam.replace("/", "");
//   }
//   if (historyParam.indexOf("?") !== -1) {
//     search = historyParam.replace("/", "");
//   }
//   const urlParams = getObjFromUrlParams(search);
//   if (urlParams) {
//     // 渠道参数
//     if (urlParams?.source) {
//       channelId.value = urlParams.source;
//       rebateAgentId.value = "";
//     }
//     // 个人推广参数
//     if (urlParams?.code) {
//       channelId.value = "";
//       rebateAgentId.value = urlParams.code;
//       goResister(refreshToken.value);
//     }
//     // 分红
//     if (urlParams?.dividendCode) {
//       channelId.value = "";
//       rebateAgentId.value = "";
//       dividendCode.value = urlParams.dividendCode;
//       goResister(refreshToken.value);
//     }
//     // 从落地页注册成功之后带过来的token，然后进行登录
//     if (typeof urlParams?.tcode === "string") {
//       autoTcode.value = urlParams.tcode;
//     }
//     if (urlParams?.hasuserform === "0" || urlParams?.hasuserform === "1") {
//       isFourAppVar.value = true;
//       if (urlParams?.hasuserform === "1") {
//         // 有用户体系
//         fourAppUserForm.value = 1;
//         // 三方嵌入 传token
//         if (urlParams?.fourtoken) {
//           refreshToken.value = urlParams?.fourtoken;
//         }
//       } else {
//         // 无用户体系
//         fourAppUserForm.value = 2;
//       }
//       // 嵌入app 传设备ID
//       if (urlParams?.fourdeviceid) {
//         deviceId.value = urlParams?.fourdeviceid;
//       }
//     }
//   }
// }

// export function initAppParams() {
//   const apiUrl = getApiUrl();
//   if (isApp()) {
//     const appInfo = appAgentParams();
//     deviceId.value = appInfo?.deviceid;
//     appVersion.value = appInfo?.version;

//     if (isUatBuild()) {
//       if (!apiUrl) {
//         setApiUrl(appInfo?.apiurl);
//         // localStorage.setItem(DOMAIN_KEY, appInfo?.origindomain);
//         appOriginDomain.value = appInfo?.origindomain;
//         publicKey.value = appInfo?.publicKey;
//       }
//     } else {
//       setApiUrl(appInfo?.apiurl);
//       // localStorage.setItem(DOMAIN_KEY, appInfo?.origindomain);
//       appOriginDomain.value = appInfo?.origindomain;
//       publicKey.value = appInfo?.publicKey;
//     }
//     if (isIos()) {
//       deviceType.value = 4;
//     } else {
//       deviceType.value = 3;
//     }
//     if (appInfo?.version) {
//       const newWeb = appInfo?.version.replaceAll(")", "");
//       const newWebVersion = newWeb.split("Res(");
//       if (newWebVersion.length == 2) {
//         appVersionWeb.value = newWebVersion[1];
//       }
//     }
//   } else {
//     setApiUrl("");
//     deviceId.value = "";
//     deviceType.value = 1;
//     publicKey.value = "";
//   }
// }

// // 防抖函数--调用防抖函数（触发事件后在1秒内函数只能执行一次，默认1500）
// // es6 注意点：获取入参...args(es5是arguments)
// export const debounce = (fn: any, interval = 1500, ...args: any[]) => {
//   let timer: any;
//   const gapTime = interval;
//   return function () {
//     clearTimeout(timer);
//     timer = setTimeout(function () {
//       fn.call(this, args);
//     }, gapTime);
//   };
// };

// // 节流函数--调用节流函数（首次点击后触发打印，2秒内点击按钮都不会触发，2秒后再次点击触发，默认1500）
// // es6 注意点：获取入参...args(es5是arguments)
// export const throttle = (fn: any, interval = 1500, ...args: any[]) => {
//   let enterTime = 0;
//   const gapTime = interval;
//   return function () {
//     const backTime: any = new Date();
//     if (backTime - enterTime > gapTime) {
//       fn.call(this, args);
//       enterTime = backTime;
//     }
//   };
// };

// /**
//  * 动态创建js
//  * @param obj 需要引入的对象
//  * @param url 需要引入的js
//  * @return
//  */
// export function createJs(obj, url) {
//   return new Promise(resolve => {
//     if (obj == undefined) {
//       const script = document.createElement("script");
//       const head = document.getElementsByTagName("head")[0];
//       script.type = "text/javascript";
//       script.src = url;
//       script.onload = () => {
//         resolve(obj);
//       };
//       head.appendChild(script);
//     } else {
//       resolve(obj);
//     }
//   });
// }
