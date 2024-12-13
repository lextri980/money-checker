"use client";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./style.module.scss";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className={styles["navbar-container"]}>
      <div className={styles["navbar-menu"]}>
        <Icon icon={faReceipt} size="2x" className="mr-4" />
        <span className="text-xl font-bold">MONEY CHECKER</span>
      </div>
      <Button className="black-bg" onClick={() => router.push("/login")}>
        Login
      </Button>
    </div>
  );
}
