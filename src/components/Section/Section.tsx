import { ReactNode } from "react"
import styles from './Section.module.scss'
import Card from "@/components/card/card"

export default function Section({section}:any):JSX.Element{
    return <div className={styles.section}>
        {
            section?.section?.sectionData?.data.map((card:any,index:any)=>{
                return <Card key={index} carddata={card}/>
            })
        }
    </div>
}