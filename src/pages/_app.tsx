import Layout from "@/layouts/Layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
