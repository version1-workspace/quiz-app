import AppDate from "./date";
import { BaseModel, proxyHandler } from "./";
import { Quiz, QuizParams, factory as quizFactory } from "./quiz";

export type ResultParams = {
  id: string;
  quizId: string;
  quiz: QuizParams;
  pass: number;
  total: number;
  note: string;
  duration?: number;
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

    return Math.max(Math.floor(this.raw.duration / 60), 1);
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
}

export type Result = ResultModel & ResultParams;

export const factory = (params: ResultParams) =>
  new Proxy<Result>(
    new ResultModel(params) as Result,
    proxyHandler<ResultModel, ResultParams>(),
  );
