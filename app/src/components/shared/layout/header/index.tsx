"use client"
import { useState } from "react";
import styles from "./index.module.css";
import SearchInput from "./search";
import Icon from "@/components/shared/icon";

type Props = {};

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className={styles.container}>
      <div className={styles.logo}>4 Choice</div>
      <div className={styles.search}>
        <SearchInput value={search} placeholder="Search for quiz" />
      </div>
      <div className={styles.menu}>
        <Icon className={styles.icon} name="menu" />
      </div>
    </header>
  );
}
