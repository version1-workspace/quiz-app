import AppDate from "./date";
import { BaseModel, proxyHandler } from "./";
import { Block, BlockParams, factory as blocksFactory } from "./blocks";
import { Tag, TagParams, factory as tagFactory } from "./tag";
import { truncate } from "@/lib/string";
import { Question } from "./blocks/question";
import { Result } from "./result";

export type QuizStatus = "active" | "archived" | "draft";

const defaultTruncateLength = 60;
const truncator = truncate(defaultTruncateLength);

export type QuizParams = {
  id: string;
  slug: string;
  version: string;
  title: string;
  themeColor: string;
  description: string;
  duration: number;
  tryCount: number;
  progressionRate: number;
  status: QuizStatus;
  blocks: BlockParams[];
  results: Result[];
  tags: TagParams[];
  createdAt: AppDate;
  updatedAt: AppDate;
};

class QuizModel extends BaseModel<QuizParams> {
  blocks: Block[] = [];
  tags: Tag[] = [];

  constructor(params: QuizParams) {
    super(params);

    this.blocks = params.blocks?.map((it) => blocksFactory(it)) ?? [];
    this.tags = params.tags.map((it) => tagFactory(it));
  }

  get total() {
    return this.questions.length;
  }

  get questions() {
    return this.blocks.filter((it) => {
      return it.kind === "question"
    });
  }

  get isProgress() {
    return this.raw.progressionRate > 0;
  }

  get displayDuration() {
    return Math.max(Math.floor(this.raw.duration / 60), 1);
  }

  get displayDescription() {
    return truncator(this.raw.description);
  }
}

export type Quiz = QuizModel & QuizParams;

export const factory = (params: QuizParams) =>
  new Proxy<Quiz>(
    new QuizModel(params) as Quiz,
    proxyHandler<QuizModel, QuizParams>(),
  );
