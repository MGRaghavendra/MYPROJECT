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


