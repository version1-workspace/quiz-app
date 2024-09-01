import { useMemo } from "react";
import styles from "./index.module.css";

type Props = {
  html: string;
  style?: React.CSSProperties;
};

export default function HTML({ html, style }: Props) {
  return (
    <p
      className={styles.content}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
