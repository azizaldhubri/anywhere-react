import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Select, MenuItem, Typography, Box } from '@mui/material';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table_documents from '../../../Component/Dashboard/Table_document';
import { Axios } from '../../../Api/axios';
import { USER } from '../../../Api/Api';
import FormQuality from '../../../Component/Dashboard/FormQuality';

 
export default function DocumentConformity(){
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

//  return (
//    <div className="tab-header">
//      <ul className="tab-list d-flex gap-3 fs-5  border "style={{outline:'none ',cursor:'pointer',listStyleType:'none'}}>
//        <li   
//          className={activeTab === 'السندات الغير مستحقة ' ? 'active' : '' } 
//          onClick={() => handleTabClick('السندات الغير مستحقة ')}
//          style={{borderBottom:activeTab === 'السندات الغير مستحقة '?'3px solid blue':'' 
//             ,border:'2px solid red',background:'#eaeaea' ,padding:'4px 10px ',
//             borderRadius:'18px',            
//             color:activeTab !== 'السندات المستحقة '&&'#999999'}}
//          >
//          السندات الغير مستحقة 
//        </li>
//        <li 
//          className={activeTab === 'السندات المستحقة ' ? 'active' : ''} 
//          onClick={() => handleTabClick('السندات المستحقة ')}
//          style={{borderBottom:activeTab === 'السندات المستحقة '?'3px solid blue':'' ,
//             fontWeight:'lighter',color:activeTab !== 'السندات المستحقة '&&'#999999'}}
//        >
//          السندات المستحقة 
//        </li>
     
//      </ul>

//      <div className="tab-content d-flex border">
//        {activeTab === 'السندات الغير مستحقة ' && <div>السندات الغير مستحقة </div>}
//        {activeTab === 'Tab2' && <div>Content for Tab 2</div>}
//        {activeTab === 'Tab3' && <div>Content for Tab 3</div>}
//      </div>
//    </div>
//  );
 

  return (
     
      <div className="px-4 py-2 w-100 bg-page   " >
        <FormQuality
        link='مستدات حالة المطابقة'
        LinkaddDocument='إضافة مستند حالة المطابقة +' 
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
 
