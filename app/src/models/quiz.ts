import AppDate from "./date";
import { BaseModel, proxyHandler } from "./";
import {
  Question,
  QuestionParams,
  factory as questionFactory,
} from "./question";
import { Tag, TagParams, factory as tagFactory } from "./tag";

export type QuizStatus = "active" | "archived" | "draft";

export type QuizParams = {
  id: string;
  title: string;
  themeColor: string;
  description: string;
  duration: number;
  tryCount: number;
  progressionRate: number;
  status: QuizStatus;
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

  get isProgress() {
    return this.raw.progressionRate > 0;
  }

  get displayDuration() {
    return Math.max(Math.floor(this.raw.duration / 60), 1);
  }
}

export type Quiz = QuizModel & QuizParams;

export const factory = (params: QuizParams) =>
  new Proxy<Quiz>(
    new QuizModel(params) as Quiz,
    proxyHandler<QuizModel, QuizParams>(),
  );
