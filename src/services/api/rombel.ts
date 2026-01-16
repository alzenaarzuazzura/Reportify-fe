import { TResponseData } from "@reportify/types"
import { TRombelData, TRombelPostData } from "@reportify/types/data/rombel"
import api from "../api"

export const create = async (data: TRombelPostData): Promise<TResponseData<TRombelData>> => {
  const res = await api.post<TResponseData<TRombelData>>('/rombels', data)
  return res.data
}