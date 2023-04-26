import {ReactNode, createContext, useState} from "react";
import { usercontextInterface } from "@/shared";

const defaultvalue: usercontextInterface = {
  menus: [],
  systemconfigs:[],  
  userDetails:{},
  systemfeatures:{}
};
const UserContext = createContext<usercontextInterface>(defaultvalue);

export default UserContext;
