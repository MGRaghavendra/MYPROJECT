import { bannerInterface } from "@/shared";
import { createContext } from "react";

interface pagecontextInterface{
    banners:bannerInterface[]
    sections:any[]
    info:{
        attributes?: {}
        code?: string
        pageType?:string
        path?:string
    }
}

const initialcontext:pagecontextInterface={
    banners:[],
    sections:[],
    info:{}
}

export const PageContext = createContext<pagecontextInterface>(initialcontext)