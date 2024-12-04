// import { Link } from "react-router-dom";
// import { Axios } from "../../../Api/axios";
// import Cookie from 'cookie-universal' ;
// import { LOGOUT } from "../../../Api/Api";
import './Home.css' 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../../Context/UserProvider';
import { USER } from '../../../Api/Api';
import { Axios } from '../../../Api/axios';

export default  function HomePage() {

             
 
  return (
      // <div >
        
     
      <div className='py-2 px-3 w-100 d-flex   align-items-start justify-content-between   flex-wrap'>
      <Link to='documents' className='d-flex align-items-center  flex-column'>
        <p className='m-0 pt-2 fs-2' style={{color:'#28a745'}}>الوثائق</p>
        <img width='100px' src={require('./../../../Assets/images/document.png')}></img>
        <p className='m-0 p-2 mt-1 rounded' style={{background:'#28a745',color:'white'}}>اجمالي الوثائق</p>
      </Link>

      <Link to='users' className=' text-danger d-flex align-items-center  flex-column  '>
        <p className='m-0 pt-2 fs-2'>الموظفين</p>
        
        <FontAwesomeIcon   icon={faUsers} style={{fontSize:'80px'}} />
  

        <p className='m-0 mt-4 p-2 rounded ' style={{background:'#dc3545',color:'white'}}>اجمالي الموظفين</p>
      </Link>

       <Link to='Taskes1' className='  d-flex align-items-center  flex-column'>
        <p className='m-0 pt-2 fs-2' style={{color:'#6f42c1'}}>المهام</p>
        <img width='100px' src={require('./../../../Assets/images/task.jfif')}></img>
        <p className='m-0 p-2  rounded' style={{background:'#6f42c1',color:'white'}}>اجمالي المهام</p>
      </Link> 

      <Link to='ShowContracts' className='   d-flex align-items-center  flex-column'>
        <p className='m-0 pt-2 fs-2' style={{color:'#0dcaf0'}}>العقود</p>
        <img width='120px' src={require('./../../../Assets/images/contact2.jfif')}></img>
        <p className='m-0 p-2 mt-2 rounded' style={{background:'#0dcaf0',color:'white'}}>اجمالي العقود</p>
      </Link>
    </div>
   
     

      // </div>
   
  );
}


