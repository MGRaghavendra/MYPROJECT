import { appConfig } from "./appconfig";
import {default as clientCookie} from "js-cookie";


function GUID():string{
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    var box_ID = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    return box_ID;
}

export function isclient():boolean{
    return (typeof window == "undefined")?false:true
}

export function isserver():boolean{
    return (typeof window == "undefined")?true:false
}

export function getBoxId():string{
    if(isclient()){
        let boxId = clientCookie.get('boxId')
        if(boxId){
            return boxId
        }
        else{
            return ''
        }
    }
    else{
        return GUID();
    }
}

export function setSessionToken(key:string, value:any):string | void{
    return localStorage.setItem(key,value)
}

export function getsessionToken():string | null{
    if(appConfig.sessionId != undefined){
        return appConfig.sessionId
    }
    return localStorage.getItem('session-id')
}

export function getFromlocalStorage(key:string):string | null{
    return localStorage.getItem(key)
}




export const getAbsolutPath = (resourcePath:any) =>{
    if (resourcePath.indexOf('http://') == '0' || resourcePath.indexOf('https://') == '0') {
			return resourcePath
		}
		else if (resourcePath.split(',').length == 2) {
			let arr = resourcePath.split(',');
			let profile = getProfile(arr[0]);
			return profile +  arr.slice(1,arr.length).join();
		}
		else {
            console.log(getProfile() + resourcePath)
			return getProfile() + resourcePath;
		}
}

const getProfile = (resource?: string) => {
    let resourceProfiles = JSON.parse(localStorage.getItem("resourceProfiles") || '{}');
    if (!!resource) {
        for (let i = 0; i < resourceProfiles.length; i++) {
            if (resource === resourceProfiles[i].code) {
                return resourceProfiles[i].urlPrefix;
            }
        }
    }
    else {
        for (let i = 0; i < resourceProfiles.length; i++) {
            if (resourceProfiles[i].isDefault) {
                return resourceProfiles[i].urlPrefix;
            }
        }
    }
}

export function getplatform(userAgent:string){
    if(userAgent.indexOf('mobile')>-1){
        return 'mobileweb';
    }
    return 'web'
} 

