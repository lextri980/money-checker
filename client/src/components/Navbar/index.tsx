"use client";
import { useClientCookie } from "@/hooks";
import { StorageUtil } from "@/utils";
import {
  faDoorOpen,
  faReceipt,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./style.module.scss";

export default function Navbar() {
  const router = useRouter();
  const inSession = useClientCookie("inSession");
  const userInfoCookie = useClientCookie("userInfo");
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = userInfoCookie && JSON.parse(userInfoCookie);
  const menuList = [
    {
      title: "Loan list",
      href: `/loan-list?userId=${userInfo?.userId}`,
      icon: faWallet,
    },
    {
      title: "User list",
      href: "/user-list",
      icon: faUser,
    },
  ];

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
        {menuList.map((item, index) => (
          <div key={index} className={`${styles["single-nav-menu"]} mr-2`}>
            <Link href={item.href}>
              <Icon icon={item.icon} className="mr-2" />
              {item.title}
            </Link>
          </div>
        ))}
      </div>
      {inSession && !isLoading ? (
        <Button className="black-bg font-semibold" onClick={logout}>
          Logout
          <Icon icon={faDoorOpen} />
        </Button>
      ) : !inSession && !isLoading ? (
        <Button className="black-bg font-semibold" onClick={() => router.push("/login")}>
          Login
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}
