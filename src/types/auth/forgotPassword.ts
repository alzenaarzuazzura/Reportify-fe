// Form types
export type TForgotPasswordForm = {
  email: string
}

// API payload types
export type TForgotPasswordPayload = {
  email: string
}

// API response types
export type TForgotPasswordResponse = {
  status: boolean
  message: string
  data: null
}
