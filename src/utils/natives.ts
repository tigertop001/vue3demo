import { isIosBrowser } from './is'
// import { downloadImgByCanvas, downloadFile } from "@/utils/file/download";
// import { ref } from "vue";

// export const enum TargetContextEnum {
//   self = "_self",
//   blank = "_blank",
// }

// //打开外链
// export const openThirdWeb = (url: string, type: TargetContext = TargetContextEnum.self, options?: ToPlayGameType) => {
//   try {
//     if (isThirdApp() || isFourApp() || isApp()) {
//       // 处理在三方打包iOS app 中链接跳转链接
//       if (isIosBrowser()) {
//         window.webkit.messageHandlers.openThirdWeb.postMessage(url);
//       } else {
//         window.android.openThirdWeb(url);
//       }
//     } else {
//       // 如果是android 页签 window.androidNative.nativeOpenURL
//       if (isAndroidOld()) {
//         window.androidNative.nativeOpenURL(url);
//       } else {
//         if (options?.wi) {
//           options.wi.location.href = url;
//         } else {
//           if (type == "_self") {
//             window.location.href = url;
//           } else {
//             window.open(url, type);
//           }
//         }
//       }
//     }
//   } catch (e) {
//     //
//   }
// };
// const clickTime = ref(0);
// //游戏跳转
// // data = '{"linkUrl":"https://baidu.com" , "screenFlag": true , "showStyle":3, "content":"返回大厅"}'
// // 处理在三方打包iOS app 中打开游戏
// export const openNativeWeb = (data: OpenGameType, options?: ToPlayGameType) => {
//   if (clickTime.value > 0) {
//     return;
//   }
//   clickTime.value = 500;
//   setTimeout(() => {
//     clickTime.value = 0;
//   }, 500);
//   console.log(data);
//   const config = data;
//   config.content ? config.content : (config.content = "确定退出游玩？");
//   // config.screenFlag = config.screenFlag === undefined ? true : config.screenFlag !== false;
//   config.screenFlag = true;
//   // config.showStyle = !config.showStyle ? 3 : config.showStyle;
//   config.showStyle = 3;
//   const str = JSON.stringify(config);
//   try {
//     if (isThirdApp() || isFourApp() || isApp()) {
//       if (isIosBrowser()) {
//         window.webkit.messageHandlers.openNativeWeb.postMessage(str);
//       } else {
//         window.android.openNativeWeb(str);
//       }
//     } else {
//       //const t = JSON.parse(data);
//       const url = config.linkUrl;
//       const type = data?.openType ? data?.openType : "_blank";
//       if (options?.wi) {
//         options.wi.location.href = url;
//       } else {
//         window.open(url, type);
//       }
//     }
//   } catch (e) {
//     //
//   }
// };

// // 处理在三方打包iOS app 保存图片
// export const saveImageUrlOnNative = async (url: string, fileName?: string) => {
//   try {
//     if (isThirdApp() || isFourApp() || isApp()) {
//       if (isIosBrowser()) {
//         window.webkit.messageHandlers.saveImageUrl.postMessage(url);
//       } else {
//         window.android.saveImageUrl(url);
//       }
//     } else {
//       if (isIosBrowser() && iosVersion() <= 13) {
//         await downloadImgByCanvas(url, fileName ? fileName : "download.png");
//       } else {
//         downloadFile(url, fileName ? fileName : "download.png");
//       }
//     }
//   } catch (e) {
//     //
//   }
// };

// // 截屏
// export const captureScreenOnNative = () => {
//   try {
//     if (isThirdApp() || isFourApp() || isApp()) {
//       if (isIosBrowser()) {
//         window.webkit.messageHandlers.captureScreen.postMessage(null);
//       } else {
//         window.android.captureScreen();
//       }
//     }
//   } catch (e) {
//     //
//   }
// };

// // 是否有截屏功能
// export const captureScreenHas = () => {
//   try {
//     if (isThirdApp() || isFourApp() || isApp()) {
//       if (isIosBrowser()) {
//         return window.webkit.messageHandlers.captureScreen.postMessage;
//       } else {
//         return window.android.captureScreen;
//       }
//     }
//   } catch (e) {
//     //
//     return undefined;
//   }
// };

export function hasOpenNativeWeb(): boolean {
  let hasO = false
  try {
    if (isIosBrowser()) {
      if (
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.openNativeWeb &&
        typeof window.webkit.messageHandlers.openNativeWeb.postMessage === 'function'
      ) {
        hasO = true
      }
    } else {
      if (
        window.android &&
        window.android.openNativeWeb &&
        typeof window.android.openNativeWeb === 'function'
      ) {
        hasO = true
      }
    }
  } catch (e) {
    //('hasOpenNativeWeb', e);
  }
  return hasO
}

// //检测更新
// export const checkVersion = () => {
//   try {
//     if (isAndroid()) {
//       window.android.checkVersion();
//     } else if (isIos()) {
//       window.webkit.messageHandlers.checkVersion.postMessage(null);
//     } else {
//       //('web端无需检测');
//     }
//   } catch (e) {
//     //
//   }
// };
// //获取ios系统版本
// export const getIosVersion = () => {
//   const ua = navigator.userAgent;
//   const iosRegex = /OS (\d+_\d+(_\d+)?) like Mac OS X/;
//   const matches = iosRegex.exec(ua);
//   if (matches) {
//     return matches[1].replace(/_/g, "."); // 将所有的下划线替换为点号
//   }
//   return null; // 在非iOS设备上，或者无法识别版本时返回 null
// };

// export const skipUrlApp = () => {
//   console.log("skipUrlApp");
//   try {
//     if (isAndroid()) {
//       return window.android.skipApi();
//     } else if (isIos()) {
//       return window.webkit.messageHandlers.skipApi.postMessage(null);
//     }
//   } catch (e) {
//     //
//     return undefined;
//   }
// };

// export function hasSkipUrl(): boolean {
//   let hasO = false;
//   try {
//     if (isIosBrowser()) {
//       if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.skipApi && typeof window.webkit.messageHandlers.skipApi.postMessage === "function") {
//         hasO = true;
//       }
//     } else {
//       if (window.android && window.android.skipApi && typeof window.android.skipApi === "function") {
//         hasO = true;
//       }
//     }
//   } catch (e) {
//     //('hasOpenNativeWeb', e);
//   }
//   console.log("hasSkipUrl", hasO);
//   return hasO;
// }

// export const clearLocalUrlApp = () => {
//   try {
//     if (isAndroid()) {
//       return window.android.clearLocalApi();
//     } else if (isIos()) {
//       return window.webkit.messageHandlers.clearLocalApi.postMessage(null);
//     }
//   } catch (e) {
//     //
//     return undefined;
//   }
// };

// export function hasClearLocalUrl(): boolean {
//   let hasO = false;
//   try {
//     if (isIosBrowser()) {
//       if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.clearLocalApi && typeof window.webkit.messageHandlers.clearLocalApi.postMessage === "function") {
//         hasO = true;
//       }
//     } else {
//       if (window.android && window.android.clearLocalApi && typeof window.android.clearLocalApi === "function") {
//         hasO = true;
//       }
//     }
//   } catch (e) {
//     //('hasOpenNativeWeb', e);
//   }
//   return hasO;
// }

// //app进入后台
// export function applicationDidEnterBackground() {
//   const event = new Event("applicationDidEnterBackground");
//   // Dispatch the event.
//   window.dispatchEvent(event);
// }
// // app显示了前端页面
// export function applicationWillEnterForeground() {
//   const event = new Event("applicationWillEnterForeground");
//   window.dispatchEvent(event);
// }
// // app OpenInstall
// export function onOpenInstallParams(res) {
//   const event = new CustomEvent("onOpenInstallParams", { detail: JSON.stringify(res) });
//   window.dispatchEvent(event);
// }
// // 关闭游戏后， 进入前端页面
// export function onCloseTripartiteWebView() {
//   const event = new Event("onCloseTripartiteWebView");
//   window.dispatchEvent(event);
// }

// // 设置背景颜色
// export const setBackgroundColor = (color: HexType) => {
//   try {
//     if (isThirdApp() || isApp()) {
//       if (isIosBrowser()) {
//         window.webkit.messageHandlers.setBackgroundColor.postMessage(color);
//       }
//     }
//   } catch (e) {
//     //
//   }
// };

// // 设置导航栏文字颜色，白色和黑色
// export const enum StatusBarEnum {
//   dark = "dark",
//   light = "light",
// }
// export const setStatusBar = (color: StatusBarType) => {
//   try {
//     if (isThirdApp() || isApp()) {
//       if (isIosBrowser()) {
//         window.webkit.messageHandlers.setStatusBar.postMessage(color);
//       }
//     }
//   } catch (e) {
//     //
//   }
// };

// // 是否有设置导航栏颜色函数
// export function hasSetStatusBar(): boolean {
//   let hasO = false;
//   try {
//     if (isIosBrowser()) {
//       if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.setStatusBar && typeof window.webkit.messageHandlers.setStatusBar.postMessage === "function") {
//         hasO = true;
//       }
//     }
//   } catch (e) {
//     //('hasOpenNativeWeb', e);
//   }
//   return hasO;
// }

// // 设置极光推送别名  参数(string): "py_"+"用户id"
// export const setAlias = (color: AliasJG) => {
//   try {
//     if (isThirdApp() || isApp()) {
//       if (isIosBrowser()) {
//         window.webkit.messageHandlers.setAlias.postMessage(color);
//       }
//     }
//   } catch (e) {
//     //
//   }
// };

// // 设置极光推送tag   参数(string): "vip_"+"VIP等级" 多个tag用','分割
// export const setTags = (color: TagsJG) => {
//   try {
//     if (isThirdApp() || isApp()) {
//       if (isIosBrowser()) {
//         window.webkit.messageHandlers.setTags.postMessage(color);
//       }
//     }
//   } catch (e) {
//     //
//   }
// };
