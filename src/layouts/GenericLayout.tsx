import UserContext from "@/context/usercontext";
import { ReactNode, useContext, useEffect, useState } from "react";
import { axiosget } from "@/axios";
import { bannerInterface, menuInterface } from "@/shared";
import { PageContext } from "@/context/pagecontext";
import { useRouter } from "next/router";
import {default as clientCookie} from "js-cookie"

async function apicall(targetPath: string) {
  console.log(targetPath)
  let configs = {
    url: "service/api/v1/page/content",
    headers: {
      "session-id": clientCookie.get('sessionId') || "",
      "tenant-code": clientCookie.get('tenantCode') || "",
      "box-id":clientCookie.get('boxId') || "",
    },
    params: {
      path: targetPath,
      count:40
    },
  };
  let data = await axiosget<{ status: boolean; response?: any ,error?:any} | null>(configs);
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
  const [info,setInfo] = useState({})
  const { asPath ,replace} = useRouter();
  useEffect(function () {
    console.log('xxxxx')
    if (menus.length > 0) {
      let menu = menus.find((menu) => ((asPath == `/${menu.targetPath}` ) || (asPath == '/' && menu.targetPath == "home")))
      if (menu) {
        console.log(menu)
        apicall(menu.targetPath)
          .then((data) => {
            if (data?.status == true) {
              setBanners(data.response?.banners);
              setSections(data.response?.data);
              setInfo(data.response?.info)
            }
            else if(data?.status == false && data?.error?.code == 401 )
            {
              // replace(asPath)
            } 
            else {
              console.log(data)
              console.log("failed....");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else{
        console.log(asPath)
        let arr = asPath.split('/')
        arr.shift()

        apicall(`${arr.join('/')}`).then(data=>{
          if (data?.status == true) {
            setBanners(data.response?.banners);
            setSections(data.response?.data);
            setInfo(data.response?.info);
          }
          else if(data?.status == false && data?.error?.code == 401 )
          {
            // replace(asPath)
          } 
          else {
            console.log(data)
            console.log("failed....");
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }, [menus,asPath]);
  return (
    <PageContext.Provider value={{ banners, sections,info }}>
    <div style={{marginTop:"96px"}}>
        {children}
      </div>
    </PageContext.Provider>
  );
}
