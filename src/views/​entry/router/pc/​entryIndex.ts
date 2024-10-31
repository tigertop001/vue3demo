import type { RouteRecordRaw } from 'vue-router'

const login: Array<RouteRecordRaw> = [
  {
    path: '/account/:type', // 登录注册中心
    name: 'Account',
    meta: {
      page: '2'
    },
    component: () => import('@/views/​entry/account/accountIndex.vue')
  },
  {
    path: '/entry', // 登录注册中心
    name: 'Entry',
    meta: {
      page: '3'
    },
    component: () => import('@/views/​entry/entryIndex.vue')
  },
  {
    path: "/forgetStep1", // 忘记密码第一步
    name: "ForgetStep1",
    meta: { 
      page: "4",
    },
    component: () => import('@/views/​entry/forgetPassword/forgetPassword1.vue'),
  },
  {
    path: "/forgetStep2", // 忘记密码第二步
    name: "ForgetStep2",
    meta: {
      page: "4",
    },
    component: () => import('@/views/​entry/forgetPassword/forgetPassword2.vue'),
  },
]

export default login
