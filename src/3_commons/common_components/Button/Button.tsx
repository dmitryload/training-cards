import React from 'react';
import privateClass from "./Button.module.css"
import {useAppDispatch} from "../../../2_BLL/store";
import {setAppError} from "../../../2_BLL/app-reducer";

type ButtonPropsType = {
    text: string
    type?: "button" | "submit" | "reset"
    disabled?: boolean
    onClicked?: () => void
}
const Button: React.FC<ButtonPropsType> = ({text, type, disabled, onClicked}) => {
    const dispatch = useAppDispatch()
    const onClickedHandler = () => {
        onClicked && onClicked()
        dispatch(setAppError(null))
    }
    return (
        <button type={type}
                onClick={onClickedHandler}
                disabled={disabled}
                className={disabled ? privateClass.btn__disabled : privateClass.btn}>{text}</button>

    );
};

export default Button;
