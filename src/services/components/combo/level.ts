import { TLabelValue } from "@reportify/types"
import axios from "axios"

export const level = {
    getAll(): Promise<TLabelValue[]> {
        return axios.get('https://3000.devops.my.id/reportify/levels').then(res => res.data)
    }
}