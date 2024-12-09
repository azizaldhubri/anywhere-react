import { useEffect, useRef, useState } from "react"
import { Form } from "react-bootstrap"
import { Axios } from "../../../Api/axios"
import {  USER, USERS } from "../../../Api/Api"
import TranFormDate from "../../../Helpers/TranFormDate";
import { Link, useNavigate } from "react-router-dom";
import LoadingSubmit from "../../../Component/Loading/Loading";
import { typeFile } from "./Files"; 
import DateMilady from "../../../Helpers/DateMilady";
import Select from 'react-select';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,   } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
 
 
export default function AddTaskes(props){
    const navigate=useNavigate();   
    
    // const today = new Date().toISOString().split('T')[0]; 
    // const today =TranFormDate( new Date())    
    const today =DateMilady( new Date())  
    let Update_task=props.taskUpdate ;   
       
    // const todayDate=TranFormDate(new Date());    
    const[users,setUsers]=useState([]);
    const[filesdata,setFilesdata]=useState([]);
    const [message, setMessage] = useState("");
    const[Loading,setLoading]=useState(false);

    const [startDate, setStartDate] = useState(new Date());    
    const startDate_Document =TranFormDate( startDate) 
    const [isOpenCalenderStart, setOpenCalenderStart] = useState(false);
  function handleValueStartDate (value) {
   setStartDate(value);
   //  console.log(value)
};
    
   
       

  // تحديث الرسالة عند الضغط على الزر
  const handleClick = () => {
    setMessage("عنوان المهمة او اسم المسستقبل غير موجود ");
  };

    const focus=useRef('');   
    const openImage=useRef(null);
    const[form,setForm]=useState({
        id_receiver:'Select User',
        description:null,
        task_type:'عام',
        sender_name:'',
        sender_id:''  ,
        receiver_name:'',
        task_status:'To Do',
        start_task:today  ,
        end_task:today
        
     }) 
     const taskSending=useRef(false);
       // handle focus
    useEffect(()=>{     
     focus.current.focus();
    },[]);

    
    useEffect(()=>{
        try{
            Axios.get(`${USERS}`)
            .then(e=>{setUsers(e.data.data);})
        }
        catch(err){console.log(err)}
    },[])



    // setSelect_user(users);

    useEffect(()=>{
        try{
            Axios.get(`${USER}`)
            .then(e=>{
                setForm((prevData) => ({
                    ...prevData,
                    // sender_name: e.data.name,
                    sender_name: e.data.email,
                    sender_id: e.data.id,                    
                  })); 
                                      
                          })
        }
        catch(err){console.log(err)}
    },[])


  function handleChange (e){        
        setForm({...form,[e.target.name]: e.target.value});       
         }
    
// handlechange files
function handlechangefile(e){
    setFilesdata((prev)=>[...prev,...e.target.files]);
}
    
    // --------------handleSubmite---------------
    
    async function handlesubmit(e){
        e.preventDefault();   
   
        const formData = new FormData();
        formData.append('sender_id', form.sender_id);
        formData.append('sender_name', form.sender_name);
        formData.append('id_receiver', form.id_receiver);
        formData.append('receiver_name', form.receiver_name);
        formData.append('task_status',form.task_status );
        formData.append('task_type', form.task_type);
        formData.append('description',form.description.value);
        formData.append('start_task', form.start_task);           
        formData.append('end_task', form.start_task>form.end_task ?form.start_task:form.end_task );    
       
        // إضافة الملفات إلى formData
        for (let i = 0; i < filesdata.length; i++) {
            formData.append('files[]', filesdata[i]);
        }     
        try{   
            //   setLoading(true)                      
           await Axios.post('tasks/add',formData )  ;
           taskSending.current='true' ;
           navigate('/dashboard/Taskes1');
           props.setUpdateTask(Update_task+1) ;            
                 
          }
          catch (error) {
            console.error('Error sending data:', error);
            setLoading(false) 
          }           
    }

    const selectUser=users.map((item,index)=>(            
         <option key={index} value={item.id}  >{item.name}</option>        
        ))
   
        // let receiver_name='' ;
    {form.id_receiver &&(
         users.map((item,index)=>(                       
            item.id ==form.id_receiver &&
            (form.receiver_name=item.name)        
       ))
    ) }             
        function HandleCansleFiles(id){
            setFilesdata((prev)=>prev.filter(img=>img !==id)) ;            
        }

        function handleOpenImage(){
            openImage.current.click()      
          }

          const customStyles = {
            container: (provided) => ({
              ...provided,
              fontSize: '22px',
              minWidth: '360px', 
               borderLeft: '7px solid green',  // تخصيص الحدود اليسرى
              borderRight: '7px solid green', // تخصيص الحدود اليمنى
              borderTop: '2px solid gray',             // إزالة الحدود العلوية (اختياري)
              borderBottom: '2px solid gray',          // إزالة الحدود السفلية (اختياري)
              boxShadow: 'none',             // إيقاف تأثير الظل الافتراضي
              '&:hover': {
                // borderLeft: '5px solid darkred', // تخصيص الحدود اليسرى عند التمرير
                // borderRight: '5px solid darkred', // تخصيص الحدود اليمنى عند التمرير
              }
            }),
            menu: (provided) => ({
              ...provided,      
              fontSize: '19px',
              zIndex: 9998,  // لتحديد قيمة z-index
              textAlign: 'start',
             
            }),
            menuList: (provided) => ({
              ...provided,
              maxHeight: '200px', // تحديد الحد الأقصى لارتفاع القائمة
              overflowY: 'auto', 
            
            }),
            
             
          };
    // const option_general=[
    //     'مقارنة عروض اسعار','طلب اخلاء وحدة- بيانات الوجدة','تعميد بالمطالبة والتحصيل'
    // ]
    const option_general=[
        { value: 'مقارنة عروض اسعار',
            label: 'مقارنة عروض اسعار'},
        { value: 'طلب اخلاء وحدة- بيانات الوحدة',
            label: 'طلب اخلاء وحدة- بيانات الوحدة'},
        { value: 'تعميد بالمطالبة والتحصيل',
            label: 'تعميد بالمطالبة والتحصيل'},        
    ]

    const human_resources=[
        {value:'طلب سلفة',label:'طلب سلفة'},
        {value:'التمكين',label:'التمكين'},
        {value:'طلب إجازة',label:'طلب إجازة'},
    ]
    const Financial=[
        {value:'طلب صرف',label:'طلب صرف'},
        {value:'طلب دفعات',label:'طلب دفعات'},
        {value:'طلب عهدة',label:'طلب عهدة'},
    ]
    const quality=[
        {value:'إخطار مراجعة داخلية',label:'إخطار مراجعة داخلية'},
        {value:'طلب(إصدار- تعديل)وثيقة',label:'طلب(إصدار- تعديل)وثيقة'},
        {value:'عدم مطابقة',label:'عدم مطابقة'},
        {value:'إدارة المحاطر',label:'إدارة المخاطر'},    
    ]
    
    const style_cell={        
            fontSize: '18px',  // تغيير حجم الخط
            fontWeight: 'bold', // جعل الخط عريضًا
            borderRight: '2px solid black', // إضافة border للخلايا
            backgroundColor: '#d3d9db', // لون خلفية لتوضيح الحدود
            borderColor:'#c2c5c5',
            borderBottom:'3px solid gray'
        
    }
//---------------------------------------------add task  type عام and select مقارنة عروض اسعار
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
//---------------------------------------
const Request_vacate_unit=[
    'جازان','دلمون1',
    'دلمون2','دلمون3'
]
    return(
        <div className=" w-100  py-1 px-4 bg-page "  >
            <h5 className="mt-2 d-flex py-3 px-3" >
               إضافة مهمة جديدة 
                </h5>
            
            <div className=" w-100  d-flex align-items-center justify-content-start mt-2" ref={focus} >
            {Loading  && < LoadingSubmit/>}
                {/* <Form onSubmit={handlesubmit}
                className=" d-flex ms-2 w-100 flex-column"
                encType="multipart/form-data"> */}
                <div className=" d-flex ms-2 w-100 flex-column"
                encType="multipart/form-data"  >
                  
                    <fieldset >
                    <Form.Group className="mt-3 d-flex  fs-5" 
                       >
                        <Form.Check
                         className="  me-3"
                        type="radio"
                        // label="عام"                        
                        name="task_type"                                                 
                        value="عام"
                        checked={form.task_type === 'عام'}                       
                        onChange={handleChange}                        
                        />
                        <Form.Label className="me-2">عام</Form.Label>                   
                        <Form.Check
                         className="  me-3"
                        type="radio"
                       name="task_type"                        
                        value='موارد بشرية'
                        checked={form.task_type === 'موارد بشرية'}   
                        onChange={handleChange}                        
                        />
                        <Form.Label className="me-2">موارد بشرية</Form.Label>  

                        <Form.Check
                         className="  me-3"
                        type="radio"                        
                        name="task_type"                        
                        value='مالية'
                        checked={form.task_type === 'مالية'}                        
                        onChange={handleChange}
                        />
                         <Form.Label className="me-2">مالية</Form.Label>  


                        <Form.Check
                         className="  me-3"
                        type="radio"                         
                        name="task_type"                                         
                        value='جودة'                       
                        checked={form.task_type === 'جودة'}                        
                        onChange={handleChange}                    
                        />
                        <Form.Label className="me-2">جودة</Form.Label>  
                    
                    </Form.Group>
                    </fieldset>                   
                   
                    {/* <Form.Group className="mt-3" >
                    <Form.Label className="mt-0 "htmlFor="basic-url">Description</Form.Label>
                    <Form.Control as="textarea" aria-label="With textarea"
                       name="description"
                       value={form.description}            
                    onChange={handleChange}
                       placeholder="Description"
                       >
                       </Form.Control>
                    </Form.Group> */}

                     
                    {form.task_type === 'عام'&&
                        <Form.Group className=" fs-5"  style={{textAlign:'start'}} > 
                            <Form.Label>نوع المهمة</Form.Label>                        
                            <Select className='w-100   '                  
                                                    
                              onChange={(e)=> setForm({...form, description:e })}
                                options={option_general}                                               
                                placeholder="اختر نوع المهمة  "
                                styles={customStyles}
                            required
                            >                        
                            </Select> 
                      </Form.Group> 

                      }
                                   
                    {form.task_type === 'موارد بشرية'&&
                        <Form.Group className="fs-5  "   style={{textAlign:'start'}}> 
                        <Form.Label   style={{textAlign:'start'}}>نوع المهمة</Form.Label>                               
                      
                      <Select className='w-100   '
                        //    name='document_type'                      
                    onChange={(e)=> setForm({...form, description:e })}
                          options={human_resources}                                                            
                          placeholder="اختر نوع المهمة  "
                        styles={customStyles}
                       required
                      >
                        
                      </Select> 

                      </Form.Group>   
                      }
                    {form.task_type === 'مالية'&&
                        <Form.Group className=" fs-5"  style={{textAlign:'start'}}  > 
                        <Form.Label>نوع المهمة</Form.Label>                          
                      
                      <Select className='w-100   '
                        onChange={(e)=> setForm({...form, description:e })}                         
                          options={Financial}                                                            
                          placeholder="اختر نوع المهمة  "
                        styles={customStyles}
                       required
                      >
                        
                      </Select> 

                      </Form.Group>   
                      }   
                    {form.task_type === 'جودة'&&
                        <Form.Group className=" fs-5"  style={{textAlign:'start'}} > 
                        <Form.Label>نوع المهمة</Form.Label>                               
                      
                      <Select className='w-100   '
                    //    name='document_type'
                    onChange={(e)=> setForm({...form, description:e })}                                            
                          options={quality}                                                            
                          placeholder="اختر نوع المهمة  "
                        styles={customStyles}
                       required
                      >                        
                      </Select> 
                      </Form.Group>   
                      }
                    {/* ///////////////////////////////////ظظظظ///// option عام----- مقارنة عروض اسعار'   */}
                     {form.description !=null && 
                      form.description.value =='مقارنة عروض اسعار' && 
                      <div className="w-100">                     
                        <TableContainer component={Paper}
                        sx={{ 
                            // maxHeight: 200,  // تحديد الحد الأقصى للارتفاع
                            overflow: 'auto',
                            // minWidth:1500  // تمكين التمرير عند الحاجة
                          }}
                       >
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: '#d3d9db',fontSize:'20px',                     
                          }}> 
                            <TableCell style={style_cell}>إسم المورد</TableCell>
                            <TableCell style={style_cell}> نوع المواد او الخدمات</TableCell>
                            <TableCell style={style_cell}>المواصفات</TableCell>
                            <TableCell style={style_cell}>مميزات/ضمان</TableCell>
                            <TableCell style={style_cell}>إجمالي المبلغ</TableCell>
                            <TableCell style={style_cell}>حذف</TableCell>                      
                          </TableRow>
                        </TableHead>
                       
                        <TableBody>
                   {rows.map((row, index) => (
                       <TableRow key={row.id}>
                           <TableCell>
                               <Form.Control  
                               type="text"> 
                             </Form.Control>
                           </TableCell>
                           <TableCell style={{ padding: '10px' }}>
                               <Form.Control  
                               type="text">                                
                               </Form.Control>
                           </TableCell>
                           <TableCell style={{  paddingRight:'3%'}}>
                               <Form.Control   
                               type="text">                                    
                               </Form.Control>
                           </TableCell>
                           <TableCell style={{ padding: '10px' }} className='flex_center'>
                            <Form.Control 
                            type='text'></Form.Control>
                           </TableCell>
                           <TableCell style={{  paddingRight:'3%'}}>
                               <Form.Control   
                                 type="text"
                                >                    
                                
                                   
                               </Form.Control>
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
                
               </TableBody>
                      </Table>
                    </TableContainer> 
                       <button  className='back_btn col-4 col-lg-2 col-md-2 p-0 mt-2 rounded fs-6 text-white'
                         onClick={addRow} >                            
                         إضافة مورد
                        </button>
                        </div>                     
                     }  
                    {/* /////////////////////////////////// ///// option-- طلب اخلاء وحدة- بيانات الوحدة ----عام----  */}
                   {form.description !=null && 
                      form.description.value =='طلب اخلاء وحدة- بيانات الوحدة' && 
                      <div className="w-100  mt-2   " style={{textAlign:'start',
                        border:'1px solid gray'
                      }}>
                        <p className="fs-3 mb-0 pb-0">طلب اخلاء وحدة اثناء سريان العقد</p>
                            <TableContainer component={Paper}
                        sx={{                           
                            overflow: 'auto',                       
                          }}
                       >
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: '#d3d9db',fontSize:'20px'}}> 
                            <TableCell style={style_cell}>المشروع </TableCell>
                            <TableCell style={style_cell}>بيانات الوحدة</TableCell>                                              
                          </TableRow>
                        </TableHead>
                       
                        <TableBody>
                        <TableRow sx={{ backgroundColor: '#d3d9db',fontSize:'20px'}}> 
                            <TableCell style={style_cell}>
                                <Form.Select>                              
                                {Request_vacate_unit.map((item,index)=>
                                <option key={index} value={item}>{item}</option>)}
                                </Form.Select>

                                </TableCell>
                            <TableCell style={style_cell}>
                                <Form.Control 
                                type="text">

                                </Form.Control>
                            </TableCell>                                              
                          </TableRow>                 
                       </TableBody>
                      </Table>
                    </TableContainer> 
                    <Form.Group className="fs-5 mt-2" style={{textAlign:'start'}}>
                        <Form.Label >السبب</Form.Label>
                        <Form.Control as="textarea" aria-label="With textarea"
                         >
                            
                        </Form.Control>
                    </Form.Group>
                        
                      </div>                     
                     }
                    {/* /////////////////////////////////// ///// option--   تعميد بالمطالبة والتحصيل----عام----  */}
                   {form.description !=null && 
                      form.description.value =='تعميد بالمطالبة والتحصيل'&& 
                      <div className="w-100  mt-2     bg-white " style={{textAlign:'start',
                        border:'1px solid gray',
                                             }}>
                        <p className="fs-3 mb-0  " style={{textAlign:'center'}}>خطاب تعميد بالمطالبة والتحصيل</p>
                  
                    <Form.Group className="fs-5 mt-2 bg-page p-2" >
                        <div className=" d-flex  ">
                            <Form.Label  className="w-50   " >نعمدكم بالمطالبة وتحصيل مبلغ</Form.Label>
                            <Form.Control  className=" w-50  p-3"
                             type="text">                            
                            </Form.Control>
                        </div>
                        <p className="m-0 mt-2"style={{textAlign:'center'}}>ولكم صلاحية اقامة دعوى حتى تحصيل المبلغ</p>
                    </Form.Group>
                        <p className="m-0  fs-5"style={{textAlign:'center'}}>بيانات المدين</p>
                        <Form.Group className="fs-5   bg-page p-2" >
                        <div className=" d-flex justify-content-between align-items-center p-3 ">
                            <Form.Label  className="   " style={{width:'70px'}}> الاسم</Form.Label>
                            <Form.Control  className=" p-1"style={{width:'120px'}}
                             type="text">                            
                            </Form.Control>
                            <Form.Label  className="   " style={{width:'70px'}}> موقع العين المستأجرة</Form.Label>
                            <Form.Control  className="p-1 "style={{width:'130px'}}
                             type="text">                            
                            </Form.Control>
                        </div>
                        <div className=" d-flex justify-content-between align-items-center p-3 ">
                            <Form.Label  className="   " style={{width:'70px'}}> نوع الهوية</Form.Label>
                            <Form.Control  className=" p-1"style={{width:'120px'}}
                             type="text">                            
                            </Form.Control>
                            <Form.Label  className="   " style={{width:'70px'}}> رقمها  </Form.Label>
                            <Form.Control  className="p-1 "style={{width:'130px'}}
                             type="text">                            
                            </Form.Control>
                        </div>
                        <div className=" d-flex justify-content-between align-items-center p-3 ">
                            <Form.Label  className="   " style={{width:'70px'}}>عنوانه</Form.Label>
                            <Form.Control  className=" p-1"style={{width:'120px'}}
                             type="text">                            
                            </Form.Control>
                            <Form.Label  className="   " style={{width:'70px'}}> تاريخ الاستحقاق  </Form.Label>
                            <Form.Control  className="p-1 "style={{width:'130px'}}
                             type="text">                            
                            </Form.Control>
                        </div>
                        <div className=" d-flex justify-content-between align-items-center p-3 ">
                            <Form.Label  className="   " style={{width:'70px'}}> الجوال</Form.Label>
                            <Form.Control  className=" p-1"style={{width:'120px'}}
                             type="text">                            
                            </Form.Control>
                            <Form.Label  className="   " style={{width:'70px'}}>حالة العقد</Form.Label>
                            <Form.Control  className="p-1 "style={{width:'130px'}}
                             type="text">                            
                            </Form.Control>
                        </div>
                        <div className=" d-flex justify-content-between align-items-center p-3 ">
                            <Form.Label  className="   " style={{width:'70px'}}>الهاتف</Form.Label>
                            <Form.Control  className=" p-1"style={{width:'120px'}}
                             type="text">                            
                            </Form.Control>
                            <Form.Label  className="   " style={{width:'70px'}}>  تاريخ آخر تواصل  </Form.Label>
                            <Form.Control  className="p-1 "style={{width:'130px'}}
                             type="text">                            
                            </Form.Control>
                        </div>
                       
                     </Form.Group>
                    
                        
                      </div>                     
                     }


                         {/* /////////////////////////////////// ///// option--    طلب سلفة    ----موارد بشريه ----  */}
                   {form.description !=null && 
                      form.description.value =='طلب سلفة'&& 
                      <div className="w-100  mt-2     bg-white " style={{textAlign:'start',
                        border:'1px solid gray',
                      }}>
                        <p className="fs-3 mb-0  " style={{textAlign:'center'}}>طلب سلفة</p>
                        <table className="w-100 ">
                          <thead style={{border:'3px solid black',}}>
                            <tr style={{}}>
                              <th className="p-2 "style={{border:'1px solid black',}}>الإسم:.</th>
                              <th style={{border:'1px solid black'}}>الإدارة:</th>
                              <th style={{border:'1px solid black'}}>المسمى الوظيفي:</th>
                              <th style={{border:'1px solid black'}}>مبلغ السلفة</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{border:'1px solid black'}}>
                                <Form.Control as="textarea" aria-label="With textarea"></Form.Control>
                              </td>
                              <td style={{border:'1px solid black'}}> <Form.Control type="text"></Form.Control></td>
                              <td style={{border:'1px solid black'}}> <Form.Control type="text"></Form.Control></td>
                              <td style={{border:'1px solid black'}}> <Form.Control type="text"></Form.Control></td>
                            </tr>
                          </tbody>
                        </table>
                        <p className="m-0 mt-2 fs-5 me-3">امل الموافقة على طلب السلفة وافوض الشركة بخصمها من راتبي الشهري حسب اللائحة الداخلية للشركة:
                                   إقرار الضامن</p>
                      
                           <table className="w-100  border-0 mt-3 fs-5 text-center"style={{border:'0'}}>                            
                          <tbody style={{border:'0'}}>
                            <tr className="border-0">
                              <td style={{border:'0'}}>
                              أقر أنا
                              </td>
                              <td style={{border:'0'}}>
                                <Form.Control type="text" ></Form.Control>
                              </td>
                              <td style={{border:'0'}}> المسمى الوظيفي</td>
                              <td style={{border:'0'}}> <Form.Control type="text"></Form.Control></td>
                            
                            </tr>
                            <tr>
                              <td style={{border:'0'}}> هوية رقم </td>
                              <td style={{border:'0'}}>
                                <Form.Control type="text" ></Form.Control>
                              </td>
                              <td style={{border:'0'}}>  بأنني أضمن وأكفل السيد</td>
                              <td style={{border:'0'}}> <Form.Control type="text"></Form.Control></td>
                            
                            </tr>
                            <tr className="w-100">
                              <td  style={{border:'0'}} className="fs-5" colspan="2"> في سداد السلفة الخاصة به وقدرها</td>
                              
                              <td style={{border:'0'}} colspan="2">
                                <Form.Control type="text" ></Form.Control>
                              </td>
                             
                            
                            </tr>
                          </tbody>
                        </table>

                        <p className="m-2 fs-5">
                     في موعدها المحدد وتظل مسئوليتي قائمة إلى أن يتم السداد في حالة تركه العمل
                       أو الاستغناء عن خدماته لأي سبب من الأسباب .
                            ملاحظة المدير المباشر</p>
                            <Form.Control className="w-100 p-2" type="text"></Form.Control>  

                        <p className="m-2 fs-5"> شروط السلفة 1-مرة واحدة خلال العام 2- لا تزيد عن راتب شهرين من 
                          الأساسي 3- فترة السداد 3 أشهر يلي شهر السلفة 4- موافقة المدير المباشر 5-موافقة الإدارة على السلفة</p>
                        
                      </div>                     
                     }

                     {/* /////////////////////////////////// ///// option--       'طلب صرف'----مالية----  */}
                     {form.description !=null && 
                      form.description.value =='طلب صرف'&&
                      <div className="w-100  mt-2  fs-5   bg-white">
                        <p className="m-2 ">اسم صاحب الحساب</p>
                        <Form.Control className="w-100 mb-2" type="text"></Form.Control>
                        <div className=" d-flex w-100 gap-3 mt-2 mb-2">
                          <div className="w-50 ">
                            <p className="m-0 mt-2 me-3">اسم المشروع </p>
                            <Form.Control className="w-100" type="text"></Form.Control>
                          </div>
                          <div className="w-50">
                            <p className="m-0 mt-2 me-3">اسم المقاول  </p>
                            <Form.Control className="w-100" type="text"></Form.Control>
                          </div>
                        </div>
                        <div className=" d-flex w-100 gap-3 mt-2 mb-2">
                          <div className="w-50 ">
                            <p className="m-0 mt-2 me-3">رقم الهوية </p>
                            <Form.Control className="w-100" type="text"></Form.Control>
                          </div>
                          <div className="w-50">
                            <p className="m-0 mt-2 me-3">تاريخ التسليم</p>
                            <Form.Control className="m-0  ms-2 w-100 "
                            type="date"
                            name="start_task"
                            value={form.start_task}   
                            onChange={handleChange}                          
                            min={today}
                            >
                        </Form.Control> 
                          </div>
                        </div>
                        <div className=" d-flex w-100 gap-3 mt-2 mb-2">
                          <div className="w-50 ">
                            <p className="m-0 mt-2 me-3">نوع الاعمال</p>
                            <Form.Control className="w-100" type="text"></Form.Control>
                          </div>
                          <div className="w-50">
                            <p className="m-0 mt-2 me-3">دفعة رقم</p>
                            <Form.Control className="w-100" type="text"></Form.Control>
                          </div>
                        </div>
                        <div className=" d-flex w-100 gap-3 mt-2 mb-2">
                          <div className="w-50 ">
                            <p className="m-0 mt-2 me-3">طريقة السداد</p>
                            <Form.Control className="w-100" type="text"></Form.Control>
                          </div>
                          <div className="w-50">
                            <p className="m-0 mt-2 me-3">رقم حساب المقاول</p>
                            <Form.Control className="w-100" type="text"></Form.Control>
                          </div>
                        </div>
                        <div className=" d-flex w-100 gap-3 mt-2 mb-2">
                          <div className="w-50 ">
                            <p className="m-0 mt-2 me-3">المبلغ المطلوب</p>
                            <Form.Control className="w-100" type="text"></Form.Control>
                          </div>
                          <div className="w-50">
                            <p className="m-0 mt-2 me-3">ملاحظات</p>
                            <Form.Control className="w-100" type="text"></Form.Control>
                          </div>
                        </div>
                      </div>                      
                       }

                        {/* /////////////////////////////////// ///// option--       ' إخطار مراجعة داخلية   '----جودة----  */}
                       {/* إخطار مراجعة داخلية */}
                       {form.description !=null && 
                      form.description.value =='إخطار مراجعة داخلية'&&
                      <div className="w-100  mt-2  fs-5   bg-white" >
                        <p className="m-2 fs-6">اخطار مراجعة داخلية لنظام إدارة الجودة</p>
                        <div className="p-2 border">
                          <p className="m-2 text-center">اخطار مراجعة داخلية لنظام إدارة الجودة</p>
                          <table className="w-100  border-0 mt-3 fs-5 text-center"style={{border:'0'}}>                            
                          <tbody style={{border:'0'}}>
                            <tr className="border-0">
                              <td style={{border:'0'}}>
                              من
                              </td>
                              <td style={{border:'0'}}>
                              <Form.Group  className="d-flex  gap-2 me-3 w-100">
                            <Form.Select 
                            name="id_receiver"                             
                            // value={form.id_receiver}                       
                            // onChange={handleChange}                           
                            >
                               <option  disabled >إختار الإدارة</option>
                                {selectUser}
                            </Form.Select>                        
                    </Form.Group>
                              </td>
                              <td style={{border:'0'}}>الى</td>
                              <td style={{border:'0'}}>  <Form.Group  className="d-flex  gap-2 me-3 w-100">
                            <Form.Select 
                            name="id_receiver"                             
                            // value={form.id_receiver}                       
                            // onChange={handleChange}                           
                            >
                                <option  disabled >إختار الإدارة</option>
                                {selectUser}
                            </Form.Select>                        
                                </Form.Group></td>
                            
                            </tr>
                            <tr>
                              <td style={{border:'0'}}>رقم المراجعة</td>
                              <td style={{border:'0'}}>
                                <Form.Control type="text" ></Form.Control>
                              </td>
                              <td style={{border:'0'}}>التاريخ والوقت</td>
                              <td style={{border:'0'}}> <Form.Control className="m-0  ms-2 w-100 "
                            type="date"
                            name="start_task"
                            value={form.start_task}   
                            onChange={handleChange}                          
                            min={today}
                            >
                        </Form.Control> </td>
                            
                            </tr>                          
                          </tbody>
                        </table>

                        <table className="w-100  border-0 mt-3 fs-5 text-center"style={{border:'0'}}>                            
                          <tbody style={{border:'0'}}>
                            <tr className="border-0">
                              <td style={{border:'0'}} className="w-50  text-center">
                              اسم المراجع
                              </td>
                              <td style={{border:'0'}}className="w-50  ">
                              <Form.Select                                                              
                                    // value={form.id_receiver}                       
                                    // onChange={handleChange}                           
                            >
                                <option  disabled >إختار الاسم</option>
                                {selectUser}
                            </Form.Select> 
                    
                              </td>
                              </tr>
                              <tr className="border-0">
                              <td style={{border:'0'}}className="w-50  text-center">موقع المراجعة</td>
                              <td style={{border:'0'}} className="w-50 ">     <Form.Control type="text" 
                                ></Form.Control> 
                            </td>                            
                            </tr>
                            <tr className="border-0">
                              <td style={{border:'0'}}className="w-50  text-center">موضوعات/ بنودالمراجعة</td>
                              <td style={{border:'0'}} className="w-50 p-2 ">  
                                   <Form.Control as='textarea'  aria-label="with textarea"
                                                  
                                ></Form.Control> 
                            </td>                            
                            </tr>
                                                   
                          </tbody>
                        </table>
                        <p className="m-2">عند وجود أية ملاحظات لكم على التاريخ أو الموعد أو المراجعين يرجى إبلاغنا
                           وفي حالة عدم الرد الفوري يعتبر ذلك موافقة على ما تضمنه هذا الإخطار</p>
                        </div>

                      </div> }
                     {
                      form.description !=null &&
                      <>
                        <p className="m-2 fs-5 text-end">الى الموظف</p>
                      <Form.Group  className="d-flex  gap-2 me-3 w-100">
                              <Form.Select 
                              name="id_receiver"                             
                              value={form.id_receiver}                       
                              onChange={handleChange}                           
                              >
                                  <option  disabled >Select User</option>
                                  {selectUser}
                              </Form.Select>                        
                      </Form.Group>
                      </>
                     }
                   
                    <Form.Group className="w-100   mt-3  me-3  d-flex flex-wrap  gap-2">
                    <fieldset className=" d-flex align-items-center  ">   
                    <Form.Label>Start_task</Form.Label>
                        <Form.Control className="m-0  ms-2 w-75 "
                            type="date"
                            name="start_task"
                            value={form.start_task}   
                            onChange={handleChange}                          
                            min={today}
                            >
                        </Form.Control>            
                        </fieldset>                        
                        <fieldset className=" d-flex align-items-center">  
                      <Form.Label>End_task</Form.Label>
                        <Form.Control className="m-0  ms-2 w-70"
                            type="date"
                            name="end_task"
                            value={form.start_task>form.end_task ?form.start_task:form.end_task}                           
                            onChange={handleChange}
                            min={form.start_task}
                             >
                        </Form.Control> 
                        </fieldset>                                                
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
                          
                {/* </Form> */}
                
                </div>
            </div> 
            <div className="w-25"
           onClick={handleOpenImage}>
            <button 
             className=" cursor-pointer border-0 bg-white  text-primary me-3 mt-2">+Add Files:</button> 
        </div>           
                <div className=" border mt-3 bg-white d-flex gap-2 ">
                    {filesdata && filesdata.map((item,i)=>(
              <div key={i} className="  position-relative mt-2">                                                                
                {  typeFile.map((typfile,ki)=>
                  <div key={ki}>
                  {typfile.src_type==item.type&&(
                    <div className="d-flex align-items-center justify-content-start flex-column">
                       <img  src={typfile.type =='img'? `${URL.createObjectURL(item)}`:` ${typfile.pathimg}`} width='30px'  alt="" ></img>
                       <p className="m-0"style={{fontSize:'12px'}}>{item.name}</p>
                   </div>
                  )}
                </div>)}         
              
                         <div style={{cursor:"pointer"}}
                         className="position-absolute  top-0 end-0 bg-danger rounded text-white">
                             <p className="py-1 px-1 m-0" onClick={()=>HandleCansleFiles(item)}>
                                 x
                             </p>
                         </div>         
                       
                        </div>
                      
                    ))
                    }
                </div>

                <div className="w-100 d-flex justify-content-center gap-3 mt-2 ">               
                  <button   className="border-0 bg-white fs-4 text-danger"                
                  onClick={(form.receiver_name && form.description) ?handlesubmit:handleClick}  
                  disabled={!taskSending } 
                //   style={{color:!taskSending.current ? '#E41B17':'	#FBBBB9' }}           
                  >Save</button> 
                  {props.addTask_from_model && 
   //  يظهر هذه المفتاح اذا فتحنا واجهة اضافة مهمة من الفورم  وستخدم هذا المفتاح لالغاء المهمه
                    <button 
                    className="border-0 bg-white fs-4 text-danger"

                    onClick={()=>props.setUpdateTask(Update_task+1)}
                    >Cancle</button> }
                  {!props.addTask_from_model && 
                    <Link to='/dashboard/Taskes1'
                    className="border-0 bg-white fs-4 text-dangeri">Cancle</Link> }

                                       
               </div>
               <div className="w-100 d-flex -align-items-center justify-content-center fs-5 text-danger">
                
               {message && <p>{message}</p>}
               </div>                 
           
        </div>
    )
}
