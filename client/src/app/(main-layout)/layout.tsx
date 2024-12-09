import styles from "@/assets/style/main-layout.module.scss";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles["main-layout-container"]}>
      <Navbar />
      <div className={styles["main-content"]}>{children}</div>
    </div>
  );
}
