import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/',
    name: 'Home',
    meta: {
      page: '3'
    },
    component: () => import('@/views/home/homeIndex.vue'),
    props: (route) => ({ ...route.query })
  }
] as Array<RouteRecordRaw>
