import HomePage from './Pages/Websit/HomePage/HomePage';
// import './App.css';
// import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Router, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register'; 
// import Users from './Pages/Dashboard/HumanResourcesManagement/Emp_management/Users';
import GoogleCallBack from './Pages/Auth/GoogleCallBack';
import Dashboard from './Pages/Dashboard/Dashboard';
import RequireAuth from './Pages/Auth/RequireAuth';
import UserUpdate from './Pages/Dashboard/HumanResourcesManagement/Emp_management/UserUpdate';
import AddUser from './Pages/Dashboard/HumanResourcesManagement/Emp_management/AddUser';
import Writer from './Pages/Dashboard/Writer';
import Err404 from './Pages/Auth/404';
import RequirBack from './Pages/Auth/RequireBack';
// import Category from './Pages/Websit/Categories/Categories';
import WebSite from './Pages/Websit/WebSite';
import AddTaskes from './Pages/Dashboard/Taskes/AddTask'; 
import TopBar from './Component/Dashboard/TopBar';
import AddDocument from './Pages/Dashboard/Documents/AddDocument';
import Documents from './Pages/Dashboard/Documents/Documents';
import UpdateDocument from './Pages/Dashboard/Documents/UpdateDocument';
import DocumentShow from './Pages/Dashboard/Documents/DocumentShow';
import OrderDocument from './Pages/Dashboard/Documents/OrderDocuments';
import Add_Order_Document from './Pages/Dashboard/Documents/Add_Order_Document';
import QualityDocument from './Pages/Dashboard/Quality/QualityDocument';
import QualityAdd from './Pages/Dashboard/Quality/QualityAdd';
import DocumentConformity from './Pages/Dashboard/Quality/DocumentConformity';
import DevelopmentDocuments from './Pages/Dashboard/Quality/DevelopmentDocuments';
import ComplaintDoc from './Pages/Dashboard/Quality/ComplaintDoc';
import EmployeeApp from './Pages/Dashboard/HumanResourcesManagement/Emp_management/EmployeeApp';
import Requestleave from './Pages/Dashboard/HumanResourcesManagement/Emp_management/Requestleave';
import Vacations from './Pages/Dashboard/HumanResourcesManagement/Emp_management/Vacations';
import SuspensionRequests from './Pages/Dashboard/HumanResourcesManagement/Emp_management/SuspensionRequests';
import StaffTransfer from './Pages/Dashboard/HumanResourcesManagement/Emp_management/StaffTransfer';
import LeaveBalance from './Pages/Dashboard/HumanResourcesManagement/Emp_management/LeaveBalance';
import AddContracts from './Pages/Dashboard/Contracts/AddContracts';
import TestDate from './Pages/Dashboard/Contracts/TestDate';
import ShowContracts from './Pages/Dashboard/Contracts/ShowContracts';
import Taskes1 from './Pages/Dashboard/Taskes/Taskes1';
import Permissions from './Pages/Dashboard/Setting/RoleUpdate';
import Role from './Pages/Dashboard/Setting/Role'; 
import RoleUpdate from './Pages/Dashboard/Setting/RoleUpdate';
import ProtectedRoute from './Pages/Auth/ProtectedRoute ';
import Users from './Pages/Dashboard/HumanResourcesManagement/Emp_management/Users';
 
 


function App() {
  return (
    <div className="App">
      
    <Routes>
    <Route element={<TopBar/>}> </Route>
            {/* public Routes */}
        <Route element={<WebSite/>}> 
        {/* <Route path='/' element={<HomePage/>}> </Route> */}
        {/* <Route path='/Category' element={<Category/>}> </Route> */}
        </Route>
        <Route element={<RequirBack/>}>   
            <Route path='/' element={<Login/>}> </Route>
            <Route path='/login' element={<Login/>}> </Route>
            <Route path='/Register' element={<Register/>}> </Route>
          
        </Route>
        <Route path='/auth/google/callback' element={<GoogleCallBack/>}></Route>
        <Route path='/*' element={<Err404/>}></Route>
        {/* protected Routes */}
       
       
        <Route   element={<ProtectedRoute permission="الرئيسية" /> } > 
            <Route path='/dashboard' element={<Dashboard/>}>
            <Route path='/dashboard' element={<HomePage/>}>  </Route>
         
               
                {/* </ProtectedRoute>}>   */}

                <Route   element={<ProtectedRoute permission="موارد بشرية" /> } >  
                    <Route path='users'element={<Users/>}></Route>            
                    <Route path='users/:id' element={<UserUpdate/>}></Route>            
                    <Route path='user/add' element={<AddUser/>}></Route>                      
                    <Route path='Requestleave' element={<Requestleave/>}></Route>
                    <Route path='EmployeeApp' element={<EmployeeApp/>}></Route>
                    <Route path='Vacations' element={<Vacations/>}></Route>
                    <Route path='SuspensionRequests' element={<SuspensionRequests/>}></Route>
                    <Route path='StaffTransfer' element={<StaffTransfer/>}></Route>
                    <Route path='LeaveBalance' element={<LeaveBalance/>}></Route>                    
                </Route> 
                          
               

              {/* //----------------------المهام------- */}
                  <Route element={  <ProtectedRoute permission="مهام الإدارات" /> }>   
                      <Route path='Taskes1' element={<Taskes1/>}></Route>    
                      <Route path='addTask' element={<AddTaskes/>}></Route>                                      
                      {/* <Route path='taskes1/:id' element={<ChiledTask/>}></Route>    */}
                      {/* <Route path='Taskes1' element={<Taskes1/>}></Route>                */}
                      {/* </ProtectedRoute>}>   */}
                </Route>  

           

                                            
              {/* //     documents    */} 
               <Route element={  <ProtectedRoute permission="المستندات" />} >           
                <Route path='documents' element={<Documents/>}  ></Route> 
                 <Route path='AddDocument' element={<AddDocument/>} ></Route> 
                <Route path='UpdateDocument/:id' element={<UpdateDocument/>} ></Route>            
                <Route path='DocumentShow/:id' element={<DocumentShow/>}  ></Route>            
                <Route path='OrderDocument' element={<OrderDocument/>}  ></Route>            
                <Route path='AddOrderDocument' element={<Add_Order_Document/>}  ></Route>            
                 {/* <Route path='Category/add' element={<AddCategory/>}></Route> */}
                 </Route> 
                
              {/* //     Quality    */}
                 <Route element={  <ProtectedRoute permission="الجودة" /> }    >   
                <Route path='Qualitydocuments' element={<QualityDocument/>}   ></Route> 
                 <Route path='QualityAdd' element={<QualityAdd/>}></Route> 
                <Route path='DocumentConformity' element={<DocumentConformity/>}   ></Route>            
                <Route path='DevelopmentDocuments' element={<DevelopmentDocuments/>}  ></Route>            
                <Route path='ComplaintDoc' element={<ComplaintDoc/>}  ></Route> 
                  </Route>  

              {/* //     Contracts    */}
                <Route element={  <ProtectedRoute permission="العقود" /> }    >    
                <Route path='AddContracts' element={<AddContracts/>}     ></Route> 
                <Route path='ShowContracts' element={<ShowContracts/>}   ></Route> 
                 {/* <Route path='QualityAdd' element={<QualityAdd/>}></Route>  */}
                {/* <Route path='DocumentConformity' element={<DocumentConformity/>}></Route>             */}
                {/* <Route path='DevelopmentDocuments' element={<DevelopmentDocuments/>}></Route>             */}
                {/* <Route path='ComplaintDoc' element={<ComplaintDoc/>}></Route>             */}
                {/* <Route path='DocumentShow/:id' element={<DocumentShow/>}></Route>             */}
                {/* <Route path='OrderDocument' element={<OrderDocument/>}></Route>             */}
                {/* <Route path='AddOrderDocument' element={<Add_Order_Document/>}></Route>  AddContracts           */}
                 {/* <Route path='Category/add' element={<AddCategory/>}></Route> */}

                </Route>   
                {/* sitting */}
                <Route element={  <ProtectedRoute permission="الصلاحيات" /> }>                    
                <Route path='Role' element={<Role/>} ></Route>
                <Route path='Role/RoleUpdate/:id' element={<RoleUpdate/>}  ></Route>
              </Route>  

                   
                <Route path='writer' element={<Writer/>}></Route>
          
             
              </Route>
              </Route>
            
              {/* </Router>            */}
            
        
        
         
        </Routes>
   
    </div>
  );
}

export default App;
