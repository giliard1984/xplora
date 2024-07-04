import gql from "graphql-tag"; // TODO: Identify why subgraphSchema only works with this deprecated library in apollo server 4
// import hashPassword from "@root/helpers/hashPassword";
// import passwordCompareSync from "@root/helpers/passwordCompareSync";
// import dayjs from "dayjs";

// const config = require("../config/auth.config");
// const jwt = require("jsonwebtoken");
const WhitelistModel = require("../models/whitelist");
const SessionModel = require("../models/session");

// const USER_SESSION_EXPIRY_HOURS = 2;
// const authController = require("@root/controllers/auth.controller");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against your data.
const typeDefs = gql`
  scalar Date

  directive @isWhitelisted on QUERY | MUTATION | OBJECT | FIELD_DEFINITION
  directive @auth on QUERY | MUTATION | OBJECT | FIELD_DEFINITION
  directive @upper on FIELD_DEFINITION

  extend type Query {
    fetchAllSessions: [Session!]
    fetchWhitelist: [Whitelist!]
  }

  # extend type Mutation {}

  type IpRange {
    from: String!
    to: String
  }

  type Whitelist @key(fields: "_id") {
    _id: ID!
    client: String!
    description: String
    ip: [IpRange!]
    token: String!
    createdAt: Date!
    expiresAt: Date
  }

  type Session @key(fields: "_id") {
    _id: ID!
    userId: ID!
    createdAt: Date!
    expiresAt: Date!
  }

  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.7", import: ["@key", "@shareable", "@composeDirective"])
    @link(url: "https://myspecs.dev/myDirective/v1.0", import: ["@auth", "@isWhitelisted"])
    @composeDirective(name: "@auth")
    @composeDirective(name: "@isWhitelisted")
`;

const resolvers = {
  Whitelist: {
    async __resolveReference(ref: any) {
      return await WhitelistModel.findOne({ id: ref._id });
    }
  },
  Session: {
    async __resolveReference(ref: any) {
      return await SessionModel.findOne({ id: ref._id });
    }
  },
  Query: {
    async fetchWhitelist(root: any, {}, contextValue: any) {
      return await WhitelistModel.find({});
    },
    async fetchAllSessions(root: any, {}, contextValue: any) {
      return await SessionModel.find({});
    }
  },
  Mutation: {}
};

export { typeDefs, resolvers };