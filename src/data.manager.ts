export const getdata = (data:any,type:string)=>{
    return data.filter((data:any)=>data.paneType == type)
}