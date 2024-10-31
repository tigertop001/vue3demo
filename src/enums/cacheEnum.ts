// token key

import { useStorage } from '@vueuse/core'

export const WEB_ASSETS = [
  'http://h5static.siimuu.com/',
  'http://h5static.weiqiyl.com/',
  'http://h5static.qinyouspring.com/',
  'http://h5static.siimrr.com/'
]
export const WEB_ASSETS_PRE = '/h52022_app/m'
// export const WEB_ASSETS_UAT = ["http://yshj.7hg1521213.com/", "http://yshjnh5.yh66a72.com/", "http://yshjnh5.yh66a73.com/", "http://yshjnh5.7hg16.com/", "http://wyshjnh5.yh66a71.com/"];
export const WEB_ASSETS_UAT = ['https://yshj.7hg1521213.com/', 'https://yshjnh5.7hg16.com/']
export const WEB_ASSETS_UAT_PRE = '/m'

// public 下的资源打包后，线上运行，加路径,h5才能访问到
export const STATIC_BASE_URL = '/m'

export const REMEMBER_ACCOUNT_KEY = 'REMEMBER_ACCOUNT__'

export const REMEMBER_PASSWORD_KEY = 'REMEMBER_PASSWORD__'

export const REMEMBER_PHONE_KEY = 'REMEMBER_PHONE__'

export const CHECKED_PASSWORD_KEY = 'CHECKED_PASSWORD__'
// 保存TOKEN
export const TOKEN_KEY = 'F_Token'
export const REFRESH_TOKEN_INVALID_TIME_KEY = 'REFRESH_TOKEN_INVALID_TIME__'

export const REFRESH_TOKEN_KEY = 'refresToken'
export const accessToken = useStorage(TOKEN_KEY, '')
export const refreshToken = useStorage(REFRESH_TOKEN_KEY, '')
export const refreshInvalidTime = useStorage(REFRESH_TOKEN_INVALID_TIME_KEY, 0)
// iOS android 请求接口地址
export const API_URL = 'API__URL__'
// app 接口域名
export const appApiUrl = useStorage(API_URL, '')

// 主题颜色 gold \ light \ blueDark ...
export const THEME_COLOR = 'THEME_COLOR'
// 布局 1、2、3、4……
export const THEME_LAYOUT = 'THEME_LAYOUT'

// 存储页面跳转路由，当点击返回时，读取值，返回到上一个页面
export const ROUTE_ARR = 'ROUTE_ARR___'

// 是否 三方嵌入产品
export const IS_FOUR_APP = 'IS_FOUR_APP__'
// 是否时三方嵌入产品
export const isFourAppVar = useStorage(IS_FOUR_APP, false)

// 三方嵌入产品 是否有用户体系
export const FOUR_APP_USER_FORM = 'FOUR_APP_USER_FORM__'
// 有用户体系1, 无用户体系 2
export const fourAppUserForm = useStorage(FOUR_APP_USER_FORM, 1)
