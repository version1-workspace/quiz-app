"use client";
import { useState } from "react";
import styles from "./index.module.css";
import SearchInput from "./search";
import Icon from "@/components/shared/icon";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { join } from "@/lib/className";

type Props = {};

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <Image className={styles.logoImage} src={logo} alt="Four Choice ロゴ" />
        4 Choice
      </div>
      <div className={styles.search}>
        <SearchInput value={search} placeholder="Search for quiz" />
      </div>
      <div className={styles.menu}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Icon className={styles.icon} name="notification" />
          </li>
          <li className={styles.menuItem}>
            <div className={styles.avatar}>
              <Icon
                className={join(styles.icon, styles.avatarIcon)}
                name="person"
              />
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}
