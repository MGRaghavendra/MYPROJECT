import { appConfig } from "@/appconfig";
import { PageContext } from "@/context/pagecontext";
import { bannerInterface } from "@/shared";
import { useContext, useEffect, useState } from "react";
import styles from "./banners.module.scss";
import Slider from "react-slick";

function Banner({ banner }: { banner: bannerInterface }) {
  const [style, setStyle] = useState({});
  useEffect(function () {
    let windowobj: Window = window;
    let body: HTMLBodyElement = document.getElementsByTagName("body")[0];
    console.log(windowobj.innerWidth);
    setStyle((style) => ({ ...style, width: `${body.style.width}px` }));
  }, []);
  return (
    <div className={styles.imageContainer} style={style}>
      <img
        src={`${appConfig.bannerImgpath}/content/banner/common/${
          banner.imageUrl.split(",")[1]
        }`}
        alt=""
      />
    </div>
  );
}

export default function Banners() {
  const { banners } = useContext(PageContext);
  // console.log(banners);
  return (
    <div className={styles.bannersWrapper}>
      <div className={styles.bannersContainers}>
        {banners.map((banner, index) => (
          <Banner key={index} banner={banner} />
        ))}
        {/* <div className={styles.bannerdots}>
          {banners.map((_, i) => (
            <span key={i} className={styles.dot}></span>
          ))}
        </div> */}
      </div>
    </div>
  );
}
