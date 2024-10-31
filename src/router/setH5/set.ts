import { AppRouteRecordRaw } from "vue-router";
// 这个路由配置供非生产环境测试人员使用
const setPage = [
  {
    path: "/set",
    name: "Set",
    meta: {},
    component: () => import("@/views/set/set.vue"),
  },
] as Array<AppRouteRecordRaw>;
export default setPage;
