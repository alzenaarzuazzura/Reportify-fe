export const color = {
  primary: '#2a415a',

  success: '#328508ff',
  warning: '#faad14',
  danger: '#ff0004ff',

  grey: '#858686ff',
  white: '#ffffff',

} as const

export type ColorKey = keyof typeof color
