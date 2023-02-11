import { cardInterface } from "@/shared";
import Image from 'next/image'
import { appConfig } from "@/appconfig";
import styles from './card.module.scss'
import { getAbsolutPath } from "@/utils";



export const Card = (props:any): JSX.Element => {
  const { cardType } = props.cardDetails;
  const { cardDetails } = props;
  const src = getAbsolutPath(cardDetails.display.imageUrl);
  const cpImage = cardType === "overlayIcon_poster" ? getAbsolutPath(cardDetails.display.parentIcon) : '';
  return <div className={`${styles.card}`}>
    <div className={`${styles.card_inner}`}>
      <Image
        loader={() => src}
        src={src}
        alt="Picture of the author" width={100} height={132}
      />
      <div className={`${styles.card_footer}`}>
        <div className= {`${styles.card_footer_cpimage}`}> 
          <Image
            loader={() => cpImage}
            src={cpImage}
            alt="Picture of the author" width={100} height={46}
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