import Head from "next/head";
import Banners from "@/components/banners/banners";
import Sections from "@/components/Sections/Sections";
import GenericLayout from "./GenericLayout";

export default function Home(): JSX.Element {
  return (
    <GenericLayout>
      <Head>
        <title>Home Page.....</title>
      </Head>
      <div style={{ marginTop: "40px", backgroundColor: "#141414" }}>
        <Banners />
        <Sections />
      </div>
    </GenericLayout>
  );
}
