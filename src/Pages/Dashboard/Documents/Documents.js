import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Select, MenuItem, Typography, Box } from '@mui/material';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table_documents from '../../../Component/Dashboard/Table_document';
import { Axios } from '../../../Api/axios';
import { USER } from '../../../Api/Api';
import ExportPdf from '../../../Component/Dashboard/ExportPdf';
import ExportExcel from '../../../Component/Dashboard/ExportExcel';
import NavHeader from '../../../Component/Dashboard/NavHeader';

 
export default function Documents(){
// const Navbar = () => {
  const[title,setTitle]=useState('')
  const[page,setPage]=useState(1)
  const[limit,setLimit]=useState(3)
  const[loading,setLoading]=useState(false)
  const[total,setTotal]=useState(0);
  const[role,setRole]=useState('');
  const[currentUser,setCurrentUser]=useState('');

  useEffect(()=>{        
    Axios.get(`/${USER}`)            
    .then((res)=>{setCurrentUser(res.data);
        setRole(res.data.role)
    });         
},[]);

// console.log(limit)

  const goverment=[
    'إشتراك الغرفة التجارية','رخصة البلدية','سجل تجاري','شهادة الزكاة','شموس','رخصة بناء',
    'الدفاع المدني','صك-وكالة','شهادة اتمام بناء', 'علامة تجارية','العنوان الوطني',
]

const stays=[
    'إقامات','جوازات سفر', 'شهادات صحية',   
    'عقود الموظفين - معتمد','عقود الموظفين-تحت التجربة','رخصة سيارة',
]
const quality=['تقنية المعلومات','مالية','الجودة والتميز','مشاريع',
        'شوؤن إدارية', 'تأجير وتحصيل','التصميم',]
const buildings=[    
  ,'مخططات','مخططات الدفاع المدني','شهادات انهاء تركيب نظام السلامة',
    'مخطط توزيع الكاميرات', 'عقود توريد وتركيب الكاميرات','شهادة انهاء تركيب الكاميرات',
    'شهادة انجاز الشرطه','شهادة مقاومة الكلادنج للحريق','تقرير سلامة المباني', ]

const Financial=['بوليصة تامين','أقساط البنك','ضمانات','الأصول']
 const contracts=[  "عقود الإيجار للغير" ,'عقود صيانة','عقود شراءالمصاعد والضمانات']


//  const navSelected=[
//   'goverment','stays','quality','buildings','Financial','contracts'
//  ]

 const doc_type=goverment ? goverment.map((item,index)=>      
    <MenuItem  key={index} value={item}  
 style={{color:'black',width: 'fitContent',fontSize:'15px'}}
    >{item}</MenuItem >    
):'';

 
  const [activeButton, setActiveButton] = useState('');

  // وظيفة لتحديد العنصر النشط
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };


  const [values, setValues] = React.useState({
    select1: '',
    select2: '',
    select3: '',
    select4: '',
    select5: '',
    select6: '',
  });



 const[documents,setDocuments]=useState([])
//  useEffect(()=>{
//   async function gettask(){
//   try{  await  Axios.get('documents')
//       .then(e=>{setDocuments(e.data.post);
                                      
//     //  setLoading(false);
//         })                             
//   }
//   catch(err){console.log(err)}
// }
// gettask();    
// },[])
 
 useEffect(()=>{
  async function gettask(){
     
    try{  
    {title && 

    
    await Axios.get(`/serchTypeDocument?query=${title}&limit=${limit}&page=${page}`)    
    .then(e=>{
      setDocuments(e.data.data);
      setTotal(e.data.total)    
    })                             
  }
}
  catch(err){console.log(err)}
}
gettask();    
},[title,limit,page])
// console.log(documents)

async function handleDelet(id){
  try{
   await Axios.delete(`document/${id}`);
   setDocuments((prev)=>prev.filter((item)=>item.id!==id)) ;
                        
   }
  catch(err){
              console.log(err)
         }         
 }


 
  // لتغيير القيمة في كل Select
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTitle(event.target.value)
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

 
         
      
        
  const header=[          
    {
        key:'document_name',
        name:'أسم المستند'
    },
    {
        key:'supervising_emp',
        name:'الموظف المتابع'
    },
    {  
        key:'user_name',
        name:'اُضيف من قبل' 
    }
    ,
    {   
        key:'document_id',
        name:title?' رقم '+ title :'رقم إشتراك الغرفة التجارية (0)'
    } ,
    {
        key:'end_document',
        name:'تاريخ نهاية المستند'
    },
    
    {
        key:'date_alert',
        name:'تاريخ التنبية'
    }
     ,
    {
        key:'document_type',
        name:'تصنيف الوثيقة'
    }
     ,
    {
        key:'file_paths',
        name:'العمليات'
    }
 ]
 //-----------------------------------------------------------------------------------------
//  useEffect(()=>{
//   setLoading(true)
//       Axios.get(`/getdocuments? limit=${limit}&page=${page}`)            
//       .then((data)=>{setDocuments(data.data.data);setTotal(data.data.total)})
//       // .then(()=>setNoUsers(true))
      
//       .catch((err)=>console.log(err)).finally(()=>setLoading(false));
//   },[limit,page]);
 //-----------------------------------------------------------------------------------
 const links=[
  {name:'الوثائق',
  link:'#'
  }]
  return (
    // <Container>
      <div className="px-4 py-2 w-100 bg-page   " >
        {/* <div className='border d-flex align-items-center justify-content-start fs-5  pe-4 rounded'
        style={{height:'65px  ',background:'#d3d9db'}}>
          <img  width='40px' src={require('./../../../Assets/img/data-oic.png')}></img>
          <Link to='/dashboard' className='me-2 text-black' >الرئيسية / الوثائق</Link>
          
        </div> */}

            <NavHeader
            nav={links}/>

         <div className="w-100  d-flex align-items-ceneter justify-content-start gap-4 fs-4 mt-4">
                        <Link to='/dashboard/addDocument'className="back_btn" >إضافة وثيقة+ </Link>
                    
                        <div className= '    position-relative w-25 d-flex align-items-ceneter justify-content-end '>
                                <input className='   rounded-0 w-50 border-0 '
                                type='search'
                                />                        
                                <h3 className='back_btn fs-4 line-height m-0 w-50   text-white '>بحث</h3>
                        </div>
                    

           </div>
        <div className='w-100 d-flex align-items-center justify-content-start  mt-3  '
        // style={{minHeight:'150px',maxHeight:'250px',overflow: "auto"}} >               
        style={{minHeight:'150px', maxHeight:'250px',overflow: "auto"}} >               
          <AppBar 
            className='d-flex  flex-wrap '          
            sx={{ backgroundColor: 'transparent', boxShadow: 'none',position: "relative",
            direction: 'ltr',
            // fontWeight: 'bold',   
            height:'30px',           // لجعل النص عريض
            fontFamily: 'Arial',}}>
            <Toolbar sx={{ justifyContent: 'space-between' , position: "relative",
             
            }}>
              {/* العنوان في النافبار */}
              

              {/* إنشاء 5 Select */}
              <Box  sx={{   gap: 1 ,flexDirection: 'row-reverse',
                 
              }} 
              className='d-flex   flex-wrap'>
                <Select
                  name="select1"
                  defaultValue={100}
                  value={activeButton === 'goverment' ?values.select1:''}
                  onChange={handleChange}
                  displayEmpty
                  onClick={() => handleButtonClick('goverment')}
                      style={{ maxHeight: 40,}}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200, // تحديد ارتفاع القائمة بالبيكسل
                      }
                    }}}
                  sx={{               
                    color: 'white',
                    fontWeight: 'bold',              // لجعل النص عريض
                    fontFamily: 'Arial',
                    color:'white', // اللون النشط
                    backgroundColor: activeButton === 'goverment' ? '#20c997' : ' #a67ef1', // خلفية العنصر النشط
                    '&:hover': {
                      backgroundColor: '#6e93c4', // اللون عند التحويم
                    },
                    '&:focus': {
                      backgroundColor: '#ffcccc', // اللون عند التركيز
                    },

                    '.MuiSelect-icon': {              
                    fontSize: '35px',                
                    left:'unset',         // إزالة المسافة العلوية الافتراضية
                    right:'0%',
                    color: 'white',                       
                      },
                  }}
                >           
                    <MenuItem   value='' style={{display:'none'}}>حكومي </MenuItem >  
                  
                    {  goverment ? goverment.map((item,index)=>      
                        <MenuItem  key={index} value={item}  
                    style={{color:'black',width: 'fitContent',fontSize:'15px'}}
                        >{item}</MenuItem >    
                    ):''}
                </Select>

                <Select
                  name="select2"
                  value={values.select2}
                  onChange={handleChange}
                  displayEmpty
                  onClick={() => handleButtonClick('stays')}
                  style={{ maxHeight: 40,}}
                  sx={{
                    color:   'white', // اللون النشط
                    fontWeight: 'bold',              // لجعل النص عريض
                    fontFamily: 'Arial',
                    backgroundColor: activeButton === 'stays' ? '#20c997' : '#e83e8c', // خلفية العنصر النشط
                    '&:hover': {
                      backgroundColor: '#dc3545', // اللون عند التحويم
                    },
                    '.MuiSelect-icon': {              
                    fontSize: '35px',                
                    left:'unset',         // إزالة المسافة العلوية الافتراضية
                    right:'0%',
                    color: 'white',                       
                      },
                  }}
                >
                  <MenuItem   value='' style={{display:'none'}}> موارد بشرية</MenuItem >  
                  
                  {  stays ? stays.map((item,index)=>      
                      <MenuItem  key={index} value={item}  
                  style={{color:'black',width: 'fitContent',fontSize:'15px'}}
                      >{item}</MenuItem >    
                  ):''}
                  
                </Select>

                <Select
                  name="select3"
                  value={values.select3}
                  onChange={handleChange}
                  displayEmpty
                  onClick={() => handleButtonClick('contracts')}
                  style={{ maxHeight: 40,}}
                  sx={{
                    fontWeight: 'bold',              // لجعل النص عريض
                    fontFamily: 'Arial',
                    color: activeButton === 'contracts' ?'white':  'black', // اللون النشط
                    backgroundColor: activeButton === 'contracts' ? '#20c997' : '#ffc107', // خلفية العنصر النشط
                    '&:hover': {
                      backgroundColor: '#fd7e14', // اللون عند التحويم
                    },
                    '&:focus': {
                      backgroundColor: 'black', // اللون عند التركيز
                    },
                    '.MuiSelect-icon': {              
                    fontSize: '35px',                
                    left:'unset',         // إزالة المسافة العلوية الافتراضية
                    right:'0%',
                    color: 'black',                       
                      },
                  }}
                >
                    <MenuItem   value='' style={{display:'none'}}> عقود</MenuItem >  
                  
                  {  contracts ? contracts.map((item,index)=>      
                      <MenuItem  key={index} value={item}  
                  style={{color:'black',width: 'fitContent',fontSize:'15px'}}
                      >{item}</MenuItem >    
                  ):''}
                </Select>

                <Select
                  name="select4"
                  value={values.select4}
                  onChange={handleChange}
                  displayEmpty                  
                  onClick={() => handleButtonClick('Financial')}
                  style={{ maxHeight: 40,}}
                  sx={{
                    fontWeight: 'bold',              // لجعل النص عريض
                    fontFamily: 'Arial',
                    color:'white', // اللون النشط
                    backgroundColor: activeButton === 'Financial' ? '#20c997' : '#17a2b8', // خلفية العنصر النشط
                    '&:hover': {
                      backgroundColor: '#17a2b8', // اللون عند التحويم
                    },
                    '.MuiSelect-icon': {              
                    fontSize: '35px',                
                    left:'unset',         // إزالة المسافة العلوية الافتراضية
                    right:'0%',
                    color: 'white',                       
                      },
                  }}
                >
                        <MenuItem   value='' style={{display:'none'}}> مالية</MenuItem >  
                  
                  {  Financial ? Financial.map((item,index)=>      
                      <MenuItem  key={index} value={item}  
                  style={{color:'black',width: 'fitContent',fontSize:'15px'}}
                      >{item}</MenuItem >    
                  ):''}
                  
                </Select>

                <Select
                  name="select5"
                  value={values.select5}
                  onChange={handleChange}
                  displayEmpty
                  onClick={() => handleButtonClick('quality')}
                  style={{ maxHeight: 40,}}
                  sx={{
                    fontWeight: 'bold',              // لجعل النص عريض
                    fontFamily: 'Arial',
                    color:    'white', // اللون النشط
                    backgroundColor: activeButton === 'quality' ? '#20c997' : ' #a67ef1', // خلفية العنصر النشط
                    '&:hover': {
                      backgroundColor: '#6e93c4', // اللون عند التحويم
                    },
                    '.MuiSelect-icon': {              
                    fontSize: '35px',                
                    left:'unset',         // إزالة المسافة العلوية الافتراضية
                    right:'0%',
                    color: 'white',                       
                      },
                  }}
                >
                          <MenuItem   value='' style={{display:'none'}}> جودة</MenuItem >  
                  
                  {  quality ? quality.map((item,index)=>      
                      <MenuItem  key={index} value={item}  
                  style={{color:'black',width: 'fitContent',fontSize:'15px'}}
                      >{item}</MenuItem >    
                  ):''}
                  
                </Select>

                <Select
                  name="select6"
                  value={values.select6}
                  onChange={handleChange}
                  displayEmpty
                  onClick={() => handleButtonClick('buildings')}
                  style={{ maxHeight: 40,}}
                  sx={{
                    fontWeight: 'bold',              // لجعل النص عريض
                    fontFamily: 'Arial',
                    color: 'white', // اللون النشط
                    backgroundColor: activeButton === 'buildings' ? '#20c997' : '#17a2b8', // خلفية العنصر النشط
                    '&:hover': {
                      backgroundColor: '#17a2b8', // اللون عند التحويم
                    },
                    '.MuiSelect-icon': {              
                    fontSize: '35px',                
                    left:'unset',         // إزالة المسافة العلوية الافتراضية
                    right:'0%',
                    color: 'white',                       
                      },
                  }}
                >
                          <MenuItem   value='' style={{display:'none'}}> مباني</MenuItem >  
                  
                  {  buildings ? buildings.map((item,index)=>      
                      <MenuItem  key={index} value={item}  
                  style={{color:'black',width: 'fitContent',fontSize:'15px'}}
                      >{item}</MenuItem >    
                  ):''}
                
                </Select>
              </Box>
            </Toolbar>
          </AppBar>
        </div>

        <div  >
        <Table_documents
          header={header}
          data={documents}
          role={role}
          currentUser={currentUser}
          limit={limit}
          setLimit={setLimit}
          page={page}
          delete ={handleDelet}
          setPage={setPage}
          search='name'
          total={total}
          Linksearch={documents}
           
                      
            
            // loading={loading}
          //   createTask={createTask}
            // role={role}
        />
         

        </div>  
        <div className='d-flex gap-3 w-25 align-items-center mt-3 '>
            <ExportExcel
                data={documents}
                header={header} /> 
            <ExportPdf data={documents}
            header={header}
            />   
        </div>
       
        
    </div>
    // </Container>
  );

};

// export default Navbar;
