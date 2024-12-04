import { useState } from 'react';
import Select from 'react-select';
export default function FormSelect(props){
    const [test,setTest]=useState('');
// console.log(test)

    return(

       <div>
           <Select className='w-100  '                                                 
                        //   onChange={(e)=> setSection(e.target)}
                        onChange={props.setForm }
                              options={props.options}                                                           
                              placeholder={props.placeholder}
                           styles={props.styles}
                            
                          >
                            
                          </Select> 
       </div>
    )
}