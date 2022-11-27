import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

export let baseURL = ''

export function init(app: string, url: string) {
  baseURL = url
  createApp(App).use(createPinia()).mount(app)
}
// init('#app', 'https://wind-comment.moecm.workers.dev')
