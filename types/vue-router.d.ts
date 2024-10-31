import { Component } from "vue";

declare module "vue-router" {
  // 全局 vue router 的 meta 类型
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // 显示为1，不加参数默认隐藏， 不需要配置这个参数了，参考 isHid
    // rootBar?: number | string;
    // 页面是否需要登录权限
    auth?: boolean;
    // 提前加载页面需要的多语言包json, 避免页面文字闪现
    json?: Array<LangModule>;
    // 后端返回多模板数组，每个页面对应一个字段，设置当前页面的字段与后端进行匹配
    page?: string;
  }

  // 路由配置继承并扩展 vue-router RouteRecordRaw 类型，然后可以增加自己想要的类型
  interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
    name: string;
    meta: RouteMeta;
    component?: Component | string;
    components?: Component;
    children?: AppRouteRecordRaw[];
    props?: Recordable;
    fullPath?: string;
  }
}
