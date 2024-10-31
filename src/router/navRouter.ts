/*
本文件有以下功能：
1。 所有页面，全局路由跳转使用 pushWithQuery， replaceWithQuery，pushPathWithQuery，replacePathWithQuery函数跳转，配合initAllRoute.ts 动态加载路由配置文件结合使用,这四个函数可以再精简
2。 goBack 函数：所有页面返回的时候，都需要使用 goBack 函数
3. 所有页面不要传fromUrl参数去显示调用返回页面，用goBack即可
 */
import { router } from '@/router/index'
import { initAllRoute } from '@/router/loadRoute'
import { getLastTwoRoute, hasHistory, reduceLastRoute } from '@/router/localNav'

export type PageParamsType = {
  isName?: boolean // page参数是否是name参数, 默认为false
  isReplace?: boolean // 是否是replace路由
  query?: any //路由地址后面加参数
  [kye: string]: any // 其他任意参数
}

// 导航方法 同router
// page 默认是路由的path， 例如跳转到【我的】页面， navRouter("/mine", {rootBar: 2});
export async function navRouter(
  page: string,
  options: PageParamsType = { isName: false, isReplace: false }
) {
  await initAllRoute(page)
  const { isName: name, isReplace: replace, ...rest } = options
  const toPage = {
    path: name ? '' : page,
    name: name ? page : '',
    query: rest
  }
  if (replace) {
    router.replace(toPage)
    return
  }
  router.push(toPage)
}

// 所有页面，点击返回的时候，调用这个函数
export function goBack() {
  const lastTwo = getLastTwoRoute()
  if (hasHistory()) {
    if (lastTwo) {
      // 返回时，要删掉最后一个路径
      reduceLastRoute(2)
      router.replace({ path: lastTwo.path, query: lastTwo.query })
      return
    }
  }
  router.push({ path: '/' })
}
// 点击浏览器返回按钮
const onpopstate = (event: PopStateEvent) => {
  console.warn(event)
  reduceLastRoute(2)
}

window.addEventListener('popstate', onpopstate)
