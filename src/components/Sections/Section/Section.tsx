import { Card } from "@/components/card/card";
import { SectionTitle } from "./section-title/SectionTitle";
import styles from "./Section.module.scss";
import { useEffect, useRef, useState,MouseEvent } from "react";
import { getCardRatio, getscrollproperties, section_render_configs } from "@/utils";
import { scrollcardsInterface } from "@/shared";



export default function Section({ section }: any): JSX.Element {
  let sectionInfo;
  if(section && section.section && section.section.sectionInfo){
    sectionInfo = section.section.sectionInfo
  }

  const cards = section?.section?.sectionData?.data || [];
  const cardType = cards.length > 0 && cards[0].cardType
  const elementRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

 
  
  const [enablearrows,setEnablearrows] = useState<boolean>(false);
  const [enablerightarrow,setEnablerightarrow] = useState<boolean>(false);
  const [enableleftarrow,setEnableleftarrow] = useState<boolean>(false);
  const [carouselWidth,setCarouselWidth] = useState<string>('100%')
  const [carouselPadding,setCarouselPadding] = useState<string>('0px');
  const [noOfCards,setnoOfCards] = useState<number>(0);
  const [cardWidth,setCardWidth] = useState<string>('0px')
  const [cardMargin,setCardMargin] = useState<string>('0px');
  const[cardImageHeight,setCardImageHeight] = useState<string>('0px');

  const resizeObserver = new ResizeObserver(() => {
    setSectionconfigs();
  })


  useEffect(()=>{
    if(elementRef.current !== null){
      setSectionconfigs();
      // window.addEventListener('resize', setSectionconfigs);
      resizeObserver.observe(elementRef.current)
    }
    return ()=>{
      // window.removeEventListener('resize', setSectionconfigs);
      resizeObserver.disconnect();
    }
  },[])

  const setSectionconfigs = () =>{
    if(elementRef.current){
      let section_configs = section_render_configs(cardType, elementRef.current.offsetWidth);
      //calculate card width remove all extra css spaces also including margin padding of the card then calculate remaining space by total no of cards 
      let cardWidth = Math.ceil((elementRef.current.offsetWidth - section_configs.paddingRight - ((section_configs.margin * 2) * Math.floor(section_configs.no_of_cards)))  / section_configs.no_of_cards);

      //calculate image height by ratio of the card type
     let cardImageHeight = Math.ceil((cardWidth * getCardRatio(cardType)));
     let carousel_width = cardWidth * cards.length;
     let card_margin = section_configs.margin;
     let carousel_padding = section_configs.paddingRight;


     setnoOfCards(Math.floor(section_configs.no_of_cards))
     setCarouselWidth(`${carousel_width}px`)   
     setCarouselPadding(`${carousel_padding}px`)   
     setCardWidth(`${cardWidth}px`)
     setCardMargin(`${card_margin}px`)
     setCardImageHeight(`${cardImageHeight}px`)

      if (carouselRef.current) {
        carouselRef.current.style.left = '0px';
      }

     //this is for arrows showing incase of hover effect is not there in the section
      // if (carousel_width < elementRef.current.offsetWidth) {
      //   carousel_width = elementRef.current.offsetWidth;
      //   setEnablearrows(false)
      // } else {
      //   setEnablearrows(true);
      //   if (carouselRef.current) {
      //     let click_per_move = Math.floor(section_configs.no_of_cards) * (cardWidth + (card_margin * 2))
      //     let left = Math.abs(pixelsTonumber(carouselRef.current.style.left));
      //     if (carouselRef.current.style.left === '0px') {
      //       setEnableleftarrow(false);
      //       if (carousel_width > elementRef.current.offsetWidth) {
      //         setEnablerightarrow(true);
      //       }
      //     }
      //     else {
      //       if ((left + click_per_move + (carousel_padding * 2)) === carouselRef.current.offsetWidth) {
      //         setEnablerightarrow(false);
      //       }
      //       else {
      //         setEnableleftarrow(true);
      //         setEnablerightarrow(true);
      //       }
      //     }
      //   }
      //   //  console.log(carouselRef.current?.offsetWidth)
      // }
    }
  }

  

  const pixelsTonumber = (units:string) =>{
    if(units.indexOf('px') === -1) throw Error('units must be in a pixels');
    return Number(units.split('px')[0]);
  }

  const handleScrollTo = (to: 'left' | 'right', cardType: keyof scrollcardsInterface) => {
    if (carouselRef.current !== null) {
      if (to === 'left') {
        let left = Math.abs(pixelsTonumber(carouselRef.current.style.left));
        let click_per_move = noOfCards * (pixelsTonumber(cardWidth) + (pixelsTonumber(cardMargin)*2))
        
        if (carouselRef.current.offsetWidth - (left + click_per_move) < click_per_move) {
          let reamin_move = carouselRef.current.offsetWidth - (left + click_per_move) - (pixelsTonumber(carouselPadding)*2);
          console.log(reamin_move)
          left = left + reamin_move;
        }
        else{
          left = left + click_per_move;
        }

        if (left + click_per_move + (pixelsTonumber(carouselPadding) * 2) === carouselRef.current.offsetWidth){
          setEnablerightarrow(false);
        }

        setEnableleftarrow(true);
        carouselRef.current.style.left = `${-left}px`
      }
      else if (to === 'right') {
        let left = Math.abs(pixelsTonumber(carouselRef.current.style.left));
        let move = noOfCards * (pixelsTonumber(cardWidth) + (pixelsTonumber(cardMargin) * 2))

        if (left - move >= 0) {
          left = left - move;
          console.log(left - move)
        }
        else {
          left = 0;
        }

        if(left === 0) setEnableleftarrow(false);
        setEnablerightarrow(true);
        carouselRef.current.style.left = `${-left}px`
      }
    }
  }

  const handleMouseEnter = (e:MouseEvent<HTMLDivElement>)=>{
    setEnablearrows(true);
    if (elementRef.current) {
      let section_configs = section_render_configs(cardType, elementRef.current.offsetWidth);
      let cardWidth = Math.ceil((elementRef.current.offsetWidth - section_configs.paddingRight - ((section_configs.margin * 2) * Math.floor(section_configs.no_of_cards))) / section_configs.no_of_cards);
      let carousel_width = cardWidth * cards.length;
      let card_margin = section_configs.margin;
      let carousel_padding = section_configs.paddingRight;

      setEnablearrows(true);
      if (carouselRef.current) {
        let click_per_move = Math.floor(section_configs.no_of_cards) * (cardWidth + (card_margin * 2))
        let left = Math.abs(pixelsTonumber(carouselRef.current.style.left));
        if (carouselRef.current.style.left === '0px') {
          setEnableleftarrow(false);
          if (carousel_width > elementRef.current.offsetWidth) {
            setEnablerightarrow(true);
            setEnableleftarrow(false);
          }
        }
        else {
          if ((left + click_per_move + (carousel_padding * 2)) === carouselRef.current.offsetWidth) {
            setEnablerightarrow(false);
            setEnableleftarrow(true);
          }
          else {
            setEnableleftarrow(true);
            setEnablerightarrow(true);
          }
        }
      }
    }
  }

  const handleMouseLeave = (e:MouseEvent<HTMLDivElement>)=>{
    setEnablearrows(false);
    setEnableleftarrow(false);
    setEnablerightarrow(false);
  }

  return (
    <>
      {(!!cards && cards.length > 0) &&
        <div className={styles.section} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {sectionInfo && <SectionTitle sectionInfo={sectionInfo} />}
        
            <div className={styles.cards_wrapper}>
              {(enablearrows && enableleftarrow) && (
                <div className={`${styles.arrow_container} ${styles.left_arrow_container}`} onClick={() => handleScrollTo("right", cardType)}>
                  <span className={`${styles.arrowbox}`}></span>
                </div>
              )}

              <div ref={elementRef}>
              <div style={{ left: '0px', minWidth: carouselWidth, width: 'max-content',}} className={styles.cards} ref={carouselRef} >
                {cards.map((card: any, index: any) => {
                  return (
                    <div key={index} style={{ width: cardWidth,minWidth:cardWidth,display:'inline-block',margin:cardMargin}} >
                      <Card key={index} cardDetails={card} cardImageHeight={cardImageHeight}/>
                    </div>)
                })}

                </div>
              </div>

              {(enablearrows && enablerightarrow) && (
                <div className={`${styles.arrow_container} ${styles.right_arrow_container}`} onClick={() => handleScrollTo('left', cardType)
                }>
                  <span className={`${styles.arrowbox}`}></span>
                </div>)}
            </div>
         
        </div>
      }
    </>
  );
}


