// 在这里面引入的都是全局的方法，就不用在每个组件中单独引入了
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/Router.js'
import ElementPlus from 'element-plus'
import * as Pinia from 'pinia'
import 'element-plus/dist/index.css'
import '@/assets/cust-elementplus.scss'
import '@/assets/icon/iconfont.js'
import '@/assets/icon/iconfont.css'
import '@/assets/base.scss'

import Utils from '@/utils/Utils.js'
import Request from '@/utils/Request'
import Message from '@/utils/Message'
import Api from '@/utils/Api'

//全局组件
import Layout from '@/components/Layout.vue'
import WinOption from '@/components/WinOption.vue'
import ContactContents from '@/components/contact/Contents.vue'


const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(Pinia.createPinia())
// 使用插件方式将工具类挂载到全局属性
app.mount('#app')

//注册全局组件
app.component('Layout', Layout)
app.component('WinOption', WinOption)
app.component('ContactContents',ContactContents)


// 放进全局的属性中，在组件中通过Proxy对象调用方法
app.config.globalProperties.Utils = Utils
app.config.globalProperties.Request = Request
app.config.globalProperties.Message = Message
app.config.globalProperties.Api = Api
