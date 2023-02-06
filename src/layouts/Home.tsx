import UserContext from "@/context/usercontext";
import Link from "next/link";
import { useContext, useEffect } from "react";
import Head from "next/head";
export default function Home(): JSX.Element {
  console.log('hello home....')
  return (

    <>
      <Head>
        <title>Home Page.....</title>
      </Head>
      <div>
        <p>Home Page...</p>
      </div>
    </>
  );
}
