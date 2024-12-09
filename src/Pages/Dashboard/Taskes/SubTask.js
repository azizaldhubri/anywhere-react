import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useParams ,useNavigate} from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { USER, USERS } from "../../../Api/Api";
import TransformTime from "../../../Helpers/TransformTime";
import TranFormDate from "../../../Helpers/TranFormDate";
import File_Name from "../../../Helpers/File_Name";
import File_Path from "../../../Helpers/File_path";
import StringSlice from "../../../Helpers/StringSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { typeFile } from "./Files";

export default function SubTask(props){
  const navigate=useNavigate();  
  // console.log(n)
    // const {id}=useParams();
    const id=props.id;
    let test=props.taskUpdate ; 
     
    const[refresh,setrefresh]=useState(0)
   
    const[title,setTitle]=useState('');
    const[id_senderTask,setId_senderTask]=useState('');
    const[id_receiver,setId_receiver]=useState('');
    const[tasks,setTasks]=useState([])
   
    const [isopen, setIsopen] = useState(false)
 
    const[users,setUsers]=useState([]);
    const[filesdata,setFilesdata]=useState([]); 

     const[start_task,setStart_task]=useState(TranFormDate(new Date()));
    const[endtask,setEndtask]=useState(TranFormDate(new Date()));

    
    const startDate = new Date(start_task);
  const endDate = new Date(endtask);

    const timeDifference = endDate - startDate;
    // تحويل الفرق من مللي ثانية إلى أيام
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      const focus=useRef('');   
    const openImage=useRef(null);   
    const task_status=useRef('');   
    const senderTask=useRef('');   
    const username=useRef('');   
    const userId=useRef('');   
    

    
    //-----------------------------------

     useEffect(()=>{
        Axios.get(`${USERS}`)
        .then((e)=>setUsers(e.data.data))
     },[])

     useEffect(()=>{
        Axios.get(`${USER}`)
        .then((e)=>{
          // setUserName(e.data.name);
          // username.current=e.data.name;
          username.current=e.data.email;
          userId.current=e.data.id;
          // setUserId(e.data.id);
          
          
        
        })
     },[])
 
     const selectUser=users.map((item,index)=>(            
      <option key={index} value={item.id}  >{item.name}</option>        
     ))
    
     let receiver_name='' ;
    {id_receiver &&(
      users.map((item,index)=>(                       
         item.id ==id_receiver &&
         (receiver_name=item.name)        
    ))
    ) }

     function getFirstLetter(word) {
      return word.charAt(0).toUpperCase();
    };
 
  
    //-----------------
    useEffect(()=>{
      async function gettask(){
      try{    Axios.get(`tasks/${id}`)
          .then(e=>{
            setTasks(e.data);
            // console.log(e.data)
            setStart_task(e.data.start_task)
            setEndtask(e.data.end_task);
            task_status.current=e.data.task_status ;
            setId_senderTask(e.data.sender_id)            
            senderTask.current=e.data.sender_name        
        
            })                             
      }
      catch(err){console.log(err)}
  }
  gettask();

  },[refresh])  

       //-----------------------------------------------------------------------------------
      async function handlesubmit(e){
        e.preventDefault();       
       
        const formData = new FormData();
        formData.append('task_id', id);
        formData.append('id_sender', userId.current);
        formData.append('name_sender', username.current);
        formData.append('id_receiver', id_receiver ?id_receiver:id_senderTask);
        formData.append('name_receiver', receiver_name?receiver_name:senderTask.current);      
        formData.append('title', title);
     
    
        // إضافة الملفات إلى formData
        for (let i = 0; i < filesdata.length; i++) {
          formData.append('files[]', filesdata[i]);
        }
     
        // console.log(...formData)
        try{        
            await Axios.post('chiled_task/add',formData )            
            setrefresh(prev=>prev+1);  
            setTitle('');
            setId_receiver('')   ;   
            setIsopen(false);
            setFilesdata('') ;
            props.setUpdateTask(test+1) ; 
            if(task_status.current==='To Do') 
             {
              //  setTask_status('In_progress')    ;
               task_status.current='In_progress'
               Axios.put(`tasks/status_update/${id}`,{ status: 'In_progress' }) ;
               
              }
          }
          catch (error) {
            console.error('Error sending data:', error);
          }
     
    } 


        //  function handel change status task
const handleOptionChange =async (e) => {  
    // setTask_status(e.target.value);
    task_status.current=e.target.value
   const status=e.target.value; 
  try{        
     await Axios.put(`tasks/status_update/${id}`,{ status: status }) ;
        setrefresh(perv=>perv+1) 
  }
  catch (error) {
    console.error('Error sending data:', error);
  }
};
    
    function handlechangefile(e){
      // console.log( e.target.files)
      setFilesdata((prev)=>[...prev,...e.target.files]);
    }
    
    //-------------------------------------------------------------------------------------


             
 function HandleCansleFiles(id){
     setFilesdata((prev)=>prev.filter(img=>img !==id)) ;            
 }

    //handle open image
    function handleOpenImage(){
      openImage.current.click()      
    }
    
    async function handeleDelete(){
      try{  
         
        await Axios.delete(`tasks/${id}`) ;
        navigate('/dashboard/taskes');

          //  setrefresh(perv=>perv+1) 
     }
     catch (error) {
       console.error('Error sending data:', error);
     }

    }
  
    return(
      <>
      
      {/* {Loading  && <LoadingSubmit />} */}
  <div className="w-100  py-4 px-4 d-flex justify-content-center bg-white ">
    <div className="w-100  "> 
              
        <div className="  px-3 py-3   ">  
         
      <Form  onSubmit={handlesubmit}
      className="  gap-2  mt-0 pt-2" encType="multipart/form-data" > 
            <Form.Group 
              className=" d-flex mt-2 gap-2 fs-5 align-items-center justify-content-between">
                <Form.Label>خاص الى</Form.Label>
                          <Form.Select style={{width:'80%'}}
                          value={id_receiver}                          
                          // name={id_receiver}                          
                          onChange={(e)=>{
                            setId_receiver(e.target.value);                           
                          }}
                          >
                              <option  disabled value={''}>Select User</option>
                              {selectUser}
                          </Form.Select>
                        {/* <button className="btn btn-primary  " disabled ={receiver_name && description ? false:true }>Add</button> */}
            </Form.Group>         
            <Form.Group 
              className=" d-flex mt-2 gap-2 fs-5 mt-3 align-items-center justify-content-between">
                <Form.Label>الوصف</Form.Label>
           <Form.Control  className="w-75" as="textarea" aria-label="With textarea"
                value={title}
                onChange={e=>setTitle(e.target.value)}
                
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
       
          <div ref={focus} className=" mt-5"
          style={{width:'100px'}}
            onClick={handleOpenImage}>
            <button 
              className=" cursor-pointer border-0 bg-white   fs-5 ">+ المرفقات</button> 
        </div>                 
      </div>      
        <div className=" mt-3 bg-white d-flex gap-2 ">
                    {filesdata && filesdata.map((item,i)=>(
                          <div key={i} className="border rounded  position-relative ">            
                  

             <div key={i} className=" "style={{width:'100px'}}>                     
                {  typeFile.map((typfile,ki)=>
                  <div key={ki}>
                  {typfile.src_type==item.type&&(
                    <div className="d-flex align-items-center justify-content-start flex-column">
                    <img  src={typfile.type =='img'? `${URL.createObjectURL(item)}`:` ${typfile.pathimg}`} width='30px'  alt="" ></img>
                    <p className="m-0"style={{fontSize:'12px'}}>{item.name}</p>
                </div>
                  )}
                </div>)}         
              </div>
                          <div style={{cursor:"pointer"}}
                          className="position-absolute  top-0 end-0 bg-danger rounded text-white">
                              <p className="py-1 px-2 m-0" onClick={()=>HandleCansleFiles(item)}>
                                  x
                              </p>
                          </div>                         
                        </div>                      
                    ))
                    }
                </div> 
                <div className="w-100 d-flex justify-content-center gap-3 mt-2 ">       
                  <button  className="border-0 bg-white fs-4  " 
                  disabled ={title ? false:true }
                  style={{color:title ? '#E41B17':'	#FBBBB9' }}
                  onClick={handlesubmit}>Save</button>      
                  <button className="border-0 bg-white fs-4 "
                   disabled ={title ? false:true }
                   style={{color:title ? '#E41B17':'	#FBBBB9' }}
                  onClick={()=>{setIsopen(false);setTitle('')}}>Cancle</button>   
                </div>                        
    </div>      
  </div>
      </>   )
}


