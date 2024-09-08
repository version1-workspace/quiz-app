import AppDate from "./date";
import { BaseModel, proxyHandler } from "./";
import { Quiz, QuizParams, factory as quizFactory } from "./quiz";

type AnswerParams = {
  questionId: string;
  response: number;
  answer: number;
  correct: boolean;
};

export type ResultParams = {
  id: string;
  quizId: string;
  quiz: QuizParams;
  pass: number;
  total: number;
  note: string;
  duration?: number;
  answers: AnswerParams[];
  reviewingAt: AppDate;
  startedAt: AppDate;
  finishedAt?: AppDate;
  createdAt: AppDate;
  updatedAt: AppDate;
};

class ResultModel extends BaseModel<ResultParams> {
  quiz: Quiz;

  constructor(params: ResultParams) {
    super(params);

    this.quiz = quizFactory(params.quiz);
  }

  get displayDuration() {
    if (!this.raw.duration) {
      return;
    }

    const min = Math.floor(this.raw.duration / 60);
    const sec = this.raw.duration % 60;

    const p = function (num: number, length: number) {
      return (Array(length).join("0") + num).slice(-length);
    };

    return `${p(min, 2)}:${p(sec, 2)}`;
  }

  get displayDate() {
    if (this.raw.startedAt.sameDay(this.raw.finishedAt)) {
      return this.raw.startedAt.format("YYYY/MM/DD");
    }

    if (this.raw.startedAt.sameYear(this.raw.finishedAt)) {
      return `${this.raw.startedAt.format("YYYY/MM/DD")} ~ ${this.raw.finishedAt?.format(
        "MM/DD",
      )}`;
    }

    if (!this.raw.finishedAt) {
      return `${this.raw.startedAt.format("YYYY/MM/DD")} ~ `;
    }

    return `${this.raw.startedAt.format("YYYY-MM-DD")} ~ ${this.raw.finishedAt?.format("YYYY-MM-DD")}`;
  }

  get date() {
    if (this.raw.startedAt.withinAWeek) {
      return this.raw.startedAt.relative;
    }

    if (this.raw.startedAt.withinAYear) {
      return this.raw.startedAt.format("MM / DD");
    }

    return this.raw.startedAt.format("YYYY / MM / DD");
  }

  get passRate() {
    if (this.raw.total === 0) {
      return 0;
    }

    return Math.floor((this.raw.pass / this.raw.total) * 100);
  }

  getAnswer(questionId: string) {
    return this.raw.answers.find((it) => it.questionId === questionId);
  }
}

export type Result = ResultModel & ResultParams;

export const factory = (params: ResultParams) =>
  new Proxy<Result>(
    new ResultModel(params) as Result,
    proxyHandler<ResultModel, ResultParams>(),
  );
