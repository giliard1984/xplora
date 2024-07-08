import gql from "graphql-tag"; // TODO: Identify why subgraphSchema only works with this deprecated library in apollo server 4
import dayjs from "dayjs";

const { ObjectId } = require('mongoose').Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const BookingModel = require("../models/booking");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against your data.
const typeDefs = gql`
  scalar Date
  scalar Object
  scalar Number

  directive @upper on FIELD_DEFINITION

  extend type Query {
    fetchAllBookings: [Booking!]
  }

  extend type Mutation {
    addBooking(input: BookingInput!): BookingCreated!
  }

  # this type expresses the booking days (from/to), and also when the client checked in and/or out
  type When {
    from: String!
    to: String!
    checkIn: String
    checkOut: String
  }

  input WhenInput {
    from: String!
    to: String!
    checkIn: String
    checkOut: String
  }

  # this type is not definitive, and that's why attrs are not required at this point
  type AsGuest {
    name: String
    mobile: String
    paymentDetails: Object
  }

  type Cost {
    category: String!
    price: Number!
    createdBy: ID
    createdAt: Date!
  }

  input AsGuestInput {
    name: String
    mobile: String
    paymentDetails: Object
  }

  input CostInput {
    category: String!
    price: Number!
    createdBy: ID
    createdAt: Date
  }

  type Booking @key(fields: "_id") {
    _id: ID!
    asGuest: AsGuest
    hotel: ID!
    roomType: ID!
    room: ID
    when: When!
    costs: [Cost!]
    createdAt: Date
  }

  input BookingInput {
    asGuest: AsGuestInput
    hotel: ID!
    roomType: ID!
    when: WhenInput!
    costs: [CostInput!]
    createdAt: Date
  }

  type BookingCreated {
    _id: ID!
    asGuest: AsGuest
    hotel: ID!
    roomType: ID!
    room: ID
    when: When!
    costs: [Cost!]
    createdAt: Date!
  }

  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.7", import: ["@key", "@shareable", "@composeDirective", "@external", "@provides"])
    @link(url: "https://myspecs.dev/myDirective/v1.0", import: ["@upper"])
`;

const resolvers = {
  Booking: {
    async __resolveReference(ref: any) {
      return await BookingModel.findOne({ id: ref._id }); 
    },
  },
  Query: {
    async fetchAllBookings(root: any, {}, contextValue: any) {
      return await BookingModel.find({});
    },
  },
  Mutation: {
    addBooking: async (root: any, { input }: any) => {
      console.log('Adding a new booking');
      console.log(input);

      return await BookingModel.create({
        asGuest: input.asGuest,
        hotel: input?.hotel,
        roomType: input.roomType,
        when: input.when,
        costs: input.costs,
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
