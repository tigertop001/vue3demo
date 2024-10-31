import { getHashFromUrl } from '@/utils';
import { router } from "@/router";
import type { RouteRecordRaw } from "vue-router";

export function iRoute() {
  return import("@/router/getAllRouteConfig");
}

// 是否需要加载所有路由
let isLoadAllRoute = false;
// 动态路由方案一：
// 所有路由配置，打开首页只加载首页路由，其他路由配置有130kb, 所以当用户从首页点击去其他页面的时候，再动态加载配置
export async function initAllRoute(nameOrPath?: string) {
  if (isLoadAllRoute) return;
  try {
    const hash = getHashFromUrl();
    if (hash || (nameOrPath && nameOrPath != "/" && nameOrPath != "Home")) {
      const { getAllRouteConfig } = await iRoute();
      const allConfig = getAllRouteConfig();
      const routePath = allConfig.filter(item => !router.hasRoute(item.name));
      if (routePath.length > 0) {
        routePath.forEach(item => router.addRoute(item as unknown as RouteRecordRaw));
        isLoadAllRoute = true;
      }
    }
  } catch (e) {
    window.location.reload();
    throw new Error((e as Error).message); // 确保 e 被断言为 Error 类型
  }
}
