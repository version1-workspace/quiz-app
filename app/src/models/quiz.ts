import AppDate from "./date";
import { BaseModel, proxyHandler } from "./";
import {
  Question,
  QuestionParams,
  factory as questionFactory,
} from "./question";
import { Tag, TagParams, factory as tagFactory } from "./tag";

type QuizParams = {
  id: string;
  title: string;
  description: string;
  duration: number;
  questions: QuestionParams[];
  tags: TagParams[];
  createdAt: AppDate;
  updatedAt: AppDate;
};

class QuizModel extends BaseModel<QuizParams> {
  questions: Question[] = [];
  tags: Tag[] = [];

  constructor(params: QuizParams) {
    super(params);

    this.questions = params.questions.map((it) => questionFactory(it));
    this.tags = params.tags.map((it) => tagFactory(it));
  }
}

export type Quiz = QuizModel | QuizParams;

export const factory = (params: QuizParams) =>
  new Proxy(new QuizModel(params), proxyHandler<QuizModel, QuizParams>());
