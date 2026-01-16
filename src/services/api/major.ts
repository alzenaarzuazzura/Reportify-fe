import { TResponseData } from "@reportify/types"
import { TMajorData, TMajorPostData } from "@reportify/types/data/major"
import api from "../api"

export const create = async (data: TMajorPostData): Promise<TResponseData<TMajorData>> => {
  const res = await api.post<TResponseData<TMajorData>>('/majors', data)
  return res.data
}