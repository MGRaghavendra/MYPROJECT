import { menuInterface } from "@/shared";
import styles from "./menus.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
interface props {
  menu: menuInterface;
}
export default function Menu({ menu }: props) {
  const { asPath } = useRouter();
  const isActive: boolean = ((asPath == `/${menu.targetPath}`) || (asPath == '/' && menu.targetPath == "home")) ? true : false;
  return (
    // <Link href={menu.targetPath !== "home" ? `/${menu.targetPath}` : "/"}> 
    <Link href={ `/${menu.targetPath}`}>
      <div className={`${styles.menu} ` + (isActive ? styles.active : "")}>
        <span>{menu.displayText}</span>
      </div>
    </Link>
  );
}
