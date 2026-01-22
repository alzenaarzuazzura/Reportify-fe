export type TProfile = {
  id: number
  name: string
  email: string
  phone: string | null
  role: string
  created_at: string
  updated_at: string
}

export type TProfileUpdate = {
  name: string
  email: string
  phone: string
}

export type TChangePassword = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export type TLoginHistory = {
  id: number
  id_user: number
  login_at: string
  ip_address: string | null
  user_agent: string | null
}

export type TLoginHistoryParams = {
  page: number
  limit: number
}
