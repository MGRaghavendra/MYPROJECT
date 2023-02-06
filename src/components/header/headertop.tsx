import styles from "./header.module.scss";
import { appConfig } from "@/appconfig";
export default function HeaderTop(): JSX.Element {
  return (
    <div className={`${styles.header_top}`}>
      <div className={`${styles.header_topinner}`}>
        <div className={`${styles.content} ${styles.languages}`}>
          <img
            src={`${appConfig.cloudpath}images/language-selection-icon.svg`}
            alt=""
          />
          <span className={`${styles.text}`}>Languages</span>
          <span className={`${styles.downarrow}`}></span>
        </div>
        <div className={`${styles.content} ${styles.about}`}>About</div>
        <div className={`${styles.content} ${styles.support}`}>
          <img
            src={`${appConfig.cloudpath}images/header-support-mail.svg`}
            alt=""
          />
          <span className={`${styles.text}`}>support@yupptv.com</span>
        </div>
      </div>
    </div>
  );
}
