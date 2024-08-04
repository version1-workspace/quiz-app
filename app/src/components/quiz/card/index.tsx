import styles from "./index.module.css";
import Link from "next/link";
import { Quiz } from "@/models/quiz";
import { Tag } from "@/models/tag";
import Icon from "@/components/shared/icon";

type Props = {
  data: Quiz;
};

const defaultThemeColor = "linear-gradient(158deg, #F4EA9F 0%, #F4EA9F60 100%)";

export default function Card({ data }: Props) {
  const to = `/quiz/${data.id}`;

  return (
    <Link className={styles.link} href={to}>
      <div className={styles.container}>
        <div
          className={styles.header}
          style={{ background: data.themeColor || defaultThemeColor }}
        >
          <div className={styles.upper}>
            {data.isProgress ? (
              <div className={styles.status}>回答中</div>
            ) : null}
            <div className={styles.heading}>
              <div className={styles.title}>{data.title}</div>
              <div className={styles.menu}>
                <Icon name="kebabMenu" />
              </div>
            </div>
            <div className={styles.duration}>
              回答時間: {data.displayDuration} 分
            </div>
          </div>
          <div className={styles.lower}>
            <div className={styles.tags}>
              <ul className={styles.tagList}>
                {data.tags.map((it: Tag) => {
                  return (
                    <li
                      key={it.id}
                      className={styles.tagItem}
                      style={{ backgroundImage: it.themeColor }}
                    >
                      #{it.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <p className={styles.description}>{data.description}</p>
        </div>
        <div className={styles.footer}>
          <div className={styles.actions}>
            <Icon name="like" />
          </div>
        </div>
      </div>
    </Link>
  );
}
