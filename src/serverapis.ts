import { GetServerSidePropsContext } from "next";
import { initJsoninterface } from "./shared";
import { fetchdata } from "./fetchapi";
import { getBoxId, getplatform } from "./utils";
import getConfig from "next/config";
import { serialize } from "cookie";
export const initAPIS = async ({ req, res }: GetServerSidePropsContext) => {
  const { publicRuntimeConfig } = getConfig();

  let initJson = await fetchdata(publicRuntimeConfig.initJson);

  let locationinfo = await fetchdata(
    `${initJson.api}/service/location/api/v1/locationinfo?tenant_code=${
      initJson.tenantCode
    }&product=${initJson.product}&client=${getplatform(
      req.headers["user-agent"] || ""
    )}`
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
  return {
    sessionId,
    boxId,
    tenantCode,
    initJson,
    locationinfo,
  };
};

interface createSessionargtypes {
  context: GetServerSidePropsContext;
  sessionId: string;
  boxId: string;
  tenantCode: string;
}
export const createSession = async ({
  context,
  sessionId,
  boxId,
  tenantCode,
}: createSessionargtypes) => {
  context.res.setHeader('Set-Cookie', [serialize('sessionId', sessionId, {
    httpOnly: false
  }), serialize('tenantCode', tenantCode, {
    httpOnly: false
  }), serialize('boxId', boxId, {
    httpOnly: false
  })])
};



