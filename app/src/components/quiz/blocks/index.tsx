import styles from "./index.module.css";
import { Block } from "@/models/blocks";
import { Question } from "@/models/blocks/question";
import { Description } from "@/models/blocks/description";
import HTML from "@/components/html";
import { Quiz } from "@/models/quiz";

type Props<T> = {
  parent: Quiz;
  data: Block[];
  errors?: T;
  onSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Blocks<T extends Record<string, any>>({
  parent,
  data,
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
                parent={parent}
                data={block}
                error={errors?.[block.id]}
                onSelect={onSelect}
              />
            );
          case "description":
            return (
              <DescriptionComponent
                key={block.id}
                parent={parent}
                data={block}
              />
            );
        }
      })}
    </div>
  );
}

type BlockProps<K> = {
  parent: Quiz;
  data: K;
  error?: string;
  onSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function QuestionComponent<V extends Record<string, any>>({
  data,
  error,
  onSelect,
}: BlockProps<Question>) {
  return (
    <div className={styles.blockContainer}>
      <div className={styles.header}>
        <div className={styles.title}>
          <p className={styles.index}>問 {data.qIndex}.</p>
          <HTML html={data.body} />
        </div>
        <p className={styles.error}>{error ? `※ ${error}` : ""}</p>
      </div>
      <div className={styles.body}>
        <ul className={styles.options}>
          {data.options.map((option, index: number) => (
            <li className={styles.option} key={option}>
              <div className={styles.radio}>
                <input
                  type="radio"
                  name={data.id}
                  value={index}
                  onChange={onSelect}
                />
              </div>
              <div className={styles.optionText}>
                <HTML html={option} />
              </div>
            </li>
          ))}
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
