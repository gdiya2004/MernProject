import {useState} from "react";
import {useNavigate} from "react-router-dom"
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
export const Register=()=>{
    const [user,setUser]=useState({
        username:"",
        email:"",
        phone:"",
        password:""
    })
    const navigate=useNavigate();
    const {storeTokenInLS}=useAuth();

    const handleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setUser({
            ...user,
            [name]:value,//dynamic value
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        alert("usr",user);
        // console.log(user);

        try{
            const response=await fetch(`http://localhost:5004/api/auth/register`,{
                method:"POST",
                headers:{
                    'Content-Type':"application/json",
                },
                body:JSON.stringify(user)
            });
            const res_data=await response.json();
            console.log("rs from server",res_data.extraDetails);
            toast.success("Registration Done")
            if(response.ok){
                // const res_data=await response.json();
                // console.log("rs from server",res_data);

                storeTokenInLS(res_data.token);
                // localStorage.setItem("token",res_data.token);

                setUser( {username:"",
                    email:"",
                    phone:"",
                    password:""});
                    navigate("/");
            }else{
                toast.error(res_data.extraDetails?res_data.extraDetails:res_data.msg)
            }
           
        }
        catch(error){
            console.log("register",error);
        }
    };
    return(
        <>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
                <div className="registration-image">
                    <img src="/images/register.png" alt="registration going on" width="300" height="300"/>
                </div>
                <div className="registration-form">
                    <h1 className="main heading mb-3">registration form</h1>
                    <br/>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Name:</label>
                            <input type="text" name="username" required placeholder="username" id="username" autoComplete="off" value={user.username} onChange={handleInput}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" required placeholder="email" id="email" autoComplete="off" value={user.email} onChange={handleInput}/>
                        </div>
                        <div>
                            <label htmlFor="phone">Phone:</label>
                            <input type="number" name="phone" required placeholder="phone" id="phone" autoComplete="off" value={user.phone} onChange={handleInput}/>
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" required placeholder="password" id="password" autoComplete="off" value={user.password} onChange={handleInput}/>
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-submit"> Register Now</button>
                    </form>
                </div>
            </div>
          </div>  
        </main>
        </>
    )
}