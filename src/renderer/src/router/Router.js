// 导入vue-router
import { createRouter, createWebHistory } from 'vue-router'
// 导入组件
import LoginVue from '@/views/Login.vue'
import MainVue from '@/views/Main.vue'

//定义路由规则  作用：存储路由
const routes = [
  {
    path: '/login',
    component: LoginVue,
    name: '登录界面'
  },
  {
    path: '/',
    // component: MainVue,
    alias: '/main',
    redirect: '/index',
    name: '默认路径'
  },
  {
    path: '/index',
    component: MainVue,
    name: '主窗口',
    children: [
      {
        path: '/chat',
        component: () => import('@/views/chat/Chat.vue'),
        name: 'Sessions',
      },
      {
        path: '/contact',
        component: () => import('@/views/contact/Contact.vue'),
        name: 'Contacts',
        redirect:'/contact/blank',
        children: [
          {
            path: '/contact/blank',
            component: () => import('@/views/contact/contents/Blank.vue'),
            name:'Blank'
          }
        ]
      },
      {
        path: '/setting',
        component: () => import('@/views/setting/Setting.vue'),
        name: 'Settings'
      }
    ]
  }
]

// 路由器：创建路由器
const router = createRouter({
  routes: routes, //把路由规则给路由器
  history: createWebHistory()
})

// 导出该路由
export default router
