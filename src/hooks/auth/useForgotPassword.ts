import { Form } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '@reportify/services/api/auth'
import usePopupMessage from '@reportify/hooks/ui/usePopupMessage'
import { TForgotPasswordForm } from '@reportify/types/auth/forgotPassword'

type TUseForgotPasswordProps = {
  onSuccess?: () => void
  onError?: () => void
}

const useForgotPassword = ({ onSuccess, onError }: TUseForgotPasswordProps) => {
  const [formInstance] = Form.useForm<TForgotPasswordForm>()
  const { showMessage } = usePopupMessage()

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      showMessage('success', response.message)
      formInstance.resetFields()
      onSuccess?.()
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        'Gagal mengirim link reset password'
      showMessage('error', message)
      onError?.()
    },
  })

  const onSubmit = async () => {
    try {
      const values = await formInstance.validateFields()
      mutation.mutate({ email: values.email })
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

export default useForgotPassword
