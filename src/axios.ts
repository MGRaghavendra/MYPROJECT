import axios,{AxiosInstance,AxiosResponse} from "axios"
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

export async function axiosget<T>(config:axiosgetparams):Promise<T>{
        let response:AxiosResponse<T> = await Axios.get<T>(config.url,{
            headers:config.headers,
            params:config.params
        })
        return response.data
}

export async function axiosPost<T>(config:axiosgetparams, payload:any):Promise<T> {
            let response:AxiosResponse<T> = await Axios.post<T>(config.url,payload,{
                headers:config.headers,
                params:config.params
            })
            let data = response.data;
            return data
}
