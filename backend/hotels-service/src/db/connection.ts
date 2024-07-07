import dayjs from "dayjs";

// Mongoose & MongoDB
const mongoose = require("mongoose");
import { Feature, RoomType, Hotel, HotelRoomTypePrice } from "../models";
mongoose.set("strictQuery", true);

// const { ObjectId } = mongoose.Types;

// ObjectId.prototype.valueOf = function () {
//   return this.toString();
// };

mongoose.connect("mongodb://xplora-generic-db:27017/db", {});

mongoose.connection.once("open", () => {
  console.log("Connected to the generic database");
  initial();
});

mongoose.connection.once("error", () => {
  console.error("MongoDB connection error");
});

async function initial() {
  // TODO: What's the difference between countDocuments and estimatedDocumentCount?
  let featuresCounter: number = 0;
  let roomTypeCounter: number = 0;
  let hotelCounter: number = 0;
  let hotelRoomTypePriceCounter: number = 0;
  let featuresData: any[] = [];
  let roomTypeData: any[] = [];
  let hotelData: any[] = [];
  let hotelRoomTypePriceData: any[] = [];

  const getFeatureIdsGivenNames = (names: string[]): number[] => {
    const ids = names.map((name: string) => {
      const feature = featuresData.find((feature: any) => feature.name === name);
      if (feature) return feature._id;
      return false;
    });

    return [...ids];
  };

  const getRoomTypeIdsGivenNames = (name: string): number => {
    const roomType = roomTypeData.find((roomType: any) => roomType.name === name);

    // console.log(name, roomTypeData, roomType);

    // return [...ids];
    return roomType._id;
  };

  const getHotelIdsGivenNames = (name: string): number => {
    const hotelInfo = hotelData.find((hotelDetails: any) => hotelDetails.name === name);

    console.log(name, hotelData, hotelInfo);

    return hotelInfo._id;
  };

  // analyses how many records exists on the features collection
  const checkFeatureRecords = async (): Promise<number> => {
    featuresCounter = await Feature.estimatedDocumentCount();
    return featuresCounter;
  };

  await checkFeatureRecords();
  console.log("No of Feature records already in the database: ", featuresCounter);

  // analyses how many records exists on the room type collection
  const checkRoomTypeRecords = async (): Promise<number> => {
    roomTypeCounter = await RoomType.estimatedDocumentCount();
    return roomTypeCounter;
  };

  await checkRoomTypeRecords();
  console.log("No of Room Type records already in the database: ", roomTypeCounter);

  // analyses how many records exists on the hotel room type price collection
  const checkHotelRoomTypePriceRecords = async (): Promise<number> => {
    hotelRoomTypePriceCounter = await HotelRoomTypePrice.estimatedDocumentCount();
    return hotelRoomTypePriceCounter;
  };

  await checkHotelRoomTypePriceRecords();
  console.log("No of Hotel Room Type Price records already in the database: ", hotelRoomTypePriceCounter);

  // analyses how many records exists on the hotels collection
  const checkHotelRecords = async (): Promise<number> => {
    hotelCounter = await Hotel.estimatedDocumentCount();
    return hotelCounter;
  };

  await checkHotelRecords();
  console.log("No of Hotel records already in the database: ", hotelCounter);

  // function to create a feature model, and save it in the collection given an object
  const addFeature = async (feature: any): Promise<any> => {
    let newFeature = new Feature(feature);

    const result = await newFeature.save();
    // console.log("Feature:", result.toObject({ getters: true }));
    featuresData.push(result.toObject({ getters: true }));
  };

  // function to create a feature model, and save it in the collection given an object
  const addRoomType = async (roomType: any): Promise<any> => {
    let newRoomType = new RoomType(roomType);

    const result = await newRoomType.save();
    // console.log("RoomType:", result.toObject({ getters: true }));
    roomTypeData.push(result.toObject({ getters: true }));
  };

  const addHotel = async (hotel: any): Promise<any> => {
    let newHotel = new Hotel(hotel);

    const result = await newHotel.save();
    hotelData.push(result.toObject({ getters: true }));
    // console.log("Hotel:", result.toObject({ getters: true }));
  };

  const addHotelRoomTypePrice = async (hotelRoomTypePrice: any): Promise<any> => {
    let newHotelRoomTypePrice = new HotelRoomTypePrice(hotelRoomTypePrice);

    const result = await newHotelRoomTypePrice.save();
    // console.log("Hotel:", result.toObject({ getters: true }));
  };
  
  // reads the features migrations and populate the collection
  if (featuresCounter === 0) {
    const features = [
      {
        name: "Parking available",
        description: "There is an underground parking area, that can be utilised by customers.",
        type: "hotel",
        status: "available"
      },
      {
        name: "Swiming Pool",
        description: "Swiming pool available on site.",
        type: "hotel",
        status: "available"
      },
      {
        name: "Pet friendly",
        description: "Pets are allowed on site, depending on breed and/or size. Please ask for further details.",
        type: "hotel",
        status: "available"
      },
      {
        name: "Wifi",
        description: "Wifi connectivity on premisses",
        type: "hotel",
        status: "available"
      },
      {
        name: "King size bed",
        description: "King size bed available for this room",
        type: "room",
        status: "available"
      },
      {
        name: "Queen size bed",
        description: "Queen size bed available for this room",
        type: "room",
        status: "available"
      },
      {
        name: "Double size bed",
        description: "Double size bed available for this room",
        type: "room",
        status: "available"
      },
      {
        name: "Single size bed",
        description: "Single size bed available for this room",
        type: "room",
        status: "available"
      }
    ];

    // run the features migration, considering data is not in the database
    // utilising this for syntax instead of .forEach for async/await reasons (modern problems, might require older solutions)
    for (const feature of features) {
      await addFeature(feature);
    };
  } else {
    featuresData = await Feature.find({}, null, { getters: true });
  }

  // reads the room type migrations and populate the collection
  if (roomTypeCounter === 0) {
    const roomTypes = [
      {
        name: "Standard Room",
        description: "Standard Room. When you arrive at the hotel we will do our best to meet your room type preference. This is subject to availability and cannot be guaranteed",
        maxGuests: 2
      },
      {
        name: "Superior Room",
        description: "Provides a king bed, mini fridge, 26sqm/280sqft-27sqm/291sqft",
        maxGuests: 3
      }
    ];

    // run the room type migration, considering data is not in the database
    // utilising this for syntax instead of .forEach for async/await reasons (modern problems, might require older solutions)
    for (const roomType of roomTypes) {
      await addRoomType(roomType);
    };
  } else {
    roomTypeData = await RoomType.find({}, null, { getters: true });
  }

  if (hotelCounter === 0) {
    // console.log(roomTypeData);
  
    const hotels = [
      {
        name: "Holiday Inn Express",
        description: "London - Excel",
        address: "1018 Dockside Road, E16 2FQ London",
        rating: 2.6,
        serviceTimes: {
          checkIn: "02:00 PM",
          checkOut: "11:00 AM"
        },
        layout: {
          totalFloors: 10,
          features: getFeatureIdsGivenNames(["Parking available", "Swiming Pool"]),
          rooms: [
            {
              floor: 1,
              number: "1",
              roomType: getRoomTypeIdsGivenNames("Standard Room"),
              features: getFeatureIdsGivenNames(["King size bed"]),
              description: "This is a nice room",
              status: "available"
            }
          ],
        },
      },
      {
        name: "Point A Hotel Paddington",
        description: "This is a hotel",
        address: "41 PRAED STREET, W2 1NR London",
        rating: 4.5,
        serviceTimes: {
          checkIn: "02:00 PM",
          checkOut: "11:00 AM"
        },
        layout: {
          totalFloors: 10,
          features: getFeatureIdsGivenNames(["Swiming Pool"]),
          rooms: [
            {
              floor: 1,
              number: "1",
              roomType: getRoomTypeIdsGivenNames("Standard Room"),
              features: getFeatureIdsGivenNames(["Queen size bed"]),
              description: "This is a room",
              status: "available"
            }
          ],
        },
      },
      {
        name: "Sheraton Heathrow Hotel",
        description: "This is a hotel",
        address: "HEATHROW AIRPORT COLNBROOK BYPASS, UB7 0HJ London, Middlesex",
        rating: 4.3,
        serviceTimes: {
          checkIn: "01:00 PM",
          checkOut: "12:00 AM"
        },
        layout: {
          totalFloors: 5,
          features: [],
          rooms: [{
            floor: 1,
            number: "1A",
            roomType: getRoomTypeIdsGivenNames("Standard Room"),
            features: [],
            description: "This is a room",
            status: "available"
          }],
        }
      },
    ];

    // run the features migration, considering data is not in the database
    // utilising this for syntax instead of .forEach for async/await reasons (modern problems, might require older solutions)
    for (const hotel of hotels) {
      await addHotel(hotel);
    };
  } else {
    hotelData = await HotelRoomTypePrice.find({}, null, { getters: true });
  }

  // reads the hotel room type price migrations and populate the collection
  if (hotelRoomTypePriceCounter === 0) {
    const hotelRoomTypePrices = [
      {
        hotel: getHotelIdsGivenNames("Holiday Inn Express"),
        roomType: getRoomTypeIdsGivenNames("Standard Room"),
        prices: [
          {
            from: dayjs().subtract(30, 'day').format("YYYYMMDD"),
            to: dayjs().subtract(7, 'day').format("YYYYMMDD"),
            price: 136.00
          },
          {
            from: dayjs().subtract(6, 'day').format("YYYYMMDD"),
            price: 132.80
          }
        ]
      },
      {
        hotel: getHotelIdsGivenNames("Holiday Inn Express"),
        roomType: getRoomTypeIdsGivenNames("Superior Room"),
        prices: [
          {
            from: dayjs().subtract(2, 'day').format("YYYYMMDD"),
            price: 132.80
          }
        ]
      },
      {
        hotel: getHotelIdsGivenNames("Point A Hotel Paddington"),
        roomType: getRoomTypeIdsGivenNames("Standard Room"),
        prices: [
          {
            from: dayjs().format("YYYYMMDD"),
            price: 99.00
          }
        ]
      },
      {
        hotel: getHotelIdsGivenNames("Sheraton Heathrow Hotel"),
        roomType: getRoomTypeIdsGivenNames("Standard Room"),
        prices: [
          {
            from: dayjs().format("YYYYMMDD"),
            price: 241.00
          }
        ]
      },
    ];

    console.log("hotelRoomTypePrices: ", hotelRoomTypePrices);

    // run the room type migration, considering data is not in the database
    // utilising this for syntax instead of .forEach for async/await reasons (modern problems, might require older solutions)
    for (const hotelRoomTypePrice of hotelRoomTypePrices) {
      await addHotelRoomTypePrice(hotelRoomTypePrice);
    };
  } else {
    hotelRoomTypePriceData = await HotelRoomTypePrice.find({}, null, { getters: true });
  }
  
}

export default mongoose;
