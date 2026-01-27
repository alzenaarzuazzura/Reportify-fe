import { TResponseData, TResponseList } from "../api";
import { TPaginationFilter } from "../components/filter";

export type TLevelGeneralParams = {
    viewMode: boolean
}

export type TLevelListParams = TPaginationFilter 

export type TLevelData = {
  id: number
  name: string
}

export type TLevelTransForm = Omit<TLevelData, 'id'>

export type TLevelResponse = TResponseData<TLevelData>

export type TLevelListResponse = TResponseList<TLevelData>
