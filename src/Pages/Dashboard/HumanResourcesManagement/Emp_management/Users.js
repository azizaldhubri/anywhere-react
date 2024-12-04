import {  useEffect, useState } from "react"
import { USER, USERS} from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../../Component/Dashboard/Table";

import PdfExportComponent from "../../../../Component/Dashboard/ExportPdf";
import ExportExcel from "../../../../Component/Dashboard/ExportExcel";
 
// import PdfExportComponent from "./TempPdf";

export default function Users(){
 
     
    const[users,setUsers]=useState([]);
    const[currentUser,setCurrentUser]=useState('');
    const[page,setPage]=useState(1)
    const[limit,setLimit]=useState(3)
    const[loading,setLoading]=useState(false)
    const[total,setTotal]=useState(0);
    const[role,setRole]=useState('');
   

    // const[noUsers,setNoUsers]=useState(false);
 

     //  هذه نستخدمها لعدم عرض المستخدم الحالي
    useEffect(()=>{        
            Axios.get(`/${USER}`)            
            .then((res)=>{setCurrentUser(res.data);
                setRole(res.data.role)
            });         
        },[]);


        // get all users
    useEffect(()=>{
        setLoading(true)
            Axios.get(`/${USERS}? limit=${limit}&page=${page}`)            
            .then((data)=>{setUsers(data.data.data);setTotal(data.data.total) })
            // .then(()=>setNoUsers(true))
            
            .catch((err)=>console.log(err)).finally(()=>setLoading(false));
        },[limit,page]);
       


       // filter current user
        // const userFilter=users.filter((user)=> user.id !== currentUser.id);  
         const header=[
          
            {
                key:'name',
                name:'اسم المستخدم'
            },
            {
                key:'email',
                name:'الايميل'
            },
        
            {
                key:'role',
                name:'الصلاحية'
            }
         ]

        //  const data=[
        //     {}
        //  ]
        //mapping on users
        // const usershow= userFilter.map((user,key)=>(
        // const usershow= users.map((user,key)=>(

        //     <tr key={key}>
        //         <td>{key+1}</td>
        //         <td>
        //             {user.name ===currentUser.name ? <p style={{color:'red'}}> {user.name } (You)</p>:user.name}
        //         </td>
        //         <td>{user.email}</td>
        //         <td>
        //             {user.role === '1995' ? 'admin'
        //             :user.role === '2001' ? 'User'
        //             :'Writer'}
        //         </td>
        //         <td >
        //             <div className="d-flex align-items-center gap-3">
        //                <Link to={`${user.id}`}>
        //                 <FontAwesomeIcon  fontSize={'19px'} icon={faPenToSquare} />
        //                 </Link> 
        //                 {currentUser.name !==user.name &&(
        //                 <FontAwesomeIcon 
        //                 onClick={()=>handleDelet(user.id)}
        //                  fontSize={'19px'} 
        //                 color="red"
        //                 cursor={'pointer'}
        //                 icon={faTrash} />
        //                 )}
        //             </div>
                
        //         </td>

        //     </tr>
        //  ) );
         
         //handleDelet
    //    async function handleDelet(id){
    //             if(currentUser.id !==id) {
    //             try{
    //                 const res=await Axios.delete(`${USER}/${id}`);
    //                 setDeletUser((prev)=>prev+1)
    //             }
    //             catch(err){
    //                 console.log(err)
    //             }
    //         }  

    //     }


    async function handleDelet(id){
            try{
             await Axios.delete(`${USER}/${id}`);
             setUsers((prev)=>prev.filter((item)=>item.id!==id)) ;
                                  
             }
            catch(err){
                        console.log(err)
                   }         
           }
 

//-----------------------------------------------------

 


    return (
      <div className=" w-100 px-4 py-3 rounded shadow-sm bg-page">
        <div className="d-flex align-items-center justify-content-between">
             <h1>Users page</h1>
             <Link className="btn btn-primary" to='/dashboard/user/add'>Add User</Link>
        </div>
        
        <TableShow
        limit={limit}
        setLimit={setLimit}
        page={page}
         header={header}
         data={users}
        currentUser={currentUser}
          delete ={handleDelet}
          setPage={setPage}
          loading={loading}
          total={total}
          search='name'
          Linksearch={USER}
        //   createTask={createTask}
          role={role}
          />
            
            <div className='d-flex gap-3 w-25 align-items-center mt-3 '>
                <ExportExcel
                  data={users}
                  header={header} />
                             
                  <PdfExportComponent
                  data={users}
                  header={header} 
                  />
            </div>
       

      </div>
    
     )
}