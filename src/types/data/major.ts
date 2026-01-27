import { TResponseData, TResponseList } from "../api";
import { TPaginationFilter } from "../components/filter";

export type TMajorGeneralParams = {
    viewMode: boolean
}

export type TMajorListParams = TPaginationFilter & {
  search?: string
}

export type TMajorData = {
  id: number
  code: string
  name: string
}

export type TMajorTransForm = Omit<TMajorData, 'id'>

export type TMajorResponse = TResponseData<TMajorData>

export type TMajorListResponse = TResponseList<TMajorData>
