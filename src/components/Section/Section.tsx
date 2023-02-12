import { ReactNode } from "react";
import styles from "./Section.module.scss";
import Card from "@/components/card/card";

export default function Section({ section }: any): JSX.Element {
  let cards = section?.section?.sectionData?.data || [];
  return (
    <div className={styles.section}>
      {cards && (
        <div className= {styles.cards}>
          {cards.map((card: any, index: any) => {
            return <Card key={index} carddata={card} />;
          })}
        </div>
      )}
    </div>
  );
}
