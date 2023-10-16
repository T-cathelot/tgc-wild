import { DataSource } from "typeorm";
import { Ads } from "./entities/Ads";
import { Categories } from "./entities/Categories";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./tgc.sqlite ",
  entities: [Ads, Categories],
  synchronize: true,
  logging: true,
});
