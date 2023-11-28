import { DataSource } from "typeorm";
import { Ads } from "./entities/Ads";
import { Categories } from "./entities/Categories";
import { Tag } from "./entities/Tag";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./tgc.sqlite ",
  entities: [Ads, Categories, Tag],
  synchronize: true,
  logging: true,
});
