import gql from "graphql-tag"; // TODO: Identify why subgraphSchema only works with this deprecated library in apollo server 4
import dayjs from "dayjs";

const FeatureModel = require("../models/feature");
const HotelModel = require("../models/hotel");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against your data.
const typeDefs = gql`
  scalar Date
  scalar Object

  directive @upper on FIELD_DEFINITION

  extend type Query {
    fetchAllFeatures: [Feature!]
    fetchAllHotels: [Hotel!]
  }

  extend type Mutation {
    addHotel(input: HotelInput!): HotelCreated!
  }

  type Feature @key(fields: "_id") {
    _id: ID!
    name: String!
    description: String
    type: String!
    status: String!
    createdAt: Date!
  }

  # type Room {
  #   floor: String!
  #   number: String!
  #   features: [ID!]
  #   description: String
  #   status: String!
  # };

  # type HotelLayout {
  #   totalFloors: Number!
  #   features: [ID!]
  #   rooms: [Room!]
  # }

  type Hotel @key(fields: "_id") {
    _id: ID!
    name: String!
    description: String
    address: String!
    layout: Object!
    createdAt: Date!
  }

  input HotelInput {
    name: String!
    description: String
    address: String!
    layout: String!
    createdAt: Date!
  }

  type HotelCreated {
    _id: ID!
    name: String!
    description: String
    address: String!
    layout: String!
    createdAt: Date!
  }

  # populate: {
  #   path: "features",
  #   model: "Feature"
  # } 

  # if (err) return res.json(500);
  #       Project.populate(docs, options, function (err, projects) {
  #         res.json(projects);
  #       });

#   .exec(function(err: any, docs: any) {

# var options = {
#   path: 'layout.features',
#   model: 'Feature'
# };

# console.log(HotelModel);
# });

  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.7", import: ["@key", "@shareable", "@composeDirective", "@external", "@provides"])
    @link(url: "https://myspecs.dev/myDirective/v1.0", import: ["@upper"])
`;

const resolvers = {
  Feature: {
    async __resolveReference(ref: any) {
      return await FeatureModel.findOne({ id: ref._id });
    }
  },
  Hotel: {
    async __resolveReference(ref: any) {
      return await HotelModel.findOne({ id: ref._id }); 
    }
  },
  Query: {
    async fetchAllFeatures(root: any, {}, contextValue: any) {
      return await FeatureModel.find({});
    },
    async fetchAllHotels(root: any, {}, contextValue: any) {
      return await HotelModel.find({}).populate('layout.features');
    },
  },
  Mutation: {
    addHotel: async (root: any, { input }: any) => {
      console.log('Adding a new hotel');
      console.log(input);

      return await HotelModel.create({
        name: input.name,
        description: input?.description,
        address: input.address,
        layout: input.layout,
        createdAt: dayjs().toISOString()
      }).then((result: any) => {
        return result;
      }).catch((e: Error) => {
        console.log(e);
        return e;
      });
    }
  }
};

export { typeDefs, resolvers };