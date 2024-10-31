import 'virtual:uno.css'
import '@/style/pc/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setTheme, theme } from '@/theme'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
