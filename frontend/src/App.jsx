import { Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import Register from "./components/register/Register"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import { AuthProvider } from "./contexts/authContext"
import Logout from "./components/logout/Logout"

function App() {
    return (
        <div id="box">
            <AuthProvider>
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </AuthProvider>
        </div>
    )
}

export default App
