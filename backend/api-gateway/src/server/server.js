import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
// import axios from "axios";

// import { typeDefs, resolvers } from "#root/schema";

async function startApolloGateway() {
  const app = express();
  const httpServer = http.createServer(app);

  class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
      request.http.headers.set("x-api-key", context.appKey);
      request.http.headers.set("x-access-token", context.token);
      // console.log(context);
    }
  }

  const supergraphSdl = new IntrospectAndCompose({
    // This entire subgraph list is optional when running in managed federation
    // mode, using Apollo Studio as the source of truth.  In production,
    // using a single source of truth to compose a schema is recommended and
    // prevents composition failures at runtime using schema validation using
    // real usage-based metrics.
    subgraphs: [
      { name: "xplora-users", url: "http://xplora-users-service-lb:8080/graphql" },
      { name: "xplora-hotels", url: "http://xplora-hotels-service-instance1:4102/graphql" }
      // { name: "xplora-bookings", url: "http://localhost:3110/graphql" }
    ],
    // introspectionHeaders: {
    //   appKey: "a073a55b-cb15-4c56-8573-2a8e52004cfb",
    // },
  });
  
  const gateway = new ApolloGateway({
    buildService: ({ name, url }) => {
      return new AuthenticatedDataSource({ url });
    },
    supergraphSdl,
    // Experimental: Enabling this enables the query plan view in Playground.
    __exposeQueryPlanExperimental: true,
  });

  app.use(cookieParser());

  const server = new ApolloServer({
    gateway,

    // Apollo Graph Manager (previously known as Apollo Engine)
    // When enabled and an `ENGINE_API_KEY` is set in the environment,
    // provides metrics, schema management and trace reporting.
    engine: false,

    // Subscriptions are unsupported but planned for a future Gateway version.
    subscriptions: false,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],

    context: ({ req }) => {
      // appId: process.env.APPID,
      const appKey = req.headers["x-api-key"];
      const token = req.headers["x-access-token"];

      return { appKey, token };
    }
  });

  await server.start();
  // Specify the path where we"d like to mount our server
  app.use(
    "/graphql",
    cors({
      origin: (origin, cb) => cb(null, true),
      credentials: true
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({  
        appId: process.env.APPID,
        appKey: req.headers["x-api-key"],
        token: req.headers["x-access-token"]
      }),
    }),
  );

  await new Promise(resolve => httpServer.listen({ port: process.env.APPID}, resolve));
  console.log(`🚀 SuperGraph Server ready at http://localhost:${process.env.APPID}/graphql`);
}

startApolloGateway();
