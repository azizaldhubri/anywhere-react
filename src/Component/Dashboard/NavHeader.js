import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Select, MenuItem, Typography, Box } from '@mui/material';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Table_documents from '../../../Component/Dashboard/Table_document';
import Table_documents from './Table_document';
import { USER } from '../../Api/Api';
import { Axios } from '../../Api/axios'; 
export default function NavHeader(props){
  const[title,setTitle]=useState('')
 

//   useEffect(()=>{        
//     Axios.get(`/${USER}`)            
//     .then((res)=>{setCurrentUser(res.data);
//         setRole(res.data.role)
//     });         
// },[]);

 const [activeTab, setActiveTab] = useState('السندات الغير مستحقة ');

 const handleTabClick = (tab) => {
   setActiveTab(tab);
 };


 

  return (
     
      <div className="w-100 bg-page   " >
        <div className='border d-flex align-items-center justify-content-start fs-5  pe-4 rounded mb-3'
        style={{height:'65px  ',background:'#d3d9db'}}>
          {/* <img  width='40px' src={require('./../../../Assets/img/data-oic.png')}></img> */}
          <img  width='40px' src={require('./../../Assets/img/data-oic.png')}></img>
          <Link to='/dashboard' className='me-2 text-black' >الرئيسية </Link>
          {props.nav.map((item,index)=>
          <Link key={index} to={item.link } className='me-2 ' 
          style={{ pointerEvents: item.link =='#' ? 'none' : 'auto', color: item.link =='#' ? 'gray' : 'black' }}
          >  / {item.name}</Link>
          )}
          
          
        </div>
          
         {/* <div className="w-100  d-flex align-items-center justify-content-start gap-4 fs-4   mb-5 ">
          
                        <div className=" p-2 rounded border"style={{ background: '#79b98c',color:'black'}} >

                         <Link to='/dashboard/QualityAdd'style={{  color:'black'}} > {`${props.LinkaddDocument}`} </Link>
                        </div>
                    
                     
                    

           </div> */}
       

             
    </div>
    // </Container>
  );

};
 
