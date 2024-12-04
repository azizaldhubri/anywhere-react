import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import NavHeader from "../../../Component/Dashboard/NavHeader";
import { Axios } from "../../../Api/axios";
import { Table, TableBody, TableCell,TableContainer, TableHead, TableRow, Paper, PaginationItem, Select } from '@mui/material';
import { CheckBox, Padding, SelectAll, Tune } from "@mui/icons-material";
import { USER } from '../../../Api/Api';

export default function RoleUpdate()  {
    const {id}=useParams();
    
    const [pages, setPages] = useState([]);
    const [permissions, setPermissions] = useState({});
    
    const [roles, setRoles] = useState([]);
    const [ selectedRoles, setselectedRoles] = useState(1);
    const [page, setPage] = useState('');
    const [role, setRole] = useState(''); 
    const [typeRole, setTypeRole] = useState(''); 
    const [selectAll,setSelectAll]=useState(true)
      
    
    
 
    // const [permissions1, setPermissions1] = useState([]);
    // const [selecteAll, setSelectedAll] = useState(false);
    // const [selectedPermission1, setSelectedPermission1] = useState('');

    useEffect(() => {
        // جلب قائمة الصفحات
        const fetchPages = async () => {
            const response = await Axios.get('pages');
            setPages(response.data);            
            // console.log(response.data)       
        };
        const fetchRoles = async () => {
            const response = await Axios.get('roles');
            setRoles(response.data); 
            // console.log(response.data)
        };
        const TypeRolesname = async () => {
            const response = await Axios.get(`rolesName/${id}`);
            setTypeRole(response.data.name);
                     
       
        };

        // جلب الصلاحيات للدور المحدد
        const fetchPermissions = async () => {
            const response = await Axios.get(`roles/${id}`);  
            console.log(response.data)           
            const permissionsData = {};
            
            response.data.forEach(permission => {
                permissionsData[permission.page_id] = permission;
            });
            setPermissions(permissionsData);
        };

        fetchPages();
        fetchRoles();
        TypeRolesname()

        // if (selectedRoleId) {
        if (selectedRoles) {
            fetchPermissions();
        }
    }, [page , role , selectedRoles  ]);

    // دالة لتحديث حالة الـcheckbox
    const handleCheckboxChange = (pageId, field) => {
        setPermissions(prevPermissions => ({
            ...prevPermissions,
            [pageId]: {
                ...prevPermissions[pageId],
                [field]: !prevPermissions[pageId]?.[field]
            }
        }));
    };
        
        
    //--------------------------------------------------------------all permiision
    const handleCanViewChangeAll =  (value) => {
         
        setPermissions(prevPermissions => {
            // نمر عبر جميع الصفحات ونقوم بتعديل الحقول الخاصة بـ can_view
            const updatedPermissions = Object.keys(prevPermissions).reduce((acc, pageId) => {
                 acc[pageId] = {
                    ...prevPermissions[pageId], // نحتفظ بالحقول الأخرى
                    can_view: value ? 1:0   // تحديث حقل can_view إلى القيمة المحددة (true أو false)
                };
                  return acc;
            }, {});
    
            return updatedPermissions;
        });
   
    };
    // console.log(permissions)
    
  //-------------------------------------------------------------
    // دالة لحفظ الصلاحيات
    const savePermissions = async () => {
        try {
            await Axios.post('roles/update-permissions', {
                role_id: id,
                permissions: permissions
            });
            alert("Permissions updated successfully");
        } catch (error) {
            console.error("Error updating permissions:", error);
        }
    };
    //====================================================================
    const style_cell={
        fontSize: '18px',  // تغيير حجم الخط
        fontWeight: 'bold', // جعل الخط عريضًا
        borderRight: '2px solid black', // إضافة border للخلايا
        backgroundColor: '#d3d9db', // لون خلفية لتوضيح الحدود
        borderColor:'#c2c5c5',
        borderBottom:'3px solid gray',
        textAlign: 'center'                
    }
    const style_budy={
        fontSize: '19px',                   
        borderRight: '2px solid black',             
        borderColor:'#c2c5c5',
        borderBottom:'3px solid gray',
        textAlign: 'center' ,
        padding: '8px',
    //   color:'red'
    }

    //add new role
    async function handleAddRole(e){
        e.preventDefault();                
        const form = new FormData();
        form.append('name',role)               
     try{                                             
        await Axios.post(`addRole`,form) 
        setRole('')                
     }
     catch(err){console.log(err)}
    }


    async function handleAddpage(e){
        e.preventDefault();                
        const form = new FormData();
        form.append('name',page)               
     try{                                             
        await Axios.post(`addPage`,form)
        setPage('')                 
     }
     catch(err){console.log(err)}
    }

    // دالة لتفعيل كل الصلاحيات (Select All)
    //  const selectAllPermissions = (test)=>{
    //     const updatedPermissions = {};
    //        pages.forEach(page => {
    //           updatedPermissions[page.id] = {
    //             can_view: test,
                 
    //         };
    //     });
    //     setPermissions(updatedPermissions);
    // };
    // const selectAllUpdate = () => {
    //     const updatedPermissions = {};
    //     pages.forEach(page => {
    //         updatedPermissions[page.id] = {
                
    //             can_edit: true
    //         };
    //     });
    //     setPermissions(updatedPermissions);
    // };
    //-------------------------------------------------------------------------
    const links=[
        {name:'الصلاحيات',
         link:'/dashboard/Role'
        },
        {name:'تعديل الصلاحيه',
         link:'#'
        },
      ]
    return (
        <div className="w-100 px-3 py-0 bg-page">
              <NavHeader
             nav={links}
                         
            />
            {typeRole   ?   <h5 className='me-2 '>تعديل صلاحية : {typeRole}</h5>:''}
             
            

            <div className="w-100  d-flex align-items-center justify-content-start gap-4 fs-4  pt-4 mb-5 me-5 flex-wrap ">   
                <div className=" d-flex align-items-center justify-content-start gap-2 ">
                    <label>اسم الصلاحية</label>
                <input  type="text"
                            value={role}
                            onChange={(e)=>setRole(e.target.value)}
                        style={{padding:'5px',
                            borderLeft:'7px solid red',
                            borderRight:'7px solid red',
                        borderRadius:'10px' }}>
                </input>
                <button className="back_btn rounded" onClick={handleAddRole}>add Role</button>
                </div>       
                <div className=" d-flex align-items-center justify-content-start gap-2 ">                   
                <input  type="text"
                            value={page}
                            onChange={(e)=>setPage(e.target.value)}
                        style={{padding:'5px',
                            borderLeft:'7px solid red',
                            borderRight:'7px solid red',
                        borderRadius:'10px' }}>
                </input>
                <button className="back_btn rounded" onClick={handleAddpage}>add page</button>
                </div>       
                
            </div>

            {/* <div>
                <label>
                Role:
                <select
                    value={selectedRoles}
                    onChange={(e) => setselectedRoles(e.target.value)}
                >
                    <option value="">Select a role</option>
                    { roles && roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                </select>
                </label>               
           </div> */}
        
        
        

            <TableContainer component={Paper}
                    sx={{maxHeight: 1000, 
                        width:'95%'            
                    }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow  sx={{ backgroundColor: '#d3d9db',fontSize:'20px', }}>
                            < TableCell style={style_cell} >اسم الصفحة</TableCell>            
                            <TableCell  style={style_cell}>
                                 عرض  
                                 {/* <button onClick={selectAllPermissions }>Select All</button> */}
                                 <input
                                    type="checkbox"
                                    //  value={selecteAll}
                                    //  checked={selecteAll}
                                    // onChange={() =>{ setSelectedAll(!selecteAll);selectAllPermissions(selecteAll)}}
                                    onChange={() =>{setSelectAll(!selectAll);handleCanViewChangeAll(selectAll)}}
                                    style={{transform:" scale(1.5)",cursor:"pointer"}}
                                />
                            </TableCell>
                            <TableCell style={style_cell} >تعديل</TableCell>
                        </TableRow >
                    </TableHead>
                    <TableBody >
                        {pages.map(page => (
                            <TableRow  key={page.id}>
                                <TableCell style={style_budy} >{page.name}</TableCell >
                                <TableCell style={style_budy} >
                                    <input
                                        type="checkbox"
                                        checked={permissions[page.id]?.can_view || false}
                                        onChange={() => handleCheckboxChange(page.id, 'can_view')}
                                        style={{transform:" scale(1.5)",cursor:"pointer"}}
                                    />
                                </TableCell >
                                <TableCell  style={style_budy}>
                                    <input
                                        type="checkbox"
                                        checked={permissions[page.id]?.can_edit || false}
                                        onChange={() => handleCheckboxChange(page.id, 'can_edit')}
                                        style={{transform:" scale(1.5)",cursor:"pointer"}}
                                    />
                                </TableCell >
                            </TableRow >
                        ))}
                    </TableBody >
                </Table>
            </TableContainer>

                <button onClick={savePermissions}>Save Changes</button>
        </div>
);
};
 
 
 

 
