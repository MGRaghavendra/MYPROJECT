import {ReactNode, createContext, useState} from "react";
import { usercontextInterface } from "@/shared";

const defaultvalue: usercontextInterface = {
  menus: [],
  systemconfigs:[],  
  userDetails:{}
};
const UserContext = createContext<usercontextInterface>(defaultvalue);

const initialstate:usercontextInterface = {
  menus:[],
  userDetails:{},
  systemconfigs:{}
}

// function UserProvider({children}:{children:ReactNode}){
//   const [state,setState]=useState<usercontextInterface>(initialstate);

//   const setContext = (newData:Partial<usercontextInterface>) =>{
//     setState({...initialstate,...newData});
//   }

//   return(
//     <UserContext.Provider value={{...state,setContext}}>
//       {children}
//     </UserContext.Provider>
//   )

// }

export default UserContext
// export {UserProvider};
