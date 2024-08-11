import AppDate from "./date";
import { BaseModel, proxyHandler } from "./";
import {
  Quiz,
  QuizParams,
  factory as quizFactory,
} from "./quiz";

export type ResultParams = {
  id: string;
  quizId: string;
  quiz: QuizParams;
  pass: number;
  total: number;
  note: string;
  reviewingAt: AppDate;
  startedAt: AppDate;
  createdAt: AppDate;
  updatedAt: AppDate;
};

class ResultModel extends BaseModel<ResultParams> {
  quiz: Quiz;

  constructor(params: ResultParams) {
    super(params);

    this.quiz = quizFactory(params.quiz);
  }
}

export type Result = ResultModel & ResultParams;

export const factory = (params: ResultParams) =>
  new Proxy<Result>(
    new ResultModel(params) as Result,
    proxyHandler<ResultModel, ResultParams>(),
  );
