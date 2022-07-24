import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const AuthAPI = {
    signIn: () => {
    },
    logOut: () => {
    },
    passwordReset: () => {
    },
    signUp: (email: string, password: string) => instance.post('/auth/register', {email, password})
}