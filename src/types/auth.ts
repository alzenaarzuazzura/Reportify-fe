import { TResponseData } from "./api";

export type TLoginRequest = {
  email: string;
  password: string;
}

export type TLogin = {
    token: string
    user: {
        id: number
        name: string
        email: string
        role: 'admin' | 'teacher'
    }
}

export type TLoginResponseData = TResponseData<TLogin>