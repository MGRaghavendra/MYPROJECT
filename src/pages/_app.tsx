import Layout from "@/layouts/Layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ApiContext } from "@/context/apicontext";

import { useEffect, useState } from "react";


export default function App({ Component, pageProps }: AppProps) {
  const [base_url,setbaseurl] = useState<string>("")
  useEffect(()=>{
    // getBaseApi().then((url:string)=>{
    //   console.log('cdscdvds: ',url)
    //   setbaseurl(url)
    // })
    
  },[])
  return (
    <ApiContext.Provider value={{base_url:base_url}}>
      <Component {...pageProps} />
    </ApiContext.Provider>
  );
}
