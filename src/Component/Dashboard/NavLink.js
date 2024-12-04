import { faPlus, faUsers, faCartShopping, faTruckFast } from '@fortawesome/free-solid-svg-icons'
 

export const Links=[
    {
        name:'إدارة الموارد البشرية',
        path:'users',
        icon:faUsers,
        role:['1995','2001','2002']
        
    },
    {
        name:'Users',
        path:'users',
        icon:faUsers,
        role:['1995','2001','2002']
        
    },
    {
        name:'Add User',
        path:'user/add',
        icon:faPlus,
        role:'1995'        
    }
    
    ,
    {
        name:'Taskes',
        path:'taskes',
        icon:faPlus,
        role:'1995'        
    },  
 
  
    {
        name:'Writer',
        path:'writer',
        icon:faPlus,
        role:['1995' ,'1996']        
    },
   
];

export const taplink=[
   {maintitle:'إدارة الموارد البشرية',link:'#',
    permission:'موارد بشرية',
     img:'Mask Group 75.png',   
    subtitle:[
         
        { title: "الموارد البشرية",link:'#',img:'Mask Group 75.png', 
            details: [{link:'users',title:'الموظفين'}, {link:'EmployeeApp',title:'تطبيقات التوظيف'},
                {link:'Requestleave',title:'طلب مغادرة'}, {link:'LeaveBalance',title:'رصيد الإجازات'},
                {link:'Vacations',title:'الإجازات'},{link:'SuspensionRequests',title:'طلبات التوقيف'},{link:'StaffTransfer',title:'نقل الموظفين'}] 
       },
    
       { title: "تهيئة بيانات الموظفين الأساسيين",link:'#', img:'Mask Group 75.png', 
           details: [{link:'#',title:'جهات التواصل'}, {link:'#',title:'أنواع الهويات'},{link:'#',title:'الجنسيات'},
            {link:'#',title:'أنواع المؤهلات'}, {link:'#',title:'الديانات'},{link:'#',title:'الحالات الاجتماعية'}, {link:'#',title:'المناطق'}, 
            {link:'#',title:'مجالات الشركات'},
             {link:'#',title:'الشركات'},{link:'#',title:'الأداء'},{link:'#',title:'البنوك' }] 
       },
    
    
       { title: "تهيئة التوظيف",link:'#',img:'Mask Group 75.png', 
            details: [{link:'#',title:'أنواع الوظائف'}, {link:'#',title:'المستويات الوظيفية'},
                {link:'#',title:'المناصب الوظيفية'},
           {link:'#',title:' الدرجات الوظيفية'},{link:'#',title:'حالة التوظيف'},{link:'#',title:'الفئات الوظيفية'} ] 
       },
    
       { title: "تهيئة الحالات والموافقة",link:'#',img:'Mask Group 75.png', 
            details: [{link:'#',title:'جهات الموافقة'}, {link:'#',title:'حالات الطلبات'},{link:'#',title:"جداول المهام"},
                {link:'#',title:'تخصيص جهات الموافقة'},{link:'#',title:"تخصيص حالات الطلب"},{link:'#',title:"الأسباب"} , ] 
       },
    
    
       { title: "الإجازات",link:'#',img:'Mask Group 75.png', 
            details: [{link:'#',title:'أنواع عمليات الاجازات'}, {link:'#',title:'أرصدة الإجازات العامة للفئات'},{link:'#',title:"ارصدة الإجازات العامة للموظفين"},
           {link:'#',title:'أنواع الإجازات'},{link:'#',title:"أنواع المغادرة"} ] 
       },
    
    
       { title: "الشؤون الأكاديمية",link:'#',img:'Mask Group 75.png', 
            details: [{link:'#',title:'التخصصات العلمية'}, {link:'#',title:'الدورات العلمية'},
                {link:'#',title:"المؤسسات العلمية"},{link:'#',title: "الجامعات"} ] 
       },
    
       { title: "شؤون الموظفين",link:'#', img:'Mask Group 75.png', 
           details: [{link:'#',title:'الرئيسية'},{link:'#',title:'الاقسام'},
            {link:'#',title:'الموظفين'},{link:'#',title:'استحقاقات واستقطاعات'},{link:'#',title:'السلف'},
            {link:'#',title:'كشف الرواتب'},{link:'#',title:'الرواتب'},   {link:'#',title:'البصمه ومعالجة الحضور'},
            {link:'#',title:'رصيد الإجازات' },   {link:'#',title:'طلبات الإجازات'},
            {link:'#',title:'طلبات الإجازات'},{link:'#',title:'الحضور والغياب'},{link:'#',title:'حضور الموقع'}, ] 
       },
   ]},

   
   {maintitle:'المهام',link:'#', permission:'مهام الإدارات',img:'Mask Group 78.png' ,   
    subtitle:[{link:'addtask',title:'جديد'}, {link:'Taskes1',title:'الوارد'},
        {link:'#',title:'المشتركة'},{link:'addtask',title:'المهمة'} ,
        {link:'#',title:'المنجزة'},{link:'addtask',title:'خطة عمل'}    
               
   ]},

   {maintitle:'المستندات',permission:'المستندات',img:'Mask Group 73.png',    
    subtitle:[      
       {link:'AddDocument',title:"اضافة مستند"
        ,role:['1995','2001']},{link:'documents',title:"استعراض"},{link:'OrderDocument',title:"سندات الأمر" }      
   ]},

   {maintitle:'الجوده',permission:'الجودة', img:'Mask Group 73.png',   
    subtitle:[      
        {link:'Qualitydocuments',title:"مستندات الجودة"},{link:'DocumentConformity',title:"حالات عدم المطابقة"},
        {link:'DevelopmentDocuments',title:"اقتراح / تطوير /تحسين" },{link:'ComplaintDoc',title:"شكاوى العملاء" }     
   ]},

   {maintitle:'التكيرات الدورية',permission:'المستندات الدورية', img:'notedtask.png', },

   {maintitle:'العقود',permission:'العقود',    img:'Mask Group 71.png', 
    subtitle:[      
        {link:'AddContracts',title:"اضافة عقد"},{link:'ShowContracts',title:"استعراض"},{link:'#',title:"اضافة مستأجر"} ,
       { link:'#',title:"استعراض المستأجرين"}, {link:'#',title:"انواع التأجير"},
       {link:'#', title:"مراسلة العملاء" },{link:'#',title:"المتابعات القانونية"},      
   ]},

   {maintitle:'الوحدات',permission:'الوحدات',   img:'Mask Group 82.png',  
    subtitle:[      
        {link:'#',title:"اضافة وحده"},{link:'#',title:"استعراض"},
        {link:'#',title:"المشاريع"} ,{link:'#',title:"الملاك"},           
   ]},



   {maintitle:'النظام المحاسبي', permission:'النظام المحاسبي', img:'Mask Group 71.png', 
        subtitle:[       
                { title: "الحسابات",link:'#', img:'Mask Group 71.png', 
                    details: [{link:'#',title:'الأرصدة الافتتاحيه'}, {link:'#',title:' دليل الحسابات'}, ] 
                } ,

            { title: "المخزون",link:'#', img:'Mask Group 71.png', 
                details: [{link:'#',title:'الوحدات'} , {link:'#',title:'شجرة الاسهم'}, ] 
                } ,   
            { title: "العمليات",link:'#', img:'Mask Group 71.png', 
                details: [{link:'#',title:'سندات القيد'}  , {link:'#',title:'اشعارات دائن ومدين'} ,{link:'#',title:'سندات القبض'} ,{link:'#',title:'سندات الصرف'} ,
                    {link:'#',title:'الإهلاك السنوي'} ,{link:'#',title:'تحويلات بنكية'} , ] 
                } , 
            { title:"مركز التكلفه ",link:'#'},{ title:'الفواتير',link:'#'} ,{ title:'اشعار فاتورة',link:'#'} ,

            { title: "الفاتورة الإلكترونية",link:'#', img:'Mask Group 71.png', 
                details: [{link:'#',title:'الفواتير الإلكترونية' }, {link:'#',title:'الدول'},{link:'#',title:'العناوين'},{link:'#',title:'الأطراف'} ] 
                } ,

            { title: "تقارير الحسابات",link:'#', img:'Mask Group 71.png', 
                details: [{link:'#',title:'كشف حساب'} , {link:'#',title:'كشف حساب مستأجر'},
                    {link:'#',title:'تقرير السيولة المتاحة'},{link:'#',title:'الميزانية العمومية'},
                    {link:'#',title:'الالتزامات الشهرية'},{link:'#',title:'ميزان المراجعة'},
                        {link:'#',title:'القيود المرحلة'},{link:'#',title:'قائمة الدخل'},
                            {link:'#',title:'تقرير القيود'},
                    {link:'#',title:'رصيد عمر الدين'}
                 ] 
                } ,

            { title: "اعدادات الحسابات",link:'#',img:'Mask Group 71.png', 
                details: ['العملات','البنوك','الشركات','العملاء','الصناديق','السنوات المالية',
                    'الضرائب','حالات الحساب','الأنواع الفرعية','التصنيفات الرئيسيه','تصنيف الحساب',
                    'مجموعات الحسابات','تدفق الحسابات','مستويات الحسابات','أنواع التقارير','الإعدادات' ] 
                } ,

        ]
    },
    

   {maintitle:'الإعدادات',permission:'الصلاحيات',  img:'Mask Group 83.png',   
    subtitle:[  
        {title: "المستخدمين",link:'users', },{title: "الصلاحيات",link:'Role' },
        {title: "نموذج جديد",link:'#', },{title: "ادارة النماذج",link:'#' },
        {title: "محرر العقود",link:'#', },{title: "إعدادات المهام",link:'#' },
        {title: "إعدادات عامة",link:'#', }, 
            
   ]},


   {maintitle:'داش بورد التحصيل',permission:'إيرادات المشاريع',link:'#',img:'Mask Group 73.png', },

   {maintitle:'التقارير',link:'#',permission:'التقارير',img:'Mask Group 80.png', },



]
 
