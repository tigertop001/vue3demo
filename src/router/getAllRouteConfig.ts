import type { AppRouteRecordRaw } from 'vue-router'
// demoLib 路由，不会被打包到生产环境，只在本地运行被加载
import dynamicRoute from '@/router/dynamicRoute'
import dynamicModulesRoute from '@/router/dynamicModulesRoute'
import dynamicSetRoute from '@/router/dynamicSetRoute'

export function getAllRouteConfig(): AppRouteRecordRaw[] {
  // const modules = import.meta.glob("./modules/**/*.ts", { eager: true });
  // const modules = import.meta.glob('./dir/*.js', { eager: true })
  // const m2 = import.meta.glob("./set.ts", { eager: true });
  // set 页面是否打包
  // const setPage = ;
  // demoLib 路由，不会被打包到生产环境，只在本地运行被加载
  const modulesAll = Object.assign({}, dynamicModulesRoute, dynamicRoute, dynamicSetRoute)
  const routeModuleList: AppRouteRecordRaw[] = []
  Object.keys(modulesAll).forEach((key) => {
    // @ts-ignore
    const mod = modulesAll[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routeModuleList.push(...modList)
  })
  return routeModuleList
}
