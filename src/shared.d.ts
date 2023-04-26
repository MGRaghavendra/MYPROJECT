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

export interface responseInterface{
  status: boolean,
  response?:any,
  error?: {
    code: number,
    type: string,
    message: string,
    details: {}
  }
}

export interface configsandfeaturesInterface extends responseInterface{
  expireTime?:number
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
  metadata?: {};
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

export interface useDetailsInterface{

}

interface featureInterface{
  code?:string;
  description?:string;
  id?:number;
  imageUrl?:string;
  tittle?:string;
}


export interface systemFeaturesInterface{
  encryptApisList?:{
    feature:featureInterface;
    fields:{
      payment?:string;
      signin?:string;
      signup?:string;
      stream?:string;
    }
  };
  globalsettings?:{
    feature:featureInterface;
    fields:{
      isEmailSupported:string;
      isMobileSupported:string;
    }
  };
  maxconcurrentstreams?:{
    feature:featureInterface;
    fields:{}
  };
  otpauthentication?:{
    feature:featureInterface;
    fields:{
      forgot_password_identifier_type?:string;
      is_verify_count_update_for_otp?:string;
      is_verify_update_for_verify_otp?:string;
      is_verify_update_for_verify_otp_update_email?:string;
      is_verify_update_for_verify_otp_update_mobile?:string;
      max_otp_resend_attempts?:string;
      otp_expiry_duration_in_minutes?:string;
      otp_length?:string;
      otp_resend_time?:string;
      otp_verification_order?:string;
      signin_otp_mandatory?:string;
      signin_otp_skippable?:string;
      signin_otp_verification_type?:string;
      signup_otp_mandatory?:string;
      signup_otp_skippable?:string;
      verification_type_for_email_update?:string;
      verification_type_for_mobile_update?:string;
      verify_otp_for_email_update?:string;
      verify_otp_for_mobile_update?:string;
    }
  };
  parentalcontrol?:{
    feature:featureInterface;
    fields:{
      default_parental_control_support_value?:string;
      is_parental_control_supported?:string;
      is_pc_supported_for_next_videos?:string;
      is_pc_supported_for_recommendations?:string;
      pin_validation_regex?:string;
    }
  };
  passcode?:{
    feature:featureInterface;
    fields:{
      expiry_duration?:string;
      is_enabled?:string;
      length?:string;
      pull_interval?:string;
      support_passcode?:string;
    }
  };
  sociallogin?:{
    feature:featureInterface;
    fields:{
      facebook?:string;
      google?:string;
    }
  };
  userfields?:{
    feature:featureInterface;
    fields:{}
  }
}
  
export interface usercontextInterface{
  menus: menuInterface[];
  systemconfigs:{},
  systemfeatures:systemFeaturesInterface;
  userDetails:{},
}
