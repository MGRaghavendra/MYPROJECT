import Head from "next/head";
import {
  FC,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Header from "@/components/header/header";
import { initapis } from "@/init";
import Footer from "@/components/footer/footer";
import UserContext from "@/context/usercontext";
import { getFromlocalStorage } from "@/utils";
import { menuInterface } from "@/shared";

function Layout({ children }: { children: ReactNode }) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [menus, setMenus] = useState<menuInterface[]>([]);
  useEffect(function () {
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
            <Header />
            {children}
            <Footer />
          </>
        )}
      </>
    </UserContext.Provider>
  );
}

export default Layout;
