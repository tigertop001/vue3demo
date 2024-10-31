// declare module '*.vue' {
//   import { DefineComponent } from 'vue';
//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }

// declare module "*.scss" {
//   const scss: Record<string, string>;
//   export default scss;
// }

// declare module "*.svg" {
//   const svg: string;
//   export default svg;
// }

// interface ImportMetaEnv {
//   VITE_PROXY_DOMAIN: string;
// }



declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
