const breakPoints = [1400, 1200, 992, 768, 576];
//>=1400 8.5
//>= 1200 7.5
//>= 992 6
//>= 768 5
//>=576 4
//<=576 3.5
{
  /*
    
     if (resolution <= 320) {
                return { cardCount: 2.8, gridCound: 2, cardRatio: 1.5 }
            }
            else if (resolution <= 380) {
                return { cardCount: 3.3, gridCound: 3, cardRatio: 1.5 }
            }
            else if (resolution <= 425) {
                return { cardCount: 3.3, gridCound: 3, cardRatio: 1.5 }
            }
            else if (resolution <= 480) {
                return { cardCount: 3.3, gridCound: 3, cardRatio: 1.5 }
            }
            else if (resolution <= 576) {
                return { cardCount: 4.2, gridCound: 4, cardRatio: 1.5 }
            }
            else if (resolution <= 767) {
                return { cardCount: 4.5, gridCound: 4, cardRatio: 1.5 }
            }
            else if (resolution <= 950) {
                return { cardCount: 5, gridCound: 5, cardRatio: 1.5 }
            }
            else if (resolution <= 991) {
                return { cardCount: 5.55, gridCound: 5, cardRatio: 1.5 }
            }
            else if (resolution <= 1024) {
                return { cardCount: 6.2, gridCound: 5, cardRatio: 1.5 }
            }
            else if (resolution <= 1199) {
                return { cardCount: 6.66, gridCound: 6, cardRatio: 1.5 }
            }
            else if (resolution <= 1366) {
                return { cardCount: 7, gridCound: 7, cardRatio: 1.5 }
            }
            else if (resolution <= 1440) {
                return { cardCount: 8, gridCound: 8, cardRatio: 1.5 }
            } else {
                return { cardCount: 8, gridCound: 8, cardRatio: 1.5 }
            }
    */
}

export function getdefaultcardConfig(cardType: string, resolution: number) {
  return getcardTypeConfig(cardType, resolution);
}

function getcardTypeConfig(cardType: string, resolution: number) {
    console.log(resolution)
  if (cardType == "roller_poster") {
    if (resolution <= 320) {
      return { cardCount: 2.8 };
    } else if (resolution <= 380) {
      return { cardCount: 3.3 };
    } else if (resolution <= 425) {
      return { cardCount: 3.3 };
    } else if (resolution <= 480) {
      return { cardCount: 3.3 };
    } else if (resolution <= 576) {
      return { cardCount: 4.2 };
    } else if (resolution <= 767) {
      return { cardCount: 4.5 };
    } else if (resolution <= 950) {
      return { cardCount: 5 };
    } else if (resolution <= 991) {
      return { cardCount: 5.55 };
    } else if (resolution <= 1024) {
      return { cardCount: 6.2 };
    } else if (resolution <= 1199) {
      return { cardCount: 6.66 };
    } else if (resolution <= 1366) {
      return { cardCount: 7.2 };
    } else if (resolution <= 1440) {
      return { cardCount: 8 };
    } else {
      return { cardCount: 8 };
    }
  }
  else if(cardType == "overlay_poster" || cardType == "overlayIcon_poster" || cardType == "sheet_poster" || cardType == "network_poster" || cardType == "content_poster" || cardType == "expands_poster"){
    if (resolution <= 320) {
        return { cardCount: 2, gridCound: 2, cardRatio: 0.5625 }
    }
    else if (resolution <= 380) {
        return { cardCount: 2.14, gridCound: 2, cardRatio: 0.5625 }
    }
    else if (resolution <= 425) {
        return { cardCount: 2.14, gridCound: 2, cardRatio: 0.5625 }
    }
    else if (resolution <= 480) {
        return { cardCount: 2.14, gridCound: 2, cardRatio: 0.5625 }
    }
    else if (resolution <= 576) {
        return { cardCount: 2.38, gridCound: 2, cardRatio: 0.5625 }
    }
    else  if (resolution <= 767) {
        return { cardCount: 2.77, gridCound: 3, cardRatio: 0.5625 }
    }           
    else if (resolution <= 1024) {
        return { cardCount: 3, gridCound: 3, cardRatio: 0.5625 }
    }           
    else if (resolution <= 1300) {
        return { cardCount: 4, gridCound: 4, cardRatio: 0.5625 }
    }            
    else if (resolution <= 1650) {
        return { cardCount: 5, gridCound: 5, cardRatio: 0.5625 }
    } 
    else {
        return { cardCount: 6, gridCound: 6, cardRatio:  0.5625 }
    }
  }
  else {
    if (resolution <= 425) {
      return { cardCount: 2.14 };
    } else if (resolution <= 576) {
      return { cardCount: 2.38 };
    } else if (resolution <= 767) {
      return { cardCount: 2.77 };
    } else if (resolution <= 991) {
      return { cardCount: 4 };
    } else if (resolution <= 1024) {
      return { cardCount: 4.55 };
    } else if (resolution <= 1199) {
      return { cardCount: 4.55 };
    } else if (resolution <= 1366) {
      return { cardCount: 5 };
    } else if (resolution <= 1440) {
      return { cardCount: 6 };
    } else {
      return { cardCount: 6 };
    }
  }
}

export default breakPoints;
