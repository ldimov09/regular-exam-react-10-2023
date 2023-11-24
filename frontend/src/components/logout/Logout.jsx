import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

export default function Logout() {
    const navigate = useNavigate();
    const { logoutHandler, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if(isAuthenticated){
            logoutHandler();
            navigate('/');
        }
    }, [])
}