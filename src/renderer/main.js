import './assets/main.css'
import 'element-plus/dist/index.css'
import './assets/fonts/iconfont.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'
// import { zhCn } from 'element-plus/es/locale'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.mount('#app')
