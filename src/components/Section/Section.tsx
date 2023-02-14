import { ReactNode } from "react";
import { Card } from "@/components/card/card";
import { SectionTitle } from "./section-title/SectionTitle";
import styles from "./Section.module.scss";

export default function Section({ section }: any): JSX.Element {
  const { sectionInfo } = section?.section;
  let cards = section?.section?.sectionData?.data || [];
  return (
    <>
      {cards.length > 0 && (
        <div className={styles.section}>
          <SectionTitle sectionInfo={sectionInfo} />
          {cards && (
            <div className={styles.cards}>
              {cards.map((card: any, index: any) => {
                return <Card key={index} cardDetails={card} />;
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
