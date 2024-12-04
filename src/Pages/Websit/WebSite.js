import { Outlet } from "react-router-dom";
import NaveBare from "../../Component/Website/NaveBar/NaveBare";

export default function WebSite(){
    return (
    <>

    <NaveBare/>
    <Outlet/>
    </>
    )
}