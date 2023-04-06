import { menuInterface } from "@/shared";
import styles from "./menus.module.scss";
import Menu from "./menu";
interface props {
  menus: menuInterface[];
}
export default function Menus({ menus }: props): JSX.Element {
  return (
    <div className={`${styles.menus}`}>
      {menus.map((menu, index) => (
        index <= 5 && <Menu menu={menu} key={index} />
      ))}
    </div>
  );
}
