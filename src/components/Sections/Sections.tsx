import { PageContext } from "@/context/pagecontext"
import { ReactNode, useContext } from "react"
import style from './Sections.module.scss'
import Section from "@/components/Section/Section"

export default function Sections():JSX.Element{
    const {sections} = useContext(PageContext)
    console.log(sections ,'from sections Component')
    return <div className={style.sections}>
        {
            sections.map((section,index)=>{
                return <Section key={index} section={section}/>
            })
        }
    </div>
}