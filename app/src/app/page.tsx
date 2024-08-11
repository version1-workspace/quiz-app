"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Card from "@/components/quiz/card";
import { Quiz } from "@/models/quiz";
import { fetchQuiz } from "@/services/api/quiz";

export default function Home() {
  const [data, setData] = useState<Quiz[]>([]);
  useEffect(() => {
    const init = async () => {
      const res = await fetchQuiz();
      setData(res);
    };

    init();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.cardList}>
        {data.map((it) => (
          <div key={it.id} className={styles.cardItem}>
            <Card data={it} />
          </div>
        ))}
      </div>
    </main>
  );
}
