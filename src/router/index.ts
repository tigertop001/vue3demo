import { createRouter, createWebHashHistory, type Router, type RouteRecordRaw } from 'vue-router'
import modulesHomeRoute from '@/router/dynamicModulesHomeRoute'

const routes: Array<RouteRecordRaw> = [
  // 添加其他静态路由配置
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    meta: {
      title: ''
    },
    redirect: '/'
  }
]

// 定义接口描述动态路由模块
interface RouteModule {
  default: RouteRecordRaw[] | RouteRecordRaw
}

// 动态加载的路由
Object.keys(modulesHomeRoute).forEach((key) => {
  const mod = (modulesHomeRoute[key] as RouteModule).default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routes.push(...modList)
})

/** 创建路由实例 */
export const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true
})

export default router
