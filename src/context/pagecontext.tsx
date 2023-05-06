import { pagecontextInterface } from "@/shared";
import { createContext } from "react";



const initialcontext:pagecontextInterface={
    banners:[],
    sections:[],
    info:{},
    content:[],
}

export const PageContext = createContext<pagecontextInterface>(initialcontext)