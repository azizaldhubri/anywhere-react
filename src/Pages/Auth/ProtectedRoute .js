import React, { useContext } from 'react';  
import { Outlet,Navigate, useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal' ;
import { useEffect, useState } from "react";
import { USER } from "../../Api/Api";
import LoadingSubmit from "../../Component/Loading/Loading";
import { Axios } from "../../Api/axios";
import Error403 from "./403";
import  {UserContext, UserProvider} from '../../Context/UserProvider';
 
// import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ permission }) => {

    const USERNAME=useContext(UserContext)
    // const username=USERNAME.user ;
        const {update, setUpdate} = useContext(UserContext);   
    const permissions=USERNAME.permissions;
 
    
    // const navigate=useNavigate();   
 
    const [isHasValidity, setIsHasValidity] = useState(false);  
    const [isValidited, setIsValidited] = useState(false);
    
    //   
    const [newLink, setNewLink] = useState('');  
    const[user,setUser]=useState(''); 
     
    
    // token and cookie
    const cookie=Cookie();
    const token=cookie.get('e-commerce');
 
 
    // useEffect(()=>{
    //     async function User_role( ) {
    //       await  Axios.get(`${USER}`)           
    //         .then(data=>{setUser(data.data);setId(data.data.role_id);fetchPermissions(data.data.role_id)}) 
    //         .catch(()=>navigate('/login',{replace:true}) )             
    //     }
    //     User_role();            
    // },[])  
    
        // جلب الصلاحيات للدور المحدد
     
        // async function fetchPermissions(id) {
        //     const response = await Axios.get(`roles/${id}`);            
        //     const permissionsData = {};
        //     console.log(response.data);
        //     response.data.forEach(item => {                   
        //         if(item.page.name===permission && item.can_view===1){
        //             // if(item.can_view===1){
        //                 setIsHasValidity(true)
        //             // }
        //             permissionsData[item.page.name] =item;
        //         }
        //     });
        //     // setPermissions(permissionsData);
        // };
//===================================================================
function handleChangeValue(){
    setUpdate(permission);
  };
 
 useEffect(()=>{ 
  handleChangeValue();
    async function fetchPermissi() {                
        const permissionsData = {};                 
          permissions.forEach(item => {             
              if(item.page.name===permission && item.can_view===1){                                     
                      setIsHasValidity(true)
                      setIsValidited(true);
                      setNewLink(permission)                      
               //   permissionsData[item.page.name] =item;
              }else  { setIsValidited(true);  }
          });

        };
         fetchPermissi();
},[permissions]) 

 
 //-------------------------------------------------------------------------------------------
 return token ? (       
    //    (username.user=='' )  ?
       ( isValidited ===false)  ?
       (
        <LoadingSubmit/>
        ): (isHasValidity === true && newLink===permission) ?
        (        
        <Outlet/>
       ): (isHasValidity === true && newLink !==permission)?
       (<LoadingSubmit/>):         
        (<Error403 role={user.role}/>
        // <Outlet/>
        )
         ):(
             <Navigate to={'/login'}replace={true}/>        
            )

};

export default ProtectedRoute;
