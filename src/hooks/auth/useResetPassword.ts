import { Form } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '@reportify/services/api/auth'
import usePopupMessage from '@reportify/hooks/ui/usePopupMessage'
import { TResetPasswordForm } from '@reportify/types/auth/resetPassword'

type TUseResetPasswordProps = {
  token: string
  onSuccess?: () => void
  onError?: () => void
}

const useResetPassword = ({
  token,
  onSuccess,
  onError,
}: TUseResetPasswordProps) => {
  const [formInstance] = Form.useForm<TResetPasswordForm>()
  const { showMessage } = usePopupMessage()

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      showMessage('success', response.message)
      formInstance.resetFields()
      onSuccess?.()
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Gagal mengubah password'
      showMessage('error', message)
      onError?.()
    },
  })

  const onSubmit = async () => {
    try {
      const values = await formInstance.validateFields()
      mutation.mutate({
        token,
        password: values.password,
      })
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  return {
    formInstance,
    onSubmit,
    isLoading: mutation.isPending,
  }
}

export default useResetPassword
