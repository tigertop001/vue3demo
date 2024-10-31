import { isJSON } from '@/utils/is'
import { ROUTE_ARR } from '@/enums/cacheEnum'

// const
// 获取localStorage 的所有路径
export function getRouteArr() {
  const str = sessionStorage.getItem(ROUTE_ARR)
  if (str !== null && isJSON(str)) {
    // @ts-ignore
    return JSON.parse(str)
  }
  return []
}
// 设置localStorage 的所有路径
export function setRouteArr(arr: Array<any>) {
  sessionStorage.setItem(ROUTE_ARR, JSON.stringify(arr))
}
// push 一条路径到localStorage
export function pushRouteArr(obj: any) {
  const allRoute = getRouteArr()
  allRoute.push({
    path: obj?.path ? obj.path : '',
    query: obj?.query ? obj.query : {}
  })
  setRouteArr(allRoute)
}
// 获取localStorage 的最后1个路径
export function getLastRoute() {
  const allRoute = getRouteArr()
  return allRoute.length ? allRoute[allRoute.length - 1] : ''
}
// 获取localStorage 的倒数第2个路径
export function getLastTwoRoute() {
  const allRoute = getRouteArr()
  return allRoute.length >= 2 ? allRoute[allRoute.length - 2] : ''
}
// 去掉localStorage 的最后1个路径
export function reduceLastRoute(len: number) {
  const allRoute = getRouteArr()
  if (allRoute.length >= len) {
    for (let i = 0; i < len; i++) {
      allRoute.splice(-1)
    }
    setRouteArr(allRoute)
  }
}

// 获取用户打开链接时，是否有多个历史记录
export function hasHistory() {
  return window.history.length > 2
}
