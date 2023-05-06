import { systemconfigapi, systemfeaturesapi } from "./api"
import { getFromlocalStorage } from "./utils"
import {default as clientCookie} from "js-cookie"

export const initClient = async ()=>{
    let systemConfigs = getFromlocalStorage('systemConfigs');
    let systemfeature = getFromlocalStorage('systemfeature');
    console.log('csdcsdc')
    if(!systemConfigs){
        systemConfigs = await systemconfigapi({
            "box-id":clientCookie.get('boxId'),
            "session-id":clientCookie.get('sessionId'),
            "tenant-code":clientCookie.get('tenantCode')
        }) || ""
    }
    if(!systemfeature){
        systemfeature = await systemfeaturesapi({
            "box-id":clientCookie.get('boxId'),
            "session-id":clientCookie.get('sessionId'),
            "tenant-code":clientCookie.get('tenantCode')
        }) || ""
    }
    return "done initClient"
}


