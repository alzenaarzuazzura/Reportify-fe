import { isAxiosError } from 'axios'

export const defaultQueryOption = {
	refetchOnWindowFocus: false,
	retry: (count: number, error: Error) => {
		if (isAxiosError(error)) {
			return (error.response?.status === 401 || error.response?.status === 403) && count <= 3
		}
		return false
	},
}
	
export default {}
