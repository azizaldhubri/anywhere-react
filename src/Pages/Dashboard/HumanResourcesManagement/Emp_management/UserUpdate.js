import { useEffect, useState } from "react";
// import { Form } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Axios } from "../../../../Api/axios";
import { USER } from "../../../../Api/Api";
import LoadingSubmit from "../../../../Component/Loading/Loading";

import { useNavigate, useParams } from "react-router-dom";
 
export default function UserUpdate(){
    const [name,setName]=useState('')
    const [role,setRole]=useState('');
    const [role_id,setRole_id]=useState('');
    const [email,setEmail]=useState('');
    const[disable,setDisable]=useState(true);
    const[Loading,setLoading]=useState(false);
    const [roles, setRoles] = useState([]);
     
    const nav=useNavigate();
    
    // const id=Number(window.location.pathname.replace('/dashboard/users/','')) ;
    const {id}=useParams();
     
    useEffect(()=>{
        const fetchRoles = async () => {
            const response = await Axios.get('roles');
            setRoles(response.data);
            // console.log(response.data)      
       }
       fetchRoles()
    },[])


    useEffect(()=>{
        setLoading(true);
        Axios.get(`${USER}/${id}`)
        .then(data =>{setName(data.data.name);
            setEmail(data.data.email);
            setRole(data.data.role);
            setRole_id(data.data.role_id)
            setLoading(false);
           
        })
            .then(()=>setDisable(false))
            .catch(()=>nav('/dashboard/users/page/404')) ;
            },[])

  
     
     

    async function HandleSubmit(e){
        setLoading(true);
        e.preventDefault();
        try{
            await Axios.post(`${USER}/edit/${id}`,{
                name:name,
                email:email,
                role:role,
                role_id:role_id
            });
            window.location.pathname='/dashboard/users'
        }catch(err){
            setLoading(false);
            console.log(err)
        }
    }
    const handleUpdateRole = (event) => {
        const selectedOption = event.target.selectedOptions[0];        
        const value2 = selectedOption.dataset.value2;  // الوصول للقيمة الثانية
        setRole_id(` ${value2}`);       
      };


 
     
    return(
      <>
            {Loading  && <LoadingSubmit />}
        <Form  className="bg-white w-100" onSubmit={HandleSubmit} >
       
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>User Name:</Form.Label>
                <Form.Control 
                required               
                value={name}
                onChange={(e)=>setName(e.target.value)}                  
                 type="text" 
                 placeholder="Name ..." />
           </Form.Group>
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Email:</Form.Label>
                <Form.Control                
                value={email}
                onChange={(e)=>setEmail(e.target.value)}                
                 type="email" placeholder="Email ..." />
           </Form.Group>

           <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Role:</Form.Label>
                <Form.Select                
                value={role}                 
                onChange={(e)=>{setRole(e.target.value);handleUpdateRole(e)}}                
              >
                <option disabled value=''>Select Role</option>
                 {roles.map((item,index)=>
                  <option key={index} value={item.name} data-value2={item.id}>{item.name}</option>
                    
                )
                }
                {/* <option value='admin'>Admin</option>
                <option value='موظف'>موظف</option>
                <option value='تقنية معلومات'>تقنية معلومات</option>
                <option value='مدير المنتج'> مدير المنتج</option>
                <option value='Writer'>Writer</option> */}

                </Form.Select>
           </Form.Group>
            
        
            <button disabled={disable} className="btn btn-primary">Save</button>
          
              
    
    </Form>
      </>
    )
}