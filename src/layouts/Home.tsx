import UserContext from "@/context/usercontext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { axiosget } from "@/axios";
import { getsessionToken, getBoxId, retriveSession } from "@/utils";
import { appConfig } from "@/appconfig";
import { bannerInterface, menuInterface } from "@/shared";
import { PageContext } from "@/context/pagecontext";
import Banners from "@/components/banners/banners";
import { Rail } from "@/components/rail/rail";

async function apicall(targetPath: string) {
  let configs = {
    url: "service/api/v1/page/content",
    headers: {
      "session-id": getsessionToken() || "",
      "tenant-code": appConfig.tenantCode,
      "box-id": getBoxId(),
    },
    params: {
      path: targetPath,
    },
  };
  let data = await axiosget<{ status: boolean; response: any,error:any } | null>(configs);
  return data;
}

export default function Home(): JSX.Element {
  const { menus }: { menus: menuInterface[] } = useContext(UserContext);
  const [banners, setBanners] = useState<bannerInterface[]>([]);
  useEffect(function () {
    if (menus.length > 0) {
      apicall(menus[0].targetPath)
        .then((data:any) => {
          if (data?.status) {
            setBanners(data.response.banners);
          } else {
            if(data['error'].code === 401) {
              retriveSession();
            }
          }
        })
        .catch((err) => {
          console.log(err);

        });
    }
  }, []);
  return (
    <PageContext.Provider value={{ banners }}>
      <Head>
        <title>Home Page.....</title>
      </Head>
      <div>
      <Banners/>
      </div>
      <div>
        <Rail/>
      </div>
    </PageContext.Provider>
  );
}
