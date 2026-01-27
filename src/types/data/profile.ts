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
