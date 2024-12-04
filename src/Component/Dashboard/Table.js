import {  faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {Form , Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import {  useEffect, useState } from "react";
import PaginatedItems from "../../Pages/Dashboard/Pagination/Pagination";
import { Axios } from "../../Api/axios";
import TranFormDate from "../../Helpers/TranFormDate";

// import { USER } from "../../Api/Api";

export default function TableShow(props){
    //defulte value
 
  
    // const p_user=window.location.pathname.slice(-5);

    const currentUser=props.currentUser || { name:''  } ;
    const Isadmin=props.role || { name:''  } ;
          
        //    console.log(Isadmin)
    const[search,setSearch]=useState('')
    const[date,setDate]=useState('')
    const[filteredData,setFilteredData]=useState([])
    const[loadingSearch,setLoadingSearch]=useState(false)
    
    
    // search by front end---------------                                                         
    //  const filteredData=props.data.filter((item)=>
        //      item[props.Linksearch].toLowerCase().includes(search.toLowerCase()))
    
    //   function handleSearch(e){
        //       setSearch(e.target.value)
        //   }
        
        //----------------
        
        const filterdDatabyDate=props.data.filter(
            (item)=>TranFormDate(item.created_at)===date)

        const filterdSearchbyDate=filteredData.filter(
            (item)=>TranFormDate(item.created_at)===date)

            
           
            const showwitchData=
            date.length !==0 ?            
            search.length>0 ? 
            filterdSearchbyDate
            : filterdDatabyDate
            :search.length>0 ?filteredData:props.data
              
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
        
        // Table header Show
        
        //    const start=(props.page-1)*props.limit ;
        //    const end=start + (+props.limit) ;
        //    const final=props.data.slice(start,end);
        
       

    //---------------------------------table------------------        
        // 

     const headerShow=props.header.map((item,index)=><th key={index}>{item.name}</th>);
            
    //   Table body Show
    //  const datashow=final.map((item,index)=>(
     const datashow=showwitchData.map((item,index)=>(        
     <tr key={index} >         
        <td>{item.id}</td>
        {props.header.map((item2,index2)=>(
            <td  key={index2} >
            
                {item2.key==='image'?(
                    <img width='50px' src={item[item2.key]} alt="" />
                    ):item2.key==="images"? (
                    <div className="d-flix align-items-center justify-content-between  gap-2 ">
                        {  item[item2.key].map((img,nm )=>(
                            <img key={nm} width='50px' src={img.image} alt=""/>
                            ) )}

                    </div>
                   
                    ) 
                        :item2.key==="role"?
                        ( item[item2.key]
                        // item[item2.key] === '1995' ?('admin')   
                        // : item[item2.key]  === '2001' ? ('User')
                        // :item[item2.key] ==='1996'?('Writer' )  
                        // :item[item2.key] ==='2002'?('تقنية معلومات' )  
                        // : item[item2.key] ==='1999'&&('مدير المنتج')
                        )
                        :item[item2.key]===currentUser.name ?(
                            <p style={{color:'red', margin:'0'}}>{item[item2.key]} (you)</p>
                        )
                        :(item2.key==="created_at" || item2.key==="updated_at")  ?(TranFormDate(item[item2.key]))
                        :(item[item2.key]
                        )}
                      
                    
                    
            </td>
        ))}
         {Isadmin==='admin' &&
        <td >    
            
            <div className="d-flex align-items-center  justify-content-center gap-3">
            <Link to={`${item.id}`}>                  
            <FontAwesomeIcon  fontSize={'19px'} icon={faPenToSquare} />
            </Link> 
            {currentUser.name !==item.name &&
            <>
            <FontAwesomeIcon 
            onClick={()=>props.delete(item.id)}
                fontSize={'19px'} 
            color="red"
            cursor={'pointer'}
            icon={faTrash} />
            {/* {User_adimn && */}
                   
            {/* } */}
                           
            </>
                }                              
        </div>
                
            
        </td>
        }
    </tr>)
    )
   
return(
 <>
 {/* {props.loading && <LoadingSubmit/>} */}
   <div className="col-3">
       <Form.Control
            className="my-2"
            type="search"
            aria-label="Disabled input example"
            placeholder="Search "
            value={search}   
            onChange={(e)=>{setSearch(e.target.value);
                setLoadingSearch(true)
            }}>    
        </Form.Control>
   </div>

   <div className="col-3">
   <Form.Control
   className="my-2"
   type="date"
   aria-label="Disabled input example"
      value={date}   
   onChange={(e)=>{setDate(e.target.value)
   
       }}
    >
    
   </Form.Control>
 </div>

      <Table  striped bordered hover  >
        
    <thead className="border primary ">
        <tr >
            <th>id</th>
            {headerShow}
            {Isadmin==='admin' &&
          <th className="text-center">Action</th> 
         }           
        </tr>
    </thead>
    <tbody  > 
        {props.loading?( 
        <tr className="text-center ">
            <td colSpan={12}>Loading...</td>
        </tr>):loadingSearch ?( 
        <tr className="text-center">
            <td colSpan={12}>Searching...</td>
        </tr>):(datashow )}
         
    </tbody>

   </Table >
   <div className="d-flex align-items-center justify-content-end flex-wrap">
   {(!search && !date)  && 
   ( <div className="col-1 ">
   <Form.Select className="col-1   pe-3   " onChange={(e)=>props.setLimit(e.target.value)} aria-label="Default select example">
       
       <option value='3'>3</option>
       <option value='5'>5</option>
       <option value='10'>10</option>
       <option value='15'>15</option>
       

   </Form.Select>

</div>)}  
 

        
        {(!search && !date) && (
             <PaginatedItems setPage={props.setPage} 
             itemsPerPage={props.limit} 
             data={props.data}
             total={props.total}/>
        )}

   </div> 
 </>

)
}