import { useEffect,useState } from "react"
import {useAuth} from "../store/auth"
import {Link} from "react-router-dom"
export const AdminUsers=()=>{
    const [users,setUsers]=useState();
    const {authorizationToken}=useAuth();
    const deleteUser=async(id)=>{
        try{
            const response=await fetch(`http://localhost:5004/api/admin/users/delete/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization:authorizationToken,
                }
            })
            const data=await response.json();
            console.log("users2",data);
            // setUsers(data);
            if(response.ok){
                getAllUsersData()
            }
        }catch(error){
            console.log(error);
        }
    }
    const getAllUsersData=async()=>{
        try{
            const response=await fetch("http://localhost:5004/api/admin/users",{
                method:"GET",
                headers:{
                    Authorization:authorizationToken,
                }
            })
            const data=await response.json();
            console.log("users1",data);
            setUsers(data);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getAllUsersData()
    },[]);
    if (!Array.isArray(users)) {
        return <p>Loading users...</p>;
    }
    return(
        <>
        {
            users.map((currUser,index)=>{
                return(
                    <tr key={index}>
                        <td>{currUser.username}</td>
                        <td>{currUser.email}</td>
                        <td>{currUser.phone}</td>
                        <td><Link to={`${currUser._id}/edit`}>Edit</Link></td>
                        <td><button onClick={()=>deleteUser(currUser._id)}>Delete</button></td>
                    </tr>
                )
            })
        }
        </>
    )
}