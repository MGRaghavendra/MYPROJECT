import { cardInterface } from "@/shared";
import Image from 'next/image'
import { appConfig } from "@/appconfig";
import styles from './card.module.scss'


interface props {
  menus: cardInterface[];
}
export const Card = (): JSX.Element => {
  const src = `${appConfig.bannerImgpath}/content/common/channel/logos/aajtak.png`;
  return <div className={`${styles.card}`}>
    <div className={`${styles.card_inner}`}>
      <Image
        loader={() => src}
        src={src}
        alt="Picture of the author" width={231} height={132}
      />
      <div className={`${styles.card_footer}`}>
        <div className= {`${styles.card_footer_cpimage}`}> 
          <Image
            loader={() => src}
            src={src}
            alt="Picture of the author" width={80} height={46}
          />
        </div>
        <div className = {`${styles.card_footer_cpdesc}`}>
            <h5>Program @ 8.30</h5>
            <span>11 Feb | 8:30 AM-9:00 AM</span>
        </div>
      </div>
    </div>
  </div>
}   