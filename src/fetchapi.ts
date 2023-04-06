export async function fetchdata(url:string,headers?:{[key:string]:string,}){
    const response = await fetch(url,{
      headers:headers || {}  
    });

    const jsonData = await response.json();
    return jsonData
}