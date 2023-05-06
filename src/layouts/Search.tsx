import SearchInput from "@/components/searchInput/SearchInput";
import { ChangeEvent, useState } from "react";

export default function SearchPage(){
    const [searchtext,setsearchText] = useState<string>('');
    const handleSearchText = (value:string)=>{
        setsearchText(value)
    }
    return (<div style={{paddingTop:"90px",backgroundColor: "#141414"}}>
       
        <div style={{height:"100vh",backgroundColor:"#141414"}}></div>
    </div>)
}