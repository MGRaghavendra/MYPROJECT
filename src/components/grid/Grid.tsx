import { useContext ,useEffect,useRef,useState} from "react";
import styles from "./Grid.module.scss";
import { PageContext } from "@/context/pagecontext";
import { Card } from "../card/card";
import { getCardRatio, section_render_configs } from "@/utils";
export default function Grid() {
  const { sections,banners } = useContext(PageContext);
  console.log(sections)
  const cards = sections[0].section?.sectionData?.data || [];
  const cardType = cards.length > 0 && cards[0].cardType
  console.log(cardType);

  const elementRef = useRef<HTMLDivElement>(null);

  const [cardWidth, setCardWidth] = useState<string>('0px')
  const [cardMargin, setCardMargin] = useState<string>('0px');
  const [cardImageHeight, setCardImageHeight] = useState<string>('0px');
  const resizeObserver = new ResizeObserver(()=>{
    setSectionconfigs();
  })
  
  useEffect(() => {
    if (elementRef.current !== null) {
      setSectionconfigs();
      resizeObserver.observe(elementRef.current)
      // window.addEventListener('resize', setSectionconfigs);
    }
    return () => {
      resizeObserver.disconnect();
      // window.removeEventListener('resize', setSectionconfigs);
    }
  }, [])


  const setSectionconfigs = () => {
    
    if (elementRef.current) {
      let section_configs = section_render_configs(cardType, elementRef.current.offsetWidth);
      console.log(section_configs);
      console.log(elementRef.current.offsetWidth)
      // if(elementRef.current.offsetWidth === 1270) debugger;
      //calculate card width remove all extra css spaces also including margin padding of the card then calculate remaining space by total no of cards 
      let cardWidth = (elementRef.current.offsetWidth -  (Math.floor(section_configs.no_of_cards)*(section_configs.margin * 2))) / Math.floor(section_configs.no_of_cards);
      
      console.log(cardWidth)
      //calculate image height by ratio of the card type
      let cardImageHeight = Math.ceil((cardWidth * getCardRatio(cardType)));
      let card_margin = section_configs.margin;

      setCardWidth(`${cardWidth}px`)
      setCardMargin(`${card_margin}px`)
      setCardImageHeight(`${cardImageHeight}px`)

    }
  }
  return (
    <div className={`${styles.Grid_container}` + (banners.length == 0 ? ` ${styles.noBanners}` : '')} >
      <div ref={elementRef} style={{width:'100%'}}>
      {sections.map((section) => section.section.sectionData.data.map((card,index) =>(
        <div key={index} style={{ width: cardWidth, minWidth: cardWidth, display: 'inline-block', margin: cardMargin }} >
          <Card cardDetails={card} cardImageHeight={cardImageHeight}/>
        </div>
      )))}
      </div>
    </div>
  );
}
