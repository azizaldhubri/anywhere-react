import * as XLSX from 'xlsx';
 

 
export default function ExportExcel(props){
  
const columns =props.header

const data=props.data ;
const fileName='employees'

    const exportSelectedColumnsToExcel = (fileName) => {
        // استخراج الأعمدة المحددة من البيانات
        const selectedData = data.map(row => {
          const newRow = {};
          columns.forEach(column => {
            newRow[column.name] = row[column.key] ;
          });
          return newRow;
        });
        
        // تحويل البيانات إلى ورقة عمل
        const worksheet = XLSX.utils.json_to_sheet(selectedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Data');
         
        
        // تصدير الملف
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
      };
      return(
        <div>
          <button className='btn btn-primary' onClick={exportSelectedColumnsToExcel}>exportExcel</button>
        </div>
      )
}
 