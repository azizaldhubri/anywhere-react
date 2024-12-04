import { createContext, useState } from "react";

export const Menu=createContext(true);
export default function MenuContext({children}){
   const[isOpen,setisOpen]=useState(true);

    return (
        <Menu.Provider value={{isOpen,setisOpen}}>
            {children}
        </Menu.Provider>
    )
}
