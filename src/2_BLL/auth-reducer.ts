import {setIsFetching, SetIsFetchingType} from "../3_commons/common_actions/common_actions";
import {AppThunk} from "./store";
import {AuthAPI, LoginParamsType} from "../1_DAL/Api";
import {errorUtils} from "../3_commons/errors-utils";
import {AxiosError} from "axios";
import { setProfile } from "./app-reducer";

export type AuthStateType = {
    isLoggedIn: boolean
    isFetching: boolean
    isResponse: boolean
    buttonDisable: boolean
    info: string | null
}

let initialState: AuthStateType = {
    isLoggedIn: false,
    isFetching: false,
    isResponse: false,
    buttonDisable: true,
    info: null
}

const AuthReducer = (state: AuthStateType = initialState, action: AuthReducerType): AuthStateType => {
    switch (action.type) {
        case "SET-IS-LOGIN":
            return {...state, isLoggedIn: action.isLoggedIn}
        case "SET-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "SET-RESPONSE":
            return {...state, isResponse: action.response}
        case "SET-INFO":
            return {...state, info: action.info}
        default:
            return state
    }
};

export type AuthReducerType = SetIsLoginType
    | SetIsFetchingType
    | SetResponseType
    | SetButtonDisableType
    | SetInfoType

type SetIsLoginType = ReturnType<typeof setIsLogin>
type SetResponseType = ReturnType<typeof setResponse>
type SetButtonDisableType = ReturnType<typeof setButtonDisable>
type SetInfoType = ReturnType<typeof setInfo>

export const setIsLogin = (isLoggedIn: boolean) => ({type: "SET-IS-LOGIN", isLoggedIn} as const)
const setInfo = (info: string) => ({type: "SET-INFO", info} as const)
const setResponse = (response: boolean) => ({type: "SET-RESPONSE", response} as const)
const setButtonDisable = (buttonDisable: boolean) => ({type: "SET-BTN-DISABLE", buttonDisable} as const)

export const signUpTC = (email: string, password: string): AppThunk => (dispatch) => {
    dispatch(setButtonDisable(true))
    dispatch(setIsFetching(true))
    AuthAPI.signUp(email, password)
        .then(res => {
            console.log(res)
            dispatch(setResponse(true))
        })
        .catch((err: AxiosError<{ error: string }>) => errorUtils(err, dispatch))
        .finally(() => dispatch(setIsFetching(false)))
}

export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setIsFetching(true))
    AuthAPI.signIn(data).then(res => {
        console.log(res)
        dispatch(setProfile(res.data))
        dispatch(setIsLogin(true))
        dispatch(setIsFetching(false))
        dispatch(setResponse(true))
    })
        .catch((err: AxiosError<{ error: string }>) => errorUtils(err, dispatch))
        .finally(() => dispatch(setIsFetching(false)))
}

export const resetPasswordTC = (email: string): AppThunk => (dispatch) => {
    dispatch(setIsFetching(true))
    AuthAPI.resetPassword(email, `dmitryload@yahoo.com`, `<div style="background-color: lime; padding: 15px">
    password recovery link: 
<a href='https://training-cards.herokuapp.com/reset-password/$token$'>
link</a></div>`)
        .then(res => {
            console.log(res)
            dispatch(setIsFetching(false))
        })
        .catch((err: AxiosError<{ error: string }>) => errorUtils(err, dispatch))
        .finally(() => dispatch(setIsFetching(false)))
}

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setIsFetching(true))
    AuthAPI.logOut()
        .then(res => {
            console.log(res)
            dispatch(setIsLogin(false))
            dispatch(setIsFetching(false))
        })
        .catch((err: AxiosError<{ error: string }>) => errorUtils(err, dispatch))
}

export default AuthReducer;