

// export const document_type_Form=[
//     'إشتراك الغرفة التجارية','إقامات','جوازات سفر','رخصة البلدية','سجل تجاري','شهادة الزكاة',
//     'شموس','شهادات صحية','عقود الإيجار للغير',
    
// ]
// export const document_type_Form=[
//     'asdadad','adasdasd','dasdasdad'
// ]

export const document_type_Form=[
    'إشتراك الغرفة التجارية','إقامات','جوازات سفر','رخصة البلدية','سجل تجاري','شهادة الزكاة',
    'شموس','شهادات صحية','عقود الإيجار للغير','عقود صيانة','بوليصة تامين','أقساط البنك',
    'ضمانات','رخصة بناء','الدفاع المدني','مخططات','صك-وكالة','شهادة اتمام بناء',
    'علامة تجارية','عقود الموظفين - معتمد','عقود الموظفين-تحت التجربة','تقنية المعلومات','مالية','الجودة والتميز',
    'مشاريع','شوؤن إدارية','تأجير وتحصيل','الأصول','العنوان الوطني', 
    'عقود شراءالمصاعد والضمانات','رخصة سيارة','مخططات الدفاع المدني','شهادات انهاء تركيب نظام السلامة',
    'مخطط توزيع الكاميرات', 'عقود توريد وتركيب الكاميرات','شهادة انهاء تركيب الكاميرات',
    'شهادة انجاز الشرطه','شهادة مقاومة الكلادنج للحريق','تقرير سلامة المباني', 'التصميم', 
]
export const documents=[
  
    {
        document_type:'جوازات سفر',
        document_name:'الاسم جوازالسفر',
        document_id:'رقم جواز السفر'  ,
        start_document:'تاريخ بداية جواز السفر'  ,
        end_document: 'تاريخ إنتهاء جواز السفر',        
    },

    {
        document_type:'رخصة البلدية',
        document_name:'الاسم رخصة البلدية',
        document_id:'رقم رخصة البلدية',
        start_document:'تاريخ بداية رخصة البلدية',
        end_document:'تاريخ إنتهاء رخصة البلدية',       
    },
    {
        document_type:'إقامات',
        document_name:'الاسم الإقامة',
        document_id:'رقم الإقامة',
        start_document:'تاريخ بداية الإقامة',
        end_document:'تاريخ إنتهاء الإقامة',       
    },

    {
        document_type:'إشتراك الغرفة التجارية',
        document_name:' الاسم الاشتراك',
        document_id:'رقم الاشتراك'  ,
        start_document:'تاريخ بداية الاشتراك'  ,
        end_document: 'تاريخ إنتهاء الاشتراك'       
    },
    {
        document_type:'سجل تجاري',
        document_name:' الاسم السجل التجاري',
        document_id:'رقم السجل التجاري'  ,
        start_document:'تاريخ بداية السجل التجاري'  ,
        end_document: 'تاريخ إنتهاء السجل التجاري'       
    },
    {
        document_type:'شهادة الزكاة',
        document_name:' الاسم شهادة الزكاة',
        document_id:'رقم شهادة الزكاة'  ,
        start_document:'تاريخ بداية شهادة الزكاة'  ,
        end_document: 'تاريخ إنتهاء شهادة الزكاة'       
    },
    {
        document_type:'شموس',
        document_name:' الاسم شموس',
        document_id:'رقم شموس'  ,
        start_document:'تاريخ بداية شموس'  ,
        end_document: 'تاريخ انتهاء شموس'       
    },
    {
        document_type:'شهادات صحية',
        document_name:' الاسم الشهادة الصحية',
        document_id:'رقم الشهادة الصحية'  ,
        start_document:'تاريخ بداية الشهادة الصحية'  ,
        end_document: 'تاريخ انتهاء الشهادة الصحية'       
    },
    {
        document_type:'عقود الإيجار للغير',
        document_name:' الاسم عقد الإيجار',
        document_id:'رقم عقد الإيجار'  ,
        start_document:'تاريخ بداية عقد الإيجار'  ,
        end_document: 'تاريخ انتهاء عقد الإيجار'       
    },
    {
        document_type:'عقود صيانة',
        document_name:' الاسم عقد الصيانة',
        document_id:'رقم عقد الصيانة'  ,
        start_document:'تاريخ بداية عقد الصيانة'  ,
        end_document: 'تاريخ انتهاء عقد الصيانة'       
    },
    {
        document_type:'بوليصة تامين',
        document_name:'الاسم بوليصية التأمين',
        document_id:'رقم بوليصية التأمين'  ,
        start_document:'تاريخ بداية بوليصية التأمين'  ,
        end_document: 'تاريخ انتهاء بوليصية التأمين'       
    },
    {
        document_type:'أقساط البنك',
        document_name:"الاسم قسط البنك" ,
        document_id:'رقم قسط البنك'  ,
        start_document:'تاريخ بداية قسط البنك'  ,
        end_document: 'تاريخ انتهاء قسط البنك'       
    },
    {
        document_type:'ضمانات',
        document_name:'الاسم الضمانة',
        document_id:'رقم الضمانة'  ,
        start_document:'تاريخ بداية الضمانة'  ,
        end_document: 'تاريخ إنتهاء الضمانة'       
    },
    {
        document_type:'رخصة بناء',
        document_name:'الاسم رخصة بناء',
        document_id:'رقم رخصة البناء'  ,
        start_document:'تاريخ بداية رخصة بناء'  ,
        end_document: 'تاريخ انتهاء رخصة بناء'       
    },
    {
        document_type:'الدفاع المدني',
        document_name:'الاسم الدفاع المدني',
        document_id:'رقم الدفاع المدني'  ,
        start_document:'تاريخ بداية الدفاع المدني'  ,
        end_document: 'تاريخ انتهاء الدفاع المدني'       
    },
    {
        document_type:'مخططات',
        document_name:'الاسم مخططات',
        document_id:'رقم مخططات'  ,
        start_document:'تاريخ بداية مخططات'  ,
        end_document: 'تاريخ انتهاء مخططات'       
    },
    {
        document_type:'صك-وكالة',
        document_name:'الاسم صك وكالة',
        document_id:'رقم صك الوكالة'  ,
        start_document:'تاريخ بداية صك الوكالة'  ,
        end_document: 'تاريخ انتهاء صك الوكالة'       
    },
    {
        document_type:'شهادة اتمام بناء',
        document_name:'الاسم شهادة اتمام بناء',
        document_id:'رقم شهادة اتمام بناء'  ,
        start_document:'تاريخ بداية شهادة اتمام بناء'  ,
        end_document: 'تاريخ انتهاء شهادة اتمام بناء'       
    },
    {
        document_type:'علامة تجارية',
        document_name:' الاسم علامة تجارية' ,
        document_id:' رقم العلامة تجارية'  ,
        start_document:'تاريخ بداية علامة تجارية'  ,
        end_document: 'تاريخ انتهاء علامة تجارية'       
    },
    {
        document_type:'عقود الموظفين - معتمد',
        document_name:'الاسم عقود الموظفين-معتمد',
        document_id:'رقم عقود الموظفين-معتمد'  ,
        start_document:'تاريخ بداية عقود الموظفين-معتمد'  ,
        end_document: 'تاريخ انتهاء عقود الموظفين-معتمد'       
    },
    {
        document_type:'عقود الموظفين-تحت التجربة',
        document_name:'الاسم عقود الموظفين-تحت التجربة',
        document_id:'رقم عقود الموظفين-تحت التجربة'  ,
        start_document:'تاريخ بداية عقود الموظفين-تحت التجربة'  ,
        end_document: 'تاريخ انتهاء عقود الموظفين-تحت التجربة'       
    },
    {
        document_type:'تقنية المعلومات',
        document_name:' الاسم تقنية ',
        document_id:' رقم تقنية ',
        start_document:'تاريخ بداية تقنية'  ,
        end_document: 'تاريخ انتهاء تقنية'       
    },
    {
        document_type:'مالية',
        document_name:' الاسم مالية ',
        document_id:'رقم مالية'  ,
        start_document:'تاريخ بداية ماليه'  ,
        end_document: 'تاريخ انتهاء ماليه'       
    },
    {
        document_type:'الجودة والتميز',
        document_name:'الاسم جودة',
        document_id:'رقم جودة'  ,
        start_document:'تاريخ بداية جودة'  ,
        end_document: 'تاريخ انتهاء جودة'       
    },
    {
        document_type: 'مشاريع',
        document_name:'الاسم مشاريع',
        document_id:'رقم مشاريع'  ,
        start_document:'تاريخ بداية مشاريع'  ,
        end_document: 'تاريخ انتهاء مشاريع'       
    },
    {
        document_type: 'شوؤن إدارية',
        document_name:'الاسم شؤون إدارية',
        document_id:'رقم شؤون إدارية'  ,
        start_document:'تاريخ بداية شؤون إدارية'  ,
        end_document: 'تاريخ انتهاء شؤون إدارية'       
    },
    {
        document_type:'تأجير وتحصيل',
        document_name:'الاسم تأجير وتحصيل',
        document_id:'رقم تأجير وتحصيل'  ,
        start_document:'تاريخ بداية تأجير وتحصيل'  ,
        end_document: 'تاريخ إنتهاء تأجير وتحصيل'       
    },
    
    {
        document_type:'الأصول',
        document_name:'الاسم الأصول',
        document_id:'رقم الأصول'  ,
        start_document:'تاريخ بداية الأصول'  ,
        end_document: 'تاريخ إنتهاء الأصول'       
    },
    
    {
        document_type:'العنوان الوطني',
        document_name:'الاسم العنوان الوطني',
        document_id:'رقم العنوان الوطني'  ,
        start_document:'تاريخ بداية العنوان الوطني'  ,
        end_document: 'تاريخ انتهاء العنوان الوطني'       
    },
    
    {
        document_type:'عقود شراء المصاعد والضمانات',
        document_name:'الاسم عقود شراء المصاعد والضمانات',
        document_id:'رقم عقود شراء المصاعد والضمانات'  ,
        start_document:'تاريخ بداية عقود شراء المصاعد والضمانات'  ,
        end_document: 'تاريخ انتهاء عقود شراء المصاعد والضمانات'       
    },
    {
        document_type:'رخصة سيارة',
        document_name:'الاسم رخصة سيارة',
        document_id:'رقم رخصة سيارة'  ,
        start_document:'تاريخ بداية رخصة سيارة'  ,
        end_document: 'تاريخ انتهاء رخصة سيارة'       
    },
    {
        document_type:'مخططات الدفاع المدني',
        document_name:'الاسم مخططات الدفاع المدني',
        document_id:'رقم مخططات الدفاع المدني'  ,
        start_document:'تاريخ بداية مخططات الدفاع المدني'  ,
        end_document: 'تاريخ انتهاء مخططات الدفاع المدني'       
    },
    {
        document_type:'شهادات انهاء تركيب نظام السلامة',
        document_name:'الاسمم شهادات انهاء تركيب نظام السلامة',
        document_id:'رقم شهادات انهاء تركيب نظام السلامة'  ,
        start_document:'تاريخ بداية شهادات انهاء تركيب نظام السلامة'  ,
        end_document: 'تاريخ انتهاء شهادات انهاء تركيب نظام السلامة'       
    },
    {
        document_type:'مخطط توزيع الكاميرات',
        document_name:'الاسم مخطط توزيع الكاميرات',
        document_id:'رقم مخطط توزيع الكاميرات'  ,
        start_document:'تاريخ بداية مخطط توزيع الكاميرات'  ,
        end_document: 'تاريخ إنتهاء مخطط توزيع الكاميرات'       
    },
    {
        document_type:'عقود توريد وتركيب الكاميرات',
        document_name:'الاسم عقود توريد وتركيب الكاميرات',
        document_id:'رقم عقود توريد وتركيب الكاميرات'  ,
        start_document:'تاريخ بداية عقود توريد وتركيب الكاميرات'  ,
        end_document: 'تاريخ انتهاء عقود توريد وتركيب الكاميرات'       
    },
    {
        document_type:'شهادة انهاء تركيب الكاميرات',
        document_name:'الاسم شهادة انهاء تركيب الكاميرات',
        document_id:'رقم شهادة انهاء تركيب الكاميرات'  ,
        start_document:'تاريخ بداية شهادة انهاء تركيب الكاميرات'  ,
        end_document: 'تاريخ انتهاء شهادة انهاء تركيب الكاميرات'       
    },
    {
        document_type:'شهادة انجاز الشرطه',
        document_name:'الاسم شهادة انجاز الشرطه',
        document_id:'رقم شهادة انجاز الشرطه'  ,
        start_document:'تاريخ بداية شهادة انجاز الشرطه'  ,
        end_document: 'تاريخ انتهاء شهادة انجاز الشرطه'       
    },
    {
        document_type:'شهادة مقاومة الكلادنج للحريق',
        document_name:'الاسم شهادة مقاومة الكلادنج للحريق',
        document_id:'رقم شهادة مقاومة الكلادنج للحريق'  ,
        start_document:'تاريخ بداية شهادة مقاومة الكلادنج للحريق'  ,
        end_document: 'تاريخ انتهاء شهادة مقاومة الكلادنج للحريق'       
    },
    {
        document_type:'تقرير سلامة المباني',
        document_name:'الاسم تقرير سلامة المباني',
        document_id:'رقم تقرير سلامة المباني'  ,
        start_document:'تاريخ بداية تقرير سلامة المباني'  ,
        end_document: 'تاريخ انتهاء تقرير سلامة المباني'       
    },
    {
        document_type:'التصميم',
        document_name:'الاسم التصميم',
        document_id:'رقم التصميم'  ,
        start_document:'تاريخ بداية التصميم'  ,
        end_document: 'تاريخ انتهاء التصميم'       
    },
  
]