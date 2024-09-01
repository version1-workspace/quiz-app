"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Quiz } from "@/models/quiz";
import { fetchQuiz } from "@/services/api/quiz";
import styles from "./page.module.css";
import Button from "@/components/shared/button";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import Results from "@/components/quiz/results";

export default function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<Quiz>();
  const { slug } = params;

  useEffect(() => {
    const init = async () => {
      const res = await fetchQuiz(slug);
      setData(res);
    };

    init();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs
          data={[
            { label: "JavaScript", to: "/quizzes/tags/javascript" },
            { label: data.title, to: `/quizzes/${data.slug}` },
          ]}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{data?.title}</h2>
          <div className={styles.meta}>
            <ul className={styles.infoList}>
              <li className={styles.row}>
                <div className={styles.label}>Version :</div>
                <div className={styles.value}> {data.version}</div>
              </li>
              <li className={styles.row}>
                <div className={styles.label}>更新日 :</div>
                <div className={styles.value}>
                  {data.updatedAt.format("YYYY-MM-DD")}
                </div>
              </li>
              <li className={styles.row}>
                <div className={styles.label}>設問数 :</div>
                <div className={styles.value}> {data.questions.length}</div>
              </li>
              <li className={styles.row}>
                <div className={styles.label}>所要時間:</div>
                <div className={styles.value}> {data.displayDuration}</div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.body}>{data.description}</div>
        <div className={styles.footer}>
          <div className={styles.start}>
            <Link href={`/quizzes/${data.id}/responses`}>
              <Button variant="primary">新しく回答を始める</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.results}>
        <div className={styles.resultsContent}>
          <Results data={data} />
        </div>
      </div>
      <div className={styles.related}></div>
    </div>
  );
}
