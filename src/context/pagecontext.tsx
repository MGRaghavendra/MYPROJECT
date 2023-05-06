import { bannerInterface, pagecontextInterface } from "@/shared";
import { createContext } from "react";



const initialcontext:pagecontextInterface={
    banners:[],
    sections:[],
    info:{}
}

export const PageContext = createContext<pagecontextInterface>(initialcontext)