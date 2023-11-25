import { useNavigate } from "react-router-dom";

import * as authService from "../services/authService.js"
import { createContext, useState } from "react";
import useSavedState from "../hooks/useSavedState.js";

const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useSavedState('auth', {});

    const loginSubmitHandler = async (values) => {
        const result = await authService.login(values.email, values.password);
        setAuth(result);
        navigate("/");
    };

    const registerSubmitHandler = async (values) => {
        const result = await authService.register(values.email, values.password, values.username);
        setAuth(result);
        navigate("/");
    };

    const logoutHandler = () => {
        setAuth({});
    };

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        username: auth.username || auth.email,
        email: auth.email,
        userId: auth._id,
        isAuthenticated: !!auth.token,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthContext;