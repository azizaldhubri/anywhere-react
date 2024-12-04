import { createContext, useState } from "react";

export const MenuLeft=createContext(true);
export default function MenuContextLeft({children}){
   const[isOpenMenuLeft,setisOpenMenuLeft]=useState(false);

    return (
        <MenuLeft.Provider value={{isOpenMenuLeft,setisOpenMenuLeft}}>
            {children}
        </MenuLeft.Provider>
    )
}