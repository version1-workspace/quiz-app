import styles from "./index.module.css";
import { Result } from "@/models/result";

type Props = {
  data: Result;
};

export function Pass({ data }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>🎉</div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <p className={styles.subHeading}>Congratulations! Great Job!</p>
            <h2 className={styles.title}>
              合格です！おめでとうございます！！！
            </h2>
          </div>
          <div className={styles.duration}>
            回答時間: <span>{data.displayDuration}</span>
          </div>
        </div>
        <div className={styles.body}>
          <p className={styles.detail}>
            <span className={styles.totalCount}>{data.total || 0} 問中</span>
            <span className={styles.correctCount}>{data.pass || 0} 問正解</span>
          </p>
          <p className={styles.message}>
            合格おめでとうございます！！！間違えた問題を重点的に復習してさらに高みを目指しましょう！
          </p>
        </div>
      </div>
    </div>
  );
}
