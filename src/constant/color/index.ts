export const color = {
  primary: '#2a415a',

  success: '#328508ff',
  warning: '#faad14',
  danger: '#ff0004ff',

  grey: '#94a3b8'

} as const

export type ColorKey = keyof typeof color
