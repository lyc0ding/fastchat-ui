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
    children: [
      {
        path: '/chat',
        component: () => import('@/views/chat/Chat.vue'),
        name: '聊天界面',
        children: [
          {
            path: '',
            component: () => import('@/views/chat/session/Session.vue'),
            name: '会话列表'
          }
        ]
      },
      {
        path: '/contact',
        component: () => import('@/views/contact/Contact.vue'),
        name: '联系人界面',
        children: [
          {
            path: '',
            component: () => import('@/views/contact/contacts/Contacts.vue'),
            name: '联系人列表'
          }
        ]
      },
      {
        path: '/setting',
        component: () => import('@/views/setting/Setting.vue'),
        name: '设置界面'
      }
    ]
  }

  // {
  //     path: '/',
  //     component: LayoutVue,
  //     // 子路由
  //     children: [
  //         { path: '/article/category', component: categoryVue },
  //         { path: 'article/list', component: articleListVue },
  //         { path: '/', component: mainVue },
  //         { path: '/setting', component: settingVue },
  //         { path: '/userInfo', component: userInfo },
  //         { path: '/notice', component: noticeVue },
  //         { path: '/users', component: userVue },

  //     ]
  // },
]

// 路由器：创建路由器
const router = createRouter({
  routes: routes, //把路由规则给路由器
  history: createWebHistory()
})

// 导出该路由
export default router
