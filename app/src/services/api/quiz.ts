import { v4 as uuid } from "uuid";
import { QuizParams, factory } from "@/models/quiz";
import { factory as tagFactory } from "@/models/tag";
import AppDate from "@/models/date";

const tags = {
  htmlCSS: tagFactory({
    id: uuid(),
    themeColor:
      "linear-gradient(158deg, rgba(230,31,190,1) 0%, rgba(233,235,101,1) 100%)",
    name: "HTML/CSS",
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  }),
  js: tagFactory({
    id: uuid(),
    themeColor:
      "linear-gradient(158deg, rgba(230,31,190,1) 0%, rgba(233,235,101,1) 100%)",
    name: "JavaScript",
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  }),
  ts: tagFactory({
    id: uuid(),
    themeColor:
      "linear-gradient(158deg, rgba(0,12,80,1) 0%, rgba(62,193,236,1) 100%)",
    name: "TypeScript",
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  }),
  commandLine: tagFactory({
    id: uuid(),
    themeColor:
      "linear-gradient(158deg, rgba(230,31,190,1) 0%, rgba(233,235,101,1) 100%)",
    name: "Commnad-Line",
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  }),
  cs: tagFactory({
    id: uuid(),
    themeColor:
      "linear-gradient(158deg, rgba(230,31,190,1) 0%, rgba(233,235,101,1) 100%)",
    name: "CS(Computer Science)",
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  }),
  fe: tagFactory({
    id: "",
    name: "Frontend",
    themeColor:
      "linear-gradient(45deg, rgba(34,193,195,1) 0%, rgba(45,253,53,1) 100%)",
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  }),
  be: tagFactory({
    id: "",
    name: "Backend",
    themeColor:
      "linear-gradient(158deg, rgba(180,16,81,1) 0%, rgba(80,0,12,1) 100%)",
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  }),
  react: tagFactory({
    id: "",
    name: "React",
    themeColor:
      "linear-gradient(158deg, rgba(230,31,190,1) 0%, rgba(233,235,101,1) 100%)",
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  }),
};

const quizzes = [
  {
    id: uuid(),
    version: "1.0.0",
    title: "JavaScript基礎",
    slug: "javascript-basic",
    themeColor: "",
    description:
      "このJavaScript基礎クイズは、プログラミング初心者向けに設計されており、基本的な構文や概念を理解しているかを確認するための10問が含まれています。問題は、変数の宣言、データ型、関数、ループ、条件分岐、配列の操作など、JavaScriptで頻繁に使用される基礎的なトピックを網羅しています。これにより、自分の理解度を確認し、不足している部分を強化する手助けをします。また、各問題には詳細な解説が付いており、間違った場合でも学びの機会があります。",
    duration: 10 * 60,
    tryCount: 0,
    progressionRate: 20,
    status: "active" as const,
    questions: [],
    tags: [tags.js, tags.fe],
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  },
  {
    id: uuid(),
    version: "1.0.0",
    title: "[JavaScript] Promise, async/await",
    slug: "javascript-basic",
    themeColor: "",
    description:
      "この問題では、JavaScript の文法等々の基礎的な内容の理解度をチェックすることができます。",
    duration: 10 * 60,
    tryCount: 0,
    progressionRate: 0,
    status: "active" as const,
    questions: [],
    tags: [tags.js, tags.fe],
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  },
  {
    id: uuid(),
    version: "1.0.0",
    title: "JavaScript の特徴的な文法",
    slug: "javascript-basic",
    themeColor: "",
    description:
      "この問題では、JavaScript の文法等々の基礎的な内容の理解度をチェックすることができます。",
    duration: 10 * 60,
    tryCount: 0,
    progressionRate: 0,
    status: "active" as const,
    questions: [],
    tags: [tags.js, tags.fe],
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  },
  {
    id: uuid(),
    version: "1.0.0",
    title: "コマンドライン基礎",
    slug: "javascript-basic",
    themeColor: "",
    description:
      "この問題では、JavaScript の文法等々の基礎的な内容の理解度をチェックすることができます。",
    duration: 10 * 60,
    tryCount: 0,
    progressionRate: 0,
    status: "active" as const,
    questions: [],
    tags: [tags.commandLine, tags.be],
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  },
  {
    id: uuid(),
    version: "1.0.0",
    title: "(JavaScript)HTTP基礎",
    slug: "javascript-basic",
    themeColor: "",
    description:
      "この問題では、JavaScript の文法等々の基礎的な内容の理解度をチェックすることができます。",
    duration: 10 * 60,
    tryCount: 0,
    progressionRate: 0,
    status: "active" as const,
    questions: [],
    tags: [tags.js, tags.fe],
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  },
  {
    id: uuid(),
    version: "1.0.0",
    title: "HTML/CSS基礎",
    slug: "javascript-basic",
    themeColor: "",
    description:
      "この問題では、JavaScript の文法等々の基礎的な内容の理解度をチェックすることができます。",
    duration: 10 * 60,
    tryCount: 0,
    progressionRate: 0,
    status: "active" as const,
    questions: [],
    tags: [tags.htmlCSS, tags.fe],
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  },
  {
    id: uuid(),
    version: "1.0.0",
    title: "コンピューター基礎",
    slug: "javascript-basic",
    themeColor: "",
    description:
      "この問題では、JavaScript の文法等々の基礎的な内容の理解度をチェックすることができます。",
    duration: 10 * 60,
    tryCount: 0,
    progressionRate: 0,
    status: "active" as const,
    questions: [],
    tags: [tags.cs],
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  },
  {
    id: uuid(),
    version: "1.0.0",
    title: "TypeScript基礎",
    slug: "javascript-basic",
    themeColor: "",
    description:
      "この問題では、JavaScript の文法等々の基礎的な内容の理解度をチェックすることができます。",
    duration: 10 * 60,
    tryCount: 0,
    progressionRate: 0,
    status: "active" as const,
    questions: [],
    tags: [tags.ts, tags.fe, tags.be],
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  },
  {
    id: uuid(),
    version: "1.0.0",
    title: "React基礎",
    slug: "javascript-basic",
    themeColor: "",
    description:
      "この問題では、JavaScript の文法等々の基礎的な内容の理解度をチェックすることができます。",
    duration: 10 * 60,
    tryCount: 0,
    progressionRate: 0,
    status: "active" as const,
    questions: [],
    tags: [tags.react, tags.fe],
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  },
] as QuizParams[];

export const fetchQuiz = async (slug: string) => {
  return factory(quizzes[0]);
};

export const fetchQuizzes = async () => {
  return quizzes.map((it: QuizParams) => factory(it));
};
