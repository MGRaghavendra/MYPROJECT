import Head from "next/head";
import {
  ReactNode,
  useEffect,
  useState,
} from "react";
import Header from "@/components/header/header";
import { initapis } from "@/init";
import Footer from "@/components/footer/footer";
import UserContext from "@/context/usercontext";
import { getFromlocalStorage } from "@/utils";
import { menuInterface } from "@/shared";
import { useRouter } from "next/router";

function Layout({ children }: { children: ReactNode }) {
  const { asPath } = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [menus, setMenus] = useState<menuInterface[]>([]);
  useEffect(function () {
    console.log('sdsdsdsdsdsdsds')
    initapis().then((data) => {
      console.log(data);
      let systemconfigs = getFromlocalStorage("systemconfigs");
    if (!!systemconfigs) {
      let configs = JSON.parse(systemconfigs);
      setMenus((menus) => configs.menus);
    }
      setLoading(true);
    });
  }, []);
  return (
    <UserContext.Provider value={{menus}}>
      <>
        {isLoading === true && (
          <>
           {!asPath.includes('sign') && <Header />}
            {children}
            <Footer />
          </>
        )}
      </>
    </UserContext.Provider>
  );
}

export default Layout;
