import UserContext from "@/context/usercontext";
import Link from "next/link";
import { ReactNode, useContext, useEffect, useState } from "react";
import Head from "next/head";
import { axiosget } from "@/axios";
import { getsessionToken, getBoxId } from "@/utils";
import { appConfig } from "@/appconfig";
import { bannerInterface, menuInterface } from "@/shared";
import { PageContext } from "@/context/pagecontext";
import Banners from "@/components/banners/banners";
import Sections from "@/components/Sections/Sections";
import { useRouter } from "next/router";

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
  let data = await axiosget<{ status: boolean; response: any } | null>(configs);
  return data;
}

export default function GenericLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { menus }: { menus: menuInterface[] } = useContext(UserContext);
  const [banners, setBanners] = useState<bannerInterface[]>([]);
  const [sections, setSections] = useState([]);
  const { asPath } = useRouter();
  useEffect(function () {
    if (menus.length > 0) {
      let menu = menus.find((menu) => ((asPath == `/${menu.targetPath}` ) || (asPath == '/' && menu.targetPath == "home")))
      if (menu) {
        apicall(menu.targetPath)
          .then((data) => {
            if (data?.status) {
              setBanners(data.response?.banners);
              setSections(data.response?.data);
            } else {
              console.log("failed....");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [menus,asPath]);
  return (
    <PageContext.Provider value={{ banners, sections }}>
    <div style={{marginTop:"96px"}}>
        {children}
      </div>
    </PageContext.Provider>
  );
}
