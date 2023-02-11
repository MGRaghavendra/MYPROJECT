import { appConfig } from "@/appconfig";
import styles from "./header.module.scss";
import { menuInterface } from "@/shared";
import Menus from "./menus/Menus";
import Image from 'next/image'
interface props{
  menus:menuInterface[]
}

export default function HeaderBottom({menus}:props):JSX.Element{
  return (
    <div className={`${styles.header_bottom}`}>
      <div className={`${styles.header_bottominner}`}>
        <div className={`${styles.headerbottom_left}`}>
          <div className={`${styles.logo}`}>
            <Image src='https://platform.yupptv.com/assets/images/logo.svg' width={85} height={30}
              alt="logo" />
          </div>
           <Menus menus={menus}/>
         </div>
         <div className={`${styles.headerbottom_right}`}>
          <div className={`${styles.others}`}>
            <div className={`${styles.otherbtns} ${styles.search}`}>
              {/* <img
                src={`${appConfig.cloudpath}/images/search-icon.svg`}
                alt=""
             /> */}
              <Image src={`${appConfig.cloudpath}/images/search-icon.svg`} width = {100} height = {20}
              alt="logo" />
            </div>
            <div className={`${styles.otherbtns} ${styles.pricing}`}>
              <span>Pricing</span>
            </div>
            <div className={`${styles.authcontainer}`}>
              <span
                className={`${styles.otherbtns} ${styles.authbtn} ${styles.signinbtn}`}
              >
                signin
              </span>
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
