import { createI18n } from "vue-i18n";

document.documentElement.setAttribute("lang", "zh-CN");
const i18n = createI18n({
  legacy: false, // composition 模式
  locale: "zh_cn", // 设置默认语言
  silentTranslationWarn: true,
  missingWarn: false,
  fallbackWarn: false,
});

export default i18n;
