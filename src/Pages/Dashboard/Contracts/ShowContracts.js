import {  TableContainer, TableHead,   Paper, PaginationItem } from '@mui/material';
import { useEffect, useRef, useState } from "react";
// import { Form } from "react-bootstrap";
 
// import { document_type_Form } from "./DocumentType";
// import { documents } from "./DocumentType";
// import Modal from './Modal';
import './Modal.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
 
// import Select from '@mui/material/Select';
 
 
import { typeFile } from "../Taskes/Files";
 import moment from 'moment-hijri';
import { Link, useNavigate } from "react-router-dom";
import 'moment/locale/ar';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // استيراد أنماط التقويم
 import React from 'react';
import DateStorage from "../../../Helpers/DateSorage"; 
import Select from 'react-select';
// import FormSelect from "../../../Component/Dashboard/FormSelect";
import BotunNav from "../Documents/BotunNav";
import { Form } from "react-bootstrap";
import TranFormDate from "../../../Helpers/TranFormDate";
import DateMilady from "../../../Helpers/DateMilady";
import Table_documents from "../../../Component/Dashboard/Table_document";
import { Axios } from "../../../Api/axios";
import { USER } from "../../../Api/Api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faMagnifyingGlass, faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import History from '../../../Component/Dashboard/History';
import HistoryDatew from '../../../Component/Dashboard/History';
import NavHeader from '../../../Component/Dashboard/NavHeader';

export default function ShowContracts(){
  const[test,setTest]=useState(0)
 

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
    const [selectedOption, setSelectedOption] = useState('ميلادي');
    const [isChecked, setIsChecked] = useState(false);
   
  
      
      //-----------date select end date
      const [endDate, setEndDate] = useState(new Date()); 
      const endtDate_Document =TranFormDate( endDate) 
      const [isOpenCalenderEnd, setOpenCalenderEnd] = useState(false);  

    const [activeTab, setActiveTab] = useState('العقود الفعاله');

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

    //----------------------------------------------select with search
    
  const options =[
    {value:'صالات',label:'صالات'},
    {value:'صرافات',label:'صرافات'},
    {value:'فلل',label:'فلل'},
    {value:'مكاتب',label:'مكاتب'},
    {value:'عمائر',label:'عمائر'},
    {value:'ابراج اتصالات',label:'ابراج اتصالات'},
    {value:'استراحات',label:'استراحات'},
    {value:'شقة',label:'شقة'},
  ]


  const customStyles = {
    container: (provided) => ({
      ...provided,
      fontSize: '22px',
      minWidth: '250px', 
      width:'100%',
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
//-------------------------------------select general
const [collection, setCollection] = useState('');  
const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);            
  }
 
 
 
//----------------------------------------------date
const[nmber_years,setNumber_years]=useState('')
const today =DateMilady( new Date())  
 //-------------------------------------------------style table
 const sx_cell={
    maxWidth:80,
    fontSize: '20px',  // تغيير حجم الخط
    fontWeight: 'bold', // جعل الخط عريضًا
    borderRight: '2px solid black', // إضافة border للخلايا
    backgroundColor: '#d3d9db', // لون خلفية لتوضيح الحدود
    borderColor:'#c2c5c5',
    borderBottom:'3px solid gray',
    textAlign: 'center'}
  /////////////-------------------------------------------------------
  
  const header1=[          
    {
        // key:'document_name',
        name:'رقم العقد'       
    },
    {
        // key:'supervising_emp',
        name:'الاسم'      
    },
    {  
        // key:'user_name',
        name:'المستاجر'      
    }
    ,
    {    // key:'document_id',
        name:'تاريخ العقد'      
    } ,
    {
        // key:'end_document',
        name:'ناريخ انتهاء العقد'       
    }
     ,
    {
        // key:'file_paths',
        name:'الوحدات'       
    }
     ,
    {
        // key:'file_paths',
        name:'قيمة العقد'       
    }
     ,
    {
        // key:'file_paths',
       name:'طريقة الدفع'              
    },
    {
        // key:'file_paths',
         name:'الحالة'
    }
     ,
    {
        // key:'file_paths',
        name:'العمليات'    }
]
const[documents,setDocuments]=useState([])
    useEffect(()=>{
        async function gettask(){
           
          try{  
               
        //   await Axios.get(`/serchTypeDocument?query=${title}&limit=${limit}&page=${page}`)    
        //   .then(e=>{
        //     setDocuments(e.data.data);
        //     setTotal(e.data.total)    
        //   })                             
        }
      
        catch(err){console.log(err)}
      }
      gettask();    
      },[title,limit,page])
      // console.log(documents)
      
    //   async function handleDelet(id){
    //     try{
    //      await Axios.delete(`document/${id}`);
    //      setDocuments((prev)=>prev.filter((item)=>item.id!==id)) ;
                              
    //      }}
   //------------------------function Date-------------------------------------------------------
     ///date selectedDate
     const [startDate, setStartDate] = useState(new Date());    
     const startDate_Document =TranFormDate( startDate) 
     const [isOpenCalenderStart, setOpenCalenderStart] = useState(false);
   function handleValueStartDate (value) {
    setStartDate(value);
    //  console.log(value)
}; 


const links=[
{name:'العقود',
link:'#'
}]

    return (
    <div className="bg-page w-100 px-3 py-3 fs-5 mb-5"  style={{position: 'relative ',zIndex:1150}}>
        
          <NavHeader
            nav={links}/>
        <div className="w-100 col-lg-12 col-ms-12  d-flex align-items-center justify-content-between gap-2 fs-4 mt-4 mb-5 flex-wrap ">
          
          <div className=" col-lg-2 col-md-3 col-6 p-2 rounded border"style={{ background: '#79b98c',color:'black'}} >

           <Link to='/dashboard/AddContracts'style={{  color:'black'}} > اضافة عقد + </Link>
          </div>
      
          <div className= ' col-lg-4 col-md-6  col-md-3 col-12  border        d-flex align-items-ceneter justify-content-end '>
                  <input className='col-lg-6 col-6 col-md-6  rounded-0   border-0 '
                  type='search'
                  />                        
                  <button className='col-lg-6  col-6 col-md-4 back_btn fs-4 line-height m-0   rounded  text-white '>بحث</button>
          </div>
          <div className="col-lg-3 col-md-4 col-ms-3 col-12    d-flex align-items-center justify-content-between flex-wrap   ">
          <Form.Group className="col-lg-5 col-md-4 col-12"  >                            
                            <Select className=' col-lg-12  '
                            name='supervising_emp'
                                options={options}                             
                                //   onChange={(e)=> setForm({...form, supervising_emp:e })}
                                placeholder="اختر نوع  العقد"
                                styles={customStyles}
                            
                            >                            
                            </Select>
                </Form.Group>
                
          </div>
          <div className="col-lg-3 col-md-4 col-ms-3 col-12    d-flex align-items-center justify-content-between flex-wrap   ">
          <Form.Group className="col-lg-5 col-md-4 col-12 col-ms-4"  >                            
                            <Select className=' col-lg-12  '
                            name='supervising_emp'
                                // options={options}                             
                                //   onChange={(e)=> setForm({...form, supervising_emp:e })}
                                placeholder="اختر نوع  العقد"
                                styles={customStyles}
                            
                            >                            
                            </Select>
                </Form.Group>
                
          </div>
      

</div>
     <div className="tab-header ">
        <ul className="tab-list d-flex  fs-5  flex-wrap  "style={{outline:'none ',cursor:'pointer',listStyleType:'none'}}>
          <li   
            className={activeTab === 'العقود الفعاله' ? 'active' : ''  } 
            onClick={() => handleTabClick('العقود الفعاله')}
            style={{ 
                borderBottom:activeTab === 'العقود الفعاله'?'3px solid blue':'' ,
              background:activeTab == 'العقود الفعاله'?'#bed9e7':'' ,padding:'4px 10px ',
                           
              }}
            >
               العقود الفعاله
          </li>
          <li 
            className={activeTab === 'العقود الملغاة' ? 'active' : ''} 
            onClick={() => handleTabClick('العقود الملغاة')}
            style={{ 
                borderBottom:activeTab === 'العقود الملغاة'?'3px solid blue':'' ,
              background:activeTab == 'العقود الملغاة'?'#bed9e7':'' ,padding:'4px 10px ',
                           
              }}
          >
            العقود الملغاة
          </li>
          <li 
            className={activeTab === 'العقود المنتهيه' ? 'active' : ''} 
            onClick={() => handleTabClick('العقود المنتهيه')}
            style={{ 
                borderBottom:activeTab === 'العقود المنتهيه'?'3px solid blue':'' ,
              background:activeTab == 'العقود المنتهيه'?'#bed9e7':'' ,padding:'4px 10px ',
                           
              }}
          >
            العقود المنتهيه
          </li>
         
        
        
        </ul>
         
        
        {activeTab ==='العقود الفعاله' && 
               <div className='w-100'>
                  <Table_documents
             header={header1}
             data={documents}
            
             role={role}
             currentUser={currentUser}
             limit={limit}
             setLimit={setLimit}
             page={page}
            //  delete ={handleDelet}
             setPage={setPage}
             search='name'
             total={total}
            //  Linksearch={documents}
          />
               </div>      
         }
        {activeTab ==='العقود الملغاة' && 
              <div className='w-100'>
              <Table_documents
         header={header1}
         data={documents}
        
         role={role}
         currentUser={currentUser}
         limit={limit}
         setLimit={setLimit}
         page={page}
        //  delete ={handleDelet}
         setPage={setPage}
         search='name'
         total={total}
        //  Linksearch={documents}
      />
           </div>       
         }
        {activeTab ==='العقود المنتهيه' && 
             <div className='w-100'>
             <Table_documents
        header={header1}
        data={documents}
       
        role={role}
        currentUser={currentUser}
        limit={limit}
        setLimit={setLimit}
        page={page}
       //  delete ={handleDelet}
        setPage={setPage}
        search='name'
        total={total}
       //  Linksearch={documents}
     />
          </div>       
         }

        
        
      </div>


        </div>
      
    );

    
}