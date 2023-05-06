import { fetchdata } from "./fetchapi";
import { initJsoninterface } from "./shared";
import { Axios,axiosget, } from "./axios";
import getConfig from "next/config";

export const getBaseApi = async ():Promise<string>=>{
    const {publicRuntimeConfig} = getConfig()
    return publicRuntimeConfig.baseURL;
}

// export const systemconfigapi = async(url,headers)=>{
//     console.log(url,headers)
//     let data = await fetchdata(
//         // `${base_url}/service/api/v1/system/config`,
//         url,
//         headers
//     )
//     return data
// }


export async function systemconfigapi(headers:any):Promise<string | void> {
      try {
        let response = await axiosget<any>({
          url:"service/api/v1/system/config",
          headers:headers
        });
        if (response?.status) {
          localStorage?.setItem("systemconfigs", JSON.stringify(response.response));
          localStorage?.setItem("resourceProfiles", JSON.stringify(response.response.resourceProfiles));
          return response.response;
        } 
      } catch (err) {
        console.log(err);
      }
    }

  export async function systemfeaturesapi(headers:any):Promise<string | void> {
    
      try {
        let response = await axiosget<any>({
          url:"service/api/v1/system/feature",
          headers:headers
        });
        if (response?.status) {
          localStorage.setItem(
            "systemfeature",
            JSON.stringify(response.response)
          );
          return response.response;
        }
        return 'done from features..'
      } catch (err) {
        console.log(err);
      }
  }