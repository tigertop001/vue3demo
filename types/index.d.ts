/**
 * 全局类型声明，无需引入直接在 `.vue` 、`.ts` 、`.tsx` 文件使用即可获得类型提示
 */
// 当前页打开，新窗口打开
type Recordable<T = any> = Record<string, T>;

// 语言模块
type LangModule = "global" | "deposit" | "withdraw" | "copy" | "washLiveBack" | "washLiveBackDetail" | "launderingRecords" | "launderingRecordsDetail" | "account";

/**
 * Vite压缩类型
 */
type ViteCompression = "gzip" | "brotli" | "none"; // 或者其他压缩类型

/**
 * 全局自定义环境变量的类型声明
 * @see {@link https://yiming_chang.gitee.io/pure-admin-doc/pages/config/#%E5%85%B7%E4%BD%93%E9%85%8D%E7%BD%AE}
 */
interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_ROUTER_HISTORY: string;
    VITE_CDN: boolean;
    VITE_COMPRESSION: ViteCompression;
    VITE_PROXY_API?: string | Array<[string, string]> | undefined;
    VITE_ESBUILD?: boolean;
    VITE_BUILD_COMPRESS?: "none" | "yes"; // none 不gzip， yes 打包gzip
    VITE_CLIENT_TYPE?: "h5" | "pc"; // 打包是pc还是h5
    [key: string]: any; // 添加索引签名
  }