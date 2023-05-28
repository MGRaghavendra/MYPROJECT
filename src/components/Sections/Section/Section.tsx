import { Card } from "@/components/card/card";
import { SectionTitle } from "./section-title/SectionTitle";
import styles from "./Section.module.scss";
import { useEffect, useRef, useState } from "react";
import { getscrollproperties } from "@/utils";
import { scrollcardsInterface } from "@/shared";

interface scrollrefInterface{
  currentLeft:number;
  hiddenCardLeft:number;
  startingCardLeft:number
  // prevLeft:number;
}

export default function Section({ section }: any): JSX.Element {
  let sectionInfo;
  if(section && section.section && section.section.sectionInfo){
    sectionInfo = section.section.sectionInfo
  }

  const cards = section?.section?.sectionData?.data || [];
  const cardType = cards.length > 0 && cards[0].cardType
  const elementRef = useRef<HTMLDivElement>(null);

  const scrollRef = useRef<scrollrefInterface>({
    currentLeft:0,
    hiddenCardLeft:0,
    startingCardLeft:0,
    // prevLeft:0,
  })
  
  const [enablearrows,setEnablearrows] = useState<boolean>(false);
  const [enablerightarrow,setEnablerightarrow] = useState<boolean>(false);
  const [enableleftarrow,setEnableleftarrow] = useState<boolean>(false);

  useEffect(()=>{
    if(elementRef.current !== null){
      if(elementRef.current.scrollWidth > window.innerWidth){
        setEnablearrows(true);
        setEnablerightarrow(true);
        sethiddenCardLeft();
        window.addEventListener('resize', sethiddenCardLeft);
      }
    }
    return ()=>{
      window.removeEventListener('resize',sethiddenCardLeft);
    }
  },[])

  const sethiddenCardLeft = () =>{
    if(elementRef.current !== null){
      let element_cards:HTMLCollection = elementRef.current.children;
      let leftset:boolean = false;
      for(let i=0;i<element_cards.length;i++){
        let cardELement:Element | null = element_cards.item(i)
        if (cardELement){
          let boundraies:DOMRect = cardELement.getBoundingClientRect()
          if(boundraies.right > window.innerWidth){
            scrollRef.current.hiddenCardLeft = boundraies.left;
            break;
          }
          if(boundraies.left > 0 && leftset == false){
            scrollRef.current.startingCardLeft = boundraies.left;
            leftset = true;
          }
        }
      }
    }
  }

  const handleScrollTo = (to: 'left' | 'right', cardType: keyof scrollcardsInterface) => {
    if (elementRef.current !== null) {
      let scrollproperties = getscrollproperties(cardType, window.innerWidth)
      if (to === 'left') {
        let left = scrollRef.current.currentLeft + (scrollRef.current.hiddenCardLeft - scrollproperties.paddingLeft - scrollproperties.marginRight)
        //check no_of hidden cards length must be greater than window width;
        if (elementRef.current.scrollWidth - left >= window.innerWidth){
          {/*
          -last hidden card left [hiddenCardLeft]
          -move last hidden card to the left end of the screen [hiddenCardLeft] units
          -and move right padding and margin units
        */}
          // scrollRef.current.prevLeft = scrollRef.current.currentLeft;

          elementRef.current.style.left = `${-left}px`
          scrollRef.current.currentLeft = left;
        }
        else{
          {
            /*
            remaining cards total width is less than window width then we need to scroll no of hidden cards only
            
            -you need complete cards with for that use [scrollwidth]
            -how much you moved to the left [prevleft]
            -last hidden card left 
            
            -you need to add how much left moved && hidden card left 
            -add card margin*2 times && horizantal carousel padding(either left or right)[note padding must be equal on both sides]
            -and remove from scroll bar width

            -finally above result add to the prevleft
            
            */
          }
          // console.log(elementRef.current.scrollWidth - (scrollRef.current.prevLeft + scrollRef.current.hiddenCardLeft) + 48 + 14)

          let dummy_left = elementRef.current.scrollWidth - (scrollRef.current.currentLeft + scrollRef.current.hiddenCardLeft)
          
          left = scrollRef.current.currentLeft + ((elementRef.current.scrollWidth - (scrollRef.current.currentLeft + scrollRef.current.hiddenCardLeft))  + scrollproperties.marginRight * 2)

          console.log(left);
          console.log(elementRef.current.scrollWidth)
          elementRef.current.style.left = `${-left}px`
          scrollRef.current.currentLeft = left;
          setEnablerightarrow(false);
        }
        if (enableleftarrow === false) setEnableleftarrow(true);
        console.log(scrollRef.current)
      }
      else if (to === 'right') {
        console.log(scrollRef.current)
        let left = scrollRef.current.currentLeft - (scrollRef.current.hiddenCardLeft - scrollRef.current.startingCardLeft)
        if(Math.floor(left) <= 0){
          left = 0;
          if (enableleftarrow === true) setEnableleftarrow(false);
        }
        if (enablerightarrow === false) setEnablerightarrow(true);
        elementRef.current.style.left = `${-left}px`
        scrollRef.current.currentLeft = left;
        console.log(left);
      }
    }
  }

  return (
    <>
      {(!!cards && cards.length > 0) &&
        <div className={styles.section}>
          {sectionInfo && <SectionTitle sectionInfo={sectionInfo} />}
         
          {cards && (
            <div className={styles.cards_wrapper}>
              {(enablearrows && enableleftarrow) && (
                <div className={`${styles.arrow_container} ${styles.left_arrow_container}`} onClick={() => handleScrollTo("right", cardType)}>
                  <span className={`${styles.arrowbox}`}></span>
                </div>
              )}
            <div className={styles.cards} ref={elementRef} style={{left:'0px'}}>

              {cards.map((card: any, index: any) => {
                return <Card key={index} cardDetails={card} />
              })}

            </div>
              {(enablearrows && enablerightarrow) && (
                <div className={`${styles.arrow_container} ${styles.right_arrow_container}`} onClick={() => handleScrollTo('left', cardType)
                }>
                  <span className={`${styles.arrowbox}`}></span>
                </div>)}
            </div>
          )}
         
        </div>
      }
    </>
  );
}

type configsType={
  paddingLeft:string;
  totalWidth:string;
}

class createSection{
  configs:configsType;
  avaliableSpace:string;
  cards:any[];
  constructor(configs:configsType){
    this.configs ={...configs}
    this.avaliableSpace = '0px';
    this.setAvalibleSpace();
    this.cards = [];
  }

  setAvalibleSpace(){
    let totalWidthInt:number =this.getpxfromnum(this.configs.totalWidth);
    let paddingLeftInt:number = this.getpxfromnum(this.configs.paddingLeft);
    this.avaliableSpace = `${totalWidthInt - paddingLeftInt}px`;
  }

  getpxfromnum(pxunit:string):number{
    if(typeof pxunit !== 'string' || pxunit.indexOf('px') <= -1){
      throw new Error(`${pxunit} must be a string and it's in px`)
    }
    return Number(pxunit.split('px')[0])
  }
}

function getsectionPadding(resolution: number) {
  console.log(resolution)
  if (resolution <= 320) {
    return { padding: '5px' };
  } else if (resolution <= 380) {
    return { padding: '5px' };
  } else if (resolution <= 425) {
    return { padding: '10px' };
  } else if (resolution <= 480) {
    return { padding: '15px' };
  } else if (resolution <= 576) {
    return { padding: '15px' };
  } else if (resolution <= 767) {
    return { padding: '15px' };
  } else if (resolution <= 950) {
    return { padding: '15px' };
  } else if (resolution <= 991) {
    return { padding: '15px' };
  } else if (resolution <= 1024) {
    return { padding: '50px' };
  } else if (resolution <= 1199) {
    return { padding: '50px' };
  } else if (resolution <= 1366) {
    return { padding: '50px'};
  } else if (resolution <= 1440) {
    return { padding: '50px' };
  } else {
    return { padding: '50px' };
  }

}