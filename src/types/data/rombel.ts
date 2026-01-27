import { TResponseData, TResponseList } from "../api";
import { TPaginationFilter } from "../components/filter";

export type TRombelGeneralParams = {
    viewMode: boolean
}

export type TRombelListParams = TPaginationFilter 

export type TRombelData = {
  id: number
  name: string
}

export type TRombelTransForm = Omit<TRombelData, 'id'>

export type TRombelResponse = TResponseData<TRombelData>

export type TRombelListResponse = TResponseList<TRombelData>
