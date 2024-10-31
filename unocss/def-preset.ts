import { Preset } from 'unocss'

export const defPreset: Preset = {
    name: 'def-preset',
    rules: [
      [/^m-([.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
      [/^p-([.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
    ],
    variants: [/* ... */],
    shortcuts: [/* ... */],
    // ...
  }