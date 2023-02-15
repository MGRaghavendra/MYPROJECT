import Image from 'next/image'
import styles from './card.module.scss'
import { getAbsolutPath } from "@/utils";



export const Card = (props: any): JSX.Element => {
  let programName;
  const { cardType } = props.cardDetails;
  const { cardDetails } = props;
  const src = getAbsolutPath(cardDetails.display.imageUrl);
  const cpImage = cardType === "overlayIcon_poster" ? getAbsolutPath(cardDetails.display.parentIcon) : '';
  return <div className={`${styles.card}`}>
    <div className={`${styles.card_inner}`}>
      <img
        src={src}
        alt="Picture of the author" width={100} height={132}
      />
      <div className={`${styles.card_footer}`}>
        <div className={`${styles.card_footer_cpimage}`}>
          {
            !!cpImage && <img
              src={cpImage}
              alt="" width={46} height={26}
            />
          }
        </div>
        {cardType === "overlayIcon_poster" &&
          <div className={`${styles.card_footer_cpdesc}`}>
            {
              cardDetails?.hover.elements.map((el: any) => {
                 programName = el.key === 'name' ? el.value : '';
              })
            }
            <h5>{programName}</h5>
            {!!cardDetails.display.subtitle1 && <span>{cardDetails.display.subtitle1}</span>}
          </div>
        }
      </div>
    </div>
  </div>
}