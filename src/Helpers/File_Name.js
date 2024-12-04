export default function File_Name(item,i){

    const nameFile=[];
    const pathFile=[];
    // let parts=[]
    
    
    
      const lastDotIndex = item.lastIndexOf('.');       
           
      const afterLastDot = item.substring(0, lastDotIndex );   
      const digitMatch = afterLastDot.match(/\d+/);
     
      let parts = item.split('assets/'); // تقسيم السلسلة النصية باستخدام المسافة كفاصل
      pathFile[i]=(parts[parts.length - 1]);
      
      // console.log(file.slice(0,'asstes'))
      if (digitMatch) {
          const address= afterLastDot.substring( afterLastDot.indexOf(digitMatch[0]) + digitMatch[0].length+1);   
          nameFile[i]=address;
          
      }
   
    // return `${getFullYear}-${getMonth}-${getDate}`
    return nameFile[i];
 

} 