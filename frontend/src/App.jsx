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
                    <div className="alert-container"><GlobalAlert /></div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<main><Catalog /></main>} />
                        <Route path="/register" element={<main><Register /></main>} />
                        <Route path="/login" element={<main><Login /></main>} />
                        <Route path="/logout" element={<main><Logout /></main>} />
                        <Route path="/create" element={<main><Create /></main>} />
                        <Route path="/catalog/:id" element={<main><Details /></main>} />
                        <Route path="/catalog/:id/edit" element={<main><Edit /></main>} />
                    </Routes>
                </AuthProvider>
            </AlertProvider>
        </div>
    )
}

export default App
