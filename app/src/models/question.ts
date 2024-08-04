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

export type Question = QuestionModel & QuestionParams;

export const factory = (params: QuestionParams): Question =>
  new Proxy<Question>(
    new QuestionModel(params) as Question,
    proxyHandler<QuestionModel, QuestionParams>(),
  );
