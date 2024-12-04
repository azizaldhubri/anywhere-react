import { Container, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './../../../Component/Website/NaveBar/nave.css'
import { useState } from "react";
import { Select ,ListSubheader,InputLabel,FormControl,MenuItem, Box  } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
export default function BotunNav(props){
    const  goverment=[
        'إشتراك الغرفة التجارية','رخصة البلدية','سجل تجاري','شهادة الزكاة','شموس','رخصة بناء',
        'الدفاع المدني','صك-وكالة','شهادة اتمام بناء', 'علامة تجارية','العنوان الوطني',
    ]
    
    
const stays=[
    'إقامات','جوازات سفر', 'شهادات صحية',   
    'عقود الموظفين - معتمد','عقود الموظفين-تحت التجربة','رخصة سيارة',
]


    const [selectedOption, setSelectedOption] = useState('');   
    const [isopen, setIsopen] = useState(false);   
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);            
      }

      const [selectedValue, setSelectedValue] = useState(100);

      const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };
      console.log(selectedValue)

  
    const doc_type=props.title? props.title.map((item,index)=>      
        <MenuItem  key={index} value={item}  
     style={{color:'black',width: 'fitContent',fontSize:'15px'}}
        >{item}</MenuItem >    
    ):'';

    return(
        <div className="d-flex    mt-3 rounded bg-danger ms-0 gap-2 "
        style={{height:'40px', /* الحد الأدنى للعرض */
          width: 'fitContent'}}>                         
          {/* إلغاء المسافة من الحاوية */}
        <Select className=" text-white    m-0 fs-6    h-100 ps-0 pe-0" 
          
       
        // value={selectedValue}
        // renderValue={() => null}
        // labelId="demo-simple-select-label"
        defaultValue={100}
        value={selectedValue  }
        onChange={handleChange}                       
            
        IconComponent={ArrowDropDownIcon} // تعيين الأيقونة
        sx={{
            padding: 0,  // إزالة الـ padding
            margin: '0',

            '.MuiSelect-icon': {
                padding: '0px',  // إزالة الـ padding
               margin: '0',
               // marginLeft:'15px',   // إزالة الـ margin
               fontSize: '40px',       // تصغير حجم الأيقونة
               top: 'unset', 
               left:'unset',         // إزالة المسافة العلوية الافتراضية
               right:'75%',
               color: 'white',
                      // تعديل موقع الأيقونة إلى اليمين
                },
                '.MuiOutlinedInput-notchedOutline': {border: 'none', 
                    margin: 0, padding: 0         // إزالة المسافة العلوية الافتراضية
                    // إزالة الـ padding                 
                   },
           

            // backgroundColor: '#FDEEF4', // لون الخلفية الافتراضي
            // backgroundColor: '#FDEEF4', // لون الخلفية الافتراضي
            '&:hover': {
                padding: 0,  // إزالة الـ padding
                margin: '0',
              backgroundColor: '#659EC7', // لون الخلفية عند التحويم
            },
            '& .MuiSelect-select': {
               
                paddingLeft:'70px',
               paddingX:'50px',
               paddingY:'10px',
              backgroundColor:props.click ? '#4AA02C': props.bac_color,
              // لون الخلفية داخل القائمة
            },
           }}
           inputProps={{
            style: {
              padding: '0',  // إزالة الـ padding
              margin: '0',   // إزالة الـ margin
              textAlign: 'right', // محاذاة النص
            },}}
                  
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200, // تحديد ارتفاع القائمة بالبيكسل
                      }
                     }}}
 
                 >    
                  <MenuItem   value={100}  style={{display:'none'}}>{props.address}</MenuItem >                                                     
                {doc_type}  

        </Select>
                                    
        
       </div>
    )



}