import { isApp, isIos } from '@/utils/is'
import { appAgentParams } from '@/utils/is'
import { isLocalBuild, isPreviewBuild, isUatBuild } from '@/utils/env'
import {
  WEB_ASSETS,
  WEB_ASSETS_PRE,
  WEB_ASSETS_UAT_PRE,
  WEB_ASSETS_UAT,
  STATIC_BASE_URL,
  appApiUrl
} from '@/enums/cacheEnum'
import { computed, ref } from 'vue'
import { randomNum } from '@/utils/method'
import { useStorage } from '@vueuse/core'

// origin domain
export const DOMAIN_KEY = 'DOMAIN_KEY__'
// app 接口域名
export const appOriginDomain = useStorage(DOMAIN_KEY, '')

// 根据环境随机选择一个下标
const numIndex = randomNum(0, isUatBuild() ? WEB_ASSETS_UAT.length : WEB_ASSETS.length)
// 初始值随机选择一个域名
const staticOrigin = ref(WEB_ASSETS[numIndex])
if (isUatBuild()) {
  staticOrigin.value = WEB_ASSETS_UAT[numIndex]
}

// app里取能连通的静态资源域名，用于前端图片前缀
export const staticDomain = computed(() => {
  // 如果是app，才需要加静态资源域名
  if (isApp()) {
    // 演示环境用演示环境域名
    if (isUatBuild()) {
      return staticOrigin.value + WEB_ASSETS_UAT_PRE
    }
    return staticOrigin.value + WEB_ASSETS_PRE
  }
  // web端自动返回空
  return ''
})

// public 下的资源打包后，线上运行，加路径,h5才能访问到
export const staticPreUrl = isPreviewBuild() || isApp() ? '.' : STATIC_BASE_URL

// 设置可用的静态资源域名值
export function setStaticDomain(url: string) {
  staticOrigin.value = url
}

// app获取接口域名，web端自动返回空
export function getApiUrl(): string {
  const appInfo = appAgentParams()
  let url = ''
  if (isUatBuild()) {
    const localUrl = appApiUrl.value
    url = localUrl ? localUrl : ''
  } else if (isLocalBuild()) {
    return ''
  } else {
    url = appInfo.apiurl
  }
  return url
}
// 设置app接口域名地址
export function setApiUrl(url: string) {
  appApiUrl.value = url
}

export function getClientBase64(): string {
  // 默认web端
  let clientBase64 = 'aDU6aDVfc2VjcmV0'
  if (isApp()) {
    clientBase64 = isIos() ? 'aW9zOmlvc19zZWNyZXQ' : 'YW5kcm9pZDphbmRyb2lkX3NlY3JldA=='
  }
  return clientBase64
}
