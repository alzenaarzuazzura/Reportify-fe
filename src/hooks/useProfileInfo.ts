import { useQuery } from '@tanstack/react-query'
import api from '@reportify/services/api'
import { TResponseData, TTeacherData } from '@reportify/types'

const useProfileInfo = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.get<TResponseData<TTeacherData>>('/profile')
      return res.data
    },
  })
}

export default useProfileInfo
