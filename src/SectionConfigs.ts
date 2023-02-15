import { CSSProperties } from "react";
import { StringLiteral } from "typescript";

interface sectionConfigs {
  padding: [number, number, number, number]; //top right bottom left
  margin: [number, number, number, number]; //top right bottom left
  styles?: CSSProperties;
  nofCards:number;
}

interface cardConfigs {
    padding: [number, number, number, number]; //top right bottom left
    margin: [number, number, number, number]; //top right bottom left
    styles?: CSSProperties;
    visibleWidth?:number;
}

class Section {
  padding: [number, number, number, number];
  margin: [number, number, number, number];
  Styles: CSSProperties;
  contentWidth:number = 0;
  nofCards:number;
  constructor(configs: sectionConfigs) {
    this.padding = configs.padding;
    this.margin = configs.margin;
    this.nofCards = configs.nofCards;
    this.Styles = configs.styles || {};
    this.setContentWidth();
  }
  setContentWidth(){
     this.contentWidth = 100 - (this.padding[1]+this.padding[3])
  }
}



export default function getConfigs() {
  return {};
}
