import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { USER } from "../../../Api/Api";  
import { Form } from "react-bootstrap";
import {   faCalendarCheck, faClock, faReplyAll, faStar, } from "@fortawesome/free-solid-svg-icons" 
import TransformTime from "../../../Helpers/TransformTime"
import { Dropdown, DropdownButton } from "react-bootstrap";
// import './../../../Css/components/Modal.css';
// import Select from 'react-select';
// import FormSelect from "../../../Component/Dashboard/FormSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faChevronLeft, faChevronRight, faMagnifyingGlass, faPrint } from "@fortawesome/free-solid-svg-icons";
import AddTaskes from "./AddTask";
import './StyleUl.css'
import './Modal.css'
import SubTask from "./SubTask";
import StringSlice from "../../../Helpers/StringSlice";
import File_Name from "../../../Helpers/File_Name";
import File_Path from "../../../Helpers/File_path";
import { typeFile } from "./Files";
export default function Taskes1(){

    const [activeTab, setActiveTab] = useState('البريد الوارد');
    const [activeLink, setActiveLink] = useState('');
    const [openForm, setOpenForm] = useState(false); 
    const [openSubTask, setOpenSubTask] = useState(false); 
    const[user,setUser]=useState('')
    const [hoveredItem, setHoveredItem] = useState(null)   
    const [ incomeTask, setIncomTask] = useState([]);
    const [ taskUpdate, setTaskUpdate] = useState(0);
    
    // --------- دالة لاغلاق model عند كتابة المهام الفرعيه
    function handleValuetaskUpdate (value) {
        setTaskUpdate(value);  
        setOpenForm(false)  ;// لاغلاق الفورم عندر ارسال رد على مهمه من model   
        setIsModalOpen(false) ;// لاغلاق الفورم عندر ارسال مهمه من model   
    };

/////// داله لتخزين المهام المطلوبه للعرض 
 function handelincomeTask(task) {
    if (!incomeTask.includes(task)) {      
        setIncomTask((prev)=>[...prev,task]);        
      } 
    };
     
    useEffect(()=>{
        try{Axios.get(`${USER}`)
        .then(data=>setUser(data.data.email))
         }
        catch(err){console.log(err)}
    },[])
 
    //---------------------------
    const [selectedOption, setSelectedOption] = useState('');  
    const handleSelectChange = (e) => {
      setSelectedOption(e.target.value);            
    }  
    

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

     //-------------------------------------------------------------------modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // دالة لفتح المودال
  const openModal = () => setIsModalOpen(true);

  // دالة لإغلاق المودال
  const closeModal = () => setIsModalOpen(false);

  function Modal({ onClose }) {
    return (
        <div className="modal-overlayut "          
            // style={{overflowY:'a',height:'100vh'}}           
            // style={{overflowY:'scroll',}}          
           >
            <div style={{overflowY:'auto', height:'100vh',width:'600px'}}>
                <div className="modal-content1 bg-page  "style={{}} 
                onClick={(e)=>{  e.stopPropagation();}}>
                <div  className='w-100 d-flex    flex-column gap-3 '   >
                
                    {/* {AddTaskes()} */}
                    <AddTaskes 
                    taskUpdate={taskUpdate}  
                    setUpdateTask={handleValuetaskUpdate}
                    addTask_from_model='true' /> 
                    {/* <button className='back_btn rounded'onClick={onClose}>رجوع</button>     */}

                </div>
                
                </div>
            </div>
        </div>
    );
}
//==================================task
// const [selectedOption, setSelectedOption] = useState('');  
const[userId,setUserId]=useState('');     
const[tasks,setTasks]=useState([]);           
const[incomingTasks,setIncomingTasks]=useState(true)       
const[loading,setLoading]=useState(false);  

// const handleSelectChange = (e) => {
//     setSelectedOption(e.target.value);            
//   }
   
        useEffect(()=>{
            Axios.get(`${USER}`)
            .then(res=>{
                setUserId(res.data.id);  })
        },[])            
        
        useEffect(()=>{
            async function gettask(){                
            try{  await  Axios.get('tasks')
                .then(e=>{
                    // setTasks(e.data.post);                                                   
                    setTasks(e.data.postArray);                                                   
               setLoading(false);
               setIncomTask([]);                                          
                  })  
            }
            catch(err){console.log(err)};
        }         
        gettask();           
        },[taskUpdate])
      
        tasks.sort((a, b) => {return  new Date(b.created_at)-new Date(a.created_at)  });  
        { incomeTask.length == 0 &&   tasks.map((task,index)=>(
            <div className="   w-100   bg-light " key={index}
                style={{color:task.task_status=='Completed' ?'black':'red',boxShadow:'0 5px 5px rgba(0,0,0,0.3)',
                    borderRadius:'34px',
                     borderRight:activeLink==index ?'8px solid #14b7d7' :'' }} >           
                <>                
                    {
                     task.chiledtask.length==0 &&
                    (userId==(incomingTasks?task.id_receiver:task.sender_id)) && 
                    <div key={index} >
                       { handelincomeTask(task)}                       
                    </div>                      
                    }
                    {!incomingTasks &&   
                    task.chiledtask.map((item ,n)=>(        
                    // (item.task_id==task.id && item.id_receiver==userId && task.sender_id !=userId && iswrritten)&&
                    (item.task_id==task.id && item.id_sender ==userId && task.chiledtask.length==n+1 )&&
                    <div  key={n}  > 
                     { handelincomeTask(task)}                 
                       
                    </div>     ))        
                    } 
        
                   {incomingTasks &&   
                    task.chiledtask.map((item ,nm)=>(        
                    // (item.task_id==task.id && item.id_receiver==userId && task.sender_id !=userId && iswrritten)&&
                    (item.task_id==task.id && item.id_receiver ==userId && task.chiledtask.length==nm+1 )&&
                    <div key={nm}  >
                        { handelincomeTask(task)}  
                        
                    </div>     ))        
                    }                
                </>
            </div>   )
        )} 
//--------------------------------------------------------------data show
    const datashow2=incomeTask.map((task,nm)=>
        <div className="   w-100   bg-light " key={nm}
        style={{color:task.task_status=='Completed' ?'black':'red',boxShadow:'0 5px 5px rgba(0,0,0,0.3)',
            borderRadius:'34px',
            borderRight:activeLink==nm ?'8px solid #14b7d7' :''
        }} onClick={(e)=>{setActiveLink(nm);  e.stopPropagation(); // منع الحدث من الوصول للأب
            handleClick();setOpenForm(true)}}>           
        {/* // }}onClick={()=>{setActiveLink(task.id);}}> */}
      
            <div                 
        className=" d-flex gap-2  w-100 align-items-center  p-1 mb-2 ps-4 pe-4 
        justify-content-between     flex-wrap "
        style={{color:task.task_status=='Completed' ?'black':'red', height:'70px'  }}>       
            <div className=" d-flex align-items-center justify-content-start  gap-2 flex-wrap fs-5 ">
            <div className=" d-flex align-items-center justify-content-between flex-wrap gap-3  ">
                <h5 className="m-0">{task.id}</h5>
                {/* <h5 className="m-0 d-flex align-content-center align-items-center">{`${receiver }  <-  ${sender}`}</h5> */}
                    <p className="m-0 ms-2">
                    {task.chiledtask.length==0 ? task.sender_name:
                     task.chiledtask.map((item,n)=>
                        task.chiledtask.length==n+1 &&
                    item.name_sender )} 
                         </p>
                <p className="m-0 d-flex align-content-center align-items-center">
                    {/* {task.receiver_name  !=task.sender_name && */}
                    {/* <> */}

                    <p className="m-0 ">{` - `}</p>
                    <p className="m-0 mt-1">{` > `}</p>
                    <p className="m-0 me-2">
                        {task.chiledtask.length==0 ? task.receiver_name:
                     task.chiledtask.map((item,n)=>
                        task.chiledtask.length==n+1 &&
                    item.name_receiver )}  </p>
                    {/* </> } */}
                
                </p>
                
                {/* <h6 className="m-0  "style={{fontSize:'12px',color:'black'}}> */}
                    {/* {task.task_status}</h6>                      */}
            </div>
                <div  
                className="ms-3"           
                    style={{color:task.task_status=='Completed' ?'black':'red'}}>
                    <div className="d-flex align-items-center gap-2">
                    <FontAwesomeIcon icon={faStar} className="text-dark"></FontAwesomeIcon>
                        <p className="m-0">{task.description}</p>
                        { task.chiledtask.length>0 &&   <p className="m-0">({ task.chiledtask.length})</p>}                             
                    </div>
                </div>
            </div>             
            <h6 className="m-0  ">{TransformTime(task.created_at)}</h6>
        </div> 
            </div>
    )

const Comment = ({ comment ,type}) => {
    const [isOpen, setIsOpen] = useState(true); // حالة فتح الردود الخاصة بهذا التعليق
    const [isHovered, setIsHovered] = useState(false);     
    const handleMouseEnter = () => setIsHovered(true);   
    const handleMouseLeave = () => setIsHovered(false);
  
    const toggleReplies = () => {
      setIsOpen(!isOpen); // تغيير حالة الفتح/الإغلاق عند الضغط
    };
  
    return (
     
       <div   className="w-100 pe-1 ps-1  fs-6"   >
            <div className=" w-100 d-flex  border p-3  align-items-center border justify-content-between " 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} 
            onClick={toggleReplies}
             style={{
                cursor:"pointer" ,
                backgroundColor: isHovered ? "#e4e5e6" : "white"
              }}>
              
                <div className="w-50   d-flex align-items-center">
                    <p className="m-0 p-2  
                    text-center"style={{width:'40px',
                        borderRadius:'35px',
                        background:'#14b7d7',color:'white'

                    }}>{type== 'Main'?comment.sender_name.charAt(0):comment.name_sender.charAt(0)
                        }</p>
                    <p className="m-0 me-3">{type== 'Main'?comment.sender_name:comment.name_sender} الى </p>
                    <p className="m-0 me-3">{type== 'Main'?comment.receiver_name :comment.name_receiver}</p>

                </div>
                <p className="m-0 d-flex   w-25"
                    style={{fontSize:'12px'}}>
                    {TransformTime(comment.created_at)}
                </p>                                                
            </div> 
            { (isOpen ) &&
            <div>
                <p className="p-3 pb-0">{comment.title} </p>
                
                {  comment.file_paths.length>0 &&
                    <div className=" d-flex gap-3   py-3 px-3  flex-wrap   ">
                        <p className="m-0 mb-1 w-100 ">Files:</p>
                        {  comment.file_paths && comment.file_paths.map((item,i)=>                    
                        
                        <div key={i} className=" "style={{width:'100px'}}>                     
                        {  typeFile.map((typfile,k)=>
                        <div key={k}>
                        {typfile.name.includes(item.split('.').pop())&&(
                            <div>
                             <img  src={typfile.type =='img'? ` ${typfile.pathimg}/${item}`:` ${typfile.pathimg}`} 
                            width='40px' height='40px' alt="img"></img>                           
                        
                            <p className="m-0">{StringSlice((File_Name(item,i)),10)}</p>   
                            <a className="fs-6"  href={typfile.type =='img'?`${typfile.pathDownload}/${File_Path(item,i)}`
                            :`${typfile.pathDownload}/${File_Path(item,i)}`} >Download</a>

                            </div>
                        )}
                        </div>)}         
                    </div>

                        ) }
                    </div>}</div>
            }                                           
        </div>
    );
  };

 //   ---------------- نستخدم هذه الداله  لتنفيذ click الذي في المستوى الاعلى فقط باستخدام zindex
 const [isClicked, setIsClicked] = useState(false);
const handleClick = () => {
  setIsClicked(!isClicked);
}; 
  
 //------------------------------------------------------------------------------------------------------------
    return (
        <div className="w-100 bg-page px-3 py-3" onClick={()=>{setOpenForm(false);setIsModalOpen(false)}}    >
            <h6>مؤشر الأداء</h6>
            <div className="w-100 d-flex align-items-center justify-content-start gap-2 mb-3 flex-wrap"
            //    style={{position:'relative', zIndex:'3'}} 
               onClick={()=>setOpenForm(false)}>
                <Form.Group className=" col-lg-3  "   >   
                    <Form.Select                                                     
                    //   setForm={(e)=> setForm({...form,document_type:e })}                                  
                        //  styles={customStyles}  
                        style={{color:'#007bff'}}           
                    >  
                    <option   value={user}    >{user}</option>      
                    </Form.Select >        
                </Form.Group>
                <Form.Group className=" col-lg-2  "   >   
                    <Form.Select                                                      
                    //   setForm={(e)=> setForm({...form,document_type:e })}                                  
                        //  styles={customStyles} 
                        style={{color:'#17a2b8'}}            
                    >  
                    <option   value= '' > كل المهام</option>      
                    </Form.Select >        
                </Form.Group>
                <Form.Group className=" col-lg-2"  style={{ textAlign: 'right' }}  >   
                    <Form.Select                                                      
                    //   setForm={(e)=> setForm({...form,document_type:e })}                                  
                        //  styles={customStyles}  
                        style={{color:'#14b7d7'}}           
                    >  
                    <option   value= ''  >كل الخطط</option>      
                    </Form.Select >        
                </Form.Group>
                <div className="col-lg-1  border  rounded"style={{borderRadius:'10px' }} >
                    <button 
                    // onClick={openModal}
                     onClick={(e)=>{  e.stopPropagation();openModal()}}
                     className="col-lg-6  border-0  text-white p-1"
                    style={{height:'40px',background:'#e53410'}}>+</button>
                    <button  className="col-lg-6 bg-light border-0   p-1"style={{height:'40px'}}>
                    <FontAwesomeIcon icon={faPrint} />
                    </button>
                    {isModalOpen && <Modal onClose={closeModal} />}
                </div>
                <div className="d-flex align-items-center justify-content-start gap-2  ">
                    <input type="search"style={{width:'200px',
                   
                    borderLeft:'8px solid #dc3545',
                    borderRight:'8px solid #dc3545'}}
                    className="p-2 rounded"></input>                     
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                <button className=" pt-2 pb-2 rounded"style={{width:'40px'}}>
                  <FontAwesomeIcon icon={faArrowsRotate} />                     
                </button>
                </div>
                <div className="d-flex align-items-center justify-content-start fs-5">
                    1-
                    <Form.Group controlId="exampleForm.SelectCustom" >        
                        <Form.Select value={selectedOption} onChange={handleSelectChange}>
                        <option value="10"> 10</option>
                        <option value="20">20</option>
                        <option value="50">50 </option>
                        <option value="100">100 </option>
                        <option value="200">200 </option>
                        <option value="300">300 </option>                    
                        </Form.Select>
                   </Form.Group>                   
                   <p className="m-0 ms-1 me-1">من</p> 
                   <div className=" d-flex gap-2">
                    <FontAwesomeIcon icon={faChevronRight} className="p-3 bg-light fs-6" />
                    <FontAwesomeIcon icon={faChevronLeft}  className="p-3 bg-light fs-6"/>          

                   </div>
                    

                </div>
               
            </div>

            <div className="tab-header   ">
                <ul className="tab-list d-flex  fs-5  flex-wrap   fw-bold  "
                style={{outline:'none ',cursor:'pointer',listStyleType:'none'}}>
                <li 
                     className={activeTab === 'البريد الوارد' ? 'active' : ''  }    

                    onClick={() =>{ handleTabClick('البريد الوارد');setIncomingTasks(true);setIncomTask([])}}
                    style={{  width:'50%',textAlign:'center',                        
                        borderBottom:activeTab === 'البريد الوارد'?'3px solid #14b7d7':'' ,                               
                    }}
                    >
                      <p className="m-0 border col-lg-12 col-md-12 col-12 d-flex align-items-center justify-content-center "
                      style={{  textAlign:'center',
                        borderRadius:'30px',
                        fontFamily:'Cairo',                        
                        color:activeTab === 'البريد الوارد'?'white':'gray' ,
                    background:activeTab == 'البريد الوارد'?'#14b7d7':'' ,padding:'10px 10px ',
                                
                    }}>
                         <img width='50px' src={require('./../../../Assets/img/arrows_w.png')} className="ps-3"></img>
                        البريد الوارد ( )
                     </p>
                </li>
                <li
                    className={activeTab === 'البريد الصادر' ? 'active' : ''} 
                    onClick={() =>{ handleTabClick('البريد الصادر');setIncomingTasks(false);setIncomTask([])}}
                    disabled={incomingTasks}
                    style={{ width:'50%',textAlign:'center',
                        borderBottom:activeTab === 'البريد الصادر'?'3px solid #14b7d7':'' ,                                  
                    }} >
                     <p className="m-0 border col-lg-12 col-md-12 col-12 d-flex align-items-center justify-content-center "
                      style={{  textAlign:'center',
                        borderRadius:'30px',
                        fontFamily:'Cairo',                        
                        color:activeTab === 'البريد الصادر'?'white':'gray' ,
                    background:activeTab == 'البريد الصادر'?'#14b7d7':'' ,padding:'10px 10px ',                                
                    }}>
                        <img width='50px' src={require('./../../../Assets/img/arrows_s.png')} className="ps-3"></img>
                     البريد الصادر    ( ) 
                     </p>
                 
                </li>      
                </ul>        
            </div>

            <div className="mt-3  "> 
                {datashow2}                                    
            </div>
           {openForm && 
                    <div className="w-50   h-100 border postion-relative bg-white p-2 "
                    style={{position:"fixed",
                        left:'0',
                        top:'70px',
                        zIndex:'3',
                        overflowX:'hidden',
                        height:'100vh',
                        overflowY:'scroll',                        
                    }}
                    onClick={(e)=>{  e.stopPropagation(); // منع الحدث من الوصول للأب
                         }}
                   >                  
                        <div className="w-100  " >
                            {incomeTask.map((item,ind)=>(
                            <div key={ind} >                               
                               { activeLink ==ind && (
                            //  <div className="w-100 border  "style={{height:'100vh',overflowX:'scroll'}}>
                             <div className="w-100    ">
                               {/* {const test=numberActiveTask.map((i)=>)} */}
                                <div className="  d-flex   align-items-start   justify-content-between " >
                               
                                    <div className="  d-flex  align-items-start ">
                                        <button className="mt-1 rounded me-2" onClick={()=>setOpenForm(false)}>رجوع</button>
                                    <div className=" d-flex  align-items-center justify-content-center flex-column   ">
                                                                        
                                            <ul  className="d-flex   align-items-center  text-center me-3 p-0  "
                                            // style={{listStyleType:'none',position:"relative",border:'2px solid black' ,borderRadius:'7px'}}   >
                                            style={{listStyleType:'none', }}     >
                                                <li className="style_li hover-box m-0 p-0  "
                                                  onMouseEnter={()=> setHoveredItem('اعادة توجية')   }
                                                  onMouseLeave={()=>setHoveredItem(null) }
                                                  onClick={()=>setOpenSubTask((perv)=>!perv)}
                                                  style={{position:"relative", borderStartStartRadius:'8px',
                                                    borderEndStartRadius:'8px',}}>                                                                                
                                                    <FontAwesomeIcon icon={faReplyAll} />
                                                    {hoveredItem =='اعادة توجية'&& 
                                                     <p className="styleOverLi" style={{width:'70px'}}>{hoveredItem}</p> }
                                                    </li>
                                                <li className="style_li hover-box"                                                
                                                onMouseEnter={()=> setHoveredItem('فتح او اغلاق الكل')   }
                                                onMouseLeave={()=>setHoveredItem(null)    }
                                                style={{position:"relative"}}
                                                >
                                                <FontAwesomeIcon icon={faReplyAll} />
                                                {hoveredItem=='فتح او اغلاق الكل' &&
                                                <p className="styleOverLi" style={{width:'115px'}}>{hoveredItem}</p> }
                                                </li>
                                                
                                                <li className="style_li hover-box" 
                                                  onMouseEnter={()=> setHoveredItem('طباعة المهمة مع النماذج')   }
                                                  onMouseLeave={()=>setHoveredItem(null)    }
                                                  style={{position:"relative"}}>

                                                    <FontAwesomeIcon icon={faPrint} />
                                                    {hoveredItem =='طباعة المهمة مع النماذج'&& 
                                                    <p className="styleOverLi" style={{width:'145px'}}>{hoveredItem}</p>    }
                                                    </li>
                                                <li className="style_li hover-box" 
                                               onMouseEnter={()=> setHoveredItem('طباعة المهمة مع الردود') }
                                                onMouseLeave={()=>setHoveredItem(null)    }
                                                style={{position:"relative"}}
                                                >
                                                <FontAwesomeIcon icon={faPrint} />
                                                   {hoveredItem =='طباعة المهمة مع الردود'&& 
                                                   <p className="styleOverLi" style={{width:'150px'}}>{hoveredItem}</p>    }
                                                </li>
                                                <li className="style_li hover-box"                                                 
                                                  onMouseEnter={()=> setHoveredItem('اقفال/فتح المهمة')   }
                                                  onMouseLeave={()=>setHoveredItem(null)    }
                                                  style={{position:"relative"}}>

                                                <FontAwesomeIcon icon={faCalendarCheck} />                                              
                                             {hoveredItem =='اقفال/فتح المهمة' &&
                                               <p className="styleOverLi" style={{width:'110px'}}>{hoveredItem}</p>
                                                } 
                                                </li>
                                                <li className="style_li hover-box   "
                                                 onMouseEnter={()=> setHoveredItem('تمديد الوقت')   }
                                                 onMouseLeave={()=>setHoveredItem(null)    }
                                                 style={{position:"relative" ,  
                                                    borderLeft:'1px solid gray',                                                 
                                                    borderEndEndRadius:'8px',
                                                    borderStartEndRadius:'8px',                                                    
                                                 }} >

                                                <FontAwesomeIcon icon={faClock} />
                                                {hoveredItem == 'تمديد الوقت' &&
                                                <p className="styleOverLi" style={{width:'85px'}}>{hoveredItem}</p>} 
                                                </li>
                                            </ul> 
                                        
                                        <p className=" d-flex gap-2 fs-5 ">
                                        <p className="">  {item.description}   </p>
                                        <p className="">  {item.id}   </p>
                                        </p>

                                    </div>                        
                                    
                                    </div>
                                    <div className=" bg-light d-flex align-items-center  justify-content-start ms-5">
                                            <ul className="d-flex rounded fs-6 m-0   p-0">
                                        <li className="style_li hover-box"
                                        onMouseEnter={()=> setHoveredItem('<')   }
                                        onMouseLeave={()=>setHoveredItem(null) } 
                                        style={{borderStartStartRadius:'8px',
                                            borderEndStartRadius:'8px',
                                            position:"relative",
                                            pointerEvents: activeLink+1==incomeTask.length ? "none" : "auto",
                                            opacity: activeLink+1==incomeTask.length  ? 0.5 : 1, }} 
                                           onClick={()=> setActiveLink(activeLink+1)}
                                        //    onClick={()=> console.log(activeLink+1)}
                                        >{`<`}
                                        {hoveredItem =='<'&&  
                                        <p className="styleOverLi" style={{width:'50px'}}>التالي</p> }
                                        </li>
                                        
                                        <li className="style_li hover-box" 
                                         onMouseEnter={()=> setHoveredItem('>')   }
                                         onMouseLeave={()=>setHoveredItem(null) }                                          
                                         style={{position:"relative",
                                            borderLeft:'1px solid gray',                                                 
                                            borderEndEndRadius:'8px',
                                            borderStartEndRadius:'8px',  
                                            pointerEvents: activeLink==0 ? "none" : "auto",
                                            opacity: activeLink==0 ? 0.5 : 1,                                                  
                                         }}
                                         onClick={()=> setActiveLink(activeLink-1)}
                                         >{`>`}
                                          {hoveredItem =='>'&&  
                                        <p className="styleOverLi" style={{width:'50px'}}>السابق</p> }
                                        </li>
                                            </ul>                          
                                            <DropdownButton  className=" custom-dropdown-button border rounded m-0 p-0 me-1 " 
                                                    // id='dropdown-basic-button '
                                                    variant="#F778A1" 
                                                    menuAlign="right"                                     
                                                    title={'المزيد'+' ' }>
                                        <Dropdown.Item  >الغاء مقروء</Dropdown.Item>
                                        <Dropdown.Item  >تمييز كمهمة</Dropdown.Item>
                                        <Dropdown.Item   onClick={()=>setOpenSubTask((perv)=>!perv)} >  اعادة توجية</Dropdown.Item>
                                        
                                        <Dropdown.Item  > اقفال المممة </Dropdown.Item>
                                        <Dropdown.Item  > Save PDF </Dropdown.Item>                                  
                                        
                                            </DropdownButton>                                
                                    
                                    </div>

                                </div>
                                {openSubTask ==true && 
                                            <div className="w-100  " >
                                                {/* {SubTask(30)} */}
                                                {<SubTask 
                                                  id={item.id}
                                                  taskUpdate={taskUpdate}  
                                                  setUpdateTask={handleValuetaskUpdate} 
                                                />}
                                            </div>
                                            
                                            }   
                                  
                                  <Comment key={ind} comment={item} type='Main' />   
                                     {   item.chiledtask.map((it,n)=>                                           
                                           <Comment key={n}  comment={it} />                                       
                                    )}  
                                </div>
                                 
                               )}
                            </div>
                            
                           ) )}
                           </div>

                    </div>
           } 

    


        </div>
    )
}
