import { TResponseData } from "../api"

export type TSubjectGeneralParams = {
    viewMode: boolean
}

export type TSubjectGeneral = {
    id: number
    code: string
    name: string
}


export type TSubjectTransForm = Omit<TSubjectGeneral, 'id'>

export type TSubjectResponse = TResponseData<TSubjectGeneral>