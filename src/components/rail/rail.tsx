import { PageContext } from "@/context/pagecontext";
import { useContext } from "react";
import { Card } from "./card/card";
import styles from "./rail.module.scss";
import { SectionTitle } from "./section-title/SectionTitle";

export const Rail = (props:any):JSX.Element =>{
//    const { cards } = useContext(PageContext);
    const {cards = {}} = props
   const { section = {} } = cards;
   const { sectionData = {} } = section;
   const { sectionInfo = {} } = section;
   const { data = [] } = sectionData;
   console.log(cards)
    return <>
        { data?.length > 0 &&
            <div className={`${styles.rail} ${cards.contentCode}`}>
            <SectionTitle  sectionInfo = {sectionInfo}/>
            <div className= {`${styles.section_inner}`}>
            {
                data?.map((cardDetails:any , index:number) =>{
                    return <Card key={index}  cardDetails = {cardDetails} />
                })
            }
            </div>
        </div>
        }
    </>
}