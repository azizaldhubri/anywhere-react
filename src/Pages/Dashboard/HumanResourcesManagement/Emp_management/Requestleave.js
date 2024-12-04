import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Select, MenuItem, Typography, Box } from '@mui/material';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table_documents from '../../../../Component/Dashboard/Table_document';
import { Axios } from '../../../../Api/axios';
import { USER } from '../../../../Api/Api';
// import FormQuality from '../../../Component/Dashboard/FormQuality';
import FormQuality from '../../../../Component/Dashboard/FormQuality';

 
export default function Requestleave(){
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
        // key:'document_name',
        name:'الموظف'
    },
    {
        // key:'supervising_emp',
        name:'نوع المغادرة'
    },
    {  
        // key:'user_name',
        name:'المدة' 
        
    }
    ,
    {   
        // key:'document_id',
        name:'تاريخ التعديل' 
    } ,
    {
        // key:'end_document',
        name:'حالة الطلب' 
    }
     ,
    {
        // key:'end_document',
        name:'جهة الموافقة' 
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
        <FormQuality
        link='طلبات المغادرة'
        LinkaddDocument='أضف طلب مغادرة +' 
        />
        <div>
        <Table_documents
          header={header}
          data={documents}
          role={role}
          currentUser={currentUser}
          limit={limit}
          setLimit={setLimit}
          page={page}
          delete ={handleDelet}
          setPage={setPage}
          search='name'
          total={total}
          Linksearch={documents}
           
                      
            
            // loading={loading}
          //   createTask={createTask}
            // role={role}
        />
         

        </div>  
            
    </div>
    // </Container>
  );

};
 
