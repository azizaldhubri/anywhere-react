
// import {  TableContainer, TableHead,   Paper, PaginationItem } from '@mui/material';
import { useEffect, useRef, useState } from "react";
 
import 'moment/locale/ar';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // استيراد أنماط التقويم
 import React from 'react';
 
 
import { Form } from "react-bootstrap";
import TranFormDate from '../../Helpers/TranFormDate';
import DateStorage from '../../Helpers/DateSorage';
 
 
export default function HistoryDatew( props){
    const [startDate, setStartDate] = useState(new Date());    
 
   props.setSelectDate(DateStorage(startDate))
    const startDate_Document =TranFormDate( startDate) 
    const [isOpenCalenderStart, setOpenCalenderStart] = useState(false);
    
    
    // const [isHijri, setIsHijri] = useState(false);
    const [typeDate, setTypeDate] = useState('ميلادي');
    function handleChange (e){        
        setTypeDate(e.target.value);       
         }
    return (
        <div     style={{position: 'relative',zIndex:'1050'}}>
        <div className="d-flex align-items-center justify-content-between   flex-wrap  "
                style={{position: 'relative',zIndex:'1050'}}>
        <div className="d-flex justify-content-center align-items-center fs-5">
                <Form.Group  className="m-0 "  style={{position: 'relative', }} > 
                {/* <Form.Label className=" me-5">{form.document_type  ?documentForm[0].start_document:'تاريخ بداية'}</Form.Label> */}
            <div  className="d-flex">                            
                    {/* <div className=" ms-2">
                            <Form.Check
                            type="radio"
                            label="هجري"                       
                            name="هجري"                                            
                            value="هجري"
                            checked={ typeDate==='هجري'}                     
                            onChange={handleChange}                // defaultChecked                                  
                            // onClick={()=>setIsHijri(true)}              // defaultChecked                                  
                            />
                            <Form.Check
                            type="radio"
                            label="ميلادي"                                                                        
                            value="ميلادي"
                            name="ميلادي" 
                            checked={typeDate==='ميلادي'} 
                            onChange={handleChange}                         
                            // checked={typeDate}                         
                            // onClick={()=>setIsHijri(false)}                // defaultChecked                                  
                            />
                    </div> */}
                    <div className="d-flex align-items-center justify-content-between border bg-white"                                          
                        style={{width:'250px',height:'60px',zIndex:'9910'}}
                        >
                            <p className="m-0 me-2 ">{startDate_Document&& startDate_Document}</p>
                            <div className="m-0 border  "  style={{}}   >                             
                            <div style={{ position: 'absolute',reight:0,left:0,top:'20% '}}>
                                <button className="bg-white border-0 me-0 p-0"
                                    onClick={() =>setOpenCalenderStart((prev) => !prev) } 
                                    style={{ cursor: 'pointer', fontSize: '20px',hidden:  isOpenCalenderStart }}
                                >
                                    📅  
                                </button>
                                { isOpenCalenderStart && (
                                    <DatePicker                                                        
                                    onChange={(date) => {
                                        setStartDate(date)
                                        
                                        ;setOpenCalenderStart(false)
                                      }}                                                                                             
                                    inline 
                                    />
                                )}
                                </div>                                                   
                                
                                
                            </div>                          

                    </div> 
            </div>                                    
                    </Form.Group>
        </div>

                
                

                </div>   

      </div>
    )
}