import { appConfig } from "@/appconfig";
import { getFromlocalStorage } from "@/utils";

import { useContext, useEffect, useState } from "react";
import styles from "./header.module.scss";
import HeaderBottom from "./headerbottom";
import HeaderTop from "./headertop";
import { menuInterface } from "@/shared";
import UserContext from "@/context/usercontext";

export default function Header() {
  const {menus}:{menus:menuInterface[]} = useContext(UserContext)
  return (
      <div className={`${styles.header_container}`}>
        <HeaderTop />
        <HeaderBottom menus={menus} />
      </div>
  );
}
