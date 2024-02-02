import Image from "next/image";
import styles from "./card.module.scss";
import { getAbsolutPath } from "@/utils";
import { useRouter } from "next/router";
import { useRef } from "react";

export const Card = (props: any): JSX.Element => {
  const { cardType,display} = props.cardDetails;
  const { cardDetails, cardImageHeight } = props;
  const cardRef = useRef<HTMLDivElement>(null)
  const src = getAbsolutPath(cardDetails.display.imageUrl);
  const cpImage =
    cardType === "overlayIcon_poster"
      ? getAbsolutPath(cardDetails.display.parentIcon)
      : "";
  const { push } = useRouter();
  const gotoPage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    let path = cardDetails.target.path;
    // if(path.indexOf('movie')>-1){
    push(cardDetails.target.path);
    // }
  };

  
  return (
    <>
      {cardType == "roller_poster" && (
       <div className={`${styles.roller_poster}`}>
          <div className={`${styles.img_container}`}>
            <img src={src} alt="Picture of the author" />
          </div>
          {/* <div className={`${styles.bottom}`}>
            <div className={`${styles.card_info}`}>
            {display.title && (
              <div className={`${styles.card_title}`}>{display.title}</div>
            )}
            {display.subtitle1 && (
                <div className={`${styles.card_subtitle}`}>{display.subtitle1}</div>
            )}
            </div>
          </div> */}
        </div>
      )}
      {cardType == "overlayIcon_poster" && (
        <div className={`${styles.overlay_poster}`}>
          <div className={`${styles.img_container}`}>
            <img src={src} alt="Picture of the author" />
          </div>
          <div className={`${styles.bottom}`}>
            <div className={`${styles.card_info}`}>
            {display.title && (
              <div className={`${styles.card_title}`}>{display.title}</div>
            )}
            {display.subtitle1 && (
                <div className={`${styles.card_subtitle}`}>{display.subtitle1}</div>
            )}
            </div>
          </div>
        </div>
      )}
      {cardType == "overlay_poster" && (
        <div className={`${styles.overlay_poster}`} ref={cardRef}>
          <div className={`${styles.img_container}`} style={{ height: cardImageHeight }}>
            <img src={src} alt="Picture of the author" loading="lazy"/>
          </div>
          <div className={`${styles.bottom}`}>
            <div className={`${styles.card_info}`}>
            {display.title && (
              <div className={`${styles.card_title}`}>{display.title}</div>
            )}
            {display.subtitle1 && (
                <div className={`${styles.card_subtitle}`}>{display.subtitle1}</div>
            )}
            </div>
          </div>
        </div>
      )}
      {cardType == "sheet_poster" && (
         <div className={`${styles.sheet_poster}`}>
          <div className={`${styles.img_container}`} style={{ height: cardImageHeight }}>
            <img src={src} alt="Picture of the author" />
          </div>
          <div className={`${styles.bottom}`}>
            <div className={`${styles.card_info}`}>
            {display.title && (
              <div className={`${styles.card_title}`}>{display.title}</div>
            )}
            {display.subtitle1 && (
                <div className={`${styles.card_subtitle}`}>{display.subtitle1}</div>
            )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

type cardConfigs = {
  marginLeft: string;
  marginRight: string;
  avaliableSpace: string;
  noofcards: number;
  cardType: string;
};


