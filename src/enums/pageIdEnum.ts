/**
 * 所有页面对应 Excel 表格中的唯一字符，一个页面对应一个字符，即后端返回的platFunctions数组的 characterData 字段
 */
export type PageIdType = {
  // 字符=页面唯一编码: 页面对应的模板编号
  [key: `${number}`]: `${number}-${number}`
}

// 每个平台种类的每个页面对应的模板ID
const PAGE_ARR_OBJ: PageIdType = {
  // 导航栏
  1: '1-1',
  // 首页
  3: '3-1'
}
export const PAGE_ARR = Object.keys(PAGE_ARR_OBJ).map((key) => {
  return {
    characterData: key,
    pageCode: PAGE_ARR_OBJ[key as keyof PageIdType]
  }
})

// 包网 简版
export const SIMPLE_PAGE_OBJ: PageIdType = {
  // 导航栏
  1: '1-1',
  // 首页
  3: '3-2'
}
export const SIMPLE_PAGE_ARR = Object.keys(SIMPLE_PAGE_OBJ).map((key) => {
  return {
    characterData: key,
    pageCode: SIMPLE_PAGE_OBJ[key as keyof PageIdType]
  }
})

// 包网 直属
export const IMMEDIATE_PAGE_OBJ: PageIdType = {
  // 导航栏
  1: '1-2',
  // 首页
  3: '3-4'
}
export const IMMEDIATE_PAGE_ARR = Object.keys(IMMEDIATE_PAGE_OBJ).map((key) => {
  return {
    characterData: key,
    pageCode: IMMEDIATE_PAGE_OBJ[key as keyof PageIdType]
  }
})

// 包网 无限级
export const INFINITY_PAGE_OBJ: PageIdType = {
  // 导航栏
  1: '1-3',
  // 首页
  3: '3-3'
}
export const INFINITY_AGE_ARR = Object.keys(INFINITY_PAGE_OBJ).map((key) => {
  return {
    characterData: key,
    pageCode: INFINITY_PAGE_OBJ[key as keyof PageIdType]
  }
})

// 狗子系列
export const DOG_PAGE_OBJ: PageIdType = {
  // 导航栏
  1: '1-4',
  // 首页
  3: '3-5'
}

export const DOG_PAGE_ARR = Object.keys(DOG_PAGE_OBJ).map((key) => {
  return {
    characterData: key,
    pageCode: DOG_PAGE_OBJ[key as keyof PageIdType]
  }
})
