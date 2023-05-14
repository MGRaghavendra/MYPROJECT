import { PageContext } from "@/context/pagecontext"
import { ReactNode, useContext } from "react"
import style from './Sections.module.scss'
import Section from "@/components/Sections/Section/Section"

export default function Sections():JSX.Element{
    const {sections,banners} = useContext(PageContext)
    console.log(banners,'--------')
    return (
      <div className={`${style.sections}` + (banners.length === 0 ? ` ${style.noBanners}` : '')}>
        {sections.map((section, index) => {
          if (section.section.sectionInfo.name != "Cast & Crew") {
            return <Section key={index} section={section} />;
          }
        })}
      </div>
    );
}

