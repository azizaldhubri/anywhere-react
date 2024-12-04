import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Select, MenuItem, Typography, Box } from '@mui/material';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Table_documents from '../../../Component/Dashboard/Table_document';
import Table_documents from './Table_document';
import { USER } from '../../Api/Api';
import { Axios } from '../../Api/axios';
 
 

 
export default function FormQuality(props){
  const[title,setTitle]=useState('')
  const[page,setPage]=useState(1)
  const[limit,setLimit]=useState(3)
  const[loading,setLoading]=useState(false)
  const[total,setTotal]=useState(0);
  const[role,setRole]=useState('');
  const[currentUser,setCurrentUser]=useState('');

  useEffect(()=>{        
    Axios.get(`/${USER}`)            
    .then((res)=>{setCurrentUser(res.data);
        setRole(res.data.role)
    });         
},[]);



 const[documents,setDocuments]=useState([])
 
 
 useEffect(()=>{
  async function gettask(){
     
    try{  
    {title &&     
    await Axios.get(`/serchTypeDocument?query=${title}&limit=${limit}&page=${page}`)    
    .then(e=>{
      setDocuments(e.data.data);
      setTotal(e.data.total)    
    })                             
  }
}
  catch(err){console.log(err)}
}
gettask();    
},[title,limit,page])
// console.log(documents)

async function handleDelet(id){
  try{
   await Axios.delete(`document/${id}`);
   setDocuments((prev)=>prev.filter((item)=>item.id!==id)) ;
                        
   }
  catch(err){
              console.log(err)
         }         
 }
         
      
        
  const header=[          
    {
        key:'document_name',
        name:'العميل'
    },
    {
        key:'supervising_emp',
        name:'المبلغ'
    },
    {  
        key:'user_name',
        name:'تاريخ السداد' 
    }
    ,
    {   
        key:'document_id',
        name:  'تاريخ السند '
    } ,
    {
        key:'end_document',
        name:'تاريخ نهاية المستند'
    }
     ,
    {
        key:'file_paths',
        name:'العمليات'
    }
 ]


 const [activeTab, setActiveTab] = useState('السندات الغير مستحقة ');

 const handleTabClick = (tab) => {
   setActiveTab(tab);
 };


 

  return (
     
      <div className="px-4 py-2 w-100 bg-page   " >
        <div className='border d-flex align-items-center justify-content-start fs-5  pe-4 rounded'
        style={{height:'65px  ',background:'#d3d9db'}}>
          {/* <img  width='40px' src={require('./../../../Assets/img/data-oic.png')}></img> */}
          <img  width='40px' src={require('./../../Assets/img/data-oic.png')}></img>
          <Link to='/dashboard' className='me-2 text-black' >الرئيسية / {`${props.link}`}</Link>
          
        </div>
          
         <div className="w-100  d-flex align-items-center justify-content-start gap-4 fs-4 mt-4 mb-5 ">
          
                        <div className=" p-2 rounded border"style={{ background: '#79b98c',color:'black'}} >

                         <Link to='/dashboard/QualityAdd'style={{  color:'black'}} > {`${props.LinkaddDocument}`} </Link>
                        </div>
                    
                        <div className= '    position-relative w-25 d-flex align-items-ceneter justify-content-end '>
                                <input className='   rounded-0 w-50 border-0 '
                                type='search'
                                />                        
                                <h3 className='back_btn fs-4 line-height m-0 w-50   text-white '>بحث</h3>
                        </div>
                    

           </div>
        <div className='w-100 d-flex justify-content-start   mt-3'>   
               
     
        </div>

             
    </div>
    // </Container>
  );

};
 
