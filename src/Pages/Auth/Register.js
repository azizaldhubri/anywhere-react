import axios from "axios";
import { useEffect, useRef, useState } from "react"
// import '../../Css/base/media.css'
import { REGISTER, baseUrl } from "../../Api/Api";
import LoadingSubmit from "../../Component/Loading/Loading";
import Cookie from 'cookie-universal' ;
import Form from 'react-bootstrap/Form';
// import { useNavigate } from "react-router-dom";

export default function Register(){
    const [form,setForm]=useState({
        name: '',
        email:'',
        password: ''
    })

    // const navigate=useNavigate();
    //loading
    const[loading,setLoading]=useState(false);
    //ccokkie
    const cookie=Cookie()
   
    //err 
    const[err,setErr]=useState('');

    // ref
    const focus=useRef('');
    
    // handle focus
    useEffect(()=>{     
     focus.current.focus();
    },[]);

    function handleChange (e){
        
        setForm({...form,[e.target.name]: e.target.value})
        
    } 
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        try{
        const res= await axios.post(`${baseUrl}/${REGISTER}`,form);
           setLoading(false)
           const token=res.data.token;
           const role=res.data.user.role;
       const go=role==='admin' ?'users':'writer'
            cookie.set('e-commerce',token)   ;         
            window.location.pathname=`/dashboard/${go}`;

        }
        catch(err){
            console.log(err)
           
            setLoading(false)
            if(err.response.status===422){
                setErr('Email is already been taken')
            }else{setErr('Internal Server Error')}
        }

    }
    return( 
        <>        
        {loading && <LoadingSubmit/>}    
      
        <div className="container">
             
             <div className="row"style={{height:'100vh'}}>
                 <Form  className="form" onSubmit={handleSubmit}>
                     <div className="">
                         <h1>Register</h1>
                         <Form.Group className="custom-form" controlId="exampleForm.ControlInput1">
                             <Form.Control
                             name="name"
                             value={form.name}
                             onChange={handleChange}
                             required
                              type="text"
                               placeholder="Enter Your Name.."
                               ref={focus}
                               />
                             <Form.Label>Name:</Form.Label>
                        </Form.Group>
                         
                         <Form.Group className="custom-form" controlId="exampleForm.ControlInput2">
                             <Form.Control
                             name="email"
                             value={form.email}
                             onChange={handleChange}
                             required
                              type="email" placeholder="Enter Your Email.." />
                             <Form.Label>Email:</Form.Label>
                        </Form.Group>
                        
                         <Form.Group className="custom-form" controlId="exampleForm.ControlInput3">
                             <Form.Control
                             name="password"
                             value={form.password}
                             onChange={handleChange}
                             minLength={6}
                             required
                              type="password" placeholder="Enter Your Password.." />
                             <Form.Label>Password:</Form.Label>
                        </Form.Group>
                         <button className="btn btn-primary">Register</button>
                         <div className="google-btn">
                             
                             <a href={`http://127.0.0.1:8000/login-google`}>
                                 <div className="google-icon-wrapper">
                                     <img className="google-icon"
                                     src="data:image/png;base64,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"
                                     alt="sign in with google">
     
                                     </img>
                                 </div>
                                 <p className="btn-text">
                                     <b>sign in with google</b>
                                 </p>
                             </a>
     
                         </div>
                         {err  !== ''&& <span className="error">{err}</span>}
     
                     </div>
                 
                 </Form>
             </div>
                 
          </div>
        </>
    )
}