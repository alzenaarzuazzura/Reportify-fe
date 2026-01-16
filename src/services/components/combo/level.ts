import { TLabelValue } from "@reportify/types"
import axios from "axios"

export const level = {
    getAll(): Promise<TLabelValue[]> {
        return axios.get('http://localhost:3000/reportify/levels').then(res => res.data)
    }
}