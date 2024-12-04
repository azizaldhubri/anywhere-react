import { Outlet, useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal' ;
import { useEffect, useState } from "react";
import { USER } from "../../Api/Api";
import LoadingSubmit from "../../Component/Loading/Loading";
import { Axios } from "../../Api/axios";
import Error403 from "./403";
import { Navigate } from "react-router-dom";



// import Loading from "../../Component/Loading";

  export default function RequireAuth({allowedRole}){ 
 
    const navigate=useNavigate();
    // users
    const[user,setUser]=useState('');   
    useEffect(()=>{
           Axios.get(`${USER}`)           
            .then(data=>{setUser(data.data)}) 
            .catch(()=>navigate('/login',{replace:true}) )           
    },[])
    // token and cookie
    const cookie=Cookie();
    const token=cookie.get('e-commerce');
    
 
    console.log(user)
    
 
    return token ? (       
        user ==='' ?(
        <LoadingSubmit/>
        ): allowedRole.includes(user.role) ?(        
        <Outlet/>
        ):(          
        <Error403 role={user.role}/>
        )
         ):(
             <Navigate to={'/login'}replace={true}/>        
            )

   
}


