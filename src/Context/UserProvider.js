import React, { createContext, useEffect, useState } from "react";
import { USER } from "../Api/Api";
import { Axios } from "../Api/axios";
import { Navigate  , useNavigate } from "react-router-dom";

// إنشاء السياق
export const UserContext = createContext();
// المزود (Provider) لتغليف التطبيق
export const UserProvider = ({ children }) => {

  // const navigate=useNavigate();
  const [user, setUser] = useState('');
  const [permissions, setPermissions] = useState([]);   
  useEffect(()=>{
    async function User_role( ) {
      await  Axios.get(`${USER}`)           
        .then(data=>{setUser(data.data);fetchPermissions(data.data.role_id)}) 
        // .catch(()=>navigate('/login',{replace:true}) ) 
        .catch((data)=>console.log(data) ) 
    }
    User_role();            
},[])

async function fetchPermissions(id) {
    await Axios.get(`roles/${id}`)
  .then(data=>setPermissions(data.data))  
  // .catch(()=> window.location='/login') 
  // setPermissions(response.data)
  // .catch(()=>navigate('/login',{replace:true}) ) 
  // const permissionsData = {};
  // response.data.forEach(item => {        
  //         permissionsData[item.page.name] =item;
  //     }
  // );
  //  setPermissions(permissionsData);
};
// console.log(permissions)

  return (
    <UserContext.Provider value={{ user, setUser,permissions, setPermissions }}>
      {children}
    </UserContext.Provider>
  );
};
