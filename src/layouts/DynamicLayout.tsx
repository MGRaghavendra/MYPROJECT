import Head from "next/head";
import Banners from "@/components/banners/banners";
import Sections from "@/components/Sections/Sections";
import GenericLayout from "./GenericLayout";
import { useContext } from "react";
import { PageContext } from "@/context/pagecontext";

export default function DynamicLayout(): JSX.Element {
  // const pagedata = useContext(PageContext)
  // console.log(pagedata)
  return (
    <GenericLayout>
      {/* <div style={{marginTop:"96px"}}> */}
      <PageContext.Consumer>
        {(value) => {
          console.log(value);
          return (
            <>
              <Banners />
              <Sections />
            </>
          );
        }}
      </PageContext.Consumer>
      {/* </div> */}
    </GenericLayout>
  );
}
