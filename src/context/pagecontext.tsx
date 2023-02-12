import { bannerInterface } from "@/shared";
import { createContext } from "react";

interface pagecontextInterface{
    banners:bannerInterface[]
    sections:any[]
}

const initialcontext:pagecontextInterface={
    banners:[],
    sections:[]
}

export const PageContext = createContext<pagecontextInterface>(initialcontext)