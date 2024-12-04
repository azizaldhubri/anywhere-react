import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar,  MenuItem, Typography, Box } from '@mui/material';
import { Button, Container } from 'react-bootstrap';
import { Form } from "react-bootstrap";
import { Link } from 'react-router-dom'; 
import { Axios } from '../../../../Api/axios';
import { USER, USERS } from '../../../../Api/Api';
import Table_documents from '../../../../Component/Dashboard/Table_document';
import Select from 'react-select';
import FormSelect from '../../../../Component/Dashboard/FormSelect';
 
 
export default function LeaveBalance( ){
  const[title,setTitle]=useState('')  
  const[users,setUsers]=useState([])
  const[section,setSection]=useState('')
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
        key:'name',
        name:'الموظف'      
    },
    {
        // key:'supervising_emp',
        name:'الرصيد الإفتتاحي'       
    },
    {  
        // key:'user_name',
        name:'الإجازات المأخوذة'       
    }
    ,
    {   
        // key:'document_id',
        name:'الإجازات المتاحة'
      
    } ,
    {
        // key:'end_document',
         name:'إجازات أخرى'       
    }
      ,
    {
        // key:'end_document',
        name:'اجمالي الرصيد'      
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
 useEffect(()=>{
    setLoading(true)
        Axios.get(`/${USERS}`)            
        .then((data)=>{setUsers(data.data.data); })
        // .then(()=>setNoUsers(true))
        
        .catch((err)=>console.log(err)).finally(()=>setLoading(false));
    },[limit,page]);

 const customStyles = {
    container: (provided) => ({
      ...provided,
      fontSize: '22px',
      minWidth: '250px', 
       borderLeft: '7px solid green',  // تخصيص الحدود اليسرى
      borderRight: '7px solid green', // تخصيص الحدود اليمنى
      borderTop: '2px solid gray',             // إزالة الحدود العلوية (اختياري)
      borderBottom: '2px solid gray',          // إزالة الحدود السفلية (اختياري)
      boxShadow: 'none',             // إيقاف تأثير الظل الافتراضي
      '&:hover': {
        borderLeft: '5px solid darkred', // تخصيص الحدود اليسرى عند التمرير
        borderRight: '5px solid darkred', // تخصيص الحدود اليمنى عند التمرير
      }
    }),
    menu: (provided) => ({
      ...provided,      
      fontSize: '19px',
      zIndex: 9999,  // لتحديد قيمة z-index

     
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '200px', // تحديد الحد الأقصى لارتفاع القائمة
      overflowY: 'auto',  // تفعيل التمرير إذا تجاوزت القائمة الحد الأقصى
    }),
    
     
  };

  const options=[
    {value:'temp',label:'temp'},
    {value:'temp1',label:'temp1'},
  ]
  const optionsUsers =users && users.map(item => ({
    value: item.email,
    label: item.name
  }));

 

  return (
     
    <div className="px-4 py-2 w-100 bg-page   " >
        <div className='border d-flex align-items-center justify-content-start fs-5  pe-4 rounded'
        style={{height:'65px  ',background:'#d3d9db'}}>
          {/* <img  width='40px' src={require('./../../../Assets/img/data-oic.png')}></img> */}
          <img  width='40px' src={require('./../../../../Assets/img/data-oic.png')}></img>
          <Link to='/dashboard' className='me-2 text-black'  >الرئيسية / أرصدة الإجازات</Link>
          
        </div>
          
        <div className="w-100  d-flex align-items-center justify-content-start gap-4 fs-4 mt-4 mb-5 flex-wrap flex-md-wrap flex-sm-wrap   ">
          
                        <div className=" p-2 rounded border col-lg-3 col-md-5 col-12 col-sm-3 "style={{ background: '#79b98c',color:'black'}} >

                         <Link to='/dashboard/QualityAdd'style={{  color:'black'}} >اضف رصيد الإجازة + </Link>
                        </div>
                        
                        <Form.Group className="d-flex  align-items-center flex-wrap flex-sm-nowrap  "   > 
                            <Form.Label className="col-lg-2   col-md-2 col-2    "> القسم</Form.Label>                               
                         
                          {/* <Select className='w-100  '                                                 
                          onChange={(e)=> setSection(e.target)}
                              options={options}                                                           
                              placeholder="اختر اسم القسم "
                            styles={customStyles}
                            // ref={focus}
                          >
                            
                          </Select> */}
                          <div className='w-100 border ms-5'>
                                 <FormSelect
                                 styles={customStyles}
                                 placeholder='اختر اسم القسم '                                  
                                 options={options}
                                 />     

                          </div>

                          </Form.Group> 

                        <Form.Group className="d-flex  align-items-center gap-2 flex-wrap flex-sm-nowrap  "   > 
                            <Form.Label className="col-lg-2   col-md-2 col-2  ms-2  "> الموظف</Form.Label>                               
                         
                          <Select className='w-100 '                                                 
                        //   onChange={(e)=> SetUsers(e.target)}
                              options={optionsUsers}                                                           
                              placeholder="اختر اسم القسم "
                            styles={customStyles}
                            // ref={focus}
                          >
                            
                          </Select>
                          </Form.Group>  

                          <button className='rounded p-1'> اضف رصيد الشهر الحالي</button>

                    
                        
                    

        </div>
        
        <div className= ' d-flex align-items-ceneter justify-content-center   '>
            <div className= 'col-lg-5 col-md-8 col-12 d-flex align-items-ceneter justify-content-between gap-3  flex-wrap   '>
                                    <input className='   pe-3  rounded   '
                                    type='search'
                                    placeholder='ابحث هناء ...'
                                    />                        
                                    <button className='back_btn fs-4 line-height m-0    text-white  rounded'>بحث</button>
            </div>

        </div>
        


        <div className='w-100 d-flex justify-content-start   mt-3'> 
        <Table_documents
          header={header}
          data={users}
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
 
