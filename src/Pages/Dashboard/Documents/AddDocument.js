import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Select from 'react-select';
import { Axios } from "../../../Api/axios";
import { document_type_Form } from "./DocumentType";
import { documents } from "./DocumentType";

import { USER, USERS } from "../../../Api/Api";
// import HijriDate from 'hijri-date';
import { typeFile } from "../Taskes/Files";
import TranFormDate from "../../../Helpers/TranFormDate";
import moment from 'moment-hijri';
import { Link, useNavigate } from "react-router-dom";
import 'moment/locale/ar';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // استيراد أنماط التقويم
 import React from 'react';
import DateStorage from "../../../Helpers/DateSorage"; 

import FormSelect from "../../../Component/Dashboard/FormSelect";
import HistoryDatew from "../../../Component/Dashboard/History";
export default function AddDocument(){
  const navigate=useNavigate();  
  const [isChecked, setIsChecked] = useState(false);
   
  const [isHijri, setIsHijri] = useState(false); 
  const [users,setUsers]=useState([]);
    const[filesdata,setFilesdata]=useState([]);   
    
   


    ///date selectedDate
     
   

    const [startDate, setStartDate] = useState(new Date());    
    const startDate_Document =TranFormDate( startDate) 
    const [isOpenCalenderStart, setOpenCalenderStart] = useState(false);
  function handleValueStartDate (value) {
   setStartDate(value);
  }
    
    
    //-----------date select end date
    const [endDate, setEndDate] = useState(new Date()); 
    const endtDate_Document =TranFormDate( endDate) 
    const [isOpenCalenderEnd, setOpenCalenderEnd] = useState(false);
    function handleValueEndDate (value) {
      setEndDate(value);
     } 
       
    //--------------------------------------------------------------
    //-----------date select date_alert:'', 
    const [alertDate, setAlertDate] = useState(new Date()); 
    const alertDate_Document =TranFormDate( alertDate) 
    const [isOpenCalenderAlert, setOpenCalenderAlert] = useState(false); 
    function handlalertDate (value) {
      setAlertDate(value);
     }  
    //--------------------------------------------------------------
     


    const [isToggled, setIsToggled] = useState(false);
  
    // التعامل مع النقر على الزر لتغيير الحالة
    const handleToggle = () => {
      setIsToggled(!isToggled); // تغيير الحالة بين true و false
    };

      const focus=useRef('');   
      const openImage=useRef(null);
      // const selectDate1=useRef('');



      const[form,setForm]=useState({
        supervising_emp:null,
         user_name:'',
         document_id:'',                  
         document_name:' ',
         document_type:null
                 
       }) 
     
      
         
      useEffect(()=>{     
      //  focus.current.focus();
      },[]);

      useEffect(()=>{
        try{
            Axios.get(`${USER}`)
            .then(e=>{
                setForm((prevData) => ({
                    ...prevData,
                    user_name: e.data.email,
                                       
                  })); 
                                      
                          })
        }
        catch(err){console.log(err)}
    },[])
       
     const documentForm=form.document_type &&documents.filter(item=>item.document_type===form.document_type.value)
    

      useEffect(()=>{
        try{
            Axios.get(`${USERS}`)
            .then(res=>{
                setUsers(res.data.data)  })

        }
        catch(err){console.log(err)}
    },[])
    // const selectuser=users.map((user,index)=>
    //     <option key={index} value={user.email} >{user.name}</option>
    // )

    const optionsUsers =users && users.map(item => ({
      value: item.email,
      label: item.name
    }));

 
  const options =document_type_Form && document_type_Form.map(item => ({
    value: item,
    label: item
  }));


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
  

  function handleChange (e){
    setForm({...form,[e.target.name]: e.target.value});       
    
     }

     // handlechange files
function handlechangefile(e){
  setFilesdata((prev)=>[...prev,...e.target.files]);
 
}

function HandleCansleFiles(id){
  setFilesdata((prev)=>prev.filter(img=>img !==id)) ;            
}

function handleOpenImage(){
  openImage.current.click()      
}

 

async function handleSubmit(e){
  e.preventDefault();
  const formData = new FormData();
  formData.append('document_name', form.document_name);
  formData.append('supervising_emp', form.supervising_emp.value  );
  formData.append('user_name', form.user_name);
  formData.append('document_id', form.document_id);
  formData.append('start_document', DateStorage(startDate));
  formData.append('end_document',DateStorage(endDate) );
  formData.append('date_alert', DateStorage(alertDate));
  formData.append('document_type',form.document_type.value);
  
 
  // إضافة الملفات إلى formData
  for (let i = 0; i < filesdata.length; i++) {
      formData.append('files[]', filesdata[i]);
        } 
      try{  
          // console.log(...formData)               
   await Axios.post('document/add',formData )  ;          
   navigate('/dashboard/documents');
         
  }
  catch (error) {
    console.error('Error sending data:', error);
    // setLoading(false) 
  } 
}
 

    return(
        <div className="px-4 py-3 w-100 bg-page ">
            <div className="d-flex flex-column w-100 fs-5 ">
                <div className="w-100 d-flex justify-content-between align-items-center  ">
                    <h4 >الوثيقة ({form.document_type && form.document_type.value})</h4>
                    <Link  to='/dashboard'>X</Link>               
                </div>
                <div className="w-100 d-flex justify-content-center  flex-column"> 


                                     
                       <Form onSubmit={handleSubmit}
                        className=" w-100  d-flex p-2 border-top 
                       justify-content-center align-items-center flex-wrap gap-4" >
                      
                          <Form.Group className=" "   > 
                            <Form.Label>نوع الوثيقة</Form.Label>                               
                          
                          <Select className='w-100   '
                           name='document_type'
                                                
                          onChange={(e)=> setForm({...form, document_type:e })}
                              options={options}                                                           
                              placeholder="اختر نوع الوثيقة  "
                            styles={customStyles}
                           required
                          >
                            
                          </Select> 

                            {/* <div className='w-100 border ms-5'>
                                 <FormSelect                                  
                                  setForm={(e)=> setForm({...form,document_type:e })}                                  
                                 styles={customStyles}
                                 placeholder='اختر نوع الوثيقة  '                                  
                                 options={options}
                                 />     

                            </div> */}
                          </Form.Group>            

                          <Form.Group style={{width:'250px'}} > 
                          <Form.Label  >الموظف المتابع</Form.Label> 
                         <Select className='w-100   '
                          name='supervising_emp'
                              options={optionsUsers}                             
                              onChange={(e)=> setForm({...form, supervising_emp:e })}
                              placeholder="اختر الموظف المتابع"
                            styles={customStyles}
                            required
                          >
                            
                          </Select>
                          </Form.Group>

      

                          <Form.Group  style={{width:'250px'}}> 
                           <Form.Label>{form.document_type ? documentForm[0].document_name :'الاسم'}</Form.Label>       
                                    <Form.Control className="m-0 p-2  "
                                    type="text"
                                    name="document_name"
                                    value={form.document_name}
                                    onChange={handleChange}
                                    
                                    >
                                    </Form.Control>
                                    
                                    
                          </Form.Group>  

                          <Form.Group style={{width:'250px'}} >

                           <Form.Label>{form.document_type  ? documentForm[0].document_id:'رقم الوثيقة'}</Form.Label>       
                                    <Form.Control className="m-0 p-2  "
                                    type="text"
                                    name="document_id"
                                    value={form.document_id}
                                    onChange={handleChange}
                                    >
                                    </Form.Control>
                          </Form.Group>  

                        
                      

                        <Form.Group className="  pt-2 ">
                            <Form.Control 
                            ref={openImage}
                            hidden
                            type="file"
                            multiple
                            onChange={handlechangefile}
                            >
                            </Form.Control>
                        </Form.Group>

                        {/* HistoryDatew */}
                         
                      </Form>

                      <div className="d-flex align-items-center justify-content-center border flex-wrap  "
                      style={{position: 'relative',zIndex:3}}>
                      <div className="d-flex justify-content-center align-items-center fs-5  ">
                                <Form.Group  className="m-0 "  > 
                              <Form.Label className=" me-5 ">{form.document_type  ?documentForm[0].start_document:'تاريخ بداية'}</Form.Label>
                                {/* <div  className="d-flex">                            
                                        <div className=" ms-2">
                                                <Form.Check
                                                type="radio"
                                                label="هجري"                       
                                                name="1هجري"                                            
                                                value="هجري"
                                                // checked={isHijri ?true:false  }                     
                                                onClick={()=>setIsHijri(true)}              // defaultChecked                                  
                                                />
                                              <Form.Check
                                                type="radio"
                                                label="ميلادي"                                                                        
                                                value="ميلادي"
                                                name="1ميلادي" 
                                                // checked={!isHijri ?true:false}                         
                                                onClick={()=>setIsHijri(false)}                // defaultChecked                                  
                                                />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between border bg-white"                                          
                                          style={{width:'250px',height:'60px',zIndex:'9910'}}
                                          >
                                              <p className="m-0 me-2 ">{startDate_Document&& startDate_Document}</p>
                                              <div className="m-0 border  "  style={{}}   >                             
                                              <div style={{ position: 'absolute',reight:0,left:0,top:'50% '}}>
                                                    <button className="bg-white border-0 me-0 p-0"
                                                      onClick={() =>setOpenCalenderStart((prev) => !prev)} 
                                                      style={{ cursor: 'pointer', fontSize: '20px',hidden: isOpenCalenderStart }}
                                                    >
                                                      📅  
                                                    </button>
                                                    {isOpenCalenderStart && (
                                                      <DatePicker                                                        
                                                        onChange={(date) => {setStartDate(date)
                                                          ;setOpenCalenderStart(false)}}                                                                                             
                                                        inline 
                                                      />
                                                    )}
                                                  </div>                                                   
                                                  
                                                  
                                              </div>                          

                                      </div> 
                                </div>     */}
                             <HistoryDatew style={{ position: 'absolute',}}
                            setSelectDate={handleValueStartDate}     
                             />
                                  
                                  </Form.Group>
                        </div>

                        <div className="d-flex justify-content-center align-items-center fs-5 border">
                        <Form.Group  style={{ position: 'relative',zIndex:2,}} > 
                           <Form.Label className=" me-5">{form.document_type  ? documentForm[0].end_document:'تاريخ إنتهاء'}</Form.Label>
                        {/* <div  className="d-flex">                             
                                <div className=" ms-2">
                                      <Form.Check
                                      type="radio"
                                      label="هجري"                       
                                      name="2هجري"                                            
                                      value="هجري"
                                      // checked={isHijri ?true:false  }                     
                                      onChange={()=>setIsHijri(true)} 
                                                                                   
                                      />
                                    <Form.Check
                                      type="radio"
                                      label="ميلادي"                                                                        
                                      value="ميلادي"
                                      name="2ميلادي" 
                                      // checked={!isHijri ?true:false}                         
                                      onChange={()=>setIsHijri(false)}                                               
                                      />
                               </div>                                                      
                                <div className="d-flex align-items-center justify-content-between border bg-white " 
                               
                                style={{width:'250px',height:'60px',zIndex:'9900'}}
                                >
                                
                                      <p className="m-0 me-2 ">{endtDate_Document&& endtDate_Document}</p>
                                      <div className="m-0 border  "  style={{}}   >                             
                                      <div style={{ position: 'absolute',reight:0,left:0,top:'50% '}}>
                                            <button className="bg-white border-0 me-0 p-0"
                                              onClick={() =>setOpenCalenderEnd((prev) => !prev)} 
                                              style={{ cursor: 'pointer', fontSize: '20px',hidden: isOpenCalenderEnd }}
                                            >
                                              📅  
                                            </button>
                                            {isOpenCalenderEnd && (
                                              <DatePicker                                            
                                                 onChange={(date) => {setEndDate(date)
                                                  ;setOpenCalenderEnd(false)}}                                                                                             
                                                inline  
                                              />
                                            )}
                                          </div>                                                   
                                          
                                          
                                      </div>                          

                                </div>                                
                              
                          </div> */}
                           <HistoryDatew style={{ position: 'absolute', }}
                            setSelectDate={handleValueEndDate}     
                             />
                                    
                          </Form.Group> 
                        </div>
                        <div className="d-flex justify-content-center align-items-center fs-5 border ">
                        <Form.Group  style={{position: 'relative',zIndex:1,  }} >                        
                        <Form.Label className=" me-5">تاريخ التنبية</Form.Label>
                        {/* <div  className="d-flex">                             
                                <div className=" ms-2">
                                <Form.Check
                                type="radio"
                                label="هجري"                       
                                name="3هجري"                                            
                                value="هجري"
                                checked={isHijri ?true:false  }                     
                                onChange={()=>setIsHijri(true)}              // defaultChecked                                  
                                />
                              <Form.Check
                                type="radio"
                                label="ميلادي"                                                                        
                                value="ميلادي"
                                name="3ميلادي" 
                                checked={!isHijri ?true:false}                         
                                onChange={()=>setIsHijri(false)}                // defaultChecked                                  
                                />
                                </div>
                                <div className="d-flex align-items-center justify-content-between border bg-white"
                                  style={{width:'250px',position: 'relative' }}
                                  >
                                      <p className="m-0 me-2 "style={{zIndex:1050, position: 'relative'}}>{alertDate_Document&& alertDate_Document}</p>
                                      <div className="m-0 border  "  style={{}}   >                             
                                      <div style={{ position: 'absolute',reight:0,left:0,top:'50% '}}>
                                            <button className="bg-white border-0 me-0 p-0"
                                              onClick={() =>setOpenCalenderAlert((prev) => !prev)} 
                                              style={{ cursor: 'pointer', fontSize: '20px',hidden: isOpenCalenderAlert }}
                                            >
                                              📅  
                                            </button>
                                            {isOpenCalenderAlert && (
                                              <DatePicker 
                                              style={{position:'absolute',reight:0,left:0,zIndex:1000}}
                                               
                                              className=" me-5 "                                               
                                                 onChange={(date) => {setAlertDate(date)
                                                  ;setOpenCalenderAlert(false)}}                                                                                             
                                                inline  
                                              />
                                            )}
                                          </div>                                                   
                                          
                                          
                                      </div>                          

                                </div>                                    
                          
                            </div> */}
                            <HistoryDatew 
                              style={{position:'absolute' }}
                            setSelectDate={handlalertDate}
                            />
                                    
                          </Form.Group> 
                        </div>

                      </div>    
                     
                      <div className=""onClick={handleOpenImage} style={{width:'100px'}}>
                              <button  className=" cursor-pointer border-0      "> +المرفقات</button> 
                      </div>
                                    
                      <div className=" border mt-3 bg-white d-flex gap-2 w-100">
                                  {filesdata && filesdata.map((item,i)=>(
                            <div key={i} className="  position-relative mt-2   ">                                                                
                              {  typeFile.map((typfile,ki)=>
                                <div key={ki}>
                                {typfile.src_type==item.type&&(
                                  <div className="d-flex align-items-center justify-content-start flex-column ">
                                    <img  src={typfile.type =='img'? `${URL.createObjectURL(item)}`:` ${typfile.pathimg}`} width='30px'  alt="" ></img>
                                    
                                </div>
                                )}
                              </div>)}         
                            
                                      <div style={{cursor:"pointer" ,}}
                                      className="position-absolute  top-0 end-0 bg-danger rounded text-white "
                                      >
                                          <p className="  m-0" onClick={()=>HandleCansleFiles(item)}>
                                              x
                                          </p>
                                      </div> 
                                      <p className="m-0"style={{fontSize:'10px'}}>{item.name}</p>        
                                    
                                      </div>
                                    
                                  ))
                                  }
                       </div>
                       <div className="w-100 d-flex  m-2 gap-2">
                              <div className="d-flex align-items-center border   "
                              style={{width:'50px',height:'20px'
                                ,borderRadius:'10px',
                                background:isToggled ?'#C9BE62 ':'gray'}}>

                                <button onClick={handleToggle} 
                                style={{marginRight:isToggled?'50%':'0',
                                  padding: '12px',borderRadius:'100%', fontSize: '16px',
                                  background:isToggled ?'#EAC117':'white',
                                  border:'0'}}>                  

                                  </button>  

                              </div>
                              <h5>أقر بأن التعديل تم بمعرفتيوحدود صلاحياتي ومسؤوليتي</h5>

                       </div>   
                     <div className="w-100 d-flex justify-content-center gap-3 " >
                   
                    <button
                     className="p-1 ps-2 pe-2 rounded text-black"
                     style={{background:'		#893BFF',
                      
                     }}
                     disabled={!isToggled}
                    onClick={handleSubmit}>حفظ</button> 
                    <Link to='/dashboard/documents'
                    className="p-1 ps-2 pe-2 rounded text-black"
                    style={{background:'yellow',}}>رجوع
                    </Link>         
                           
                     </div>
    
                </div>
            </div> 

        </div>
    )
}