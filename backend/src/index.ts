import "reflect-metadata";
import { dataSource } from "./dataSource";
import { buildSchema } from "type-graphql";
import { TagsResolver } from "./resolvers/Tags";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AdsResolver } from "./resolvers/Ads";
import { CategoriessResolver } from "./resolvers/Categories";

const start = async () => {
  const schema = await buildSchema({
    resolvers: [TagsResolver, AdsResolver, CategoriessResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  await dataSource.initialize();

  await startStandaloneServer(server, {
    listen: {
      port: 5000,
    },
  });
  console.log("alrigth Bro 😁");
};

start();
