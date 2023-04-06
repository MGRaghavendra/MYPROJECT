import Seodata from "@/components/seodata/seodata";
import { fetchdata } from "@/fetchapi";
import { getBaseApi } from "@/api";
import Layout from "@/layouts/Layout";
import { seoInterface } from "@/shared";
import { createSession, initAPIS } from "@/serverapis";
import { parse, serialize } from "cookie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import DynamicLayout from "@/layouts/DynamicLayout";


export default function DynamicPage({ seodata }:{seodata:seoInterface}) {
  return (
    <>
      {
        <Seodata seodata={seodata} />
      }
       <Layout>
          <DynamicLayout/>
       </Layout>
    </>
  );
}



export const getServerSideProps: GetServerSideProps = async (context:GetServerSidePropsContext) => {
  let cookies = parse(context.req.headers["cookie"] || "")
  console.log("cookies: ",cookies)
  if (!(cookies && (cookies.boxId || cookies.sessionId || cookies.tenantCode))) {
    const auth_headers = await initAPIS(context)
    await createSession({context,...auth_headers})
    cookies = auth_headers;
  }
  
  const url = await getBaseApi();
  let arr = context.resolvedUrl.split('/')
  arr.shift()
  let seo_url = arr.join('/') == "/" ? "home" :arr.join('/')
  let seodata =  await fetchdata(`${url}/service/api/v1/page/seo?path=${seo_url}`,{
    'session-id':cookies.sessionId,
    'box-id':cookies.boxId,
    'tenant-code':cookies.tenantCode
  });

  console.log("seodata: ",seodata)

  if(seodata.status == false && seodata.error.code == 404){
    return {
        notFound:true
    }
  }

  if(seodata.status == false && seodata.error.code == 401){
    console.log(seodata)
    const auth_headers = await initAPIS(context)
    await createSession({context,...auth_headers})
    cookies = auth_headers;
    //service/api/v1/page/content?path=videos&count=40
    seodata =  await fetchdata(`${url}/service/api/v1/page/seo?path=${seo_url}`,{
        'session-id':cookies.sessionId,
        'box-id':cookies.boxId,
        'tenant-code':cookies.tenantCode
    });
  }

  // console.log(seodata)

  return {
    props: {
      seodata:seodata.status ? seodata.response :{}
    }
  }
}