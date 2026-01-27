import { Form } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import usePopupMessage from '@reportify/hooks/ui/usePopupMessage'

import { create, update, getById } from '@reportify/services/api/major'

import { TMajorData, TMajorTransForm } from '@reportify/types'

const QUERY_KEY = { queryKey: ['dataList', 'major'] }

type TUseMajorFormProps = {
    id?: number
    onSuccess?: () => void
    onError?: () => void
}

const useMajorForm = ({ id, onSuccess, onError }: TUseMajorFormProps) => {
    const [formInstance] = Form.useForm()
    const queryClient = useQueryClient()
    const { showMessage } = usePopupMessage()

    useEffect(() => {
    if (id) {
            getById(id).then((data) => {
                formInstance.setFieldsValue({
                    name: data.name,
                    code: data.code,
                })
            }).catch(() => {
                showMessage('error', 'Gagal mengambil data Jurusan')
            })
        } else {
            formInstance.resetFields()
        }
    }, [id, formInstance, showMessage])

    const createMutation = useMutation({
        mutationFn: create,
        onSuccess: () => {
            showMessage('success', 'Jurusan berhasil ditambahkan')
            queryClient.invalidateQueries(QUERY_KEY)
            formInstance.resetFields()
            onSuccess?.()
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Gagal menambahkan Jurusan'
            showMessage('error', message)
            onError?.()
        },
    })

    const updateMutation = useMutation({
        mutationFn: update,
        onSuccess: () => {
            showMessage('success', 'Jurusan berhasil diperbarui')
            queryClient.invalidateQueries(QUERY_KEY)
            onSuccess?.()
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Gagal memperbarui Jurusan'
            showMessage('error', message)
            onError?.()
        },
    })

    const onSubmit = async () => {
        try {
            const values = await formInstance.validateFields()
            const payload: TMajorTransForm = {
                code: values.code,
                name: values.name,
            }

            if (id) {
                const updatePayload: TMajorData = {
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

export default useMajorForm
