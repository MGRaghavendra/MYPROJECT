import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from "react";


export default function App({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  );
}
