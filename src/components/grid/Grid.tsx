import { useContext } from "react";
import styles from "./Grid.module.scss";
import { PageContext } from "@/context/pagecontext";
import { Card } from "../card/card";
export default function Grid() {
  const { sections,banners } = useContext(PageContext);
  console.log(sections)
  return (
    <div className={`${styles.Grid_container}`+(banners.length == 0 ? ` ${styles.noBanners}` : '')}>
      {sections.map((section) => section.section.sectionData.data.map((card) =><Card cardDetails={card}/>))}
    </div>
  );
}
