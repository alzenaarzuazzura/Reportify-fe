import { useIntl } from "react-intl"
import { App, Form, Modal, Tabs } from "antd"
import { useMutation } from "@tanstack/react-query"

import SaveCancelButton from "@reportify/components/Button/SaveCancelButton"

import { create } from "@reportify/services/api/rombel"

import { TResponseData, TResponseError, TDialogRombelCreate, TRombelData, TRombelPostData } from "@reportify/types"

import RombelForm from "./RombelForm"

const DlgRombelCreate = ({
    isVisible,
    setVisible,
    onSuccess,
    onReset,
    initialValues
}: TDialogRombelCreate) => {
    const intl = useIntl()
    const { message } = App.useApp()

    const [formInstance] = Form.useForm<TRombelPostData>()

    const mutationCreate = useMutation<
        TResponseData<TRombelData>,
        TResponseError,
        TRombelPostData
    >({
        mutationKey: ['create-rombel'],
        mutationFn: create,
        onSuccess: (res) => {
            message.success(res.message || 'Berhasil menambah rombel')
            onSuccess?.(res.data)
            handleClose()
        },
        onError: (err) => {
            message.error(err.response?.data?.message || 'Gagal menambah rombel')
        }
    })

    const handleClose = () => {
        setVisible(false)
        onReset?.()
        formInstance.resetFields()
    }

    const onFinish = (values: TRombelPostData) => {
        mutationCreate.mutate(values)
    }

    return (
        <Modal
            title={intl.formatMessage({ id: 'button.addnew' })}
            open={isVisible}
            onCancel={handleClose}
            footer={
                <SaveCancelButton
                    onSave={formInstance.submit}
                    onCancel={handleClose}
                />
            }
            centered
            width={450}
        >
            <Form
                form={formInstance}
                layout="vertical"
                onFinish={onFinish}
                initialValues={initialValues}
            >
                <Tabs
                    defaultActiveKey="general"
                    items={[
                        {
                            key: 'general',
                            label: intl.formatMessage({ id: 'menu.rombel' }),
                            children: <RombelForm />
                        }
                    ]}
                />
            </Form>
        </Modal>
    )
}

export default DlgRombelCreate