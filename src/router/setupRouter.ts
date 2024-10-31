// config router
import type { App } from 'vue'
import { initAllRoute } from '@/router/loadRoute'
import router from '@/router/index'

// 初始化路由
export async function setupRouter(app: App<Element>) {
  try {
    await initAllRoute()
  } finally {
    app.use(router)
  }
}
