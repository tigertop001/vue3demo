import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersistedstate)
store.use(({ store: st }) => {
  const initialState = JSON.parse(JSON.stringify(st.$state))
  st.$reset = () => {
    st.$state = JSON.parse(JSON.stringify(initialState))
  }
})

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
