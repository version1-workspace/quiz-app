import AppDate from "./date";
import { BaseModel, proxyHandler } from "./";

export type TagParams = {
  id: string;
  name: string;
  createdAt: AppDate;
  updatedAt: AppDate;
};

class TagModel extends BaseModel<TagParams> {}

export type Tag = TagModel | TagParams

export const factory = (params: TagParams) =>
  new Proxy(
    new TagModel(params),
    proxyHandler<TagModel, TagParams>(),
  );
