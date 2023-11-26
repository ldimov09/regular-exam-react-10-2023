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
import Edit from "./components/edit/Edit"
import GlobalAlert from "./components/alert/Alert"
import { AlertProvider } from "./contexts/alertContext"

function App() {
    return (
        <div id="box">
            <AlertProvider>
                <AuthProvider>
                    <Header />
                    <main>
                        <GlobalAlert className='mt-3 mb-3'/>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/create" element={<Create />} />
                            <Route path="/catalog/:id" element={<Details />} />
                            <Route path="/catalog/:id/edit" element={<Edit />} />
                        </Routes>
                    </main>
                </AuthProvider>
            </AlertProvider>
        </div>
    )
}

export default App
