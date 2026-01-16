// Form types
export type TResetPasswordForm = {
  password: string
  confirmPassword: string
}

// API payload types
export type TResetPasswordPayload = {
  token: string
  password: string
}

// API response types
export type TResetPasswordResponse = {
  status: boolean
  message: string
  data: null
}
