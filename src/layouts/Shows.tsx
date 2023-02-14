import Head from "next/head";
import Banners from "@/components/banners/banners";
import Sections from "@/components/Sections/Sections";
import GenericLayout from "@/layouts/GenericLayout";

export default function Movies(): JSX.Element {
  return (
    <GenericLayout>
      <Head>
        <title>Shows Page.....</title>
      </Head>
      {/* <div> */}
        <Banners />
        <Sections />
      {/* </div> */}
    </GenericLayout>
  );
}
