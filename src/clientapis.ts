import { systemconfigapi, systemfeaturesapi } from "./api";
import { getFromlocalStorage, getplatform, getBoxId } from "./utils";
import { default as clientCookie } from "js-cookie";
import getConfig from "next/config";
import { fetchdata } from "./fetchapi";
import { configsandfeaturesInterface, responseInterface } from "./shared";

export const isThere = (key: string) => {
  if (!getFromlocalStorage(key) || !clientCookie.get(key)) {
    return false;
  }
  return true;
};

export const getsystemConfigs =
  async (): Promise<configsandfeaturesInterface> => {
    let systemconfigs: string | null = getFromlocalStorage("systemconfigs");
    let systemconfigsobj: configsandfeaturesInterface = systemconfigs
      ? JSON.parse(systemconfigs)
      : {};
    if (
      systemconfigs &&
      systemconfigsobj.expireTime &&
      systemconfigsobj.expireTime > new Date().getTime()
    ) {
      return systemconfigsobj;
    } else {
      let systemConfigsresponse: configsandfeaturesInterface =
        await systemconfigapi({
          "box-id": clientCookie.get("boxId"),
          "session-id": clientCookie.get("sessionId"),
          "tenant-code": clientCookie.get("tenantCode"),
        });
      if (systemConfigsresponse.status == true) {
        systemConfigsresponse.expireTime = new Date().getTime() + 7200000;
        localStorage.setItem(
          "systemconfigs",
          JSON.stringify(systemConfigsresponse)
        );
        localStorage.setItem(
          "resourceProfiles",
          JSON.stringify(systemConfigsresponse.response.resourceProfiles)
        );
      }
      return systemConfigsresponse;
    }
  };

export const getsystemFeature =
  async (): Promise<configsandfeaturesInterface> => {
    let systemfeature: string | null = getFromlocalStorage("systemfeature");
    let systemfeatureobj: configsandfeaturesInterface = systemfeature
      ? JSON.parse(systemfeature)
      : {};
    if (
      systemfeature &&
      systemfeatureobj.expireTime &&
      systemfeatureobj.expireTime > new Date().getTime()
    ) {
      return systemfeatureobj;
    } else {
      let systemfeatureresponse: configsandfeaturesInterface =
        await systemfeaturesapi({
          "box-id": clientCookie.get("boxId"),
          "session-id": clientCookie.get("sessionId"),
          "tenant-code": clientCookie.get("tenantCode"),
        });
      if (systemfeatureresponse.status == true) {
        systemfeatureresponse.expireTime = new Date().getTime() + 7200000;
        localStorage.setItem(
          "systemfeature",
          JSON.stringify(systemfeatureresponse)
        );
      }
      return systemfeatureresponse;
    }
  };

export const checkTokens = async function () {
  if (!isThere("boxId") || !isThere("sessionId") || !isThere("tenantCode")) {
    const { publicRuntimeConfig } = getConfig();

    let initJson = await fetchdata(publicRuntimeConfig.initJson);

    let locationinfo = await fetchdata(
      `${initJson.api}/service/location/api/v1/locationinfo?tenant_code=${
        initJson.tenantCode
      }&product=${initJson.product}&client=${getplatform(navigator.userAgent)}`
    );

    let boxId = getBoxId();

    let sessionTokeninfo = await fetchdata(
      ` ${initJson.api}/service/api/v1/get/token?tenant_code=${initJson.tenantCode}&box_id=${boxId}&product=${initJson.product}&device_id=5&display_lang_code=ENG&device_sub_type=Chrome,111.0.0.0,Windows&timezone=Asia/Calcutta`
    );
    let sessionId =
      sessionTokeninfo.status == true
        ? sessionTokeninfo.response.sessionId
        : "NA";
    let tenantCode = initJson.tenantCode;
    localStorage.setItem("sessionId", sessionId);
    localStorage.setItem("boxId", boxId);
    localStorage.setItem("tenantCode", tenantCode);
    localStorage.setItem("locationinfo", JSON.stringify(locationinfo));

    clientCookie.set("sessionId", sessionId);
    clientCookie.set("boxId", boxId);
    clientCookie.set("tenantCode", tenantCode);
  }
};

export const Init = async () => {
  await checkTokens();
  let systemConfigs = await getsystemConfigs();
  let systemfeature = await getsystemFeature();
  return { systemConfigs, systemfeature };
};
