import styles from "./SearchInput.module.scss";
import { ChangeEvent } from "react";
import getConfig from "next/config";
let appConfig = getConfig().publicRuntimeConfig.appconfig

type propTypes = {
    searchtext:string
    handleSearch:(arg:string)=>void
}
export default function SearchInput({searchtext,handleSearch}:propTypes) {
    const handleInput = (e:ChangeEvent<HTMLInputElement>)=>{
        handleSearch(e.target.value)
    }
  return (
    <div className={styles.searhwrapper}>
      <div className={styles.searchContainer}>
          <img
            src={`${appConfig.cloudpath}/images/search-icon.svg`}
            width={22}
            height={18}
            alt="logo"
          />
        <input type="text" placeholder="Search..." value={searchtext} onChange={handleInput} autoFocus={true}/>
        {
          searchtext.length > 0 && <div className={styles.crossbtn}></div>
        }
      </div>
    </div>
  );
}
