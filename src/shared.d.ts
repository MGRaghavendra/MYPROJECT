export interface initJsoninterface {
  api: string
  heURL: string
  isSupported: boolean
  location: string
  otpURL: string
  pgURL: string
  product: string
  search: string
  tenantCode: string
}

export interface menuInterface {
  code: string;
  description: string;
  displayText: string;
  geoRuleId: number;
  iconUrl: string;
  isClickable: boolean;
  params: any;
  submenus: menuInterface[];
  targetPath: string;
  targetType: string;
}

export interface bannerInterface {
  subtitle?: string;
  title?: string;
  buttonText?: string;
  code?: string;
  id?: number;
  imageUrl: string;
  isInternal?: boolean;
  metadata?: any;
  params?: {
    licenseKey?: string;
    streamProvider?: string;
    streamUrl?: string;
  };
  target?: {
    pageAttributes?: any;
    pageType?: string;
    path?: string;
  };
}

export interface cardInterface {
  
}

export interface seoInterface{
  title?:string;
  description:?string;
  keywords?:string;
  metaTags?:{
    tagType?:string;
    tagName?:string;
    content?:string
  }[]
}

export interface pagecontextInterface{
  banners:bannerInterface[]
  sections:any[]
  info:{
      attributes?: {}
      code?: string
      pageType?:string
      path?:string
  }
  content:any[]
}
  
export interface usercontextInterface{
  menus: menuInterface[];
  systemconfigs:{},
  userDetails:{},
}
