interface appConfig {
    [key:string]:string
}
export const appConfig:appConfig={
    'cloudpath':'https://d2ivesio5kogrp.cloudfront.net/static/yvs',
    'bannerImgpath':'https://d229kpbsb5jevy.cloudfront.net/yvsimages'
}

export function setappconfig(key:string,value:string){
    appConfig[key] = value
}