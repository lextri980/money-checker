"use client";
import { useClientCookie } from "@/hooks";
import { faDoorOpen, faReceipt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./style.module.scss";
import { StorageUtil } from "@/utils";

export default function Navbar() {
  const router = useRouter();
  const inSession = useClientCookie("inSession");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  /**
   * Handle logout
   */
  const logout = () => {
    StorageUtil.removeManyStorage(["inSession", "token", "userInfo"]);
    router.refresh();
  };

  return (
    <div className={styles["navbar-container"]}>
      <div className={styles["navbar-menu"]}>
        <div className={styles["logo-section"]}>
          <Icon icon={faReceipt} size="2x" className="mr-4" />
          <span className="text-xl font-bold">MONEY CHECKER</span>
        </div>
        <div className={styles["single-nav-menu"]}>
          <Link href="/user-list">User list</Link>
        </div>
      </div>
      {inSession && !isLoading ? (
        <Button className="black-bg" onClick={logout}>
          Logout
          <Icon icon={faDoorOpen} />
        </Button>
      ) : !inSession && !isLoading ? (
        <Button className="black-bg" onClick={() => router.push("/login")}>
          Login
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}
