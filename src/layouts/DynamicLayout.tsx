import Banners from "@/components/banners/banners";
import Sections from "@/components/Sections/Sections";
import GenericLayout from "./GenericLayout";
import { PageContext } from "@/context/pagecontext";
import DetailsPage from "@/components/Details/details";
import { memo } from "react";
import TvGuide from "@/components/tvguide/Tvguide";
import Grid from "@/components/grid/Grid";

function DynamicLayout(): JSX.Element {
  return (
    <GenericLayout>
      <PageContext.Consumer>
        {({ info }) => {
           console.log(info)
            return (
              <>
                {info.pageType == "content" && (
                  <>
                    <Banners />
                    <Sections />
                  </>
                )}
                {info.pageType == "details" && (
                  <>
                    <DetailsPage />
                    <Sections />
                  </>
                )}
                {(info.pageType == "content" && info.path == "catchup") && (
                  <>
                  <TvGuide/>
                  </>
                )}
                 {(info.pageType == "list") && (
                 <Grid/>
                )}
              </>
            );
          
        }}
      </PageContext.Consumer>
    </GenericLayout>
  );
}

export default memo(DynamicLayout)