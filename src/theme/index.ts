// 导入全部主题css文件
import { computed } from 'vue'
import { THEME_COLOR, THEME_LAYOUT } from '@/enums/cacheEnum'
import { useStorage } from '@vueuse/core'

const modules = import.meta.glob('@/theme/modules/*/*.ts')

export enum ThemeEnum {
  blue = 'blue',
  gold = 'gold',
  red = 'red'
}

// const _theme = ref<ThemeEnum>(ThemeEnum.goldDark);
// 默认模板，本地存储
const _theme = useStorage<ThemeEnum>(THEME_COLOR, ThemeEnum.red)

const _layout = useStorage(THEME_LAYOUT, '5')

/**
 * 所有页面通过这个函数 设置编号，便于排查问题，追踪修改值的地方 仅用于 首页设置
 * @param num
 */
export function setLayout(num: number) {
  const mapM: { [key: number]: number } = { 1: 3, 2: 4, 3: 5, 5: 6 }
  _layout.value = mapM[num].toString()
}

export const theme = computed(() => _theme.value)
export const layout = computed(() => _layout.value)

/**
 * 根据color参数动态引入对应css文件
 * @param color 主题颜色
 * @throws {Error} 如果找不到对应的主题配置文件
 */
export const setTheme = async (color: ThemeEnum): Promise<void> => {
  // 获取匹配的主题文件
  const themeFile = Object.entries(modules).find(([key]) => key.includes(color))
  // 如果找不到对应的主题文件，则抛出错误
  if (!themeFile) {
    throw new Error('未找到对应主题配置文件')
  }

  // 加载匹配的主题文件
  try {
    await themeFile[1]()
    const htmlElement = document.documentElement
    htmlElement.setAttribute('theme', color)
    _theme.value = color as ThemeEnum
  } catch (e) {
    console.error('加载主题文件时出错：', e)
    throw new Error('加载主题文件时出错')
  }
}
