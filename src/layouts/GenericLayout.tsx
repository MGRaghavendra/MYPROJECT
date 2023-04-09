import { ReactNode,  useEffect, useState } from "react";
import { axiosget } from "@/axios";
import { pagecontextInterface } from "@/shared";
import { PageContext } from "@/context/pagecontext";
import { useRouter } from "next/router";
import { default as clientCookie } from "js-cookie";
import { getdata } from "@/data.manager";


async function apicall(targetPath: string) {
  let configs = {
    url: "service/api/v1/page/content",
    headers: {
      "session-id": clientCookie.get("sessionId") || "",
      "tenant-code": clientCookie.get("tenantCode") || "",
      "box-id": clientCookie.get("boxId") || "",
    },
    params: {
      path: targetPath,
      count: 40,
    },
  };
  let data = await axiosget<{
    status: boolean;
    response?: any;
    error?: any;
  } | null>(configs);
  return data;
}

const initialpagestate = {
  sections: [],
  info: {},
  banners: [],
  content:[],
};

function Loading() {
  return (
    <div
      style={{
        backgroundColor:"transparent",
        position: "absolute",
        left: "0",
        bottom: "0",
        right: "0",
        top: "0",
      }}
    >
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <div className="Loader">
          <img
            src="https://d2ivesio5kogrp.cloudfront.net/static/firstshows/images/loader-icon.png"
            alt="loader"
            height="75px"
            width="75px"
          />
        </div>
      </div>
    </div>
  );
}

export default function GenericLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  // const { menus }: { menus: menuInterface[] } = useContext(UserContext);
  const [pagestate, setPagestate] =
    useState<pagecontextInterface>(initialpagestate);
  const { asPath, reload } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(
    function () {
      setLoading(true);
      let arr = asPath.split("/");
      arr.shift();
      let targetPath = arr.join("/") == "" ? "home" : arr.join("/");
      apicall(targetPath)
        .then((data) => {
          if (data?.status == true) {
            setPagestate((pagestate) => ({
              ...pagestate,
              banners: data.response?.banners,
              sections: getdata(data.response?.data,'section'),
              info: data.response?.info,
              content:getdata(data.response?.data,'content')
            }));
            setLoading(false);
          } else if (data?.status == false && data?.error?.code == 401) {
            clientCookie.remove("boxId");
            clientCookie.remove("tenantCode");
            clientCookie.remove("sessionId");
            // setLoading(false)
            reload();
          } else {
            setLoading(false);
            console.log(data);
            console.log("failed....");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [asPath]
  );
  return (
    <PageContext.Provider value={{ ...pagestate }}>
      {loading ? (
        <>
        <div style={{height:"100vh"}}></div>
        <Loading />
        </>
      ) : (
        <div style={{ marginTop: "96px" }}>{children}</div>
      )}
    </PageContext.Provider>
  );
}
