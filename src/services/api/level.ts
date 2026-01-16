import { TResponseData } from "@reportify/types"
import { TLevelData, TLevelPostData } from "@reportify/types/data/level"
import api from "../api"

export const create = async (data: TLevelPostData): Promise<TResponseData<TLevelData>> => {
  const res = await api.post<TResponseData<TLevelData>>('/levels', data)
  return res.data
}