export default function DateMilady(date){

          

    const selectedDate=new window.Date(date);
    const getFullYear=selectedDate.getFullYear();
    const getMonth=(selectedDate.getMonth()+1).toString().padStart(2,'0');
    // const getMonth = monthsInArabic[selectedDate.getMonth()];
    // const getday = days[selectedDate.getDay()];
    const getDate=selectedDate.getDate().toString().padStart(2,'0');
 

   
    return `${getFullYear}-${getMonth}-${getDate}`
    // return `${getDate}-${getMonth}-${getFullYear}`
    // return `${getday},${getDate}-${getMonth}-${getFullYear}`

}              