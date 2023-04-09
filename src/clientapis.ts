import { systemconfigapi, systemfeaturesapi } from "./api"
import { getFromlocalStorage ,getplatform,getBoxId} from "./utils"
import {default as clientCookie} from "js-cookie"
import getConfig from "next/config";
import { fetchdata } from "./fetchapi";


export const isThere = (key:string)=>{
    if(!getFromlocalStorage(key) || !clientCookie.get(key)){
        return false;
    }
    return true
}

export const getsystemConfigs = async ()=>{
    let systemConfigs = getFromlocalStorage('systemconfigs')
    let systemConfigsobj = systemConfigs ? JSON.parse(systemConfigs) : {};
    if(systemConfigs && systemConfigsobj.expireTime > new Date().getTime()){
        return systemConfigsobj;
    }
    else{
       systemConfigs = await systemconfigapi({
            "box-id":clientCookie.get('boxId'),
            "session-id":clientCookie.get('sessionId'),
            "tenant-code":clientCookie.get('tenantCode')
        }) || "" 
       systemConfigsobj = JSON.parse(systemConfigs)
       return systemConfigsobj
    }
}

export const getsystemFeature = async ()=>{
    let systemfeature = getFromlocalStorage('systemfeature')
    let systemfeatureobj = systemfeature ? JSON.parse(systemfeature) : {};
    if(systemfeature && systemfeatureobj.expireTime > new Date().getTime()){
        return systemfeature;
    }
    else{
        systemfeature = await systemfeaturesapi({
            "box-id":clientCookie.get('boxId'),
            "session-id":clientCookie.get('sessionId'),
            "tenant-code":clientCookie.get('tenantCode')
        }) || "" 
        console.log(systemfeature)
        systemfeatureobj = JSON.parse(systemfeature)
       return systemfeatureobj
    }
}

export const checkTokens = async function(){
    if (!isThere("boxId") || !isThere("sessionId") || !isThere("tenantCode")) {
      const { publicRuntimeConfig } = getConfig();

      let initJson = await fetchdata(publicRuntimeConfig.initJson);

      let locationinfo = await fetchdata(
        `${initJson.api}/service/location/api/v1/locationinfo?tenant_code=${
          initJson.tenantCode
        }&product=${initJson.product}&client=${getplatform(
          navigator.userAgent
        )}`
      );

      let boxId = getBoxId();

      let sessionTokeninfo = await fetchdata(
        ` ${initJson.api}/service/api/v1/get/token?tenant_code=${initJson.tenantCode}&box_id=${boxId}&product=${initJson.product}&device_id=5&display_lang_code=ENG&device_sub_type=Chrome,111.0.0.0,Windows&timezone=Asia/Calcutta`
      );
      let sessionId =
        sessionTokeninfo.status == true
          ? sessionTokeninfo.response.sessionId
          : "NA";
      let tenantCode = initJson.tenantCode;
      localStorage.setItem("sessionId", sessionId);
      localStorage.setItem("boxId", boxId);
      localStorage.setItem("tenantCode", tenantCode);
      localStorage.setItem("locationinfo", JSON.stringify(locationinfo));

      clientCookie.set("sessionId", sessionId);
      clientCookie.set("boxId", boxId);
      clientCookie.set("tenantCode", tenantCode);
      
    }
}

export const Init = async ()=>{
    await checkTokens()
    let systemconfigs = await getsystemConfigs();
    await getsystemFeature();
    return{systemconfigs}
}

