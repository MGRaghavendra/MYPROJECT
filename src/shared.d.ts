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
  