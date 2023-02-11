import { PageContext } from "@/context/pagecontext";
import { useContext } from "react";
import { Card } from "./card/card";
import styles from "./rail.module.scss";
import { SectionTitle } from "./section-title/SectionTitle";

export const Rail = ():JSX.Element =>{
   const { cards } = useContext(PageContext);
   const { section = {} } = cards;
   const { sectionData = {} } = section;
   const { sectionInfo = {} } = section;
   const { data = [] } = sectionData;
    return <div className={`${styles.rail}`}>
        <SectionTitle  sectionInfo = {sectionInfo}/>
        <div className= {`${styles.section_inner}`}>
        {
            data?.map((cardDetails:any , index:number) =>{
                return <Card cardDetails = {cardDetails} key={index}/>
            })
        }
        </div>
    </div>
}