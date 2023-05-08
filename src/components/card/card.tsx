import Image from "next/image";
import styles from "./card.module.scss";
import { getAbsolutPath } from "@/utils";
import { useRouter } from "next/router";
import {getdefaultcardConfig} from './cards'

export const Card = (props: any): JSX.Element => {
  let programName;
  const { cardType } = props.cardDetails;
  const { cardDetails } = props;
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
  let cardobj;
  let defaultconfigs = getdefaultcardConfig(cardType,document.body.clientWidth)
  cardobj = new createCard({
      marginLeft: "10px",
      marginRight: "10px",
      avaliableSpace: props.avaliableSpace,
      noofcards: defaultconfigs.cardCount,
      cardType,
  });
  return (
    <>
      {cardType == "roller_poster" && (
        <div
          className={`${styles.roller_poster} ${styles.card}`}
          onClick={gotoPage}
          // style={{
          //   width: cardobj?.cardWidth,
          //   minWidth: cardobj?.cardWidth,
          //   marginLeft: cardobj?.configs.marginLeft,
          //   marginRight:cardobj?.configs.marginRight
          // }}
        >
          <div className={`${styles.roller_poster}`}>
            <img
              src={src}
              alt="Picture of the author"
              className={`${styles.card_img}`}
              // width={"100%"}
              // height={cardobj ? cardobj.imageHeight : 132}
            />
            {/* <div className={`${styles.card_footer}`}>
              <div className={`${styles.card_footer_cpimage}`}>
                {!!cpImage && (
                  <img src={cpImage} alt="" width={46} height={26} />
                )}
              </div>
            </div> */}
          </div>
        </div>
      )}
      {cardType == "overlayIcon_poster" && (
       <div className={`${styles.card}`} onClick={gotoPage} 
       style={{
         width: cardobj?.cardWidth,
         minWidth: cardobj?.cardWidth,
         marginLeft: cardobj?.configs.marginLeft,
         marginRight:cardobj?.configs.marginRight
       }}
       >
          <div className={`${styles.card_inner}`}>
          <img
              src={src}
              alt="Picture of the author"
              width={"100%"}
              height={cardobj ? cardobj.imageHeight : 132}
            />
            <div className={`${styles.card_footer}`}>
              <div className={`${styles.card_footer_cpimage}`}>
                {!!cpImage && (
                  <img src={cpImage} alt="" width={46} height={26} />
                )}
              </div>

              <div className={`${styles.card_footer_cpdesc}`}>
                {cardDetails?.hover.elements.map((el: any) => {
                  programName = el.key === "name" ? el.value : "";
                })}
                <h5>{programName}</h5>
                {!!cardDetails.display.subtitle1 && (
                  <span>{cardDetails.display.subtitle1}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {cardType == "overlay_poster" && (
        <div className={`${styles.overlay_poster} ${styles.card}`} onClick={gotoPage} 
        // // style={{
        // //   width: cardobj?.cardWidth,
        // //   minWidth: cardobj?.cardWidth,
        // //   marginLeft: cardobj?.configs.marginLeft,
        // //   marginRight:cardobj?.configs.marginRight
        // // }}
        >
          <div className={`${styles.overlay_poster}`}>
          <img
              src={src}
              alt="Picture of the author"
              className={`${styles.card_img}`}
              // width={"100%"}
              // height={cardobj ? cardobj.imageHeight : 132}
            />
            {/* <div className={`${styles.card_footer}`}>
              <div className={`${styles.card_footer_cpimage}`}>
                {!!cpImage && (
                  <img src={cpImage} alt="" 
                  // width={"100%"}
                  // height={cardobj ? cardobj.imageHeight : 132} 
                  />
                )}
              </div>
            </div> */}
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

class createCard {
  configs: cardConfigs;
  cardWidthwithMargin: number;
  cardWidth: string;
  imageHeight: number;
  exactcardWidth:number;
  constructor(config: cardConfigs) {
    this.configs = { ...config };
    this.cardWidthwithMargin = 0;
    this.cardWidth = "0px";
    this.exactcardWidth = 0;
    this.imageHeight = 0;
    this.setCardWidth();
    this.setImageHeight();
  }

  setCardWidth() {
    let avaliableSpace: number = this.getpxfromnum(this.configs.avaliableSpace);
    let margin =
      this.getpxfromnum(this.configs.marginLeft) +
      this.getpxfromnum(this.configs.marginRight);
    avaliableSpace = avaliableSpace - (margin * this.configs.noofcards);
    this.exactcardWidth = avaliableSpace / this.configs.noofcards
    this.cardWidthwithMargin = this.exactcardWidth + margin;
    this.cardWidth = `${this.exactcardWidth}px`;
  }

  setImageHeight() {
    let ratio: number = getCardRatio(this.configs.cardType);
    if (ratio == 0) throw new Error("card Type must be a valid");

    this.imageHeight =this.exactcardWidth / ratio;
  }

  getpxfromnum(pxunit: string): number {
    if (typeof pxunit !== "string" || pxunit.indexOf("px") <= -1) {
      throw new Error(`${pxunit} must be a string and it's in px`);
    }
    return Number(pxunit.split("px")[0]);
  }
}

function getCardRatio(cardType: string) {
  switch (cardType) {
    case "roller_poster":
      return 0.6666666666666667;
    case "overlay_poster":
    case "overlayIcon_poster":
      return 1.776;
    default:
      return 0;
      break;
  }
}
