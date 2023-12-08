import { DataSource } from "typeorm";
import { Ads } from "./entities/Ads";
import { Categories } from "./entities/Categories";
import { Tag } from "./entities/Tag";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "theUser",
  password: "theFuckingPassword",
  database: "thegoodcorner",
  entities: [Ads, Categories, Tag],
  synchronize: true,
  logging: true,
});
