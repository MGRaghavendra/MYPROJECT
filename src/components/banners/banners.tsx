import { PageContext } from "@/context/pagecontext";
import { bannerInterface } from "@/shared";
import { ReactNode, useContext, useEffect, useState } from "react";
import styles from "./banners.module.scss";
import Slider, { Settings } from "react-slick";
import getConfig from "next/config";
let appConfig = getConfig().publicRuntimeConfig.appconfig
function Banner({ banner }: { banner: bannerInterface }) {
  return (
    <div className={styles.imageContainer}>
      <img
        src={`${appConfig.bannerImgpath}/content/banner/common/${
          banner.imageUrl.split(",")[1]
        }`}
        alt=""
      />
    </div>
  );
}

function Dots(dots: ReactNode): JSX.Element {
  return <ul>{dots}</ul>;
}

function Dot(index: number) {
  return <div className={styles.dot}></div>;
}

export default function Banners() {
  const { banners } = useContext(PageContext);
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // appendDots: Dots,
    customPaging: Dot,
    // autoplay: true,
    beforeChange: (currentSlide: number, nextSlide: number) => {
      console.groupCollapsed("beforeChange: ", currentSlide);
      console.log("nextSlide: ", nextSlide);
      console.groupEnd();
    },
    afterChange: (currentSlide: number) => {
      console.log("afterchange: ", currentSlide);
    },
    // useCSS: true,
    dotsClass: styles.bannerdots,
    centerMode: true,
    arrows: false,
    centerPadding:'140px',
  };
  // console.log(banners);
  return banners.length > 0 ? (
    <div className={styles.banners}>
    <div className={styles.bannersWrapper}>
      <div className={styles.bannersContainers}>
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <Banner key={index} banner={banner} />
          ))}
        </Slider>
      </div>
    </div>
    <div className={styles.sectionhelper}></div>
    </div>
  ) : (
    <></>
  );
}
