export const dateFormatter =(date:string)=>{
    const dateObj = new Date(date);
  
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // Month is zero-based
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }