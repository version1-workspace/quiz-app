import AppDate from "../date";
import { BaseModel, proxyHandler } from "../";

export type QuestionParams = {
  id: string;
  kind: "question";
  body: string;
  index: number;
  qIndex: number;
  options: string[];

  errors: string[];

  createdAt: AppDate;
  updatedAt: AppDate;
};

class QuestionModel extends BaseModel<QuestionParams> {
  get kind() {
    return "question" as const
  }
}

export type Question = QuestionModel & QuestionParams;

export const factory = (params: QuestionParams): Question =>
  new Proxy<Question>(
    new QuestionModel(params) as Question,
    proxyHandler<QuestionModel, QuestionParams>(),
  );
