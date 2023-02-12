import { appConfig, setappconfig } from "./appconfig";
import { Axios, axiosget, setaxiosInstance } from "./axios";
import { getBoxId, getsessionToken } from "./utils";

interface dynamicobject {
  [key: string]: any;
}

interface location {
  analyticsInfo: dynamicobject;
  clientInfo: dynamicobject;
  ipInfo: dynamicobject;
  productInfo: dynamicobject;
}

interface tokenResponse {
  status: boolean;
  response?: {
    countryCode?: string;
    product?: string;
    sessionId: string;
    tenantCode?: string;
  };
  error?: {
    code: number;
    details: dynamicobject;
    message: string;
    type: string;
  };
}

interface configfeatures{
    status: boolean;
  response?: dynamicobject;
  error?: {
    code: number;
    details: dynamicobject;
    message: string;
    type: string;
  };
}

export async function initapis():Promise<string | void>{
  let initjson = localStorage.getItem("initjson");
  if (initjson === null) {
    let resjson = await fetch("https://paas-init.revlet.net/clients/yvs/init/live/yvs.json");
    let data = await resjson.json()
    localStorage.setItem("initjson", JSON.stringify(data));
    if (data.api) {
      setaxiosInstance(data.api);
    }
    if (data.product) {
      setappconfig("product", data.product);
    }
    if (data.tenantCode) {
      setappconfig("tenantCode", data.tenantCode);
    }
    return loactionapi();
  } else {
    let initjsonobject = JSON.parse(initjson);
    if (initjsonobject.api) {
      setaxiosInstance(initjsonobject.api);
    }
    if (initjsonobject.product) {
      setappconfig("product", initjsonobject.product);
    }
    if (initjsonobject.tenantCode) {
      setappconfig("tenantCode", initjsonobject.tenantCode);
    }
    return 'done'
  }
}

export async function loactionapi():Promise<string | void> {
  if (Axios) {
    try {
      let response = await axiosget<location>({
        url: "service/location/api/v1/locationinfo",
        params: {
          tenant_code: JSON.stringify(appConfig.tenantCode),
          product: JSON.stringify(appConfig.product),
          client: "web",
        },
      });
      localStorage.setItem("location", JSON.stringify(response));
      return sessionapi();
    } catch (err) {
      console.log(err);
    }
  } else {
    //
  }
}

export async function sessionapi():Promise<string | void> {
  if (Axios) {
    try {
      let tokenresponse = await axiosget<tokenResponse>({
        url: "service/api/v1/get/token",
        params: {
          tenant_code: appConfig.tenantCode,
          product: appConfig.product,
          box_id: getBoxId(),
          device_id: 5,
          device_sub_type: "Chrome,109.0.0.0,Windows",
          timezone: "Asia/Calcutta",
        },
      })
      if(tokenresponse?.status){
           let sessionId = tokenresponse.response?.sessionId
           if(!sessionId) sessionId = ''
            localStorage.setItem(
            "session-id",sessionId
          );
          return systemconfigs();
        
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export async function systemconfigs():Promise<string | void> {
  if (Axios) {
    try {
      let response = await axiosget<any>({
        url:"service/api/v1/system/config",
        headers: {
          "session-id": getsessionToken() || '',
          "tenant-code": appConfig.tenantCode,
          "box-id": getBoxId(),
        }
      });
      if (response?.status) {
        localStorage.setItem("systemconfigs", JSON.stringify(response.response));
        localStorage.setItem("resourceProfiles", JSON.stringify(response.response.resourceProfiles));

      }
      return systemfeatures();
    } catch (err) {
      console.log(err);
    }
  }
}

export async function systemfeatures():Promise<string | void> {
  if (Axios) {
    try {
      let response = await axiosget<configfeatures>({
        url:"service/api/v1/system/feature",
        headers: {
          "session-id": getsessionToken() || '',
          "tenant-code": appConfig.tenantCode,
          "box-id": getBoxId(),
        }});
      if (response?.status) {
        localStorage.setItem(
          "systemfeature",
          JSON.stringify(response.response)
        );
      }
      return 'done from features..'
    } catch (err) {
      console.log(err);
    }
  }
}
