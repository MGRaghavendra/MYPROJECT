import {
  ReactNode,
  useEffect,
  useState,
} from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import UserContext from "@/context/usercontext";
import { getFromlocalStorage } from "@/utils";
import { menuInterface } from "@/shared";
import { useRouter } from "next/router";
import { initClient } from "@/clientapis";



function Layout({ children }: { children: ReactNode }) {
  const { asPath } = useRouter();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [menus, setMenus] = useState<menuInterface[]>([]);
  useEffect(function () {
    console.log("rendering...")
    let systemconfigs = getFromlocalStorage("systemconfigs");
    let systemfeatuers = getFromlocalStorage('systemfeature');
    if (!!systemconfigs  && !!systemfeatuers) {
      let configs = JSON.parse(systemconfigs || '');
      setMenus(configs.menus);
      setLoading(false);
    }
    else {
      initClient().then((data)=>{
        console.log(data)
        systemconfigs = getFromlocalStorage("systemconfigs");
        systemfeatuers = getFromlocalStorage('systemfeature');
        let configs = JSON.parse(systemconfigs || '');
        setMenus(configs.menus);
        setLoading(false);
      })
    }
  }, []);
  return (
    <UserContext.Provider value={{menus}}>
      <>
        {isLoading === false && (
          <>
           {!asPath.includes('sign') && <Header />}
            {children}
            {!asPath.includes('sign') && <Footer />}
          </>
        )}
      </>
    </UserContext.Provider>
  );
}

export default Layout;
