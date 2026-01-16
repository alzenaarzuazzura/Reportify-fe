export type TLevelData = {
    id: number
    name: string
}

export type TLevelPostData = Omit<TLevelData, 'id'>

export type TLevelCreate = Omit<TLevelData, 'id'>

export type TDialogLevelCreate = {
    isVisible: boolean
    setVisible: (visible: boolean) => void
    initialValues?: Partial<TLevelCreate>
    onReset?: () => void
    onSuccess?: (data: TLevelData) => void
}