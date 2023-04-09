import { ReactNode, useEffect, useState } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import UserContext from "@/context/usercontext";
import { menuInterface } from "@/shared";
import { useRouter } from "next/router";
import { Init } from "@/clientapis";

function Layout({ children }: { children: ReactNode }) {
  const { asPath } = useRouter();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [menus, setMenus] = useState<menuInterface[]>([]);
  useEffect(
    function () {
      let isrenderd = false;
      Init().then(({ systemconfigs }) => {
        if (isrenderd == false) {
          setMenus(systemconfigs.menus);
          setLoading(false);
        }
      });
      return () => {
        isrenderd = true;
      };
    },
    [asPath]
  );
  return (
    <UserContext.Provider value={{ menus }}>
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
