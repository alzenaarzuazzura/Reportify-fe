export type TMajorData = {
    id: number
    code: string
    name: string
}

export type TMajorPostData = Omit<TMajorData, 'id'>

export type TMajorCreate = Omit<TMajorData, 'id'>

export type TDialogMajorCreate = {
    isVisible: boolean
    setVisible: (visible: boolean) => void
    initialValues?: Partial<TMajorCreate>
    onReset?: () => void
    onSuccess?: (data: TMajorData) => void
}