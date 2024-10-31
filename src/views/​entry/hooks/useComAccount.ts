// import { globalPlatInfoStore } from '@/store/modules/globalPlatInfoStore'
import { getPageId } from '@/router/pageId'
import { useStorage } from '@vueuse/core'

// 获取登录皮肤模版
export const enum AccountType {
  account1 = 1,
  account2
}
export const useAccountSkin = () => {
  const accountType = useStorage<AccountType>('ACCOUNT_TYPE', null)
  accountType.value = getPageId('2')
  return { accountType }
}
