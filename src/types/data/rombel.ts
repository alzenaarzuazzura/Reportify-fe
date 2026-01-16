export type TRombelData = {
    id: number
    name: string
}

export type TRombelPostData = Omit<TRombelData, 'id'>

export type TRombelCreate = Omit<TRombelData, 'id'>

export type TDialogRombelCreate = {
    isVisible: boolean
    setVisible: (visible: boolean) => void
    initialValues?: Partial<TRombelCreate>
    onReset?: () => void
    onSuccess?: (data: TRombelData) => void
}