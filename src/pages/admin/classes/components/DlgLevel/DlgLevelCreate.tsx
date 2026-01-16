import { useIntl } from "react-intl"
import { App, Form, Modal, Tabs } from "antd"
import { useMutation } from "@tanstack/react-query"

import SaveCancelButton from "@reportify/components/Button/SaveCancelButton"

import { create } from "@reportify/services/api/level"

import { TResponseData, TResponseError, TDialogLevelCreate, TLevelData, TLevelPostData } from "@reportify/types"

import LevelForm from "./LevelForm"

const DlgLevelCreate = ({
    isVisible,
    setVisible,
    onSuccess,
    onReset,
    initialValues
}: TDialogLevelCreate) => {
    const intl = useIntl()
    const { message } = App.useApp()

    const [formInstance] = Form.useForm<TLevelPostData>()

    const mutationCreate = useMutation<
        TResponseData<TLevelData>,
        TResponseError,
        TLevelPostData
    >({
        mutationKey: ['create-level'],
        mutationFn: create,
        onSuccess: (res) => {
            message.success(res.message || 'Berhasil menambah level')
            onSuccess?.(res.data)
            handleClose()
        },
        onError: (err) => {
            message.error(err.response?.data?.message || 'Gagal menambah level')
        }
    })

    const handleClose = () => {
        setVisible(false)
        onReset?.()
        formInstance.resetFields()
    }

    const onFinish = (values: TLevelPostData) => {
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
                            label: intl.formatMessage({ id: 'menu.level' }),
                            children: <LevelForm />
                        }
                    ]}
                />
            </Form>
        </Modal>
    )
}

export default DlgLevelCreate