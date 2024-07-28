import styles from "./index.module.css";
import Link from "next/link";

type Props = {
  thumbnail: any;
  title: string;
  to: string;
};

export default function Card({ thumbnail, title, to }: Props) {
  return (
    <Link className={styles.link} href={to}>
      <div className={styles.container}>
        <div className={styles.thumbnail}></div>
        <div className={styles.title}>{title}</div>
      </div>
    </Link>
  );
}
