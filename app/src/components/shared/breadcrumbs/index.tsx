import styles from "./index.module.css";
import Link from "next/link";
import { useBreadcrumbs } from "./context";

export type Breadcrumb = {
  label: string;
  to: string;
};

type Props = {
  data: Breadcrumb[];
};

function Arrow() {
  return <li className={styles.arrow}>{" > "}</li>;
}

export const BreadcrumbsWithContext = () => {
  const context = useBreadcrumbs();
  return <Breadcrumbs data={context.data} />;
};

export default function Breadcrumbs({ data }: Props) {
  return (
    <ul className={styles.container}>
      {data.map((it: Breadcrumb, index: number) => {
        const current = index !== 0 && index === data.length - 1;
        return (
          <>
            <li className={styles.item} key={it.to}>
              {current ? (
                <span className={styles.current}>{it.label}</span>
              ) : (
                <Link className={styles.link} href={it.to}>
                  {it.label}
                </Link>
              )}
            </li>
            {!current ? <Arrow /> : null}
          </>
        );
      })}
    </ul>
  );
}
