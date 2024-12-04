import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { document_type_Form } from "./DocumentType";
import { documents } from "./DocumentType";
import { USER, USERS } from "../../../Api/Api"; 
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
 
// export default function Add_Order_Document(){
//   const navigate=useNavigate();  
   
//   const [isHijri, setIsHijri] = useState(false); 
//   const [users,setUsers]=useState([]);
//     const[filesdata,setFilesdata]=useState([]); 

//     // const [selectedDate2, setSelectedDate2] = useState('');    
//     // const today2 =TranFormDate( selectedDate2?selectedDate2:new Date()) 
    
    
//     const milady = moment().format('dddd,Do MMMM  YYYY');
//     const todayHijri = moment().format('dddd,iD iMMM  iYYYY');


//     ///date selectedDate
//     const [startDate, setStartDate] = useState(new Date());    
//     const startDate_Document =TranFormDate( startDate) 
//     const [isOpenCalenderStart, setOpenCalenderStart] = useState(false);
    
//     //-----------date select end date
//     const [endDate, setEndDate] = useState(new Date()); 
//     const endtDate_Document =TranFormDate( endDate) 
//     const [isOpenCalenderEnd, setOpenCalenderEnd] = useState(false);   
//     //--------------------------------------------------------------
//     //-----------date select date_alert:'', 
//     const [alertDate, setAlertDate] = useState(new Date()); 
//     const alertDate_Document =TranFormDate( alertDate) 
//     const [isOpenCalenderAlert, setOpenCalenderAlert] = useState(false);   
//     //--------------------------------------------------------------
     


//     const [isToggled, setIsToggled] = useState(false);
  
//     // التعامل مع النقر على الزر لتغيير الحالة
//     const handleToggle = () => {
//       setIsToggled(!isToggled); // تغيير الحالة بين true و false
//     };

//       const focus=useRef('');   
//       const openImage=useRef(null);
//       // const selectDate1=useRef('');
        
//       useEffect(()=>{     
//     //    focus.current.focus();
//       },[]);

//       useEffect(()=>{
//         try{
//             Axios.get(`${USER}`)
//             .then(e=>{
//                 setForm((prevData) => ({
//                     ...prevData,
//                     user_name: e.data.email,
                                       
//                   })); 
                                      
//                           })
//         }
//         catch(err){console.log(err)}
//     },[])
       
//      const documentForm=form.document_type &&documents.filter(item=>item.document_type===form.document_type)
    

//       useEffect(()=>{
//         try{
//             Axios.get(`${USERS}`)
//             .then(res=>{
//                 setUsers(res.data.data)  })

//         }
//         catch(err){console.log(err)}
//     },[])
//     const selectuser=users.map((user,index)=>
//         <option key={index} value={user.email} >{user.name}</option>
//     )
//     const doc_type=document_type_Form ? document_type_Form.map((item,index)=>      
//         <option key={index} value={item} >{item}</option>    
//   ):'';

//   function handleChange (e){
//     setForm({...form,[e.target.name]: e.target.value});       
    
//      }

//      // handlechange files
// function handlechangefile(e){
//   setFilesdata((prev)=>[...prev,...e.target.files]);
 
// }

// function HandleCansleFiles(id){
//   setFilesdata((prev)=>prev.filter(img=>img !==id)) ;            
// }
 

 

// async function handleSubmit(e){
//   e.preventDefault();
//   const formData = new FormData();
//   formData.append('document_name', form.document_name);
//   formData.append('supervising_emp', form.supervising_emp);
//   formData.append('user_name', form.user_name);
//   formData.append('document_id', form.document_id);
//   formData.append('start_document', DateStorage(startDate));
//   formData.append('end_document',DateStorage(endDate) );
//   formData.append('date_alert', DateStorage(alertDate));
//   formData.append('document_type',form.document_type);
  
 
//   // إضافة الملفات إلى formData
//   for (let i = 0; i < filesdata.length; i++) {
//       formData.append('files[]', filesdata[i]);
//         } 
//       try{  
//           console.log(...formData)               
//    await Axios.post('document/add',formData )  ;          
//    navigate('/dashboard/documents');
         
//   }
//   catch (error) {
//     console.error('Error sending data:', error);
//     // setLoading(false) 
//   } 
// }

//     return(
//         <div className="px-4 py-3 w-100 bg-page ">
//             {/* <div className="d-flex flex-column w-100 fs-5 ">
                
             
//             </div>  */}
//             <Form>
//                 <Form.Group>
//                     <Form.select>

//                     </Form.select>

//                 </Form.Group>

//             </Form>

//         </div>
//     )
// }

// import { AppBar, Toolbar, Select, MenuItem, Typography, Box } from '@mui/material';
import Select from 'react-select';
import DateMilady from '../../../Helpers/DateMilady';

const options = [
  { value: 'عزيز', label: 'عزيز' },
//   { value: 'banana', label: 'Banana' },
//   { value: 'cherry', label: 'Cherry' },
//   { value: 'date', label: 'Date' },
//   { value: 'elderberry', label: 'Elderberry' },
];
const options2 = [
  { value: 'ايجار', label: 'ايجار' },
//   { value: 'banana', label: 'Banana' },
//   { value: 'cherry', label: 'Cherry' },
//   { value: 'date', label: 'Date' },
//   { value: 'elderberry', label: 'Elderberry' },
];

export default function Add_Order_Document(){
    const today =DateMilady( new Date())  
 
      const[form,setForm]=useState({ 
        clientName:null ,        
        amount:'',
        payment_date:today,
        description:'',                  
        description_date:today,                  
        contract:null,
        date_added:today
                 
       }) 
    
 

function handleChange(e){
    setForm({...form,[e.target.name]:e.target.value});
   
}
function handleSubmit(e){
    e.preventDefault();  
     
    const formData = new FormData();
    formData.append('clientName', form.clientName.value);
    formData.append('amount', form.amount);
    formData.append('payment_date', form.payment_date);
    formData.append('description', form.description);
    formData.append('description_date', form.description_date);
    formData.append('Contract', form.contract.value);
    formData.append('date_added', form.date_added);

    // console.log(...formData)
}
  return (
    <div className="px-4 py-3 w-100 bg-page fs-5 ">
         <div className='border d-flex align-items-center justify-content-start fs-5  pe-3 rounded mb-3'
        style={{height:'60px  ',background:'#d3d9db'}}>
          <img  width='40px' src={require('./../../../Assets/img/data-oic.png')}></img>
          <Link to='/dashboard' className='me-2 text-black' >الرئيسية / سندات الامر</Link>
          
        </div>
         <div className="d-flex   flex-column gap-3 ">
                <div className='d-flex align-items-center justify-content-center justify-items-center gap-5       '>
                  <p className='m-0 'style={{width:'120px'}}> العميل</p>
                    <Select className='w-100  fs-6'
                    name='clientName'
                        options={options}
                        // value={(e)=>e.target.value}
                        // onChange={handleChange}
                        onChange={(e)=> setForm({...form, clientName:e })}
                        placeholder="اختر اسم العميل"
                    >
                       
                    </Select>
               </div>

            <div className='d-flex align-items-center justify-content-center   gap-5'>
                <p className='m-0 'style={{width:'120px'}}> المبلغ</p>
            <input className=' fs-6   form-control'
                type='number'
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="المبلغ"
            />
            </div>

            <div className='d-flex align-items-center justify-content-center  gap-5'>
            <p className='m-0 'style={{width:'120px'}}> تاريخ السداد</p>
            <input className='w-100 fs-6 form-control'
                name="payment_date"
                type='date'
                
                value={form.payment_date}
                onChange={handleChange}
                // placeholder="المبلغ"
            />
            </div>
            <div className='d-flex align-items-center justify-content-center  gap-5'>
            <p className='m-0 'style={{width:'120px'}}> البيان</p>
            <textarea className='w-100 fs-6 form-control'
                name="description"
                value={form.description}                 
                onChange={handleChange}
                // placeholder="المبلغ"
            />
            </div>

            <div className='d-flex align-items-center justify-content-center  gap-5'>
            <p className='m-0 'style={{width:'120px'}}> تاريخ البيان</p>
        
            <input className='w-100 fs-6 form-control'
                type='date'
                name="description_date"
                value={form.description_date}  
                 
                onChange={handleChange}
                // placeholder="المبلغ"
            />
            </div>

            <div className='d-flex align-items-center justify-content-center  gap-5'>
                  <p className='m-0 'style={{width:'120px'}}> العقد</p>
                    <Select className='w-100 fs-6'
                        // name='Contract'
                        options={options2}
                        onChange={(e)=> setForm({...form, contract:e })}
                        placeholder="اختر عقد العمل"
                    />
               </div>

               <div className='d-flex align-items-center justify-content-center  gap-5'>
            <p className='m-0 'style={{width:'120px'}}> تاريخ الاضافة</p>
            <input className='w-100 fs-6 form-control'
                type='date'
                name="date_added"
                value={form.date_added}
                onChange={handleChange}
                min={today}
                // placeholder="المبلغ"
            />
            </div>
            <div className='d-flex align-items-center justify-content-center  gap-5' >
                <button className='btn btn-primary' onClick={handleSubmit}>حفظ</button>
                <button  className='btn  btn-danger  '>
                    <Link  className='text-black' to='/dashboard/OrderDocument'>رجوع</Link>
                </button>
            </div>

         </div>    

    </div>

  
  );
};
 
