import { appConfig } from "@/appconfig";
import styles from "./header.module.scss";
import { menuInterface } from "@/shared";
import Menus from "./menus/Menus";
import Image from "next/image";
import clsx from "classnames";
import { useEffect, useState } from "react";
import Link from "next/link";
interface props {
  menus: menuInterface[];
}

export default function HeaderBottom({ menus }: props): JSX.Element {
  const [headerGradient, setheaderGradient] = useState(Boolean);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setheaderGradient(true);
      } else setheaderGradient(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.header_bottom} ${
        !headerGradient ? "hasGradient" : ""
      }`}
    >
      <div className={`${styles.header_bottominner}`}>
        <div className={`${styles.headerbottom_left}`}>
          <div className={`${styles.logo}`}>
            <Image
              src="https://platform.yupptv.com/assets/images/logo.svg"
              width={85}
              height={30}
              alt="logo"
            />
          </div>
          <Menus menus={menus} />
        </div>
        <div className={`${styles.headerbottom_right}`}>
          <div className={`${styles.others}`}>
            <div className={`${styles.otherbtns} ${styles.search}`}>
              {/* <img
                src={`${appConfig.cloudpath}/images/search-icon.svg`}
                alt=""
             /> */}
              <Link href="search">
                <Image
                  src={`${appConfig.cloudpath}/images/search-icon.svg`}
                  width={100}
                  height={20}
                  alt="logo"
                />
              </Link>
            </div>
            <div className={`${styles.otherbtns} ${styles.pricing}`}>
              <span>Pricing</span>
            </div>
            <div className={`${styles.authcontainer}`}>
              <Link href={'auth/signin'}
                className={`${styles.otherbtns} ${styles.authbtn} ${styles.signinbtn}`}
              >
                signin
              </Link>
              <span
                className={`${styles.otherbtns} ${styles.authbtn} ${styles.signupbtn} ${styles.authactivebtn}`}
              >
                signup
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
