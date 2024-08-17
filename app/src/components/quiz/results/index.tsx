import { useEffect, useState } from "react";
import { Quiz } from "@/models/quiz";
import { Result } from "@/models/result";
import { fetchResults } from "@/services/api/result";
import styles from "./index.module.css";
import Button from "@/components/shared/button";
import Icon from "@/components/shared/icon";

type Props = {
  data: Quiz;
};

export default function ResultsComponent({ data }: Props) {
  const [list, setList] = useState<Result[]>();
  useEffect(() => {
    const init = async () => {
      const res = await fetchResults(data.id);
      setList(res);
    };

    init();
  }, []);

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <ul className={styles.container}>
      {list?.map((it) => (
        <>
          <li className={styles.resultItem} key={it.id}>
            <div className={styles.row}>
              <div className={styles.date}>{it.date}</div>
              <div className={styles.version}>(ver. {it.quiz.version})</div>
              <div className={styles.body}>
                <div className={styles.header}>
                  <h2 className={styles.title}>
                    <span>{it.pass}</span>/ <span>{it.total}</span> ( 正答率{" "}
                    {it.passRate} % )
                    <Icon
                      className={styles.check}
                      name="check"
                      color="#2AB925"
                    />
                  </h2>
                  <div className={styles.details}>
                    <ul className={styles.detailList}>
                      {it.duration ? (
                        <li className={styles.detail}>
                          <div className={styles.label}>
                            <Icon name="clock" />
                          </div>
                          <div className={styles.value}>
                            {it.displayDuration} 分
                          </div>
                        </li>
                      ) : null}
                      <li className={styles.detail}>
                        <div className={styles.label}>
                          <Icon name="calendar" />
                        </div>
                        <div className={styles.value}>{it.displayDate}</div>
                      </li>
                      <li className={styles.detail}>
                        <div className={styles.label}>
                          <Icon name="layer" />
                        </div>
                        <div className={styles.value}>
                          {it.reviewingAt.format("YYYY/MM/DD")}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {it.note ? (
                  <div className={styles.note}>
                    <h3 className={styles.noteTitle}>ノート</h3>
                    <div className={styles.noteBody}>{it.note}</div>
                  </div>
                ) : null}
                <div className={styles.footer}>
                  <Button className={styles.moreButton} variant="outline">
                    詳細を見る
                  </Button>
                </div>
              </div>
            </div>
          </li>
          <div className={styles.divider}></div>
        </>
      ))}
    </ul>
  );
}
