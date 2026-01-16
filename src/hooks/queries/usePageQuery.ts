import { isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { TBaseResponse, TPageQueryParams, TResponseData, TResponseError } from '@reportify/types'

const usePageQuery = <TData = unknown, TError = TResponseError>({
	key,
	queryFn,
	onSuccess,
	onError,
}: TPageQueryParams<TResponseData<TData>, TError>) => {
	const navigate = useNavigate()

	const { isError, isSuccess, error, data } = useQuery<TResponseData<TData>, TError>({
		queryKey: key,
		queryFn,
	})

	if (isError && isAxiosError<TBaseResponse>(error)) {
		if (error.response?.data.code === 404) navigate('/404')
		if (onError) onError(data, error)
	}

	if (isSuccess && onSuccess) onSuccess(data)

	return { data, isSuccess }
}

export default usePageQuery
