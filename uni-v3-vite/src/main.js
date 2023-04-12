import { createPinia } from 'pinia'
import { createSSRApp } from 'vue'
import { createUnistorage } from 'pinia-plugin-unistorage'
import App from './App.vue'

export default function createApp() {
  const app = createSSRApp(App)

  const store = createPinia()
  store.use(createUnistorage())

  app.use(store)
  return {
    app,
  }
}
