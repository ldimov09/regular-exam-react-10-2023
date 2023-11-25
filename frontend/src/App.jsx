import { Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import Register from "./components/register/Register"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import { AuthProvider } from "./contexts/authContext"
import Logout from "./components/logout/Logout"
import Catalog from "./components/catalog/Catalog"
import Create from "./components/create/Create"
import Details from "./components/details/Details"

function App() {
    return (
        <div id="box">
            <AuthProvider>
                <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/catalog/:id" element={<Details />} />
                </Routes>
            </main>
            </AuthProvider>
        </div>
    )
}

export default App
