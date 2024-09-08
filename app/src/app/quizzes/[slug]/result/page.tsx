"use client";

import { createContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Quiz } from "@/models/quiz";
import { Result } from "@/models/result";
import { fetchQuiz } from "@/services/api/quiz";
import { fetchResult } from "@/services/api/result";
import styles from "./page.module.css";
import Button from "@/components/shared/button";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import Results from "@/components/quiz/results";
import Blocks from "@/components/quiz/blocks";
import { Pass } from "@/components/result/message";
import Skeleton from "@/components/shared/skeleton";
import AppDate from "@/models/date";
import { useForm } from "@/lib/form";
import Timer from "@/lib/timer";

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [data, setData] = useState<Quiz>();
  const [result, setResult] = useState<Result>();
  const [loading, setLoading] = useState(true);
  const { slug } = params;

  useEffect(() => {
    const init = async () => {
      await Promise.all([
        (async function () {
          const res = await fetchQuiz(slug);
          setData(res);
        })(),
        (async function () {
          const res = await fetchResult(slug);
          setResult(res);
        })(),
      ]);
    };

    try {
      init();
    } finally {
      setLoading(false);
    }

    return () => {};
  }, []);

  if (!data || !result || loading) {
    return (
      <div className={styles.container}>
        <div className={styles.skelton}>
          <Skeleton loading rows={4} rowHeight="200px" />
        </div>
      </div>
    );
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
      <div className={styles.heading}>
        <div className={styles.header}>
          <h2 className={styles.title}>[ 結果 ]{data.title}</h2>
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
                <div className={styles.value}>{data.total || "0"} 問</div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.body}></div>
      </div>
      <Pass data={result} />
      <div className={styles.content}>
        <Blocks
          data={data.questions}
          result={result}
          onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
          }}
        />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.footer}>
        <div className={styles.note}>
          <p className={styles.noteDescription}>
            Note
            (気づいた点や理解があやふやな点など復習する際のメモを残しましょう）
          </p>
          <textarea className={styles.noteInput} />
        </div>
        <div className={styles.submit}>
          <Button
            variant="primary"
            onClick={() => {
              router.push("/");
            }}
          >
            テスト終了
          </Button>
        </div>
      </div>
    </div>
  );
}
