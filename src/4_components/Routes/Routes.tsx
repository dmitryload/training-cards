import React from 'react';
import {Route, Routes} from "react-router-dom";
import {CARDS, PACKS, PATH} from "../../3_commons/Path";
import {Error404} from "../Main/Error404/Error404";
import SignUp from "../Main/Auth/SignUp/SignUp";
import Profile from "../Main/Profile/Profile";
import SignIn from "../Main/Auth/SignIn/SignIn";
import ForgotPassword from "../Main/Auth/ForgotPassword/ForgotPassword";
import EditProfile from '../Main/Profile/EditProfile';
import EmailPasswordSent from "../Main/Auth/EmailPasswordSent/EmailPasswordSent";
import {SetNewPassword} from "../Main/Auth/SetNewPassword/SetNewPassword";
import Packs from "../Main/Packs/Packs";
import Cards from "../Main/Cards/Cards";

const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path="*" element={<Error404/>}/>
                <Route path="/" element={<Packs/>}/>
                <Route path={PATH.profile} element={<Profile/>}></Route>
                <Route path={PATH.emailPasswordSent} element={<EmailPasswordSent/>}></Route>
                <Route path={PATH.editProfile} element={<EditProfile/>}></Route>
                <Route path={PATH.signIn} element={<SignIn/>}></Route>
                <Route path={PATH.signUp} element={<SignUp/>}></Route>
                <Route path={PATH.forgotPassword} element={<ForgotPassword/>}></Route>
                <Route path={PATH.error} element={<Error404/>}></Route>
                <Route path={PATH.setNewPassword} element={<SetNewPassword/>}/>
                <Route path={PACKS.packs} element={<Packs/>}/>
                <Route path={CARDS.cards} element={<Cards/>}/>
            </Routes>
        </div>
    );
};

export default Pages;