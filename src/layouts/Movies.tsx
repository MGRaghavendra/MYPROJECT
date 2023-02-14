import Head from "next/head";
import Banners from "@/components/banners/banners";
import Sections from "@/components/Sections/Sections";
import GenericLayout from "@/layouts/GenericLayout";

export default function Movies(): JSX.Element {
  return (
    <GenericLayout>
      <Head>
        <title>Movies Page.....</title>
      </Head>
      {/* <div style={{marginTop:"96px"}}> */}
        <Banners />
        <Sections />
      {/* </div> */}
    </GenericLayout>
  );
}
