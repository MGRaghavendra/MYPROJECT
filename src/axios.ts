import axios,{AxiosInstance,AxiosResponse,AxiosError} from "axios"
import { fetchdata } from "./fetchapi"
import { initJsoninterface } from "./shared";
import qs from 'qs'
import getConfig from "next/config";
type axiostype = AxiosInstance
interface dynamicobject {
    [key:string]:string | number | boolean,
}
interface axiosgetparams{
    url:string,
    params?:dynamicobject
    headers?:dynamicobject
} 

const {publicRuntimeConfig} = getConfig();



export const Axios:axiostype  = axios.create({
    baseURL:publicRuntimeConfig.baseURL,
})

// export function setaxiosInstance(url:string,callback?:()=>{}):void{
   
//         Axios = axios.create({
//             baseURL:url,
//         })
//         if(typeof callback == 'function'){
//             callback();
//         }
// }

export async function axiosget<T>(config:axiosgetparams):Promise<T | void>{
    // console.log(config)
    if(Axios){
      try{
        let response:AxiosResponse<T> = await Axios.get<T>(config.url,{
            headers:config.headers,
            params:config.params
        })
        let data = response.data
        return data
      }
      catch(err){
        if(err instanceof Error){
            throw new Error(err.message)
        }
      }
    }
    else{
        // let baseapis = await fetchdata("https://paas-init.revlet.net/clients/firstshows/init/live/firstshows.json")
        // setaxiosInstance(baseapis.api,()=>axiosget(config));
    }
}

export async function axiosPost<T>(config:axiosgetparams, payload:any):Promise<T | null > {
    if(Axios) {
        try{
            let response:AxiosResponse<T> = await Axios.post<T>(config.url,payload,{
                headers:config.headers,
                params:config.params
            })
            let data = response.data;
            console.log(data)
            return data
        } catch(err) {
            if(err instanceof Error){
                throw new Error(err.message)
            }
        }
    }
    return null;
}
