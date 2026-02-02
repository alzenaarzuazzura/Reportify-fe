import { Form } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import usePopupMessage from '@reportify/hooks/ui/usePopupMessage'

import { create, update, getById } from '@reportify/services/api/room'

import { TRoomData, TRoomTransForm } from '@reportify/types'

const QUERY_KEY = { queryKey: ['dataList', 'room'] }

type TUseRoomFormProps = {
    id?: number
    onSuccess?: () => void
    onError?: () => void
}

const useRoomForm = ({ id, onSuccess, onError }: TUseRoomFormProps) => {
    const [formInstance] = Form.useForm()
    const queryClient = useQueryClient()
    const { showMessage } = usePopupMessage()

    useEffect(() => {
    if (id) {
            getById(id).then((data) => {
                formInstance.setFieldsValue({
                    name: data.name,
                })
            }).catch(() => {
                showMessage('error', 'Gagal mengambil data Ruangan')
            })
        } else {
            formInstance.resetFields()
        }
    }, [id, formInstance, showMessage])

    const createMutation = useMutation({
        mutationFn: create,
        onSuccess: () => {
            showMessage('success', 'Ruangan berhasil ditambahkan')
            queryClient.invalidateQueries(QUERY_KEY)
            formInstance.resetFields()
            onSuccess?.()
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Gagal menambahkan Ruangan'
            showMessage('error', message)
            onError?.()
        },
    })

    const updateMutation = useMutation({
        mutationFn: update,
        onSuccess: () => {
            showMessage('success', 'Ruangan berhasil diperbarui')
            queryClient.invalidateQueries(QUERY_KEY)
            onSuccess?.()
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Gagal memperbarui Ruangan'
            showMessage('error', message)
            onError?.()
        },
    })

    const onSubmit = async () => {
        try {
            const values = await formInstance.validateFields()
            const payload: TRoomTransForm = {
                name: values.name,
            }

            if (id) {
                const updatePayload: TRoomData = {
                    id,
                    ...payload
                }
                updateMutation.mutate({ id, data: updatePayload })
            } else {
                createMutation.mutate(payload)
            }
        } catch (error) {
            console.error('Validation failed:', error)
        }
    }

    const isLoading = createMutation.isPending || updateMutation.isPending

    return {
        formInstance,
        onSubmit,
        isLoading,
    }
}

export default useRoomForm
