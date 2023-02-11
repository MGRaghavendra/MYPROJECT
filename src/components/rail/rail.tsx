import { Card } from "./card/card";
import styles from "./rail.module.scss";
import { SectionTitle } from "./section-title/SectionTitle";

export const Rail = ():JSX.Element =>{
    return <div className={`${styles.rail}`}>
        <SectionTitle/>
        <div className= {`${styles.section_inner}`}>
        <Card />
        <Card />
        <Card />
        <Card />
        </div>
    </div>
}