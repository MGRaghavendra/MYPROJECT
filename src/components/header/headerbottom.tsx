import { appConfig } from "@/appconfig";
import styles from "./header.module.scss";
import { menuInterface } from "@/shared";
import Menus from "./menus/Menus";
interface props{
  menus:menuInterface[]
}

export default function HeaderBottom({menus}:props):JSX.Element{
  return (
    <div className={`${styles.header_bottom}`}>
      <div className={`${styles.header_bottominner}`}>
        <div className={`${styles.headerbottom_left}`}>
          <div className={`${styles.logo}`}>
            <img
              src="https://platform.yupptv.com/assets/images/logo.svg"
              alt=""
            />
          </div>
           <Menus menus={menus}/>
         </div>
         <div className={`${styles.headerbottom_right}`}>
          <div className={`${styles.others}`}>
            <div className={`${styles.otherbtns} ${styles.search}`}>
              <img
                src={`${appConfig.cloudpath}/images/search-icon.svg`}
                alt=""
             />
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
