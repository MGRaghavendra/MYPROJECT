import axios,{AxiosInstance,AxiosResponse,AxiosError} from "axios"

type axiostype = null | AxiosInstance
interface dynamicobject {
    [key:string]:string | number | boolean,
}
interface axiosgetparams{
    url:string,
    params?:dynamicobject
    headers?:dynamicobject
} 

export let Axios:axiostype  = null

export function setaxiosInstance(baseurl:string):void{
    Axios = axios.create({
        baseURL:baseurl,
    })
}

export async function axiosget<T>(config:axiosgetparams):Promise<T | void >{
    if(Axios){
      try{
        let response:AxiosResponse<T> = await Axios.get<T>(config.url,{
            headers:config.headers,
            params:config.params
        })
        let data = response.data
        // console.log(data)
        return data
      }
      catch(err){
        if(err instanceof Error){
            throw new Error(err.message)
        }
      }
    }
}
