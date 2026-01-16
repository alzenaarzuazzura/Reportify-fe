import { useIntl } from "react-intl"
import { App, Form, Modal, Tabs } from "antd"
import { useMutation } from "@tanstack/react-query"

import SaveCancelButton from "@reportify/components/Button/SaveCancelButton"

import { create } from "@reportify/services/api/major"

import { TResponseData, TResponseError, TDialogMajorCreate, TMajorData, TMajorPostData } from "@reportify/types"

import MajorForm from "./MajorForm"

const DlgMajorCreate = ({
    isVisible,
    setVisible,
    onSuccess,
    onReset,
    initialValues
}: TDialogMajorCreate) => {
    const intl = useIntl()
    const { message } = App.useApp()

    const [formInstance] = Form.useForm<TMajorPostData>()

    const mutationCreate = useMutation<
        TResponseData<TMajorData>,
        TResponseError,
        TMajorPostData
    >({
        mutationKey: ['create-major'],
        mutationFn: create,
        onSuccess: (res) => {
            message.success(res.message || 'Berhasil menambah jurusan')
            onSuccess?.(res.data)
            handleClose()
        },
        onError: (err) => {
            message.error(err.response?.data?.message || 'Gagal menambah jurusan')
        }
    })

    const handleClose = () => {
        setVisible(false)
        onReset?.()
        formInstance.resetFields()
    }

    const onFinish = (values: TMajorPostData) => {
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
                            label: intl.formatMessage({ id: 'menu.major' }),
                            children: <MajorForm />
                        }
                    ]}
                />
            </Form>
        </Modal>
    )
}

export default DlgMajorCreate