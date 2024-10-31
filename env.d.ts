/// <reference types="vite/client" />
/// <reference types="vite-plugin-svg-sfc/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
