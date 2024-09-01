import AppDate from "../date";
import { BaseModel, proxyHandler } from "../";

export type DescriptionParams = {
  id: string;
  kind: "description";
  title: string;
  body: string;
  index: number;

  createdAt: AppDate;
  updatedAt: AppDate;
};

class DescriptionModel extends BaseModel<DescriptionParams> {
  get kind() {
    return "description" as const;
  }
}

export type Description = DescriptionModel & DescriptionParams;

export const factory = (params: DescriptionParams): Description =>
  new Proxy<Description>(
    new DescriptionModel(params) as Description,
    proxyHandler<DescriptionModel, DescriptionParams>(),
  );
