// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { authService } from "@reportify/services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@reportify/contexts/AuthContext";
import { TLoginResponseData, TLoginRequest } from "@reportify/types/index";
import { AxiosError } from "axios";

export function useLogin() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  return useMutation<TLoginResponseData, AxiosError<any>, TLoginRequest>({
    mutationFn: authService.login,
    onSuccess: (res) => {
      const { user, token } = res.data

      setAuth(user, token)
      message.success(`Selamat datang, ${user.name}!`)
      navigate('/')
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || error.message || 'Login gagal'
      message.error(errorMessage)
    }
  })
}
