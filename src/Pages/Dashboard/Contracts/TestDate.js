import { useState } from "react";
import HistoryDatew from "../../../Component/Dashboard/History"; 

export default function TestDate(){     
    const [startDate, setStartDate] = useState( '');    
    const [endDate, setEndtDate] = useState('');    
    
    // console.log(startDate)
      function handleValueFromChild (value) {
        setStartDate(value);
    };
      function handleValueEndDate (value) {
        setEndtDate(value);
         console.log(value)
    };
    return (
        <div>
            <div   style={{position:"relative", zIndex:1000}}>
            <HistoryDatew 
            setSelectDate={handleValueFromChild}
           
            />
            </div>
            <div   style={{position:"relative", zIndex:1}}>
            <HistoryDatew 
            setSelectDate={handleValueEndDate}             
            />
            </div>
            {/* <button onClick={()=>console.log('startDate= '+startDate)}>start date</button>
            <button onClick={()=>console.log('endDate= ' +endDate)}>End date</button> */}
         
        </div>
    )
}