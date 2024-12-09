import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";
import styles from "./style.module.scss";
import Button from "../Button";

export default function Navbar() {
  return (
    <div className={styles["navbar-container"]}>
      <div className={styles["navbar-menu"]}>
        <Icon icon={faReceipt} size="2x" className="mr-4" />
        <span className="text-xl font-bold">MONEY CHECKER</span>
      </div>
      <Button className="black-bg">Login</Button>
    </div>
  );
}
