import styles from "./index.module.css";

type Props = {
  loading: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  height?: number;
  rows: number;
  rowHeight: string;
};

export default function Skelton({
  loading,
  children,
  style,
  rows,
  height,
  rowHeight,
}: Props) {
  if (!loading) {
    return children;
  }

  return (
    <div className={styles.container} style={{ height, ...(style || {}) }}>
      {new Array(rows).fill(0).map((_, index) => (
        <div key={index} className={styles.row} style={{ height: rowHeight }} />
      ))}
    </div>
  );
}
