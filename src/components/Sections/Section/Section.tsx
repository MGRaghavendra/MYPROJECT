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
  return (
    <>
      { (!!cards && cards.length>0) &&
        <div className={styles.section}>
        {sectionInfo && <SectionTitle  sectionInfo = {sectionInfo}/>}
        {cards && (
          <div className= {styles.cards}>
            {cards.map((card: any, index: any) => {
                return <Card key={index} cardDetails={card}/>
            })}
          </div>
        )}
      </div>
      }
    </>
  );
}
