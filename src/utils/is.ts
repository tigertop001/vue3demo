// import { useStorage, useWindowSize } from "@vueuse/core";
// import { DEBUG_KEY, ENCRYPT_KEY } from "@/enums/cacheEnum";
import { hasOpenNativeWeb } from '@/utils/natives'
// import { computed, ref } from "vue";
// import { isProdBuild } from "@/utils/env";
import { fourAppUserForm, isFourAppVar } from '@/enums/cacheEnum'

// 是否是Json
export function isJSON(str: string) {
  try {
    const obj = JSON.parse(str)
    if (obj && typeof obj === 'object') {
      return true
    }
  } catch (err) {
    return false
  }
  return false
}

// /**
//  * 当前运行的是否是pc端
//  */
// export function isPc() {
//   const { client } = __APP_INFO__
//   return client == 'pc'
// }

// TODO: IsApp
export type AgentParamsType = {
  origindomain: string
  apiurl: string
  version: string
  deviceid: string
  publicKey: string
}

export function appAgentParams(): AgentParamsType {
  const param = {
    origindomain: '',
    apiurl: '',
    version: '',
    deviceid: '',
    publicKey: ''
  }
  const userAgent = navigator.userAgent
  const splitArr = userAgent.split('MyUserAgent=')
  if (splitArr.length === 2) {
    if (isJSON(splitArr[1])) {
      const appInfo = JSON.parse(splitArr[1])
      param.apiurl = appInfo?.apiurl
      param.origindomain = appInfo?.origindomain
      param.version = appInfo?.version
      param.deviceid = appInfo?.deviceid
      param.publicKey = appInfo?.PUBLIC_KEY
    }
  }
  return param
}

export function hasApiUrl(): boolean {
  const appInfo = appAgentParams()
  return !!appInfo.apiurl
}

// 包壳app 包含iOS 和 android
export function isApp(): boolean {
  return hasApiUrl()
}

// ios app
export function isIos(): boolean {
  return isIosBrowser() && hasApiUrl()
}

// // android app
// export function isAndroid(): boolean {
//   return isAndroidBrowser() && hasApiUrl()
// }

// const toString = Object.prototype.toString

// export function is(val: unknown, type: string) {
//   return toString.call(val) === `[object ${type}]`
// }

// export function isDef<T = unknown>(val?: T): val is T {
//   return typeof val !== 'undefined'
// }

// export function isUnDef<T = unknown>(val?: T): val is T {
//   return !isDef(val)
// }

// export function isObject(val: any): val is Record<any, any> {
//   return val !== null && is(val, 'Object')
// }

// export function isFunction(val: any): val is Record<any, any> {
//   return val !== null && is(val, 'Function')
// }

// // 是否是空
// export function isNull(val: unknown): val is null {
//   return val === null
// }

// // 是否是空或者未定义
// export function isNullOrUnDefOrNoth(val: unknown): val is null | undefined {
//   return isUnDef(val) || isNull(val) || val === ''
// }

// export const isEmpty = isNullOrUnDefOrNoth

// // 是否时 数字类型 数字
// export function isNumber(val: unknown): val is number {
//   return is(val, 'Number')
// }

// // 是否是字符串
// export function isString(val: unknown): val is string {
//   return is(val, 'String')
// }

// // 是否是数组
// export function isArray(val: any): val is Array<any> {
//   return val && Array.isArray(val)
// }

// // 是否是 boolean
// export function isBoolean(val: unknown): val is boolean {
//   return is(val, 'Boolean')
// }

// // 是否是链接
// export function isUrl(path: string): boolean {
//   const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/
//   return reg.test(path)
// }

// // 链接是否含有http
// export function hasHttp(path: string): boolean {
//   return path.indexOf('http://') !== -1 || path.indexOf('https://') !== -1
// }

// // 链接是否含有oss
// export function hasOss(path: string): boolean {
//   return path.indexOf('/oss/') !== -1
// }

// 获取操作系统
export function getMobileOperatingSystem(): string {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  if (/android/i.test(userAgent)) {
    return 'Android'
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'IOS'
  }

  return 'unknown'
}

// // 现金网最初老的安卓包，包内直接打开域名
// export function isAndroidOld(): boolean {
//   return window.androidNative && typeof window.androidNative.nativeOpenURL === 'function'
// }

// ios 浏览器
export function isIosBrowser(): boolean {
  return getMobileOperatingSystem() === 'IOS'
}

// // android 浏览器
// export function isAndroidBrowser(): boolean {
//   return getMobileOperatingSystem() === 'Android'
// }

// // 是否是字符串的数字
// export function isNum(value) {
//   const reg = /^[-+]?\d+(?:\.\d+)?/
//   return reg.test(value)
// }

// export function isInt(num) {
//   // 判断是否是整数
//   return /^\d+$/.test(num)
// }

// // 三方ios app打开
// export function isThirdApp(): boolean {
//   return !hasApiUrl() && hasOpenNativeWeb() && !isFourAppVar.value
// }

// 三方在app 嵌入我们网站
export function isFourApp(): boolean {
  return hasOpenNativeWeb() && isFourAppVar.value
}

// 三方在浏览器 嵌入我们网站
export function isFourBrowser(): boolean {
  return !hasOpenNativeWeb() && isFourAppVar.value
}

// 是否是三方嵌入产品, 包含三方app（isFourApp） 和 三方网页版（isFourBrowser）
export function isFourInside(): boolean {
  if (isFourBrowser()) return true
  return isFourApp()
}

// 三方嵌入产品是否有用户体系
export function fourUserFormHas(): boolean {
  return isFourInside() && fourAppUserForm.value === 1
}

// 浏览器是否支持IndexDb
export function isSupportIndexDb(): boolean {
  if (!('indexedDB' in window) || !(window.URL || window.webkitURL)) {
    console.warn('IndexedDB not supported')
    return false
  }
  return true
}

// // 是否所有app上打开 广告图
// export function isAllApp(): boolean {
//   return isThirdApp() || isAndroidOld() || isHomeScreen() || isApp()
// }

// // 是否是页签
// export function isHomeScreen(): boolean {
//   return (
//     // @ts-ignore
//     (window.navigator?.standalone || window.matchMedia('(display-mode: standalone)').matches) &&
//     !isFourInside()
//   )
// }

// // 是否有原生方法
// export const isNative = function () {
//   return isApp() || isThirdApp() || isFourApp() || isAndroidOld()
// }

// // iOS版本号
// export function iosVersion(): number {
//   const ua = navigator.userAgent.toLowerCase()
//   const versionStr = ua.match(/cpu iphone os (.*?) like mac os/)
//   let ver = 9
//   if (isArray(versionStr) && versionStr.length > 1) {
//     const ver1 = versionStr[1].split('_')[0]
//     if (isNum(ver1)) {
//       ver = Number(ver1)
//     }
//   }
//   return ver
// }

// // iPhone X 或更高版本"
// export function isIxOrAbove() {
//   if (typeof window !== 'undefined' && window) {
//     return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
//   }
//   return false
// }

// // 是否是手机浏览器
// export function isMobileBrowser(): boolean {
//   return !(!isAndroidBrowser() && !isIosBrowser())
// }

// // 默认设置屏幕显示内容宽度
// const mobileWidthNum = ref(375)
// export const mobileWidth = computed(() => {
//   return mobileWidthNum.value
// })

// // 根据屏幕宽度，显示手机宽度，兼容pc
// export function setMobileWidth() {
//   const { height: clientHeight, width: clientWidth } = useWindowSize()
//   // const clientWidth = window.document.body.clientWidth;
//   // const clientHeight = window.document.body.clientHeight;
//   const lastW = clientWidth.value < clientHeight.value ? clientWidth.value : 375
//   let isUseShort = false
//   if (!isPcRef.value) {
//     isUseShort = lastW > 500
//   } else {
//     if (lastW > 500) {
//       isUseShort = true
//     }
//   }
//   if (!isMobileBrowser()) {
//     isUseShort = true
//   }
//   const len = isUseShort ? 375 : lastW
//   mobileWidthNum.value = len
//   return len
// }

// // 是否是手机宽度
// const isMobileRef = ref(true)
// export const isMobileCom = computed(() => {
//   return isMobileRef.value
// })
// export const isPcRef = ref(false)

// function resizeFun() {
//   isPcRef.value = !isMobileBrowser()
//   const { width: clientWidth } = useWindowSize()
//   isMobileRef.value = isMobileBrowser() && clientWidth.value < 500
//   setMobileWidth()
// }

// resizeFun()
// // 页面resize后跳整布局
// window.addEventListener('resize', resizeFun, { passive: true })

// //判断是否为safari浏览器
// export function issafariBrowser() {
//   let val = false
//   const platformExpression = /Mac|iPhone|iPod|iPad/i
//   const rejectedExpression = /Chrome|Android|CriOS|FxiOS|EdgiOS/i
//   const expectedExpression = /Safari/i

//   const agent = navigator.userAgent
//   if (rejectedExpression.test(agent)) {
//     val = false
//   } else {
//     val = platformExpression.test(agent) && expectedExpression.test(agent)
//   }
//   return val
// }

// // webP 检查
// export let isWebpOk = false

// function checkWebp() {
//   const elem = document.createElement('canvas')
//   if (elem?.getContext('2d')) {
//     // 创建一个canvas元素
//     // 尝试将canvas元素转换为WebP格式
//     isWebpOk = elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
//   }
// }

// // 调用函数来检测是否支持WebP
// checkWebp()

// export const isDebug = useStorage(DEBUG_KEY, isProdBuild())

// export const isEncrypt = useStorage(ENCRYPT_KEY, true)
