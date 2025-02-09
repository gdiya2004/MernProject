import {createContext} from "react"
import {useEffect} from "react"
import { useState,useContext } from "react";
export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [user,setUser]=useState();
    const [services,setServices]=useState("");

    const storeTokenInLS=(serverToken)=>{
        setToken(serverToken);
        return localStorage.setItem("token",serverToken)
    }
    
    const LogoutUser=()=>{
        setToken("");
        return localStorage.removeItem("token")
    }
    const authorizationToken=`Bearer ${token}`
    let isLoggedin=!!token;

    const userAuthentication=async()=>{
        try{
            const response=await fetch("http://localhost:5004/api/auth/user",{
                    method:"GET",
                    headers:{
                        Authorization:authorizationToken
                    }
            })
            if(response.ok){
                const data=await response.json();
                console.log("user data",data.userData);
                setUser(data.userData);
            }
        }catch(error){
            console.log("Error fetching data")
        }
    }
    const getServices=async()=>{
        try{
            const response=await fetch("http://localhost:5004/api/data/service",{
                method:"GET",
            })
            if(response.ok){
                const data=await response.json();
                console.log(data.msg);
                setServices(data.msg);
            }
        }catch(err){
            console.log("service err");
        }
    }
    useEffect(()=>{
        getServices();
        userAuthentication();
    },[])

     return(
        <AuthContext.Provider value={{isLoggedin,storeTokenInLS,LogoutUser,user,services,authorizationToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{  
    const authContextValue=useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return authContextValue;
}