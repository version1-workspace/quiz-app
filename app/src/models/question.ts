import AppDate from "./date";
import { BaseModel, proxyHandler } from "./";

export type QuestionParams = {
  id: string;
  body: string;
  index: number;

  createdAt: AppDate;
  updatedAt: AppDate;
};

class QuestionModel extends BaseModel<QuestionParams> {}

export type Question = QuestionModel | QuestionParams

export const factory = (params: QuestionParams) =>
  new Proxy(
    new QuestionModel(params),
    proxyHandler<QuestionModel, QuestionParams>(),
  );
