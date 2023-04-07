import Banners from "@/components/banners/banners";
import Sections from "@/components/Sections/Sections";
import GenericLayout from "./GenericLayout";
import { PageContext } from "@/context/pagecontext";
import DetailsPage from "@/components/Details/details";

export default function DynamicLayout(): JSX.Element {
  return (
    <GenericLayout>
      <PageContext.Consumer>
        {({ info }) => {
          console.log('hello....')
          console.log(info)
          return (
            
            <>
              {info.pageType == "content" && (
                <>
                  <Banners />
                  <Sections />
                </>
              )}
              {
                info.pageType == "details" && (
                  <>
                  <DetailsPage/>
                  <Sections/>
                  </>
                )
              }
            </>
          );
        }}
      </PageContext.Consumer>
    </GenericLayout>
  );
}
