import { Outlet } from "react-router-dom";
import SideBar from "../../Component/Dashboard/Sidebar";
import SidebarLeft from "../../Component/Dashboard/SidebarLeft"
import TopBar from "../../Component/Dashboard/TopBar";
// import { UserProvider } from "../../Context/UserProvider";
// import './dashboard.css'

export default function Dashboard(){
    return(
        <div  className="position-relative ">
            {/* <UserProvider>   */}
            <TopBar/>
            <div  className="dashboard d-flex gap-1 w-100 border position-relative "style={{marginTop:'70px'}} >
            <SideBar/>
            <Outlet />
            <SidebarLeft/>
            </div>
            {/* </UserProvider> */}
        </div>
        
    )
}