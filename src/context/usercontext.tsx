import { menuInterface } from "@/shared";
import {createContext} from "react";


interface userContexinterface {
  menus: menuInterface[];
}
const defaultvalue: userContexinterface = {
  menus: [],
};
const UserContext = createContext<userContexinterface>(defaultvalue);

export default UserContext
