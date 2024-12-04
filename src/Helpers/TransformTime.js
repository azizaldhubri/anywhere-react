export default function TransformTime(date){
    const selectedDate=new window.Date(date);
    const getFullYear=selectedDate.getFullYear();
    const getMonth=(selectedDate.getMonth()+1).toString().padStart(2,'0');
    const getDate=selectedDate.getDate().toString().padStart(2,'0');
    const getHours=selectedDate.getHours().toString().padStart(2,'0');
    const getMinutes=selectedDate.getMinutes().toString().padStart(2,'0');

   
    return `${getFullYear}-${getMonth}-${getDate} ${getHours}:${getMinutes} ${getHours >=12 ?'PM':'AM'}`
    // return `${getDate}-${getMonth}-${getFullYear}`

} 