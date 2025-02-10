import { Navigate, NavLink, Outlet } from "react-router-dom"
import {useAuth} from "../../store/auth.jsx"

export const AdminLayout=()=>{
    const {user,isLoading}=useAuth();
    console.log("admin lay",user);
    if(isLoading){
        return <div>Loading...</div>
    }
    if(!user.isAdmin){
        return <Navigate to="/" />
    }
    return (
        <>
        <header>
            <div className="container">
                <nav>
                    <ul>
                        <li><NavLink to="/admin/users">users</NavLink></li>
                        <li><NavLink to="/admin/contacts">contacts</NavLink></li>
                        <li></li>
                        <li></li>
                    </ul>
                </nav>
            </div>
        </header>
        <Outlet/>
        </>
    )
}