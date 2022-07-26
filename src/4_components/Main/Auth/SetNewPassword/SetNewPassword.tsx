import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../2_BLL/store";
import {Navigate, useParams} from "react-router-dom";
import {setNewPasswordTC} from "../../../../2_BLL/auth-reducer";
import commonClass from "../../../../3_commons/classes/commonContainer.module.css"
import {useFormik} from "formik";
import Loader from "../../../../3_commons/common_components/Loader/Loader";
import Input from "../../../../3_commons/common_components/Input/Input";
import Button from "../../../../3_commons/common_components/Button/Button";
import {ErrorFormikType} from "../../../../3_commons/validates/validates";
import {PATH} from "../../../../3_commons/Path";

export const SetNewPassword = () => {
    const dispatch = useAppDispatch();
    const {token} = useParams();
    const {isFetching} = useAppSelector(state => state.app)
    const {isResponse} = useAppSelector(state => state.app)

    console.log(token)
    const formik = useFormik({
        initialValues: {
            password: "",
            repeatPassword: ""
        },
        validate: (values) => {
            const errors: ErrorFormikType = {}
            if (!values.password) {
                errors.password = "password is required"
            } else if (!values.repeatPassword) {
                errors.repeatPassword = "password is required"
            } else if (values.password.length < 8) {
                errors.password = "min length 8 symbols"
            } else if (values.repeatPassword.length < 8) {
                errors.repeatPassword = "min length 8 symbols"
            } else if (values.repeatPassword !== values.password) {
                errors.repeatPassword = "confirm your password currently"
            }
            return errors
        },
        onSubmit: ({password}: { password: string }) => {
            console.log(token)
            token && dispatch(setNewPasswordTC(password, token))
            formik.resetForm()
        },
    })
    if (isResponse) <Navigate to={PATH.signIn}/>
    return (
        <div className={commonClass.container}>
            {isFetching && <Loader/>}
            <h1>Create new password</h1>
            <form onSubmit={formik.handleSubmit}>
                <Input {...formik.getFieldProps("password")}
                       placeholder={"password"}
                       type={"password"}
                       error={formik.touched.password && formik.errors.password}
                       textError={formik.errors.password}/>
                <Input {...formik.getFieldProps("repeatPassword")}
                       placeholder={"repeat password"}
                       type={"password"}
                       error={formik.touched.repeatPassword && formik.errors.repeatPassword}
                       textError={formik.errors.repeatPassword}/>
                <Button disabled={Object.keys(formik.errors).length !== 0} text={"send"}/>
            </form>
        </div>
    );
};
