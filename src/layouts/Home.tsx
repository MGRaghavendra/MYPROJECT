import Head from "next/head";
import Banners from "@/components/banners/banners";
import Sections from "@/components/Sections/Sections";
import GenericLayout from "./GenericLayout";

export default function Home(): JSX.Element {
  return (
    <GenericLayout>
      <Head>
        <title>Home Page.....</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      {/* <div style={{marginTop:"96px"}}> */}
        <Banners />
        <Sections />
      {/* </div> */}
    </GenericLayout>
  );
}
