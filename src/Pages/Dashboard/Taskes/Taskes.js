     import { useEffect,  useState } from "react"
    import { Axios } from "../../../Api/axios"
    import { USER } from "../../../Api/Api"
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
    import {  faStar } from "@fortawesome/free-solid-svg-icons"
    import { Link } from "react-router-dom"
    import TransformTime from "../../../Helpers/TransformTime"
    import LoadingSubmit from "../../../Component/Loading/Loading"    
    import { Form } from 'react-bootstrap';     
    export default function Taskes(){      

  const [selectedOption, setSelectedOption] = useState('');    
  
    const[userId,setUserId]=useState('');     
    const[tasks,setTasks]=useState([]);           
    const[incomingTasks,setIncomingTasks]=useState(false)       
    const[loading,setLoading]=useState(false);   
    let iswrritten=true ;
    let countCommit=0 ;

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);            
      }
       
            useEffect(()=>{
                Axios.get(`${USER}`)
                .then(res=>{
                    setUserId(res.data.id);  })
            },[])            
            
            useEffect(()=>{
                async function gettask(){
                try{  await  Axios.get('tasks')
                    .then(e=>{setTasks(e.data.post); 
                        console.log(e.data.post)                               
                   setLoading(false);
                      })                             
                }
                catch(err){console.log(err)}
            }
            gettask();    
            },[])
    
            tasks.sort((a, b) => {return  new Date(b.created_at)-new Date(a.created_at)  });    
          
          const tasksComplet = tasks.filter(item => item.task_status===selectedOption);

          const taskshow2=selectedOption=='' ? tasks:tasksComplet;
        
        const taskshow=taskshow2.map((task,index)=>(
            <div className="   w-100   " key={index}
                style={{color:task.task_status=='Completed' ?'black':'red',boxShadow:'0 5px 5px rgba(0,0,0,0.3)'}}>           
                <>
                    {countCommit===0}
                    {iswrritten=true}
                    {(userId==(incomingTasks?task.id_receiver:task.sender_id)) && 
                    <div key={index} >
                        { datashow(task,index)}
                    </div>       
                    }
                    {incomingTasks &&   
                    task.chiledtask.map((item ,nm)=>(        
                    (item.task_id==task.id && item.id_receiver==userId && task.sender_id !=userId && iswrritten)&&
                    <div key={nm}>
                        { datashow(task,nm)}
                    </div>     ))        
                    }                 
                </>
            </div>   )
        ) 
        
      function datashow(task,nm) {
        return (         
            <Link to={`${task.id}`} key={nm}             
            className="p-2 d-flex gap-2  w-100 align-items-center mb-2
             justify-content-between border rounded  flex-wrap "
             style={{color:task.task_status=='Completed' ?'black':'red',boxShadow:'0 2px 3px rgba(0,0,0,0.3)'}}>       
                 <div className=" d-flex align-items-center justify-content-start  gap-2 flex-wrap">
                   <div className=" d-flex align-items-center justify-content-between flex-wrap gap-3  ">
                      <h5 className="m-0">{task.id}</h5>
                      <h5 className="m-0">{task.sender_name}</h5>
                      <h6 className="m-0  "style={{fontSize:'12px',color:'black'}}>
                         {task.task_status}</h6>                     
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
                {iswrritten=false}
                <h6 className="m-0  ">{TransformTime(task.created_at)}</h6>
            </Link>        
                
        )
    }     
            
  return(
     <>               
         {loading && <LoadingSubmit/>} 
        <div className=" w-100 px-3 py-3 ">                                  
            <div  className="d-flex   align-items-center justify-content-start gap-3 mt-1 w-100 flex-wrap "> 
         <Form  className="m-0">
         <Form.Group controlId="exampleForm.SelectCustom">        
        <Form.Select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Show task By status</option>
          <option value="To Do">To Do</option>
          <option value="In_progress">In_progress</option>
          <option value="Completed">Completed</option>
          <option value="Deferred">Deferred</option>
          <option value="Cancelled">Cancelled</option>
          <option value="In_Review">In_Review</option>
        </Form.Select>
               </Form.Group>     
            </Form> 
           <div>
                <button className="btn" disabled={!incomingTasks} onClick={()=>setIncomingTasks(perv=>!perv)}>task sending</button>
            <button className="btn"disabled={incomingTasks} onClick={()=>setIncomingTasks(perv=>!perv)}>task incoming</button>

            <Link className="btn " to='/dashboard/addTask'>New task</Link>             
            </div> 
             </div>                    
            <div className="mt-3 "> 
                {taskshow}                      
            </div>              
        </div>
     </> 
     ) 
        }