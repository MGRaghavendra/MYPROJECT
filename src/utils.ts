import { systemconfigs, systemfeatures, loactionapi } from "./init";

function GUID():string{
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    var box_ID = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    return box_ID;
}

export function getBoxId():string{
    let boxId = localStorage.getItem('box-id')
    if(boxId !== null){
        return boxId
    }
    else{
        boxId = GUID();
        localStorage.setItem('box-id',boxId)
        return boxId
    }
}

export function setSessionToken(key:string, value:any):string | void{
    return localStorage.setItem(key,value)
}

export function getsessionToken():string | null{
    return localStorage.getItem('session-id')
}

export function getFromlocalStorage(key:string):string | null{
    return localStorage.getItem(key)
}



export const retriveSession = () => {
    let initjson = getFromlocalStorage('initjson');
    let sessionId = getsessionToken(); 
    let boxId= getFromlocalStorage('box-id');
    let locationData = getFromlocalStorage('location');
    let systemconfig: string | any = getFromlocalStorage('systemconfigs');
    let systemfeature = getFromlocalStorage('systemfeature');
    if (!!systemconfig?.menus || !!!systemfeature) {
        systemconfigs();
        systemfeatures();
    }
    if (!locationData) {
        loactionapi();
    }

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