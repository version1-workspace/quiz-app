import styles from "./page.module.css";
import Card from "@/components/quiz/card";

const quiz = [
  {
    title: "JavaScript",
  },
  {
    title: "TypeScript",
  },
  {
    title: "React",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.cardList}>
        {new Array(10).fill("").map(() => {
          return (
            <>
              {quiz.map((it) => (
                <div key={it.title} className={styles.cardItem}>
                  <Card title={it.title} thumbnail="" to="" />
                </div>
              ))}
            </>
          );
        })}
      </div>
    </main>
  );
}
