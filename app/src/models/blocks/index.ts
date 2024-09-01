import {
  Question,
  QuestionParams,
  factory as questionFactory,
} from "./question";
import {
  Description,
  DescriptionParams,
  factory as descriptionFactory,
} from "./description";

export interface IBlock {
  id: string;
  index: number;
  kind: BlockType;
}

export type BlockParams = QuestionParams | DescriptionParams;
export type Block = Question | Description;

type BlockType = "question" | "description";

export const factory = (params: IBlock): Block => {
  switch (params.kind) {
    case "question":
      return questionFactory(params as QuestionParams);
    case "description":
      return descriptionFactory(params as DescriptionParams);
    default:
      throw new Error(`got unexpected block kind: ${params.kind}`);
  }
};
