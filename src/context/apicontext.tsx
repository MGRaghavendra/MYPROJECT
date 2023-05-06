import { createContext } from "react";

interface apicontextInterface{
    base_url:string;
}

const initialcontext:apicontextInterface={
   base_url:""
}

export const ApiContext = createContext<apicontextInterface>(initialcontext)