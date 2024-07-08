import gql from "graphql-tag"; // TODO: Identify why subgraphSchema only works with this deprecated library in apollo server 4
import dayjs from "dayjs";

const { ObjectId } = require('mongoose').Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const FeatureModel = require("../models/feature");
const RoomTypeModel = require("../models/roomType");
const HotelModel = require("../models/hotel");
const HotelRoomTypePrice = require("../models/hotelRoomTypePrice");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against your data.
const typeDefs = gql`
  scalar Date
  scalar Object
  scalar Number

  directive @upper on FIELD_DEFINITION

  extend type Query {
    fetchAllFeatures: [Feature!]
    fetchRoomTypes: [RoomType!]
    fetchAllHotelRoomTypePrices: [HotelRoomTypePrice!]
    fetchAllHotels: [Hotel!]
    fetchHotelById(id: ID!): Hotel!
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

  type RoomType @key(fields: "_id") {
    _id: ID!
    name: String!
    description: String
    maxGuests: Number!
    createdAt: Date!
  }

  type Price {
    from: Date!
    to: Date
    price: Number!
  }

  type Room {
    floor: String!
    number: String!
    roomType: RoomType!
    features: [Feature!]
    description: String
    status: String!
  }

  type HotelRoomTypePrice @key(fields: "_id") {
    _id: ID!
    hotel: ID!
    roomType: RoomType!
    prices: [Price]
    createdAt: Date!
  }

  type HotelLayout {
    totalFloors: Number!
    features: [Feature!]
    rooms: [Room!]
  }

  type serviceTimes {
    checkIn: String!
    checkOut: String!
  }

  type Hotel @key(fields: "_id") {
    _id: ID!
    name: String!
    description: String
    address: String!
    image: String
    rating: Number!
    serviceTimes: serviceTimes!
    prices: [HotelRoomTypePrice]
    layout: HotelLayout!
    createdAt: Date!
  }

  union SearchHotel = Hotel | HotelRoomTypePrice

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
  RoomType: {
    async __resolveReference(ref: any) {
      return await RoomTypeModel.findOne({ id: ref._id });
    }
  },
  HotelRoomTypePrice: {
    async __resolveReference(ref: any) {
      return await HotelRoomTypePrice.findOne({ id: ref._id });
    }
  },
  Hotel: {
    async __resolveReference(ref: any) {
      return await HotelModel.findOne({ id: ref._id }); 
    },
    async prices(parent: any) {
      let data = await HotelRoomTypePrice.find({ hotel: parent._id.toString() }).populate('roomType');
      return data;
    },
    async hotelRoomPrices(parent: any) {
      let data = await HotelRoomTypePrice.find();
      return data;
    }
  },
  SearchHotel: {
    async __resolveReference(ref: any) {
      return await HotelModel.findOne({ id: ref._id }); 
    }
  },
  Query: {
    async fetchAllFeatures(root: any, {}, contextValue: any) {
      return await FeatureModel.find({});
    },
    async fetchRoomTypes(root: any, {}, contextValue: any) {
      return await RoomTypeModel.find({});
    },
    async fetchAllHotelRoomTypePrices(root: any, {}, contextValue: any) {
      return await HotelRoomTypePrice.find({});
    },
    async fetchAllHotels(root: any, {}, contextValue: any) {
      return await HotelModel.find({}).populate('layout.features layout.rooms.features layout.rooms.roomType');
    },
    async fetchHotelById(root: any, { id }: any) {
      return await HotelModel.findOne({ id: id }).populate('layout.features layout.rooms.features layout.rooms.roomType');
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
