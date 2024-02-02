
import {default as clientCookie} from "js-cookie";
import getConfig from "next/config";
import { scrollcardsInterface } from "./shared";


let appConfig = getConfig().publicRuntimeConfig.appconfig



export function isclient():boolean{
    return (typeof window == "undefined")?false:true
}

export function isserver():boolean{
    return (typeof window == "undefined")?true:false
}

export function getBoxId():string{
    function GUID():string{
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        var box_ID = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        return box_ID;
    }
    return GUID();
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

export function getscrollproperties(cardType: keyof scrollcardsInterface, screenwidth: number): { screenwidth: number, paddingLeft: number, marginRight: number} {
    let scrollcards: scrollcardsInterface = {
        overlay_poster: [
            { screenwidth: 1920, paddingLeft: 48, marginRight: 10},
            { screenwidth: 1440, paddingLeft: 48, marginRight: 10},
            { screenwidth: 1366, paddingLeft: 48, marginRight: 7},
            { screenwidth: 1199, paddingLeft: 20, marginRight: 7},
            { screenwidth: 1024, paddingLeft: 20, marginRight: 14},
            { screenwidth: 991, paddingLeft: 10, marginRight: 7},
            { screenwidth: 950, paddingLeft: 10, marginRight: 4},
            { screenwidth: 767, paddingLeft: 10, marginRight: 4},
            { screenwidth: 576, paddingLeft: 10, marginRight: 4},
            { screenwidth: 480, paddingLeft: 15, marginRight: 4},
            { screenwidth: 425, paddingLeft: 15, marginRight: 4},
            { screenwidth: 380, paddingLeft: 15, marginRight: 4},
            { screenwidth: 320, paddingLeft: 15, marginRight: 4},
        ]
    }
    let scrollsonfigs: scrollcardsInterface[keyof scrollcardsInterface] = scrollcards[cardType].reverse();
    return scrollsonfigs.filter((configs) => (configs.screenwidth >= screenwidth))[0]
}

export function section_render_configs(cardType: string, screenwidth:number){
    console.log(cardType,screenwidth)
    let confgis = {
        'overlay_poster':[
            { screenwidth: 1920, paddingLeft: 48, paddingRight: 48,no_of_cards:6.15 ,margin:10},
            { screenwidth: 1440, paddingLeft: 48, paddingRight: 48,no_of_cards: 6 ,margin:10},
            { screenwidth: 1366, paddingLeft: 48, paddingRight: 48,no_of_cards: 5.22 ,margin:7},
            { screenwidth: 1199, paddingLeft: 20, paddingRight: 20,no_of_cards: 5.1 ,margin:7},
            { screenwidth: 1024, paddingLeft: 20, paddingRight: 20,no_of_cards: 4.1 ,margin:14},
            { screenwidth: 991, paddingLeft: 10, paddingRight: 10,no_of_cards: 4.07 ,margin:7},
            { screenwidth: 950, paddingLeft: 10, paddingRight: 10,no_of_cards: 3 ,margin:4},
            { screenwidth: 767, paddingLeft: 10, paddingRight: 10,no_of_cards: 3 ,margin:4},
            { screenwidth: 576, paddingLeft: 10, paddingRight: 10,no_of_cards: 2 ,margin:4},
            { screenwidth: 480, paddingLeft: 15, paddingRight: 15,no_of_cards: 2 ,margin:4},
            { screenwidth: 425, paddingLeft: 15, paddingRight: 15,no_of_cards: 2 ,margin:4},
            { screenwidth: 380, paddingLeft: 15, paddingRight: 15,no_of_cards: 2 ,margin:4},
            { screenwidth: 320, paddingLeft: 15, paddingRight: 15,no_of_cards: 2 ,margin:4},
        ],
        'sheet_poster':[
            { screenwidth: 1920, paddingLeft: 48, paddingRight: 48, no_of_cards: 6.15, margin: 10 },
            { screenwidth: 1440, paddingLeft: 48, paddingRight: 48, no_of_cards: 6, margin: 10 },
            { screenwidth: 1366, paddingLeft: 48, paddingRight: 48, no_of_cards: 5.22, margin: 7 },
            { screenwidth: 1199, paddingLeft: 20, paddingRight: 20, no_of_cards: 5.1, margin: 7 },
            { screenwidth: 1024, paddingLeft: 20, paddingRight: 20, no_of_cards: 4.1, margin: 14 },
            { screenwidth: 991, paddingLeft: 10, paddingRight: 10, no_of_cards: 4.07, margin: 7 },
            { screenwidth: 950, paddingLeft: 10, paddingRight: 10, no_of_cards: 3, margin: 4 },
            { screenwidth: 767, paddingLeft: 10, paddingRight: 10, no_of_cards: 3, margin: 4 },
            { screenwidth: 576, paddingLeft: 10, paddingRight: 10, no_of_cards: 2, margin: 4 },
            { screenwidth: 480, paddingLeft: 15, paddingRight: 15, no_of_cards: 2, margin: 4 },
            { screenwidth: 425, paddingLeft: 15, paddingRight: 15, no_of_cards: 2, margin: 4 },
            { screenwidth: 380, paddingLeft: 15, paddingRight: 15, no_of_cards: 2, margin: 4 },
            { screenwidth: 320, paddingLeft: 15, paddingRight: 15, no_of_cards: 2, margin: 4 },
        ]
    }
    let section_onfigs = confgis[cardType]?.reverse();
    return section_onfigs.filter((configs) => (configs.screenwidth >= screenwidth))[0]
}

export function getCardRatio(cardType: string) {
    switch (cardType) {
        case "roller_poster":
            return 0.6666666666666667;
        case "overlay_poster":
        case "overlayIcon_poster":
        case "sheet_poster":
            //0.5625 is the heigth / width value eg(9:16)
            return 0.5625;
        default:
            return 0;
            break;
    }
}