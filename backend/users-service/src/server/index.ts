import cors from "cors";
import express from "express";
import http from "http";
import bodyParser, { json } from "body-parser";

// Apollo
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildSubgraphSchema } from "@apollo/subgraph";
// import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge"

// Schemas
import { typeDefs, resolvers } from "../schemas/user";

// Directives
// TODO: Bring them together into an index file
import { upperDirectiveTransformer } from "../directives/upper";
import { isWhitelistedDirectiveTransformer } from "../directives/isWhitelisted";
import { authDirectiveTransformer } from "../directives/auth";
// import { isEmailOrUsernameDuplicatedDirectiveTransformer } from "@root/directives/isEmailOrUsernameDuplicated";

async function startApolloServer() {
  const app = express();
  app.use(bodyParser.json({ type: "*/*" }));

  const httpServer = http.createServer(app);

  let subgraphSchema = buildSubgraphSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
  });

  // Transformer function for an @upper directive
  // TODO: Look for a solution to group directives
  subgraphSchema = upperDirectiveTransformer(subgraphSchema, "upper");
  subgraphSchema = isWhitelistedDirectiveTransformer(subgraphSchema, "isWhitelisted");
  subgraphSchema = authDirectiveTransformer(subgraphSchema, "auth");
  // subgraphSchema = isEmailOrUsernameDuplicatedDirectiveTransformer(subgraphSchema, "isEmailOrUsernameDuplicated")

  const server = new ApolloServer({
    schema: subgraphSchema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    // TODO: Add global middleware to check originKey is allowed
  });

  await server.start();

  // Specify the path where we'd like to mount our server
  app.use(
    "/graphql",
    cors({
      origin: (origin, cb) => cb(null, true),
      credentials: true
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        appId: process.env.APPID,
        appKey: req.headers["x-api-key"],
        token: req.headers["x-access-token"]
      }),
    }),
  );

  await new Promise(resolve => httpServer.listen({ port: process.env.APPID }, resolve as any));

  app.get("/auth", (req, res) => res.send(`Hello User, API! Requested on instance ${process.env.APPID}`));
  console.log(`🚀 Server (Users service) ready at http://localhost:${process.env.APPID}/graphql`);
}

startApolloServer();
