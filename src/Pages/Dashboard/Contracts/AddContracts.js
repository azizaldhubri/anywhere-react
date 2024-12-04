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
import Button from '@mui/material/Button';
// import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
// import HijriDate from 'hijri-date';
import { typeFile } from "../Taskes/Files";
// import TranFormDate from "../../../Helpers/TranFormDate";
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

export default function AddContracts(){
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

    const [activeTab, setActiveTab] = useState('المعلومات الأساسية');

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

    //----------------------------------------------select with search
    
  const options =[
    {value:'aziz',label:'aziz'}
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
  //------------------------modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // دالة لفتح المودال
  const openModal = () => setIsModalOpen(true);

  // دالة لإغلاق المودال
  const closeModal = () => setIsModalOpen(false);

  function Modal({ onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
            <div  className='w-100 d-flex   flex-column gap-3 me-3'>
                <p className='m-0 pt-3'>اختر الوحده</p>
                <div className='w-100 d-flex align-items-center justify-content-center gap-3'>
                <Form.Group className="col-lg-5 col-md-5 col-12"  > 
                                <Form.Label  > المشروع </Form.Label> 
                                <Select className='w-100   '
                                name='supervising_emp'
                                    options={options}                             
                                    //   onChange={(e)=> setForm({...form, supervising_emp:e })}
                                    placeholder="اسم المشروع   "
                                    styles={customStyles}
                                
                                >                            
                                </Select>
                    </Form.Group>
                    <Form.Group className="col-lg-5 col-md-5 col-12"  > 
                                <Form.Label  >نوع العقد</Form.Label> 
                                <Select className='w-100   '
                                name='supervising_emp'
                                    options={options}                             
                                    //   onChange={(e)=> setForm({...form, supervising_emp:e })}
                                    placeholder="نوع العقد   "
                                    styles={customStyles}
                                
                                >                            
                                </Select>
                    </Form.Group>

                </div>
                <button className='back_btn rounded'onClick={onClose}>رجوع</button>

             </div>
                {/* <button onClick={onClose}>إغلاق</button> */}
            </div>
        </div>
    );
}

  //--------------------chekbox ---------------------   
    const [isCheckedbox1, setIsCheckedbox1] = useState(false);
    const [isCheckedbox2, setIsCheckedbox2] = useState(false);
    const [isCheckedbox3, setIsCheckedbox3] = useState(false);
    const [isCheckedbox4, setIsCheckedbox4] = useState(false);
    const [isCheckedbox5, setIsCheckedbox5] = useState(false);
  
    const handleChangebox1 = () => {
      setIsCheckedbox1(!isCheckedbox1);
    };
    const handleChangebox2 = () => {
      setIsCheckedbox2(!isCheckedbox2);
    };
    const handleChangebox3 = () => {
      setIsCheckedbox3(!isCheckedbox3);
    };
    const handleChangebox4 = () => {
      setIsCheckedbox4(!isCheckedbox4);
    };
//----------------------------------------------date
    const handleChangebox5 = () => {
      setIsCheckedbox5(!isCheckedbox5);
    };
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
  
  const header=[          
    {
        // key:'document_name',
        name:'عام'
       
    },
    {
        // key:'supervising_emp',
        name:'مبلغ السنة'
       
    },
    {  
        // key:'user_name',
        name:'نسبة الزيادة'
       
    }
    ,
    {   
        // key:'document_id',
        name:'الخصم'
       
    } ,
    {
        // key:'end_document',
        name:'رقم الفترة'
        
    }
     ,
    {
        // key:'file_paths',
        name:'بداية الفترة'
       
    }
     ,
    {
        // key:'file_paths',
        name:'نهاية الفترة'
       
    }
     ,
    {
        // key:'file_paths',
        name:'مبلغ الفترة'
       
    },
    {
        // key:'file_paths',
         name:'الحالة'
    }
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
 
  
//===========================table


//-----------------------
const [rows, setRows] = useState([]); // حالة لتخزين الصفوف
const [selectedValues, setSelectedValues] = useState({}); // حالة لتخزين القيم المحددة

const options1 = ['الخيار 1', 'الخيار 2', 'الخيار 3']; // خيارات القائمة المنسدلة الأولى
const options2 = ['الخيار A', 'الخيار B', 'الخيار C']; // خيارات القائمة المنسدلة الثانية

const addRow = () => {
    const newRow = { id: rows.length + 1, value1: selectedValues[`value1-${rows.length}`], value2: selectedValues[`value2-${rows.length}`] }; // إنشاء صف جديد
    setRows([...rows, newRow]); // إضافة الصف الجديد إلى الحالة
    setSelectedValues({ ...selectedValues, [`value1-${rows.length}`]: '', [`value2-${rows.length}`]: '' }); // إعادة تعيين القيم المحددة
};

const handleSelectChange2 = (event, index, selectNumber) => {
    setSelectedValues({ ...selectedValues, [`value${selectNumber}-${index}`]: event.target.value }); // تحديث القيمة المحددة
};

const deleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));     
}
 
    return (
    <div className="bg-page w-100 px-3 py-3 fs-5 mb-5"  style={{position: 'relative ',zIndex:1150}}>
     <p>إضافة عقد إيجار</p>
     <div className="tab-header mb-0 ">
        <ul className="tab-list d-flex  fs-5  flex-wrap  "style={{outline:'none ',cursor:'pointer',listStyleType:'none'}}>
          <li   
            className={activeTab === 'المعلومات الأساسية' ? 'active' : ''  } 
            onClick={() => handleTabClick('المعلومات الأساسية')}
            style={{ 
                borderBottom:activeTab === 'المعلومات الأساسية'?'3px solid blue':'' ,
              background:activeTab == 'المعلومات الأساسية'?'#dcedfa':'' ,padding:'1px 10px ',
                           
              }}
            >
            المعلومات الأساسية
          </li>
          <li 
            className={activeTab === 'شروط التعاقد' ? 'active' : ''} 
            onClick={() => handleTabClick('شروط التعاقد')}
            style={{ 
                borderBottom:activeTab === 'شروط التعاقد'?'3px solid blue':'' ,
              background:activeTab == 'شروط التعاقد'?'#dcedfa':'' ,padding:'4px 10px ',
                           
              }}
          >
            شروط التعاقد
          </li>
          <li 
            className={activeTab === 'المعلومات الأختياريه' ? 'active' : ''} 
            onClick={() => handleTabClick('المعلومات الأختياريه')}
            style={{ 
                borderBottom:activeTab === 'المعلومات الأختياريه'?'3px solid blue':'' ,
              background:activeTab == 'المعلومات الأختياريه'?'#dcedfa':'' ,padding:'4px 10px ',
                           
              }}
          >
            المعلومات الأختياريه
          </li>
          <li 
            className={activeTab === 'تتبع التعديلات' ? 'active' : ''} 
            onClick={() => handleTabClick('تتبع التعديلات')}
            style={{ 
                borderBottom:activeTab === 'تتبع التعديلات'?'3px solid blue':'' ,
              background:activeTab == 'تتبع التعديلات'?'#dcedfa':'' ,padding:'4px 10px ',
                           
              }}
          >
            تتبع التعديلات
          </li>
        
        
        </ul>        
    </div>
    <div>
            
    {activeTab ==='المعلومات الأساسية' && 
          <div className="w-100   p-3 rounded"style={{background:'#dcedfa',marginTop:'-15px'}}>
             <div className="d-flex align-items-center justify-content-between   flex-wrap  "
                style={{zIndex:1050}}>
                <div className="col-lg-5 col-md-5 col-sm-5 col-12  fs-5">
                        <Form.Group  className="m-0 col-lg-12 col-12 "  style={{ position: 'relative'}} > 
                       <Form.Label className="  col-lg-6 col-md-6 col-sm-6 col-12"> تاريخ بداية التعاقد</Form.Label>                                                       
                        <HistoryDatew 
                        setSelectDate={handleValueStartDate}     
                        />
                        </Form.Group>
                </div>

                <div className="col-lg-5 col-md-5 col-sm-5 col-12  fs-5">
                <Form.Group className="m-0 col-lg-12 col-12"  style={{ position: 'relative'}} > 
                    <Form.Label className="  col-lg-6 col-md-6 col-sm-6 col-12">تاريخ نهاية التعاقد</Form.Label>
                    <HistoryDatew 
                        setSelectDate={handleValueStartDate}     
                        />
                            
                    </Form.Group> 
                </div>
                

            </div>   
           <div className="w-100   d-flex align-items-center justify-content-between mt-4  flex-wrap">                
                <Form.Group className="col-lg-5 col-md-5 col-12"  > 
                            <Form.Label  >اسم المستأجر </Form.Label> 
                            <Select className='w-100   '
                            name='supervising_emp'
                                options={options}                             
                                //   onChange={(e)=> setForm({...form, supervising_emp:e })}
                                placeholder="اسم المستأجر   "
                                styles={customStyles}
                            
                            >                            
                            </Select>
                </Form.Group>
                <Form.Group className="col-lg-5 col-md-5 col-12 " 
                controlId="exampleForm.SelectCustom">  
                <Form.Label  > طريقة التحصيل </Form.Label>       
                <Form.Select 
                style={{padding:'10px',paddingRight:'30px'}}
                value={collection} onChange={handleSelectChange}>
                <option disabled value="">اختر طريقة التحصيل</option>
                <option value="شهري">شهري</option>
                <option value="ربع سنوي">ربع سنوي</option>
                <option value="نصف سنوي">نصف سنوي</option>
                <option value="سنوي">سنوي</option>
                <option value="يدوي">يدوي</option>                     
                </Form.Select>
                </Form.Group>               
                
            </div>
            <div className="col-lg-12 col-md-12 col-ms-12 col-12 mt-4   d-flex align-items-center justify-content-between flex-wrap   ">
               <div className="col-lg-5 col-md-12 col-ms-12 col-12    d-flex align-items-center justify-content-between flex-wrap ">
                   <div  className="col-lg-5 col-md-6 col-ms-6 col-12 flex-wrap   ">
                        <label>قيمة العقد</label>
                        <input 
                        className="col-lg-12 col-md-12 col-ms-6 col-12 flex-wrap  "
                        type="number"
                        style={{borderWidth:'2px solid red',padding:'10px',borderRadius:'7px',}}>
                        </input>
                    </div>
                    <div  className="col-lg-5 col-md-6  col-ms-6 col-12 ">
                        <label> مبلغ اخر </label>
                        <input 
                         className="col-lg-12 col-md-12 col-ms-6 col-12 flex-wrap  "
                        type="number"
                        style={{borderWidth:'2px solid red',padding:'10px',borderRadius:'7px',}}>
                        </input>
                    </div>

                </div>
                
                <div  className="col-lg-5 col-md-12 col-ms-6 col-12 border flex-column">
                    <label> بيان المبلغ الاخر </label>
                    <input 
                    type="text"
                    style={{borderWidth:'2px solid red',padding:'10px',borderRadius:'7px',width:'100%'}}>
                    </input>
                </div>     
                

            </div> 

            <div className="col-lg-12 col-md-12 col-ms-12 col-12 mt-4   d-flex align-items-center justify-content-between flex-wrap   ">
                <div className="col-lg-5 col-md-12 col-ms-12 col-12 mt-4   d-flex align-items-center justify-content-between flex-wrap   ">
                <Form.Group className="col-lg-5 col-md-5 col-12"  > 
                            <Form.Label  >نوع التأجير </Form.Label> 
                            <Select className=' col-lg-12  '
                            name='supervising_emp'
                                options={options}                             
                                //   onChange={(e)=> setForm({...form, supervising_emp:e })}
                                placeholder="اختر نوع التاجير"
                                styles={customStyles}
                            
                            >                            
                            </Select>
                </Form.Group>
                 <Form.Group className="col-lg-5 col-md-5 col-12  mb-0"  > 
                     
                    <Form.Check 
                          className=' col-lg-6 mb-0   '
                        type="checkbox"
                        label="احتساب النسبة"
                        checked={isCheckedbox1}
                        onChange={handleChangebox1}
                    />
                </Form.Group>
                </div>
                { isCheckedbox1 &&
                    <div className="col-lg-5 col-md-12 col-ms-12 col-12 mt-4   d-flex align-items-center justify-content-between flex-wrap   ">
                        <Form.Group className="col-lg-5 col-md-5 col-12"  > 
                                    <Form.Label  > الزيادة السنوية </Form.Label> 
                                    <Select className=' col-lg-12  '
                                    name='supervising_emp'
                                        options={options}                             
                                        //   onChange={(e)=> setForm({...form, supervising_emp:e })}
                                        placeholder=" الزيادة السنوية"
                                        styles={customStyles}
                                    
                                    >                            
                                    </Select>
                        </Form.Group>  
                    
                        <div  className="col-lg-5 col-md-6  col-ms-6 col-12 ">
                            <label> نسبة الزيادة </label>
                            <input 
                            className="col-lg-12 col-md-12 col-ms-6 col-12 flex-wrap  "
                            type="number"
                            style={{borderWidth:'2px solid red',padding:'8px',borderRadius:'7px',marginBottom:'-20px'}}>
                            </input>
                        </div> 
                    </div>
                }
            </div>  

           
      <div className="col-lg-12 col-md-12 col-ms-12 col-12 mt-4   mb-4  d-flex align-items-center justify-content-between flex-wrap   ">     
             <div className="col-lg-5 col-md-12 col-ms-12 col-12     d-flex align-items-center justify-content-between flex-wrap">
             {/* <button className="col-lg-4 col-md-5 col-12"style={{marginBottom:'-40px'}}> احتساب السنوات</button> */}
             <button className="col-lg-4 col-md-5 col-12"> احتساب السنوات</button>
             <Form.Group className="col-lg-5 col-md-5 col-12 " 
                controlId="exampleForm.SelectCustom">  
                <Form.Label  > اعتماد السنوات من تاريخ</Form.Label>       
                <Form.Control className="m-0  ms-2 w-70"
                            type="date"
                            name="end_task"
                            value={today}                 
                             >
                        </Form.Control> 
                </Form.Group> 

             </div>
             <div  className="col-lg-5 col-md-12 col-ms-12 col-12      d-flex align-items-center justify-content-between flex-wrap">
             <Form.Group className="col-lg-5 col-md-5 col-12 " 
                controlId="exampleForm.SelectCustom">  
                <Form.Label  > اجمالي السنوات </Form.Label>
                <Form.Control 
                type="number"
                style={{padding:'8px'}}
                >
                </Form.Control>       
                
                </Form.Group>  
                <Form.Group className="col-lg-6 col-md-5 col-12"  > 
                            <Form.Label  > الموظف المتابع</Form.Label> 
                            <Select className='   '
                            name='supervising_emp'
                                options={options}                             
                                //   onChange={(e)=> setForm({...form, supervising_emp:e })}
                                placeholder="اختر الموظف المتابع"
                                styles={customStyles}
                            
                            >                            
                            </Select>
                </Form.Group>          

             </div> 

          </div>
          <Table_documents
             header={header}
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
          <div className="w-100">
          <div style={{ padding: '20px' }}>
           
            <Table style={{ marginTop: '20px', width: '100%', border: '1px solid #ddd' }}>
              <TableHead>
                <TableRow>
                  <TableCell style={sx_cell}> المشروع  </TableCell>
                  <TableCell style={sx_cell}>نوع العقار  </TableCell>
                  <TableCell style={sx_cell}>رقم الوحدة </TableCell>
                  <TableCell style={sx_cell}>  بحث </TableCell>
                  <TableCell style={sx_cell}> العمليات   </TableCell>

                </TableRow>

              </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={row.id}>
                            <TableCell
                             
                            //  style={ sx_cell}
                             >
                                <FormControl fullWidth>                                 
                                    <Select
                                        labelId={`select-label1-${index}`}
                                        value={selectedValues[`value1-${index}`] || ''}
                                        // onChange={(event) => handleSelectChange2(event, index, 1)}
                                        style={customStyles}
                                        options={options} 
                                    >
                                  </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell style={{ padding: '10px' }}>
                                <FormControl fullWidth>
                                 
                                    <Select
                                        labelId={`select-label2-${index}`}
                                        value={selectedValues[`value2-${index}`] || ''}
                                        // onChange={(event) => handleSelectChange2(event, index, 2)}
                                        options={options} 
                                    >
                                        {/* {options2.map((option, i) => (
                                            <MenuItem key={i} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))} */}
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell style={{ padding: '10px' }}>
                                <FormControl fullWidth>
                                 
                                    <Select
                                        labelId={`select-label2-${index}`}
                                        value={selectedValues[`value2-${index}`] || ''}
                                        // onChange={(event) => handleSelectChange2(event, index, 2)}
                                        options={options} 
                                    >
                                   
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell style={{ padding: '10px' }} className='flex_center'>                        
                             <button className='back_btn col-8 rounded' onClick={openModal}>
                          
                             <FontAwesomeIcon icon={faMagnifyingGlass}  style={{fontSize:'20px'}}/>
                             </button>
                            </TableCell>
                            <TableCell style={{ padding: '10px' }} >
                             <button className='back_btn col-8 rounded '  onClick={()=>deleteRow(row.id)}
                                style={{background:'#FDD017'}}
                                >
                            
                             <FontAwesomeIcon icon={faTrash}  style={{fontSize:'20px',color:'red'}}/>
                             </button>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell onClick={addRow} >
                            <button className='back_btn col-8 rounded' style={{}}>  
                           
                            <FontAwesomeIcon  icon={faSquarePlus} style={{fontSize:'25px'}} /> 
                             </button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {isModalOpen && <Modal onClose={closeModal} />}
        </div>
        <div className="w-100 d-flex align-items-center justify-content-center">
            <div className="w-75 d-flex align-items-center justify-content-between">
                <button className='rounded' style={{background:'#7F38EC'}}>حفظ +</button>
                <Link to='/dashboard/ShowContracts' className='rounded'style={{background:'#FDD017'}}>رجوع</Link>
            </div>
        </div>
  
   
        <div  className='col-lg-12 col-md-12 col-12 col-ms-12 mt-3 border-top pt-3 ms-3 me-3 d-flex flex-wrap' > 
        <Form.Group className="col-lg-5 col-md-5 col-12  mb-0 "  > 
                     
                     <Form.Check 
                           className=' col-lg-4 mb-0   '
                         type="checkbox"
                         label="إلغاء العقد"
                         checked={isCheckedbox2}
                         onChange={handleChangebox2}
                     />
                 </Form.Group> 
                 <Form.Group className="col-lg-5 col-md-5 col-12   " 
                controlId="exampleForm.SelectCustom">  
                    
                <Form.Control className="m-0  ms-2 w-70"
                            type="date"
                            name="end_task"
                            value={today}                 
                             >
                        </Form.Control>

                </Form.Group> 
                {
                    isCheckedbox2 &&
                    <button className='rounded col-1 col-lg-1 me-2'style={{background:'#FDD017'}}> إلغاء</button>        
                }     
        </div>   
        <div  className='col-lg-11 col-md-12   col-12 col-ms-12  mt-3 border-top pt-3   align-items-center  justify-content-between d-flex flex-wrap' > 
            <p  className='m-0   col-12 col-lg-2 col-md-2 col-ms-2  '>تجديد العقد  الى</p> 

            <div className="  col-12 col-lg-4 col-md-4 col-ms-4 d-flex    align-items-center justify-content-between   flex-wrap  "
                style={{position: 'relative ',zIndex:1050}}>
                <div className="   ">
                        <Form.Group  className="col-6 col-lg-12 col-md-12 col-ms-12    "  style={{ position: ''}} > 
                        <HistoryDatew 
                        setSelectDate={handleValueStartDate}     
                        />                                   
                            </Form.Group>
                </div>

                
                

            </div>
            <input className='rounded col-12 col-lg-2 col-md-3 col-ms-2   '
            type='number'
            placeholder='عدد السنوات'
            style={{padding:'4px'}}
            >
            </input>      
            <input className='rounded col-12 col-lg-2 col-md-3  col-ms-2'
            type='number'
            placeholder='عدد الاشهر'
            style={{padding:'4px'}}
            >
            </input> 
            <button className='rounded'style={{background:'#FDD017'}}>تجديد</button>     
        </div>   
        <div className='w-100 mt-3 border-top  pt-3 mb-3 d-flex align-items-center flex-wrap '>
              <Form.Group className="col-lg-2 col-md-5 col-12   " >                  
                <Form.Check 
                          className=' col-lg-8 mb-0    '
                        type="checkbox"
                        label="حذف الفواتير والفترات"
                        checked={isCheckedbox4}
                        onChange={handleChangebox4}
                    />
                </Form.Group>
                <p className='m-0 col-lg-1' style={{ position: 'relative'}} >من تاريخ</p> 
                <div className="  col-12 col-lg-3 col-md-4 col-ms-4 d-flex    align-items-center justify-content-between   flex-wrap  "
                style={{position: 'relative ',zIndex:1050}}>
                <div className="   "style={{ position: 'relative'}}>
                        <Form.Group  className="col-12 col-lg-12 col-md-12 col-ms-12    "  > 
                        <HistoryDatew 
                        setSelectDate={handleValueStartDate}     
                        />
                                                            
                            </Form.Group>
                </div>
            </div>
                <p className='m-0 col-lg-1 col-12'>الى تاريخ</p> 
               <Form.Group className="m-0 col-lg-3 col-12"  style={{ position: 'relative'}} > 
               <HistoryDatew 
                        setSelectDate={handleValueStartDate}     
                        />
                            
                    </Form.Group> 
             
                {
                    isCheckedbox4 &&
                    <button className='rounded col-12 col-lg-2 me-2'style={{background:'#FDD017'}}> حذف الفواتير والفترات</button>        
                }
        </div>  
          </div>  
        </div>             
         }

        {activeTab ==='شروط التعاقد' &&
           <div className="w-100   p-3 rounded"style={{background:'#dcedfa',marginTop:'-15px'}}>
            <div className='w-100 d-flex flex-column gap-2' >
                <p className='m-0'>شروط التعاقد</p>
                <Form.Group className="col-lg-5 col-md-5 col-12"  > 
                         
                            <Select className='w-100   '
                            name='supervising_emp'
                                options={options}                             
                                //   onChange={(e)=> setForm({...form, supervising_emp:e })}
                                placeholder=" شروط التعاقد " 
                              styles={customStyles}                            
                            >                            
                            </Select>
                </Form.Group>

                <p className='m-0'> نص العقد  </p>
                <input
                className='w-100 p-2 rounded bg-light'
                 type='text '>
                </input>
                <p className='m-0'>   شروط خاصة  </p>
                <input
                className='w-50 p-2 rounded bg-light'
                 type='text '>
                </input>
                <div className="w-100 d-flex align-items-center justify-content-center mt-2">
                    <div className="w-75 d-flex align-items-center justify-content-between">
                        <button className='rounded' style={{background:'#7F38EC'}}>حفظ +</button>
                        <Link to='/dashboard/ShowContracts' className='rounded'style={{background:'#FDD017'}}>رجوع</Link>         
                    </div>
               </div>
               <div  className='col-lg-12 col-md-12 col-12 col-ms-12 mt-3 border-top pt-3 ms-3 me-3 d-flex flex-wrap' > 
        <Form.Group className="col-lg-5 col-md-5 col-12  mb-0 "  > 
                     
                     <Form.Check 
                           className=' col-lg-4 mb-0   '
                         type="checkbox"
                         label="إلغاء العقد"
                         checked={isCheckedbox3}
                         onChange={handleChangebox3}
                     />
                 </Form.Group> 
                 <Form.Group className="col-lg-5 col-md-5 col-12   " 
                controlId="exampleForm.SelectCustom">  
                    
                <Form.Control className="m-0  ms-2 w-70"
                            type="date"
                            name="end_task"
                            value={today}                 
                             >
                        </Form.Control> 
                </Form.Group>
                {
                    isCheckedbox3 &&
                    <button className='rounded col-1 col-lg-1 me-2'style={{background:'#FDD017'}}> إلغاء</button>        
                }
        </div>   
        <div  className='col-lg-11 col-md-12   col-12 col-ms-12  mt-3 border-top pt-3   align-items-center  justify-content-between d-flex flex-wrap' > 
            <p  className='m-0   col-12 col-lg-2 col-md-2 col-ms-2  '>تجديد العقد  الى</p> 

            <div className="  col-6 col-lg-4 col-md-4 col-ms-4 d-flex    align-items-center justify-content-between   flex-wrap  "
                style={{position: 'relative ',zIndex:1050}}>
                <div className="   ">
                        <Form.Group  className="col-12 col-lg-12 col-md-12 col-ms-12  border  "style={{position: 'relative'}}   > 
                        <HistoryDatew 
                        setSelectDate={handleValueStartDate}     
                        />
                                                          
                            </Form.Group>
                </div>
            </div>
            <input className='rounded col-12 col-lg-2 col-md-3 col-ms-2   '
            type='number'
            placeholder='عدد السنوات'
            style={{padding:'4px'}}
            >
            </input>      
            <input className='rounded col-12 col-lg-2 col-md-3  col-ms-2'
            type='number'
            placeholder='عدد الاشهر'
            style={{padding:'4px'}}
            >
            </input> 
            <button className='rounded'style={{background:'#FDD017'}}>تجديد</button>  

        </div> 
        <div className='w-100 mt-3 border-top  pt-3 mb-3 d-flex align-items-center flex-wrap '>
        <Form.Group className="col-lg-2 col-md-5 col-12   " >  
                 
                <Form.Check 
                          className=' col-lg-8 mb-0    '
                        type="checkbox"
                        label="حذف الفواتير والفترات"
                        checked={isCheckedbox4}
                        onChange={handleChangebox4}
                    />
                </Form.Group>

                <p className='m-0 col-lg-1'>من تاريخ</p> 
                <HistoryDatew 
                        setSelectDate={handleValueStartDate}     
                        />
                <p className='m-0 col-lg-1 col-12'>الى تاريخ</p> 
                <HistoryDatew 
                        setSelectDate={handleValueStartDate}     
                        />
                {
                    isCheckedbox4 &&
                    <button className='rounded col-12 col-lg-2 me-2'style={{background:'#FDD017'}}> حذف الفواتير والفترات</button>        
                }
        </div>
  
                
            </div>

          </div> 
        }
        {activeTab ==='المعلومات الأختياريه' &&
         <div className="w-100   p-3 rounded"style={{background:'#dcedfa',marginTop:'-15px'}}>
              <div style={{ padding: '20px' }}>
           
           <Table style={{ marginTop: '20px', width: '100%', border: '1px solid #ddd' }}>
             <TableHead>
               <TableRow>
                 <TableCell style={sx_cell}> البند المستحق  </TableCell>
                 <TableCell style={sx_cell}>   طريقة الدفع   </TableCell>
                 <TableCell style={sx_cell}>  احتساب الضريبه  </TableCell>
                 <TableCell style={sx_cell}> المبلغ المقطوع   </TableCell>
                 <TableCell style={sx_cell}>  الاحتساب بالنسبة  </TableCell>
                 <TableCell style={sx_cell}>  النسبة </TableCell>
                 <TableCell style={sx_cell}> العمليات   </TableCell>

               </TableRow>

             </TableHead>
               <TableBody>
                   {rows.map((row, index) => (
                       <TableRow key={row.id}>
                           <TableCell
                            
                           //  style={ sx_cell}
                            >
                               <FormControl fullWidth>                                 
                                   <Select
                                       labelId={`select-label1-${index}`}
                                       value={selectedValues[`value1-${index}`] || ''}
                                       // onChange={(event) => handleSelectChange2(event, index, 1)}
                                       style={customStyles}
                                       options={options} 
                                   >
                                 </Select>
                               </FormControl>
                           </TableCell>
                           <TableCell style={{ padding: '10px' }}>
                               <FormControl fullWidth>
                                
                                   <Select
                                       labelId={`select-label2-${index}`}
                                       value={selectedValues[`value2-${index}`] || ''}
                                       // onChange={(event) => handleSelectChange2(event, index, 2)}
                                       options={options} 
                                   >
                                       {/* {options2.map((option, i) => (
                                           <MenuItem key={i} value={option}>
                                               {option}
                                           </MenuItem>
                                       ))} */}
                                   </Select>
                               </FormControl>
                           </TableCell>
                           <TableCell style={{  paddingRight:'3%'}}>
                               <FormControl fullWidth>
                               <Form.Check 
                           className=' col-lg-4 mb-0 fs-5     '
                         type="checkbox"
                         
                         checked={isCheckedbox5}
                         onChange={handleChangebox5}
                           />
                                
                                   
                               </FormControl>
                           </TableCell>
                           <TableCell style={{ padding: '10px' }} className='flex_center'>
                            <Form.Control 
                            type='number'></Form.Control>
                           </TableCell>
                           <TableCell style={{  paddingRight:'3%'}}>
                               <FormControl fullWidth>
                               <Form.Check 
                           className=' col-lg-4 mb-0 fs-5  '
                         type="checkbox"
                         
                         checked={isCheckedbox5}
                         onChange={handleChangebox5}
                           />
                                
                                   
                               </FormControl>
                           </TableCell>
                           <TableCell style={{ padding: '10px' }} className='flex_center'>
                            <Form.Control 
                            type='number'></Form.Control>
                           </TableCell>
                           <TableCell style={{ padding: '10px' }} >
                            <button className='back_btn col-8 rounded '  onClick={()=>deleteRow(row.id)}
                               style={{background:'#FDD017'}}
                               >
                           
                            <FontAwesomeIcon icon={faTrash}  style={{fontSize:'20px',color:'red'}}/>
                            </button>
                           </TableCell>
                       </TableRow>
                   ))}
                   <TableRow>
                       <TableCell onClick={addRow} >
                           <button className='back_btn col-8 rounded' style={{}}>  
                          
                           <FontAwesomeIcon  icon={faSquarePlus} style={{fontSize:'25px'}} /> 
                            </button>
                       </TableCell>
                   </TableRow>
               </TableBody>
           </Table>
       </div>
                
                <div className="w-100 d-flex align-items-center justify-content-center">
            <div className="w-75 d-flex align-items-center justify-content-between">
                <button className='rounded' style={{background:'#7F38EC'}}>حفظ +</button>
                <Link to='/dashboard/ShowContracts' className='rounded'style={{background:'#FDD017'}}>رجوع</Link>
            </div>
        </div>
  
   
        <div  className='col-lg-12 col-md-12 col-12 col-ms-12 mt-3 border-top pt-3 ms-3 me-3 d-flex flex-wrap' > 
        <Form.Group className="col-lg-5 col-md-5 col-12  mb-0 "  > 
                     
                     <Form.Check 
                           className=' col-lg-4 mb-0   '
                         type="checkbox"
                         label="إلغاء العقد"
                         checked={isCheckedbox2}
                         onChange={handleChangebox2}
                     />
                 </Form.Group> 
                 <Form.Group className="col-lg-5 col-md-5 col-12   " 
                controlId="exampleForm.SelectCustom">  
                    
                <Form.Control className="m-0  ms-2 w-70"
                            type="date"
                            name="end_task"
                            value={today}                 
                             >
                        </Form.Control>

                </Form.Group> 
                {
                    isCheckedbox2 &&
                    <button className='rounded col-1 col-lg-1 me-2'style={{background:'#FDD017'}}> إلغاء</button>        
                }     
        </div>   
        <div  className='col-lg-11 col-md-12   col-12 col-ms-12  mt-3 border-top pt-3   align-items-center  justify-content-between d-flex flex-wrap' > 
            <p  className='m-0   col-4 col-lg-2 col-md-2 col-ms-2  '>تجديد العقد  الى</p> 

            <HistoryDatew 
                        setSelectDate={handleValueStartDate}     
                        />
            <input className='rounded col-12 col-lg-2 col-md-3 col-ms-2   '
            type='number'
            placeholder='عدد السنوات'
            style={{padding:'4px'}}
            >
            </input>      
            <input className='rounded col-12 col-lg-2 col-md-3  col-ms-2'
            type='number'
            placeholder='عدد الاشهر'
            style={{padding:'4px'}}
            >
            </input> 
            <button className='rounded'style={{background:'#FDD017'}}>تجديد</button>     
        </div>   
        <div className='w-100 mt-3 border-top  pt-3 mb-3 d-flex align-items-center '>
        <Form.Group className="col-lg-2 col-md-5 col-12   " >  
                 
                <Form.Check 
                          className=' col-lg-8 mb-0    '
                        type="checkbox"
                        label="حذف الفواتير والفترات"
                        checked={isCheckedbox4}
                        onChange={handleChangebox4}
                    />
                </Form.Group>

                <p className='m-0 col-lg-1'>من تاريخ</p> 
                <HistoryDatew 
                        setSelectDate={handleValueStartDate}     
                        />
                <p className='m-0 col-lg-1'>الى تاريخ</p> 
                <HistoryDatew 
                        setSelectDate={handleValueStartDate}     
                        />
                {
                    isCheckedbox4 &&
                    <button className='rounded col-12 col-lg-2 me-2'style={{background:'#FDD017'}}> حذف الفواتير والفترات</button>        
                }
        </div> 
          </div> 
        }
        {activeTab ==='تتبع التعديلات' &&
           <div className="w-100   p-3 rounded"style={{background:'#dcedfa',marginTop:'-15px'}}>
                 <div className="w-100 d-flex align-items-center justify-content-center">
            <div className="w-75 d-flex align-items-center justify-content-between">
                <button className='rounded' style={{background:'#7F38EC'}}>حفظ +</button>
                <Link to='/dashboard/ShowContracts' className='rounded'style={{background:'#FDD017'}}>رجوع</Link>
            </div>
        </div>
  
   
        <div  className='col-lg-12 col-md-12 col-12 col-ms-12 mt-3 border-top pt-3 ms-3 me-3 d-flex flex-wrap' > 
        <Form.Group className="col-lg-5 col-md-5 col-12  mb-0 "  > 
                     
                     <Form.Check 
                           className=' col-lg-4 mb-0   '
                         type="checkbox"
                         label="إلغاء العقد"
                         checked={isCheckedbox2}
                         onChange={handleChangebox2}
                     />
                 </Form.Group> 
                 <Form.Group className="col-lg-5 col-md-5 col-12   " 
                controlId="exampleForm.SelectCustom">  
                    
                <Form.Control className="m-0  ms-2 w-70"
                            type="date"
                            name="end_task"
                            value={today}                 
                             >
                        </Form.Control>

                </Form.Group> 
                {
                    isCheckedbox2 &&
                    <button className='rounded col-1 col-lg-1 me-2'style={{background:'#FDD017'}}> إلغاء</button>        
                }     
        </div>   
        <div  className='col-lg-11 col-md-12   col-12 col-ms-12  mt-3 border-top pt-3   align-items-center  justify-content-between d-flex flex-wrap' > 
            <p  className='m-0   col-4 col-lg-2 col-md-2 col-ms-2  '>تجديد العقد  الى</p> 

            <HistoryDatew 
                        setSelectDate={handleValueStartDate}     
                        />
            <input className='rounded col-12 col-lg-2 col-md-3 col-ms-2   '
            type='number'
            placeholder='عدد السنوات'
            style={{padding:'4px'}}
            >
            </input>      
            <input className='rounded col-12 col-lg-2 col-md-3  col-ms-2'
            type='number'
            placeholder='عدد الاشهر'
            style={{padding:'4px'}}
            >
            </input> 
            <button className='rounded'style={{background:'#FDD017'}}>تجديد</button>     
        </div>   
        <div className='w-100 mt-3 border-top  pt-3 mb-3 d-flex align-items-center '>
        <Form.Group className="col-lg-2 col-md-5 col-12   " >  
                 
                <Form.Check 
                          className=' col-lg-8 mb-0    '
                        type="checkbox"
                        label="حذف الفواتير والفترات"
                        checked={isCheckedbox4}
                        onChange={handleChangebox4}
                    />
                </Form.Group>

                <p className='m-0 col-lg-1'>من تاريخ</p> 
                <HistoryDatew 
                        setSelectDate={handleValueStartDate}     
                        />
                <p className='m-0 col-lg-1'>الى تاريخ</p> 
                <HistoryDatew 
                        setSelectDate={handleValueStartDate}     
                        />
                {
                    isCheckedbox4 &&
                    <button className='rounded col-12 col-lg-2 me-2'style={{background:'#FDD017'}}> حذف الفواتير والفترات</button>        
                }
        </div> 

          </div> 
        }

    </div>


        </div>
      
    );

    
}