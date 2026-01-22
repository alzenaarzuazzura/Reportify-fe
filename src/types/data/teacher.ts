import { TResponseData, TResponseList } from "../api";
import { TPaginationFilter } from "../components/filter";
import { TLabelValue } from "../global";

export type TTeacherGeneralParams = {
  viewMode: boolean
  createMode?: boolean
}

export type TTeacherFilter = {
  role?: TUserRole
}

export type TTeacherListParams = TPaginationFilter & {
  search?: string
}

export type TUserRole = 'admin' | 'teacher';

export type TTeacherGeneral = {
  id: number
  name: string
  email: string
  phone: string
  password: string
  role: TUserRole
  created_at: string
}

export type TTeacherListData = Omit<TTeacherGeneral, 'password' | 'created_at'> & {
  role: TUserRole
}

export type TTeacherData = Omit<TTeacherGeneral, 'password'>

export type TTeacherTransForm = {
  name: string
  email: string
  phone: string
  password: string
  role: TLabelValue | undefined
}

export type TTeacherPostData = {
  name: string
  email: string
  phone: string
  password: string
  role: number | undefined
}

export type TTeacherResponse = TResponseData<TTeacherData>
export type TTeacherListResponse = TResponseList<TTeacherListData>