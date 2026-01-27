import api from '@reportify/services/api'
import {
  TForgotPasswordPayload,
  TForgotPasswordResponse,
} from '@reportify/types/auth/forgotPassword'
import {
  TResetPasswordPayload,
  TResetPasswordResponse,
} from '@reportify/types/auth/resetPassword'

/**
 * Forgot Password - Request reset password link
 */
export const forgotPassword = async (
  payload: TForgotPasswordPayload
): Promise<TForgotPasswordResponse> => {
  const res = await api.post<TForgotPasswordResponse>(
    '/auth/forgot-password',
    payload
  )
  return res.data
}

/**
 * Reset Password - Update password with token
 */
export const resetPassword = async (
  payload: TResetPasswordPayload
): Promise<TResetPasswordResponse> => {
  const res = await api.post<TResetPasswordResponse>(
    '/auth/reset-password',
    payload
  )
  return res.data
}

/**
 * Change Password - Update password for logged in user
 */
export const changePassword = async (
  payload: { currentPassword: string; newPassword: string }
): Promise<{ status: boolean; message: string }> => {
  const res = await api.post<{ status: boolean; message: string }>(
    '/auth/change-password',
    payload
  )
  return res.data
}
