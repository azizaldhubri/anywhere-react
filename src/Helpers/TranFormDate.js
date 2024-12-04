export default function TranFormDate(date){

    const monthsInArabic = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
      ];
   
      const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

    const selectedDate=new window.Date(date);
    const getFullYear=selectedDate.getFullYear();
    // const getMonth=(selectedDate.getMonth()+1).toString().padStart(2,'0');
    const getMonth = monthsInArabic[selectedDate.getMonth()];
    const getday = days[selectedDate.getDay()];
    const getDate=selectedDate.getDate().toString().padStart(2,'0');
 

   
    // return `${getFullYear}-${getMonth}-${getDate}`
    // return `${getDate}-${getMonth}-${getFullYear}`
    return `${getday},${getDate}-${getMonth}-${getFullYear}`

}              