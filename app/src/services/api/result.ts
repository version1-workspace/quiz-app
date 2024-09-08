import { v4 as uuid } from "uuid";
import AppDate from "@/models/date";
import { ResultParams, factory } from "@/models/result";

const quizId = uuid();

const results: ResultParams[] = [
  {
    id: uuid(),
    quizId,
    note: "JavaScriptのクイズに挑戦し、理解があやふやだったコールバック関数の挙動に気づきました。問題を通じて、より深く学べたと感じます。これからは実践で理解を深めたいです。",
    answers: [
      {
        questionId: "6c14209c-ef56-4300-ae16-f293d855f6cf",
        response: 1,
        answer: 1,
        correct: true,
      },
      {
        questionId: "1509d797-c52d-44cf-a426-553a18da427f",
        response: 1,
        answer: 3,
        correct: false,
      },
      {
        questionId: "4471c8ee-54be-4cd2-a63d-e01cc5e68405",
        response: 2,
        answer: 2,
        correct: true,
      },
    ],
    quiz: {
      id: quizId,
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
      tags: [],
      createdAt: new AppDate(new Date()),
      updatedAt: new AppDate(new Date()),
    },
    pass: 8,
    total: 10,
    duration: 10 * 60,
    reviewingAt: new AppDate(new Date()),
    startedAt: new AppDate(new Date()).dayAgo(1),
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  },
  {
    id: uuid(),
    quizId,
    note: "",
    answers: [],
    quiz: {
      id: quizId,
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
      tags: [],
      createdAt: new AppDate(new Date()),
      updatedAt: new AppDate(new Date()),
    },
    pass: 8,
    total: 10,
    duration: 10 * 60,
    reviewingAt: new AppDate(new Date()),
    startedAt: new AppDate(new Date()).dayAgo(7),
    finishedAt: new AppDate(new Date()),
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  },
  {
    id: uuid(),
    quizId,
    note: "",
    answers: [],
    quiz: {
      id: quizId,
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
      tags: [],
      createdAt: new AppDate(new Date()),
      updatedAt: new AppDate(new Date()),
    },
    pass: 8,
    total: 10,
    reviewingAt: new AppDate(new Date()),
    startedAt: new AppDate(new Date()).dayAgo(30),
    createdAt: new AppDate(new Date()),
    updatedAt: new AppDate(new Date()),
  },
];

export const fetchResults = async (quizId: string) => {
  return results.filter((it) => true).map((it) => factory(it));
};

export const fetchResult = async (quizId: string) => {
  return factory(results[0]);
};
