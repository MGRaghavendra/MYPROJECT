import { bannerInterface } from "@/shared";
import { createContext } from "react";

interface pagecontextInterface{
    banners:bannerInterface[]
}

const initialcontext:pagecontextInterface={
    banners:[]
}

export const PageContext = createContext<pagecontextInterface>(initialcontext)