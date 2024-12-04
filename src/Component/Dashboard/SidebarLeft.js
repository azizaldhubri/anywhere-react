import './bars.css' 
import { useContext, useEffect, useState } from 'react'
import { WindowSize } from '../../Context/WindowContext'
import { Axios } from '../../Api/axios'
import { LOGOUT, USER } from '../../Api/Api';
import {  useNavigate } from "react-router-dom";
import { MenuLeft } from '../../Context/MenueContextLeft'
import Cookie from 'cookie-universal' ;
 
import { Dropdown, DropdownButton } from "react-bootstrap";
export default function SidebarLeft(){
 
  const WindowContext=useContext(WindowSize)
  const windowSize=WindowContext.windowSize;

  const menuLeft=useContext(MenuLeft);
    const isOpenMenuLeft=menuLeft.isOpenMenuLeft;
    
    const[user,setUser]=useState('');
    const Navigate=useNavigate();    
    const cookie=Cookie();   
    //------------------------------------------------------------------

    useEffect(()=>{
        Axios.get(`/${USER}`)
        .then(data=>setUser(data.data))
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
            Navigate(`/dashboard`)
        }

        const select_year=[
            {value:'2024',label:'2024'},
            {value:'2023',label:'2023'},
            {value:'2022',label:'2022'},
            {value:'2021',label:'2021'},
            {value:'2020',label:'2020'},
            {value:'2019',label:'2019'},
            {value:'2018',label:'2018'},
            {value:'2017',label:'2017'},
            {value:'2016',label:'2016'},
            {value:'2015',label:'2015'},
        ]
    
    return (
      <>
        
      <div 
      style={{
          position:'fixed',
           top:'70px',
            left:'0' ,
            width:'100%',
            height:'100vh',
            backgroundColor:'rgba(0 ,0 ,0 ,0.2)',
            display:windowSize< '768' && isOpenMenuLeft ? 'block':'none',
            // zIndex:'9999999'

            }}>
          
      </div>
      <div className='side_bar_left pt-3'
      
      style={{
          // background:'#0d6efd',
        //   left:windowSize < '768' ?( !isOpenMenuLeft ? 0 : '-100%'): 0 ,
          width: !isOpenMenuLeft ? '0px':'300px',
          position:windowSize < '768' ?'fixed': 'sticky' ,                           
          position: 'sticky' ,                           
          height:'100vh',
        //   background:'gray'
          // buttom:'20px'
      }}>
          
                                                     
{/* <div className='w-100 d-flex  justify-content-center flex-column side-bar '   */}
  
{/* <p className='text-center'>{user.email}</p> */}
<div className="d-flex align-items-center justify-content-center flex-column fs-5" style={{ left:windowSize < '768' ?( !isOpenMenuLeft ? 0 : '-100%'): 0}}>
          
          {isOpenMenuLeft &&
          <div className='w-100 d-flex align-items-center justify-content-center flex-column fs-5'>
             <DropdownButton  className="" 
             // id='dropdown-basic-button '
             variant="#F778A1"             
             title={user.email+'   '}>
                 <Dropdown.Item  onClick={userupdate}>الصفحة الرئيسية</Dropdown.Item>
                 <Dropdown.Item  onClick={handleLogout}>تسجيل الخروج</Dropdown.Item>
                 
             </DropdownButton>
        

          <p className='m-0 mt-3 text-end pe-3  w-100'>السنة المالية :2020</p>
           
          <select className='p-3 m-0'  style={{ color: "black", fontSize: "16px",width:'90%', }}
          defaultValue="default"  
                  // value={form.id_receiver}                       
                                    // onChange={handleChange} 
                                                              
                            >
                                <option  disabled  value='default'>إختار السنة المالية</option>
                                {select_year.map((item,index)=>
                                <option key={index} value={item.value}>{item.label}</option>)}
                            </select>  
                            <p  className='p-2 m-0 mt-3 border rounded text-center text-white'style={{background:'#0dcaf0',width:'90%'}}>مؤشرات الانتاج والاداء</p>       
          

                            </div>
        }
             </div>


                  
      </div>
  </>     
        )
        
}