import {
  REMEMBER_ACCOUNT_KEY,
  REMEMBER_PASSWORD_KEY,
  REMEMBER_PHONE_KEY,
  CHECKED_PASSWORD_KEY,
  refreshInvalidTime,
  refreshToken,
  accessToken
} from '@/enums/cacheEnum'
import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { deleteDBRequest } from '@/utils/indexDbRequest'

// 落地页带过来的token参数
export const autoTcode = ref('')
export const getToken = () => {
  return accessToken.value
}

/** 清除`token` */
export const clearToken = async () => {
  try {
    refreshInvalidTime.value = 0
    loginState.value = false
    refreshToken.value = ''
    accessToken.value = ''
    clearTimeout(timeController.value)
    // 被动退出，清除接口数据缓存
    deleteDBRequest()
  } catch (e) {
    console.warn(e)
  }
}

export const timeController = ref(null)
export const templateNo = 7
export const loginState = ref(false)
export const isLogined = ref(false)
// 是否在当前浏览器登录过
export const isLoginBefore = computed(() => {
  return isLogined.value
})
//是否登录
export const isLogin = computed(() => {
  return loginState.value
})

const rememberAccount = useStorage(REMEMBER_ACCOUNT_KEY, '')
const rememberPassword = useStorage(REMEMBER_PASSWORD_KEY, '')
const rememberPhone = useStorage(REMEMBER_PHONE_KEY, '')
const passwordChecked = useStorage(CHECKED_PASSWORD_KEY, true)
//获取上次登录注册账户
export const getRememberAccount = () => {
  return rememberAccount.value
}
//获取上次登录注册密码
export const getRememberPassword = () => {
  return rememberPassword.value
}
//获取上次登录注册手机号
export const getRememberPhone = () => {
  return rememberPhone.value
}

export const getPasswordChecked = () => {
  return passwordChecked.value
}

//设置登录账户
export const setRememberAccount = (value: string) => {
  rememberAccount.value = value
}
//设置登录注册密码
export const setRememberPassword = (value: string) => {
  rememberPassword.value = value
}
//设置注册手机号
export const setRememberPhone = (value: string) => {
  rememberPhone.value = value
}
export const setPasswordChecked = (value: boolean) => {
  passwordChecked.value = value
}
