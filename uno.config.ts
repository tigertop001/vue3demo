// uno.config.ts
import { defineConfig, presetAttributify, presetUno, Rule, transformerDirectives } from 'unocss'

const pxToRem = (num: number) => {
  if (isNum(num)) {
    return ((Number(num) * 4) / 100).toFixed(3)
  }
  return num
}

function isNum(value) {
  const reg = /^[-+]?\d+(?:\.\d+)?/
  return reg.test(value)
}

const theme = {
  colors: {
    // 主题色
    primary: 'var(--primary)', // 例：class="text-primary"

    // 背景颜色
    b0: 'var(--background)', // 例：class="bg-b0"
    b1: 'var(--background1)', // 例：class="bg-b1"
    b2: 'var(--background2)', // 例：class="bg-b2"
    b3: 'var(--background3)', // 例：class="bg-b3"

    // 文字颜色，从深到浅
    c1: 'var(--text-co1)', // 例：class="text-c1"
    c2: 'var(--text-co2)', // 例：class="text-c2"
    c3: 'var(--text-co3)', // 例：class="text-c3"

    // border边框 颜色
    line1: 'var(--border-color)', // 例：class="border-line1"
    line2: 'var(--border-color2)', // 例：class="border-line2"
    line3: 'var(--border-color3)', // 例：class="border-line3"

    // 渐变色
    'gradient-primary': 'var(--gradient-primary)', // 例：class="gradient-primary"
    'gradient1-start': 'var(--gradient1-start)', // 例：class="gradient1-start gradient1-end"
    'gradient1-end': 'var(--gradient1-end)', // 例：class="gradient1-start gradient1-end"

    // 按钮颜色
    btn1: 'var(--button-color1)', // 例：class="btn1"
    btn2: 'var(--button-color2)', // 例：class="btn2"
    btn3: 'var(--button-color3)', // 例：class="btn2"
    btn4: 'var(--button-color4)', // 例：class="btn2"
    btn5: 'var(--button-color5)', // 例：class="btn2"

    // 阴影颜色
    sha1: 'var(--shadow-color1)', // 例：class="sha1"
    sha2: 'var(--shadow-color2)', // 例：class="sha2"
    sha3: 'var(--shadow-color3)', // 例：class="sha3"
    sha4: 'var(--shadow-color4)', // 例：class="sha4"

    // ios 安全边距，用于边距类型class 写法比如 pt-sa-top pb-sa-bottom
    spacing: {
      'sa-top': 'var(--safe-top)',
      'sa-bottom': 'var(--safe-bottom)',
      'sa-left': 'var(--safe-left)',
      'sa-right': 'var(--safe-right)'
    },
    // 安全边距 用于高度 写法比如 h-sa-top
    height: {
      'sa-top': 'var(--safe-top)',
      'sa-bottom': 'var(--safe-bottom)',
      'sa-left': 'var(--safe-left)',
      'sa-right': 'var(--safe-right)'
    },
    // 安全边距 用于宽度 写法比如 w-sa-top
    width: {
      'sa-top': 'var(--safe-top)',
      'sa-bottom': 'var(--safe-bottom)',
      'sa-left': 'var(--safe-left)',
      'sa-right': 'var(--safe-right)'
    }
  }
}

const rules: Rule<object>[] = [
  ['bg-size-full', { 'background-size': '100% 100%' }], // 例：class="bg-size-full" 背景图片宽度100%， 高度自动适应
  ['bg-size-width', { 'background-size': '100% auto' }], // 例：class="bg-size-width" 背景图片宽度100%， 高度自动适应
  ['shadow-gray-md', { 'box-shadow': '0 12px 19px var(--shadow-box)' }] // 例：class="shadow-gray-md" 中等阴影大小，底部加阴影
]

const unocss = defineConfig({
  theme,
  rules,
  presets: [
    presetUno(), // 默认的Uno CSS预设
    presetAttributify({
      prefix: 'un-', // 设置属性选择器的前缀
      prefixedOnly: true // 仅支持带前缀的属性选择器
    })
  ],
  transformers: [transformerDirectives()], // 使用指令转换器
  postprocess: [
    (util) => {
      // 后处理器的示例处理逻辑
      const pxRE = /(-?[.\d]+)rem/g
      util.entries.forEach((entry) => {
        const value = entry[1]
        if (typeof value === 'string' && pxRE.test(value) && isNum(value)) {
          entry[1] = value.replace(pxRE, (_, pixelValue) => `${pxToRem(pixelValue)}rem`)
        }
      })
    }
  ],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|ts|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.{ts}' // 包含的文件类型和路径
      ]
    }
  }
})

export default unocss
