import { ReactNode } from "react";
import { Card } from "@/components/card/card";
import { SectionTitle } from "./section-title/SectionTitle";
import styles from "./Section.module.scss";

export default function Section({ section }: any): JSX.Element {
  // const {sectionInfo} = section?.section;
  let sectionInfo;
  if(section && section.section && section.section.sectionInfo){
    sectionInfo = section.section.sectionInfo
  }

  let cards = section?.section?.sectionData?.data || [];
  const sectionConfgis = new createSection({
    paddingLeft:`${getsectionPadding(document.body.clientWidth).padding}`,
    totalWidth:`${document.body.clientWidth}px`
  })
  console.log(sectionConfgis,'-->',sectionInfo.name)
  return (
    <>
      { (!!cards && cards.length>0) &&
        <div className={styles.section} 
        // style={{paddingLeft:sectionConfgis.configs.paddingLeft}}
        >
        {sectionInfo && <SectionTitle  sectionInfo = {sectionInfo}/>}
        {cards && (
          <div className= {styles.cards} >
            {cards.map((card: any, index: any) => {
                return <Card key={index} cardDetails={card} avaliableSpace={sectionConfgis.avaliableSpace}/>
            })}
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