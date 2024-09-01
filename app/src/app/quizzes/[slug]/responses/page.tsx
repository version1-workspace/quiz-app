"use client";

import { createContext, useEffect, useState, useRef } from "react";
import { Quiz } from "@/models/quiz";
import { fetchQuiz } from "@/services/api/quiz";
import styles from "./page.module.css";
import Button from "@/components/shared/button";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import Results from "@/components/quiz/results";
import Blocks from "@/components/quiz/blocks";
import Skeleton from "@/components/shared/skeleton";
import AppDate from "@/models/date";
import { useForm } from "@/lib/form";
import Timer from "@/lib/timer";

type FormValue = {
  time: number;
  startedAt: AppDate;
  responses: Record<string, number | undefined>;
};

type FormErrors = Record<string, string>;

export default function Page({ params }: { params: { slug: string } }) {
  const timerRef = useRef<Timer>(new Timer());
  const [data, setData] = useState<Quiz>();
  const [loading, setLoading] = useState(true);
  const { slug } = params;

  const form = useForm<FormValue, FormErrors>({
    initialValues: {
      time: 0,
      startedAt: AppDate.now(),
      responses: {},
    },
    validate: (values: FormValue) => {
      const errors: FormErrors = {};

      if (data) {
        data.questions.forEach((question) => {
          if (!values.responses[question.id]) {
            errors[question.id] = "回答を選択してください";
          }
        });
      }

      return errors;
    },
    onSubmit: (values: FormValue) => {
      if (loading) {
        return;
      }

      console.log("submit ===", values);
    },
    onValidationError() {
      alert(
        "未入力の回答があります。全て選択を終えてから回答完了ボタンを押してください。",
      );
    },
  });

  useEffect(() => {
    const init = async () => {
      const res = await fetchQuiz(slug);
      setData(res);

      res.questions.forEach((question, index) => {
        form.setValues((prev) => ({
          ...prev,
          responses: {
            ...prev.responses,
            [question.id]: undefined,
          },
        }));
      });
    };

    try {
      init();
    } finally {
      setLoading(false);
    }

    const t = timerRef.current;
    t.start((time) => {
      form.setValues((prev) => ({
        ...prev,
        time,
      }));
    }, 1000);

    return () => {
      t.stop();
    };
  }, []);

  if (!data || loading) {
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
          <h2 className={styles.title}>{data.title}</h2>
          <div className={styles.count}>全 {data.total || "0"} 問</div>
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
                <div className={styles.label}>所要時間:</div>
                <div className={styles.value}> {data.displayDuration}</div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.body}>
          <p className={styles.intro}>
            全ての回答が終わったらページ下部の回答完了ボタンをしてテストを完了させてください。
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <Blocks
          parent={data}
          data={data.blocks}
          errors={form.errors}
          onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;

            form.setValues((prev) => ({
              ...prev,
              responses: {
                ...prev.responses,
                [name]: parseInt(value),
              },
            }));
          }}
        />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.footer}>
        <div className={styles.message}>
          回答お疲れ様でした。最後に回答を見直して完了ボタンを押してください。
        </div>
        <div className={styles.submit}>
          <Button variant="primary" onClick={form.submit}>
            回答完了
          </Button>
        </div>
      </div>
    </div>
  );
}
