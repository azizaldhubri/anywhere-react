import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { LOGOUT, USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import {  Link, useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal' ;
 
import { Dropdown, DropdownButton } from "react-bootstrap";
import './../../index.css'
import { MenuLeft } from "../../Context/MenueContextLeft";
import { WindowSize } from "../../Context/WindowContext";
export default function TopBar(){
    // const WindowContext=useContext(WindowSize)

    const menu=useContext(Menu);
    const setisOpen=menu.setisOpen;    
    const menuLeft=useContext(MenuLeft);
    const setisOpenMenuLeft=menuLeft.setisOpenMenuLeft;
    const isOpenMenuLeft=menuLeft.isOpenMenuLeft;
    const WindowContext=useContext(WindowSize)
    const windowSize=WindowContext.windowSize;
    
    const[user,setUser]=useState('');
    
    const Navigate=useNavigate();
    const cookie=Cookie();    
  

    useEffect(()=>{
        Axios.get(`/${USER}`)
        .then(data=>setUser(data.data))
        // .catch(()=>Navigate('/login',{replace:true}))
        .catch(<Navigate to={'/login'} replace={true}/>)
    },[])

   

    async function handleLogout(){
        try{
            await Axios.get(`/${LOGOUT}`);         
         window.location.pathname='/login'
         cookie.remove('e-commerce');
        }
        catch(err){
            console.log(err)
        }
    
        }
        function userupdate(){
            Navigate(`users/${user.id}`)
        }
       
    return (
        
        <div className="top-bar d-flex align-items-center justify-content-center col-lg-12 col-md-8 col-12 col-sm-12 ">
            <div className="d-flex align-items-center justify-content-between col-lg-8 col-md-12 col-sm-12 col-12   h-100 flex-wrap   "> 
                <div className="d-flex align-items-center      col-sm-2  col-3  ">            
                    <FontAwesomeIcon
                    className="fs-4 p-2 "
                    onClick={()=>setisOpen(prev =>!prev)} 
                    cursor={'pointer'}
                    icon={faBars} 
                    style={{color:'white',background:'#17a2b8'}}/>
                </div>
                <div className= 'd-flex align-items-center justify-content-center col-6  col-md-6   col-sm-5 col-6 mt-md-0  '>
                    { !isOpenMenuLeft && 
                        <div className="d-flex align-items-center justify-content-center custom-dropdown-button ">
                            <DropdownButton  className="custom-dropdown-button" 
                            // id='dropdown-basic-button '
                            variant="#F778A1" 
                            //  menuAlign="right"         
                            title={windowSize <300? 'Logout': user.email+'   '}>
                                <Dropdown.Item  onClick={userupdate}>الصفحة الرئيسية</Dropdown.Item>
                                <Dropdown.Item  onClick={handleLogout}>تسجيل الخروج</Dropdown.Item>
                                
                            </DropdownButton>
                        </div>
                    }

                    {windowSize >500 &&
                        <Link to='/dashboard' >               
                                <img width='150px' src={require('./../../Assets/images/logoall.png')}                 
                                style={{ display: window.innerWidth < 600 ? 'none' : 'block'}}></img>
                        </Link>
                    }
                </div>
            
               <div  className="text-start  col-sm-2 col-3  ">
                    <FontAwesomeIcon  
                    className="fs-4 p-2 "                 
                            onClick={()=>setisOpenMenuLeft(prev =>!prev)} 
                            cursor={'pointer'}
                            icon={faBars} 
                    style={{color:'white',background:'#17a2b8'}}/> 
                   </div>
            </div>
     </div>       
       
    )
    
}