import { TLabelValue } from "@reportify/types"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || 'https://3000.devops.my.id/reportify'

export const level = {
    getAll(): Promise<TLabelValue[]> {
        return axios.get(`${API_URL}/levels`).then(res => res.data)
    }
}