import { TResponseData, TResponseList } from "../api";
import { TPaginationFilter } from "../components/filter";

export type TSubjectGeneralParams = {
    viewMode: boolean
}

export type TSubjectListParams = TPaginationFilter & {
  search?: string
}

export type TSubjectGeneral = {
  id: number
  code: string
  name: string
  created_at?: string
}

export type TSubjectListData = Omit<TSubjectGeneral, 'created_at'>

export type TSubjectData = TSubjectGeneral

export type TSubjectTransForm = Omit<TSubjectGeneral, 'id' | 'created_at'>

export type TSubjectPostData = Omit<TSubjectGeneral, 'created_at'>

export type TSubjectResponse = TResponseData<TSubjectData>

export type TSubjectListResponse = TResponseList<TSubjectListData>
