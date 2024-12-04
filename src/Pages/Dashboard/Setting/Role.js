import { useEffect, useState } from "react";
import NavHeader from "../../../Component/Dashboard/NavHeader";
import Table_documents from "../../../Component/Dashboard/Table_document";
import { Form } from "react-bootstrap";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, PaginationItem } from '@mui/material';
import { Height } from "@mui/icons-material";
import { Checkbox, FormControl, ListItemIcon, ListItemText, MenuItem, Select } from "@mui/material";
 
import { Axios } from "../../../Api/axios";
import { Outlet, Link } from 'react-router-dom';
export default function Role(){

  const [roles, setRoles] = useState([]);
  const [ selectedRoles, setselectedRoles] = useState(1);
  const [page, setPage] = useState('');
  const [role, setRole] = useState(''); 
  const [permissions1, setPermissions1] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState('');
  const [addnewRole, setAddnewRole] = useState(false);
  const [newRole, setNewRole] = useState(''); 

  useEffect(() => {
      // جلب قائمة الصفحات
    
      const fetchRoles = async () => {
          const response = await Axios.get('roles');
          setRoles(response.data);
        //   console.log('roles')
        }
        fetchRoles();
      },[newRole])

      
      const style_cell={
        fontSize: '18px',  // تغيير حجم الخط
        fontWeight: 'bold', // جعل الخط عريضًا
        borderRight: '2px solid black', // إضافة border للخلايا
        backgroundColor: '#d3d9db', // لون خلفية لتوضيح الحدود
        borderColor:'#c2c5c5',
        borderBottom:'3px solid gray',
        textAlign: 'center' ,
        height: '25px'               
    }
    const style_budy={
        fontSize: '18px',                   
        borderRight: '2px solid black',             
        borderColor:'#c2c5c5',
        borderBottom:'3px solid gray',
        textAlign: 'center' ,
        padding: '10px',
          // height: '25px'
    }

    //add role ------------------------
    
     //add new role
    async function handleAddRole(e){
        e.preventDefault();                
        const form = new FormData();
        form.append('name',newRole)               
     try{                                             
        await Axios.post(`addRole`,form) 
        setNewRole('') 
        setAddnewRole(false)               
     }
     catch(err){console.log(err)}
    }
      
    const links=[
      {name:'الصلاحيات',
       link:'#'
      },
      
    ]
 
    return(
      <div className="w-100 px-3 py-0 bg-page">
               <NavHeader
             nav={links}                         
            />
      

            <div className="w-100  d-flex align-items-center justify-content-start gap-4 fs-4   mb-5 ">          
                        <div className="   rounded border"style={{ background: '#79b98c',color:'black'}} >
                         {/* <Link to='/dashboard/Role/RoleUpdate'style={{  color:'black'}} > إضافة جديد +  </Link>/ */}
                         <button className ='back_btn rounded' onClick={()=>setAddnewRole(true)} style={{  color:'black'}} > إضافة جديد +  </button>
                        </div>                   

           </div>
           {
            addnewRole ==true &&
                  <div className=" d-flex align-items-center justify-content-start gap-2 ">
                      <label>اسم الصلاحية</label>
                  <input  type="text"
                              value={newRole}
                              onChange={(e)=>setNewRole(e.target.value)}
                          style={{padding:'5px',
                              borderLeft:'7px solid red',
                              borderRight:'7px solid red',
                          borderRadius:'10px' }}>
                  </input>
                  <button className="back_btn rounded" onClick={handleAddRole}>add Role</button>
                  </div>
           }
         
           <div  className="mb-3">
              <TableContainer component={Paper}
                        sx={{maxHeight: 800, 
                            width:'95%' // تحديد الحد الأقصى للارتفاع
                            // overflow: 'auto',
                            // minWidth:1500  // تمكين التمرير عند الحاجة
                        }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow  sx={{ backgroundColor: '#d3d9db',fontSize:'20px', }}>
                                < TableCell style={style_cell} >الاسم</TableCell>            
                                <TableCell  style={style_cell}> العمليات</TableCell>
                                <TableCell  style={style_cell}> الرقم</TableCell>
                                
                            </TableRow >
                        </TableHead>
                        <TableBody >
                            {roles.map(role => (
                                <TableRow  key={role.id}    >
                                    <TableCell style={style_budy} >{role.id}</TableCell >
                                    <TableCell style={style_budy} >{role.name}</TableCell >
                                    <TableCell  style={style_budy}  sx={{width:'30%'}} >
                                          
                                     <Link to={`/dashboard/Role/RoleUpdate/${role.id}`}>
                                        <button className="btn btn-primary  rounded m-0    "
                                        style={{width:'80px',background:'#a1b1be'}}>تعديل</button>
                                     </Link>
                                      <button className="btn btn-danger  rounded me-2"
                                      style={{width:'80px' }}
                                      disabled={role.name=='admin'?true:false}>حذف</button> 
                                                                     
                                                                       
                                    </TableCell >
                                    
                                </TableRow >
                            ))}
                        </TableBody >
                    </Table>
                </TableContainer>
           </div>
           
 
         
            
        </div>
    )
}