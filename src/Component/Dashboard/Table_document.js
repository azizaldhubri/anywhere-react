import {  faEye, faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {Form  } from "react-bootstrap"
import {  Link } from "react-router-dom"
import {  useEffect, useState } from "react";
import PaginatedItems from "../../Pages/Dashboard/Pagination/Pagination";
import TranFormDate from "../../Helpers/TranFormDate";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, PaginationItem, Select } from '@mui/material';
import { Axios } from "../../Api/axios";
 

// import { USER } from "../../Api/Api";

export default function Table_documents(props){
    //defulte value
 
  
    // const p_user=window.location.pathname.slice(-5);

    const currentUser=props.currentUser || { name:''  } ;
    const Isadmin=props.role || { name:''  } ;
     const header=props.header.map((item,index)=>     
            <TableCell 
            key={index}
            sx={{ 
                maxWidth:100,
                fontSize: '15px',  // تغيير حجم الخط
                fontWeight: 'bold', // جعل الخط عريضًا
                borderRight: '2px solid black', // إضافة border للخلايا
                backgroundColor: '#d3d9db', // لون خلفية لتوضيح الحدود
                borderColor:'#c2c5c5',
                borderBottom:'3px solid gray',
                textAlign: 'center'
              }}
            >{item.name}</TableCell>       
    )
//-----------------------------------------------------------------------------------------------------
const[search,setSearch]=useState('')
const[date,setDate]=useState('')
const[filteredData,setFilteredData]=useState([])
const[loadingSearch,setLoadingSearch]=useState(false)
const filterdDatabyDate=props.data.filter(
  (item)=>TranFormDate(item.created_at)===date)

const filterdSearchbyDate=filteredData.filter(
  (item)=>TranFormDate(item.created_at)===date)

  
 
  // const showwitchData=
  // date.length !==0 ?            
  // search.length>0 ? 
  // filterdSearchbyDate
  // : filterdDatabyDate
  // :search.length>0 ?filteredData:props.data
    
useEffect(()=>{
  const debounce= setTimeout(()=>{
      search.length>0 ? getSearchData():setLoadingSearch(false);
  },500);
 
  return ()=>clearTimeout(debounce);
},[search])

async function getSearchData(){
  
  try{
      const res=await Axios.post(`/${props.Linksearch}/search?title=${search}`)            
      // console.log(res.data)
      setFilteredData(res.data)
  }
  catch(err){console.log(err)}
  finally{setLoadingSearch(false)}
}
//------------------------------------------------------------------------------------------------------


    const datashow=props.data && props.data.map((item,index)=>(        
        <TableRow          
        key={index} >         
           <TableCell>{item.id}</TableCell>
           {props.header.map((item2,index2)=>(
               <TableCell  key={index2} >
               
                   {item2.key==='file_paths'?(
                    <div className="d-flex flex-wrap gap-2 w-100  m-0">
                        <Link to={`/dashboard/UpdateDocument/${item.id}`}className="fs-5    rounded d-flex align-items-center" 
                      >          
                       
                           {/* <p className=" m-0">تعديل</p> */}
                      <FontAwesomeIcon  className="m-0"  icon={faPenToSquare} />
                     </Link> 

                        <Link to={`/dashboard/DocumentShow/${item.id}`} className="fs-5" >          
                       
                           {/* <p className=" m-0">مشاهدة</p> */}
                      <FontAwesomeIcon  className="m-0 text-black"  icon={faEye} />
                     </Link>  
                        <Link to='#' className="fs-5 "    >                          
                           {/* <p className=" m-0"  onClick={()=>props.delete(item.id)}>  حذف </p> */}
                           <FontAwesomeIcon 
                              onClick={()=>props.delete(item.id)}
                                  fontSize={'19px'} 
                              color="red"
                              cursor={'pointer'} 
                              icon={faTrash} />
                     </Link>                       
                         
                    </div>)
                    
                           :item2.key==="role"?
                           ( 
                           item[item2.key] === '1995' ?('admin')   
                           : item[item2.key]  === '2001' ? ('User')
                           :item[item2.key] ==='1996'?('Writer' )  
                           : item[item2.key] ==='1999'&&('Manager Product')
                           )
                           :item[item2.key]===currentUser.name ?(
                               <p style={{color:'red', margin:'0'}}>{item[item2.key]} (you)</p>
                           )
                           :(item2.key==="created_at" || item2.key==="updated_at")  ?(TranFormDate(item[item2.key]))
                           :(item[item2.key]
                           )}
                         
                       
                       
               </TableCell>
           ))}
        
       </TableRow>)
       )

       //------------------- 
       
       const options = [
          { value: '1', label: '1' },
          { value: '3', label: '3' },
          { value: '5', label: '5' },
          { value: '10', label: '10' },
          { value: '15', label: '15' },
        ];
       const handleChange = (selectedOption) => {
        console.log('Selected:', selectedOption);
      };
    
    return(
        // <div className="w-100  fs-4 border border-4 bg-danger" style={{ backgroundColor: '#d3d9db',overflow:'auto',maxWidth:1250}}>             
        <div className="w-100  fs-4 " style={{ backgroundColor: '#d3d9db',overflow:'auto' }}>             
         
       <TableContainer component={Paper}
        sx={{ 
            maxHeight: 200,  // تحديد الحد الأقصى للارتفاع
            // overflow: 'auto',
            // minWidth:1500  // تمكين التمرير عند الحاجة
            width:'100%'
          }}
       >
      <Table aria-label="simple table"
      sx={{
         width:'100%'
      }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#d3d9db',fontSize:'20px', 
             
                
          }}> 
            <TableCell    sx={{ 
                fontSize: '18px',  // تغيير حجم الخط
                fontWeight: 'bold', // جعل الخط عريضًا
                borderRight: '2px solid black', // إضافة border للخلايا
                backgroundColor: '#d3d9db', // لون خلفية لتوضيح الحدود
                borderColor:'#c2c5c5',
                borderBottom:'3px solid gray'
              }}>م</TableCell>
            {header}
             
          </TableRow>
        </TableHead>
        <TableBody>
          {/* <TableRow>
            <TableCell component="th" scope="row">
              1
            </TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>Otto</TableCell>
            <TableCell>@mdo</TableCell>
          </TableRow> */}
          {datashow}
         
        </TableBody>
      </Table>
    </TableContainer> 
    <div className="w-100  mb-3 flex_center border" >
    <PaginatedItems
     setPage={props.setPage} 
             itemsPerPage={props.limit} 
             data={props.data}
             total={props.total}/>



{/* <div className="d-flex align-items-center justify-content-end flex-wrap">
   
    <div className="col-1 ">
    
  
    <select className="col-1   pe-3   "
    // onChange={(e)=>props.setLimit(e.target.value)}  
    defaultValue="3"
      onClick={(e)=>{props.setLimit(e.target.value);props.setPage(1)}}
    // value=''
    >
       
       <option value='1'>1</option>
       <option  value='3'>3</option>
       <option value='5'>5</option>
       <option value='10'>10</option>
       <option value='15'>15</option>
       

   </select> 

 
      




    

</div> 
 





   </div>  */}

<div className="d-flex align-items-center justify-content-end flex-wrap">
  
    <div className="col-1 ">
       
   <Form.Select 
   className="col-1  ps-3   "
   style={{ width: '70px',paddingLeft:'30px' ,fontSize:'15px' }}
    onChange={(e)=>props.setLimit(e.target.value)} aria-label="Default select example">       
       <option value='3' >  3 </option>
       <option value='5'>5</option>
       <option value='10'>10</option>
       <option value='15'>15</option>
       

   </Form.Select>

</div>
 

        

   </div> 


    </div>


  

               
        </div>
    )
}