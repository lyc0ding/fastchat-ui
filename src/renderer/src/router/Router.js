// 导入vue-router
import { createRouter, createWebHistory } from 'vue-router'
// 导入组件
import LoginVue from '@/views/Login.vue'
import MainVue from '@/views/Main.vue'
import { component } from 'v-viewer'

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
    redirect:'/chat',
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
            name:'ContactBlank'
          },
          {
            path: '/contact/apply',
            component: () => import('@/views/contact/contents/Apply.vue'),
            name:'Applys'
          },
          {
            path: '/contact/group',
            component: () => import('@/views/contact/contents/Group.vue'),
            name:'Groups'
          }
        ]
      },
      {
        path: '/other',
        component: () => import('@/views/other/Other.vue'),
        name: 'Others',
        redirect:'/other/blank',
        children:[
          {
            path:'/other/blank',
            component:()=>import('@/views/other/contents/Blank.vue'),
            name:'OtherBlank'
          },
          {
            path:'/other/account',
            component:()=>import('@/views/other/contents/AccountInfo.vue'),
            name:'Account'
          },
          {
            path:'/other/collect',
            component:()=>import('@/views/other/contents/Collection.vue'),
            name:'Collection'
          },
        ]
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
