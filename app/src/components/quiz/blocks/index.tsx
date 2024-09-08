import styles from "./index.module.css";
import { Block } from "@/models/blocks";
import { Question } from "@/models/blocks/question";
import { Description } from "@/models/blocks/description";
import HTML from "@/components/html";
import Checkbox from "@/components/shared/checkbox";
import { Quiz } from "@/models/quiz";
import { Result } from "@/models/result";
import { cls } from "@/lib/className";

type Props<T> = {
  data: Block[];
  responses?: Record<string, number | undefined>;
  result?: Result;
  errors?: T;
  onSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Blocks<T extends Record<string, any>>({
  data,
  responses,
  result,
  errors,
  onSelect,
}: Props<T>) {
  return (
    <div>
      {data.map((block: Block, index: number) => {
        switch (block.kind) {
          case "question":
            return (
              <QuestionComponent
                key={block.id}
                data={block}
                responses={responses}
                result={result}
                error={errors?.[block.id]}
                onSelect={onSelect}
              />
            );
          case "description":
            return (
              <DescriptionComponent
                key={block.id}
                responses={responses}
                data={block}
              />
            );
        }
      })}
    </div>
  );
}

type BlockProps<K> = {
  data: K;
  responses?: Record<string, number | undefined>;
  result?: Result;
  error?: string;
  onSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function QuestionComponent<V extends Record<string, any>>({
  data,
  responses = {},
  result,
  error,
  onSelect,
}: BlockProps<Question>) {
  const answer = result?.getAnswer(data.id);

  return (
    <div className={styles.blockContainer}>
      <div className={styles.header}>
        <div className={styles.title}>
          <p
            className={cls({
              [styles.index]: true,
              [styles.correct]: answer?.correct,
              [styles.incorrect]: answer?.correct === false,
            })}
          >
            問 {data.qIndex}.
            {answer ? (
              <span className={styles.resultLabel}>
                {answer.correct ? "正解" : "不正解"}
              </span>
            ) : null}
          </p>
          <HTML html={data.body} />
        </div>
        <p className={styles.error}>{error ? `※ ${error}` : ""}</p>
      </div>
      <div className={styles.body}>
        <ul className={styles.options}>
          {data.options.map((option, index: number) => {
            const variant = answer
              ? answer.response === index
                ? "success"
                : "danger"
              : "primary";
            const checked = answer
              ? answer.response === index || answer.answer === index
              : responses[data.id] === index;

            return (
              <li className={styles.option} key={option}>
                <div className={styles.radio}>
                  <Checkbox
                    variant={variant}
                    name={data.id}
                    value={String(index)}
                    checked={checked}
                    onChange={onSelect}
                  />
                </div>
                <div className={styles.optionText}>
                  <HTML html={option} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function DescriptionComponent({ data }: BlockProps<Description>) {
  return (
    <div className={styles.blockContainer}>
      <div className={styles.header}>{data.title}</div>
      <div className={styles.body}>
        <HTML html={data.body} />
      </div>
    </div>
  );
}
