import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import Login from "../login/Login";
import AuthContext from "../../contexts/authContext";
import Register from "../register/Register"
import Logout from "../logout/Logout";
import Catalog from "../catalog/Catalog";
import Create from "../create/Create";
import Details from "../details/Details";
import Edit from "../edit/Edit";
import Profile from "../profile/Profile";
import MyProfile from "../profile/MyProfile";
import PageNotFound from "../404/404";
import { useContext } from "react";
import EditUser from "../edit-user/EditUser";

export default function ProtectedRoutes() {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<main><Catalog /></main>} />
            <Route path="/logout" element={<main><Logout /></main>} />
            {!isAuthenticated ? (<>
                <Route path="/register" element={<main><Register /></main>} />
                <Route path="/login" element={<main><Login /></main>} />
            </>) : ''}
            {isAuthenticated ? (<>'
                <Route path="/create" element={<main><Create /></main>} />
                <Route path="/catalog/:id" element={<main><Details /></main>} />
                <Route path="/catalog/:id/edit" element={<main><Edit /></main>} />
                <Route path="/my-profile" element={<main><MyProfile /></main>} />
                <Route path="/profile/:id" element={<main><Profile /></main>} />
                <Route path="/my-profile/edit" element={<main><EditUser /></main>} />
            </>) : ''}
            <Route path="*" element={<main><PageNotFound /></main>} />
        </Routes>
    );
}