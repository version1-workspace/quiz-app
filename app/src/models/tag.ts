import AppDate from "./date";
import { BaseModel, proxyHandler } from "./";

export type TagParams = {
  id: string;
  name: string;
  themeColor: string;
  createdAt: AppDate;
  updatedAt: AppDate;
};

class TagModel extends BaseModel<TagParams> {}

export type Tag = TagModel & TagParams

export const factory = (params: TagParams) =>
  new Proxy<Tag>(
    new TagModel(params) as Tag,
    proxyHandler<TagModel, TagParams>(),
  );
