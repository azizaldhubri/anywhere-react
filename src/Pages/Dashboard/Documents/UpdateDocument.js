import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { document_type_Form } from "./DocumentType";
import { documents } from "./DocumentType";

import { USER, USERS } from "../../../Api/Api";
// import HijriDate from 'hijri-date';
import { typeFile } from "../Taskes/Files";
import TranFormDate from "../../../Helpers/TranFormDate";
import moment from 'moment-hijri';
import { Link, useNavigate, useParams } from "react-router-dom";
import 'moment/locale/ar';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // استيراد أنماط التقويم
 import React from 'react';
import DateStorage from "../../../Helpers/DateSorage";
import zIndex from "@mui/material/styles/zIndex";
import { Select ,ListSubheader,InputLabel,FormControl, MenuItem } from "@mui/material";
import File_Name from "../../../Helpers/File_Name";
import File_Path from "../../../Helpers/File_path";
import StringSlice from "../../../Helpers/StringSlice";
 
export default function UpdateDocument(){
  const navigate=useNavigate();  
  const nav=useNavigate();
  const [isHijri, setIsHijri] = useState(false); 
  const [users,setUsers]=useState([]);
    const[filesdata,setFilesdata]=useState([]); 
    const[FilesFormServer,setFilesFormServer]=useState([]); 

    const {id}=useParams();

 
    ///date selectedDate
    const [startDate, setStartDate] = useState( new Date());    
    const startDate_Document =TranFormDate( startDate) 
    const [isOpenCalenderStart, setOpenCalenderStart] = useState(false);
    
    //-----------date select end date
    const [endDate, setEndDate] = useState(new Date()); 
    const endtDate_Document =TranFormDate( endDate) 
    const [isOpenCalenderEnd, setOpenCalenderEnd] = useState(false);   
    //--------------------------------------------------------------
    //-----------date select date_alert:'', 
    const [alertDate, setAlertDate] = useState(new Date()); 
    const alertDate_Document =TranFormDate( alertDate) 
    const [isOpenCalenderAlert, setOpenCalenderAlert] = useState(false);   
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
        supervising_emp:'',
         user_name:'',
         document_id:'',                  
         document_name:' ',
         document_type:''
                 
       }) 
     
      
       useEffect(()=>{
        async function getdocuments() {
         await   Axios.get(`documentshow/${id}`)
            .then(data =>{ setForm(data.data) ;
              setStartDate(data.data.start_document)
              setEndDate(data.data.end_document)
              setAlertDate(data.data.date_alert)
              setFilesFormServer(data.data.file_paths)
                // setEmail(data.data.email);
                // setRole(data.data.role);
                // setLoading(false);
                // console.log(data.data)
            })
                // .then(()=>setDisable(false))
                .catch(()=>nav('/dashboard/users/page/404'))
            
        }
       
        getdocuments();
    },[])
   

      useEffect(()=>{     
       focus.current.focus();
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
       
     const documentForm=form.document_type &&documents.filter(item=>item.document_type===form.document_type)
    

      useEffect(()=>{
        try{
            Axios.get(`${USERS}`)
            .then(res=>{
                setUsers(res.data.data)  })

        }
        catch(err){console.log(err)}
    },[])
    const selectuser=users.map((user,index)=>
        <option key={index} value={user.email} >{user.name}</option>
    )
    const doc_type=document_type_Form ? document_type_Form.map((item,index)=>      
        <option key={index} value={item} >{item}</option>    
  ):'';

  function handleChange (e){
    setForm({...form,[e.target.name]: e.target.value});       
    
     }

     // handlechange files
function handlechangefile(e){
  setFilesdata((prev)=>[...prev,...e.target.files]);
}
 

  function HandleCansleFiles(id){
  setFilesdata((prev)=>prev.filter(img=>img !==id)) ;            
  // setFilesFormServer((prev)=>prev.filter(img=>img !==id)) ;
     
}
async function HandleCansleFilesForm(img){
              
  setFilesFormServer((prev)=>prev.filter(img=>img !==id)) ;
  try {
    const response = await Axios.delete(`delete-file??id=${id}`, {
        data: { file_name: img },
    });
    console.log('File deleted successfully:', response.data);
} catch (error) {
    console.error('Error deleting file:', error);
}                    
}

function handleOpenImage(){
  openImage.current.click()      
}

 

async function handleSubmit(e){
  e.preventDefault();
  const formData = new FormData();
  formData.append('document_name', form.document_name);
  formData.append('supervising_emp', form.supervising_emp);
  formData.append('user_name', form.user_name);
  formData.append('document_id', form.document_id);
  formData.append('start_document', DateStorage(startDate));
  formData.append('end_document',DateStorage(endDate) );
  formData.append('date_alert', DateStorage(alertDate));
  formData.append('document_type',form.document_type);
  
 
  // إضافة الملفات إلى formData

  for (let i = 0; i < filesdata.length; i++) {
      formData.append('files[]', filesdata[i]);
        } 
      try{                        
   await Axios.post(`documentupdate/${id}`,formData )  ;          
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
                    {/* <h4 >الوثيقة ({form.document_type})</h4> */}
                    <Link  to='/dashboard'>X</Link>               
                </div>
                <div className="w-100 d-flex justify-content-center  flex-column"> 
                   
                       <Form onSubmit={handleSubmit}
                        className=" w-100  d-flex p-2 border-top 
                       justify-content-center align-items-center flex-wrap gap-4" >
                      
                <Form.Group className=" d-flex  flex-column flex-wrap "   > 
                 <Form.Label>نوع الوثيقة</Form.Label>
                   <Select
                            name="document_type"
                            // defaultValue={100}
                            value={form.document_type}                                    
                            onChange={handleChange} 
                            displayEmpty
                            // onClick={() => handleButtonClick('goverment')}
                              ref={focus}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  padding:0,
                                  maxHeight: 200, // تحديد ارتفاع القائمة بالبيكسل
                                }
                              }}}
                            sx={{   
                              padding:0,
                              minWidth:'150px', 
                              height:'37px',           
                              color: 'black',
                              fontSize:'18px',
                              // fontWeight: 'bold',              // لجعل النص عريض
                              fontFamily: 'Arial',
                               // اللون النشط
                              backgroundColor:  ' white', // خلفية العنصر النشط
                              '&:hover': {
                                // backgroundColor: '#6e93c4', // اللون عند التحويم
                              },                           

                              '.MuiSelect-icon': {                                          
                              fontSize: '35px',                
                              left:'unset',         // إزالة المسافة العلوية الافتراضية
                              right:'0%',
                              color: 'black',                       
                                },
                            }}
                          >                         
                                        
                                        { document_type_Form ? document_type_Form.map((item,index)=>      
                                                  <MenuItem key={index} value={item}  >{item}</MenuItem>    
                                                ):''}
                  </Select>
                </Form.Group>

                          <Form.Group style={{width:'250px'}} > 
                          <Form.Label  >الموظف المتابع</Form.Label>       
                                    <Form.Select
                                    name="supervising_emp"
                                    value={form.supervising_emp}                                    
                                     onChange={handleChange}
                                      
                                            >
                                    <option disabled></option>
                                    {selectuser} 
                                    
                                    </Form.Select>
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

                         
                         
                      </Form>

                      <div className="d-flex align-items-center justify-content-between border flex-wrap  "
                      style={{position: 'relative',zIndex:1050}}>
                      <div className="d-flex justify-content-center align-items-center fs-5">
                                <Form.Group  className="m-0 "  style={{width:'300px',position: 'relative'}} > 
                              {/* <Form.Label className=" me-5">{form.document_type  ?documentForm[0].start_document:'تاريخ بداية'}</Form.Label> */}
                                <div  className="d-flex">                            
                                        <div className=" ms-2">
                                                <Form.Check
                                                type="radio"
                                                label="هجري"                       
                                                name="1هجري"                                            
                                                value="هجري"
                                                checked={isHijri ?true:false  }                     
                                                onClick={()=>setIsHijri(true)}              // defaultChecked                                  
                                                />
                                              <Form.Check
                                                type="radio"
                                                label="ميلادي"                                                                        
                                                value="ميلادي"
                                                name="1ميلادي" 
                                                checked={!isHijri ?true:false}                         
                                                onClick={()=>setIsHijri(false)}                // defaultChecked                                  
                                                />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between border bg-white
                                          "style={{width:'250px',height:'60px',position: 'relative'}}>
                                              <p className="m-0 me-2 ">{startDate_Document&& startDate_Document}</p>
                                              <div className="m-0 border  "  style={{}}   >                             
                                              <div style={{ position: 'absolute',reight:0,left:0,top:'50% '}}>
                                                    <button className="bg-white border-0 me-0 p-0"
                                                      onClick={() =>setOpenCalenderStart((prev) => !prev)} 
                                                      style={{ cursor: 'pointer', fontSize: '20px',hidden: isOpenCalenderStart }}
                                                    >
                                                      📅 {/* أيقونة اختيار التاريخ */}
                                                    </button>
                                                    {isOpenCalenderStart && (
                                                      <DatePicker  
                                                      style={{position:'absolute',reight:0,left:0}}       
                                                        // selected={startDate2} 
                                                        onChange={(date) => {setStartDate(date)
                                                          ;setOpenCalenderStart(false)}}                                                                                             
                                                        inline // عرض التقويم بشكل مدمج
                                                      />
                                                    )}
                                                  </div>                                                   
                                                  
                                                  
                                              </div>                          

                                      </div> 
                                </div>                                    
                                  </Form.Group>
                        </div>

                        <div className="d-flex justify-content-center align-items-center fs-5 ">
                        <Form.Group  style={{width:'300px',position: 'relative'}} > 
                           {/* <Form.Label className=" me-5">{form.document_type  ? documentForm[0].end_document:'تاريخ إنتهاء'}</Form.Label> */}
                        <div  className="d-flex">                             
                                <div className=" ms-2">
                                      <Form.Check
                                      type="radio"
                                      label="هجري"                       
                                      name="2هجري"                                            
                                      value="هجري"
                                      checked={isHijri ?true:false  }                     
                                      onChange={()=>setIsHijri(true)} 
                                                   // defaultChecked                                  
                                      />
                                    <Form.Check
                                      type="radio"
                                      label="ميلادي"                                                                        
                                      value="ميلادي"
                                      name="2ميلادي" 
                                      checked={!isHijri ?true:false}                         
                                      onChange={()=>setIsHijri(false)}                // defaultChecked                                  
                                      />
                               </div>                                                      
                                <div className="d-flex align-items-center justify-content-between border bg-white
                                  "style={{width:'250px',height:'60px',position: 'relative'}}>
                                
                                      <p className="m-0 me-2 ">{endtDate_Document&& endtDate_Document}</p>
                                      <div className="m-0 border  "  style={{}}   >                             
                                      <div style={{ position: 'absolute',reight:0,left:0,top:'50% '}}>
                                            <button className="bg-white border-0 me-0 p-0"
                                              onClick={() =>setOpenCalenderEnd((prev) => !prev)} 
                                              style={{ cursor: 'pointer', fontSize: '20px',hidden: isOpenCalenderEnd }}
                                            >
                                              📅 {/* أيقونة اختيار التاريخ */}
                                            </button>
                                            {isOpenCalenderEnd && (
                                              <DatePicker className="  "         
                                              style={{position:'absolute',reight:0,left:0,zIndex:9999 }}
                                                 onChange={(date) => {setEndDate(date)
                                                  ;setOpenCalenderEnd(false)}}                                                                                             
                                                inline // عرض التقويم بشكل مدمج
                                              />
                                            )}
                                          </div>                                                   
                                          
                                          
                                      </div>                          

                                </div>                                
                              
                          </div>
                                    
                          </Form.Group> 
                        </div>

                        <div className="d-flex justify-content-center align-items-center fs-5"
                         style={{width:'300px',position: 'relative'}}>
                        <Form.Group  style={{width:'300px'}} > 
                        <Form.Label className=" me-5">تاريخ التنبية</Form.Label>
                        <div  className="d-flex">                             
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
                                <div className="d-flex align-items-center justify-content-between border bg-white
                                  "style={{width:'250px',height:'60px',position: 'relative',zIndex:1050}}>
                                      <p className="m-0 me-2 "style={{zIndex:1050, position: 'relative'}}>{alertDate_Document&& alertDate_Document}</p>
                                      <div className="m-0 border  "  style={{}}   >                             
                                      <div style={{ position: 'absolute',reight:0,left:0,top:'50% '}}>
                                            <button className="bg-white border-0 me-0 p-0"
                                              onClick={() =>setOpenCalenderAlert((prev) => !prev)} 
                                              style={{ cursor: 'pointer', fontSize: '20px',hidden: isOpenCalenderAlert }}
                                            >
                                              📅 {/* أيقونة اختيار التاريخ */}
                                            </button>
                                            {isOpenCalenderAlert && (
                                              <DatePicker 
                                              style={{position:'absolute',reight:0,left:0,zIndex:1000}}
                                              className=" me-5 "         
                                                // selected={startDate2} 
                                                 onChange={(date) => {setAlertDate(date)
                                                  ;setOpenCalenderAlert(false)}}                                                                                             
                                                inline // عرض التقويم بشكل مدمج
                                              />
                                            )}
                                          </div>                                                   
                                          
                                          
                                      </div>                          

                                </div>                                    
                          
                            </div>
                                    
                          </Form.Group> 
                        </div>

                      </div> 
                     
                      <div className=""onClick={handleOpenImage} style={{width:'100px'}}>
                              <button  className=" cursor-pointer border-0      "> +المرفقات</button> 
                      </div>


                                    
                      <div className=" border mt-3 bg-white d-flex gap-2 w-100 p-2">
                      { FilesFormServer && FilesFormServer.map((item,index)=>      
          
          <div key={index} className="position-relative "style={{width:'100px'}}>                     
              {  typeFile.map((typfile,key)=>
                  <div key={key}>
                  {typfile.name.includes(item.split('.').pop())&&(
                    <div>      
                    
                    
                       <img  src={typfile.type =='img'? ` ${typfile.pathimg}/${item}`:` ${typfile.pathimg}`}  
                         width='40px' height='50px' alt="img"></img>                   
                      <p className="m-0">{StringSlice((File_Name(item,index)),10)}</p>   
                      <a className="fs-6"  href={typfile.type =='img'?`${typfile.pathDownload}/${File_Path(item,index)}`
                      :`${typfile.pathDownload}/${File_Path(item,index)}`} >Download</a>

                <div style={{cursor:"pointer"}}
                          className="position-absolute  top-0 end-0 bg-danger rounded text-white">
                              <p className="py-0 px-1 m-0 fs-6"  onClick={()=>HandleCansleFilesForm(item)}>
                                  x
                              </p>
                          </div>  

                    </div>
                  
                    
                  )}
                </div>)}

              </div>
              )}

             {filesdata && filesdata.map((item2,i)=>(
              <div key={i} className="  position-relative mt-2">                                                                
                {  typeFile.map((typfile,ki)=>
                  <div key={ki}>
                  {typfile.src_type==item2.type&&(
                    <div className="d-flex align-items-center justify-content-start flex-column">
                       <img  src={typfile.type =='img'? `${URL.createObjectURL(item2)}`:` ${typfile.pathimg}`} width='40px'  alt="" ></img>
                       <p className="m-0 fs-6"style={{}}>{item2.name}</p>
                   </div>
                  )}
                </div>)} 
                <div style={{cursor:"pointer"}}
                         className="position-absolute  top-0 end-0 bg-danger rounded text-white">
                             <p className=" px-1 m-0 fs-6" onClick={()=>HandleCansleFiles(item2)}>
                                 x
                             </p>
                         </div>         
              
                               
                       
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