import UserContext from "@/context/usercontext";
import { useContext, useEffect, useState } from "react";
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

export default function Movies(): JSX.Element {
  const { menus }: { menus: menuInterface[] } = useContext(UserContext);
  const [banners, setBanners] = useState<bannerInterface[]>([]);
  const [sections,setSections] = useState([]);
  useEffect(function () {
    if (menus.length > 0) {
      apicall(menus[2].targetPath)
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
  }, []);
  return (
    <PageContext.Provider value={{ banners,sections }}>
      <Head>
        <title>Movies Page.....</title>
      </Head>
      <div style={{marginTop:'95px',backgroundColor:"#141414"}}>
      <Banners/>
      <Sections/>
      </div>
    </PageContext.Provider>
  );
}
