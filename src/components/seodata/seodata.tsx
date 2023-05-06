import { seoInterface } from "@/shared";
import Head from "next/head";
import { useRouter } from "next/router";



function createMeta({property,name,content}:{property?:string,name:string,content:string}){
    if(property){
        return <meta name={name} content={content} property={property}/>
    }
    else{
        return <meta name={name} content={content}/>
    }
}

export default function ({seodata}:{seodata:seoInterface}):JSX.Element{
    const {asPath} = useRouter()
    return <Head>
        {seodata.title ? <title>{seodata.title}</title> : <title>{`${asPath.split('/')[1]}-FirstShows`}</title>}
        {seodata.description && createMeta({name:"description",content:seodata.description})}
        {seodata.keywords &&  createMeta({name:"keywords",content:seodata.keywords}) }
    </Head>
}

