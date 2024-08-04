import styles from "./index.module.css";
import Link from "next/link";

type Props = {
  title: string;
  headerColor: string;
  duration: string;
  description: string;
  tags: string[];
  to: string;
};

export default function Card({ title, to }: Props) {
  return (
    <Link className={styles.link} href={to}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.status}>Progress</div>
          <div className={styles.title}>{title}</div>
          <div className={styles.duration}>回答時間</div>
          <div className={styles.tags}></div>
        </div>
        <div className={styles.body}>
          <p className={styles.descprion}></p>
        </div>
        <div className={styles.footer}></div>
      </div>
    </Link>
  );
}
