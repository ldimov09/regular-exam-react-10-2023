import { Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import Register from "./components/register/Register"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import AuthContext, { AuthProvider } from "./contexts/authContext"
import Logout from "./components/logout/Logout"
import Catalog from "./components/catalog/Catalog"
import Create from "./components/create/Create"
import Details from "./components/details/Details"
import Edit from "./components/edit/Edit"
import GlobalAlert from "./components/alert/Alert"
import { AlertProvider } from "./contexts/alertContext"
import Profile from "./components/profile/Profile"
import MyProfile from "./components/profile/MyProfile"
import PageNotFound from "./components/404/404"
import { useContext } from "react"
import ProtectedRoutes from "./components/protected-routes/ProtectedRoues"

function App() {
    return (
        <div id="box">
            <AlertProvider>
                <AuthProvider>
                    <Header />
                    <div className="alert-container"><GlobalAlert /></div>
                    <ProtectedRoutes />
                </AuthProvider>
            </AlertProvider>
        </div>
    )
}

export default App
