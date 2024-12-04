// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './bars.css'
import { Link } from 'react-router-dom'
import { Menu } from '../../Context/MenuContext'
import { useContext, useEffect, useState } from 'react'
import { WindowSize } from '../../Context/WindowContext'
import { Axios } from '../../Api/axios'
import { USER } from '../../Api/Api';
import {  useNavigate } from "react-router-dom";
import {   taplink } from './NavLink'
import {  List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';

// import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { MenuLeft } from '../../Context/MenueContextLeft'
import { UserContext } from '../../Context/UserProvider'

export default function SideBar(){
  const menu=useContext(Menu);
  const WindowContext=useContext(WindowSize)
  const windowSize=WindowContext.windowSize;
  const isOpen=menu.isOpen;
  // const menuLeft=useContext(MenuLeft);
    // const isOpenMenuLeft=menuLeft.isOpenMenuLeft;
  
    const[user,setUser]=useState('');
    const Navigate=useNavigate();  
    
    //------------------------------------------------------------------

    const [openMain, setOpenMain] = useState(null);
  const [openSub, setOpenSub] = useState({});

  const [openSub2, setOpenSub2] = useState('');
  const handleMainClickSub2 = (itemId) => {
    setOpenSub2(itemId );  
};
//-----------------------------permission veio dashbord ------------
const USERNAME=useContext(UserContext);
const permissions=USERNAME.permissions;
const [permission, setpermission] = useState([]);
useEffect(()=>{     
  async function fetchPermissi() {                
      const permissionsData = [];                 
        permissions.forEach((item,index) => {             
            if(item.can_view===1){                  
                permissionsData[index]=item.page.name;
            }
        });
        setpermission(permissionsData)
      };
       fetchPermissi();
},[permissions]) 
 
//---------------------------------------
  const handleMainClick = (itemId) => {
    setOpenMain(openMain === itemId ? null : itemId);
  
};

const handleSubClick = (mainItemId, subItemId) => {
    setOpenSub((prevState) => ({
        ...prevState,
        [mainItemId]: prevState[mainItemId] === subItemId ? null : subItemId,
    }));
     
  };
    //------------------------------------------------------------------

    useEffect(()=>{
        Axios.get(`/${USER}`)
        .then(data=>setUser(data.data))
        .catch(<Navigate to={'/login'} replace={true}/>)
    },[])

    
    return (
      <>
        
      <div 
      style={{
          position:'fixed',
           top:'70px',
            left:'0' ,
            width:'100%',
            height:'100vh',
            backgroundColor:'rgba(0 ,0 ,0 ,0.2)',
            display:windowSize< '768' && isOpen ? 'block':'none',
            zIndex:'99999'
            }}>
          
      </div>
      {isOpen &&
        <div className='side-bar pt-3'
      
        style={{
            // background:'#0d6efd',
            right:windowSize < '768' ?(isOpen ? 0 : '-100%'): 0 ,
            width: isOpen ? '268px':'fit-content',
            // position:windowSize < '768' ?'fixed': 'sticky' ,                           
            position:windowSize < '768' ?'fixed': 'sticky' ,                           
            // height:'84vh',
            height:'fit-content',
            zIndex:'9999999'
            // buttom:'20px'
        }}>
           <Link to='/dashboard' >
              <img  width='220px' src={require('./../../Assets/images/logoall.png')}
              style={{background:windowSize < '768' && 'white',marginRight:'10px'}}></img>
           </Link>
                                                       
  {/* <div className='w-100 d-flex  justify-content-center flex-column side-bar '   */}
  <div className=' mt-1'  
  >  
  <Box className='side-bar' 
   sx={{ width: '265px', height: '67vh',overflowY: 'auto',overflowX: 'hidden', 
         '&::-webkit-scrollbar': {
          width: '0px',  // إخفاء شريط التمرير في الوضع الافتراضي
      },
      '&:hover::-webkit-scrollbar': {
          width: '9px',  // عرض شريط التمرير عند التعويم فوق الصندوق
      },
       '&::-webkit-scrollbar-track': {
        backgroundColor: '#f0f0f0', // لون الخلفية لمسار التمرير
         
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#888',   // لون شريط التمرير نفسه      
        borderRadius: '20px',
      cursor:'pointer'
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#555',    // لون شريط التمرير عند التمرير عليه
        // backgroundColor: 'red',    // لون شريط التمرير عند التمرير عليه
    },
  }}
  // style={{  display: (windowSize< 600 || !isOpen ) ? 'none' : 'block',marginBottom:'2px'}}
  >
  <List >
    {/* الفرع الرئيسي 1 */}
    {taplink && 
    taplink.map((item,index)=>
        // {item.permission =='إدارة الموارد البشرية'&&
    <div key={index}>

      {permission.map((perm ,key)=>
      <div key={key}>
        { perm==item.permission &&
            <>    
       <ListItem  onClick={() => handleMainClick(index)}
             sx={{
               
                // width: '220px' ,
              // paddingRight: '8px',
              textAlign: 'right',    
              margin: '3px',                
            borderRadius:'4px',                
            padding:'10px',
            cursor:'pointer' , 
            marginBottom:'8px',                
            fontFamily:'Cairo, sans-serif ',           
        backgroundColor: openMain === index ? 'white' : 'transparent',
        '&:hover': { backgroundColor: 'white',color:'black' },
        '& .MuiListItemText-primary': {
            color: openMain === index && 'blue' ,
               fontWeight: openMain === index ? 'bold' : 'bold',}}}           
         
        >
      <ListItemIcon sx={{ minWidth: '0px'}}>
        <img width='30px' src={require(`./../../Assets/img/${item.img}`)}></img>      
      
      </ListItemIcon>
      
      <ListItemText primary={item.maintitle}     
         primaryTypographyProps={{ fontSize: '18px' }}      
       sx={{            
        paddingRight: '8px', 
                    
      }}
      />
     
      {item.subtitle && ( openMain === index ? <ExpandLess sx={{color:'black'}}/> : <ExpandMore />)}
    </ListItem>
    <Collapse in={openMain === index} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {/* الفرع الفرعي 1-1 */}
        {item.subtitle && item.subtitle.map((item2,index2)=>
            // <div>
              <Link key={index2} to={`${item2.link}`} style={{fontWeight:'bold',color:'white'}}>
           <ListItem button onClick={() => handleSubClick(index, index2)}  
            sx={{
              textAlign: 'right',    
              margin: '-6px',                   
              padding:'7px',
              paddingRight: '8px',
            borderRadius:'4px',
            width: '210px' ,                 
            cursor:'pointer' ,
            marginRight:'10px',
            marginBottom:'8px', 
            fontWeight:'bold',
            fontSize:'9px',
         
        backgroundColor: openSub[index] === index2 ? 'white' : 'transparent',
        '&:hover': {            
          backgroundColor: 'white' , 
          color:'black'  ,              
         },
        '& .MuiListItemText-primary': {
            color: openSub[index] === index2 && 'blue',
            fontWeight: 'bold',
           }}}
            
            >
                    <ListItemIcon sx={{ minWidth: '0px', margin: '0px', padding:'0px',paddingRight: '20px'  }}>
                        {/* <SettingsIcon /> */}
                        {item.subtitle[index2].details &&
                        <img width='25px' src={require(`./../../Assets/img/${item2.img}`)}></img>
                        }
                      </ListItemIcon>
                      {/* <Link to={`${item2.link}`}> */}
                     
                <ListItemText primary={item.subtitle[index2].details? item2.title :item2.title}
                    sx={{              
                    paddingRight: '8px',               
                }}
                />
                 {/* </Link> */}
                 {item.subtitle[index2].details && (openSub[index] === index2 ? <ExpandLess sx={{color:'black'}}/> : <ExpandMore />)}
           </ListItem>
        <Collapse in={openSub[index] === index2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            
             {/* الفرع الفرعي 1-2 */}
            { item.subtitle[index2].details &&
              item.subtitle[index2].details.map((item3,index3)=>
                <Link key={index3} to={`${item3.link}`} style={{fontWeight:'bold',color:'black'}}>
                <ListItem button sx={{ pl: 8 }}>
              <ListItemText primary={item3.title}
              onClick={()=>handleMainClickSub2(index3)}
              style={{}}
              sx={{
                // border:'1px solid black',
                width:'180px' ,
                textAlign: 'center',
                  padding:'5px',
             margin:'-6px',
             fontWeight:'bold',
             marginRight:'10px',
              borderRadius:'4px',
              cursor:'pointer' ,
              // color:'black',
              backgroundColor: openSub2 === index3 ? 'lightgray' : 'transparent',
              '&:hover': { backgroundColor: 'white',color: 'black' },
            //   '&:hover': { color: 'black'},
               
              '& .MuiListItemText-primary': {
                  color: openSub2===index3  && 'blue' ,
                  fontWeight:  'bold'  
                }
                 
                }}
              />
            </ListItem>
            </Link>
           
            
              )
            }             
           
          </List>
        </Collapse>
  
            {/* </div> */}
            </Link>
          )
        }           
       
      </List>
    </Collapse>
    </>
}

      </div>
      )
      // (item.permission =='gg') &&
  
  }
    </div>
    )
    }     
  </List>
  </Box>  
  
        
        </div>               
        </div>

      }
      
  </>     
        )
        
}