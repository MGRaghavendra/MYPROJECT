import { bannerInterface } from "@/shared";
import { createContext } from "react";

interface pagecontextInterface{
    banners:bannerInterface[],
    cards:any
}

const initialcontext:pagecontextInterface={
    banners:[],
    cards:[]
}

export const PageContext = createContext<pagecontextInterface>(initialcontext)