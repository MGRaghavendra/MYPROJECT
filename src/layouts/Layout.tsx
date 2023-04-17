'use client'
import { ReactNode, useEffect, useState } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import UserContext from "@/context/usercontext";
import { menuInterface } from "@/shared";
import { useRouter } from "next/router";
import { Init } from "@/clientapis";
import { usercontextInterface } from "@/shared";
import { getFromlocalStorage } from "@/utils";

const initialstate: usercontextInterface= {
  menus: [],
  systemconfigs: [],
  userDetails:{}
};

function Layout({ children }: { children: ReactNode }) {
  const { asPath } = useRouter();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [menus, setMenus] = useState<menuInterface[]>([]);
  const [userconfigs, setuserConfigs] = useState<usercontextInterface>(initialstate);
  useEffect(
    function () {
      let isrenderd = false;
      Init().then(({ systemconfigs }) => {
        if (isrenderd == false) {
          systemconfigs && setMenus(systemconfigs.menus);
          let stringifyuserdetails = getFromlocalStorage('userDetails')
          let userdetails={}
          if(stringifyuserdetails !== null){
            userdetails = JSON.parse(stringifyuserdetails);
          }
          systemconfigs && setuserConfigs({
            ...userconfigs,
            systemconfigs: systemconfigs,
            menus: systemconfigs.menus,
            userDetails:userdetails
          });
          setLoading(false);
        }
      }).then(()=>{
        
      });
      return () => {
        setLoading(false);
        isrenderd = true;
      };
    },
    [asPath]
  );
  return (
    <UserContext.Provider value={{...userconfigs}}>
            <>
              {isLoading === false && (
                <>
                  {!asPath.includes("sign") && <Header />}
                  {children}
                  {!asPath.includes("sign") && <Footer />}
                </>
              )}
            </>
    </UserContext.Provider>
  );
}

export default Layout;
