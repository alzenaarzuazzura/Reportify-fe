import { TResponseData, TResponseList } from "../api";
import { TPaginationFilter } from "../components/filter";

export type TRoomGeneralParams = {
    viewMode: boolean
}

export type TRoomListParams = TPaginationFilter 

export type TRoomData = {
  id: number
  name: string
}

export type TRoomTransForm = Omit<TRoomData, 'id'>

export type TRoomResponse = TResponseData<TRoomData>

export type TRoomListResponse = TResponseList<TRoomData>
