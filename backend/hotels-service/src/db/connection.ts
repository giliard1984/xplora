// Mongoose & MongoDB
const mongoose = require("mongoose");
import { Feature, Hotel } from "../models";
mongoose.set("strictQuery", true);

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
  let hotelCounter: number = 0;
  let featuresData: any[] = [];

  // analyses how many records exists on the features collection
  const checkFeatureRecords = async (): Promise<number> => {
    featuresCounter = await Feature.estimatedDocumentCount();
    return featuresCounter;
  };

  await checkFeatureRecords();
  console.log("No of Feature records already in the database: ", featuresCounter);

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

  const addHotel = async (hotel: any): Promise<any> => {
    let newHotel = new Hotel(hotel);

    const result = await newHotel.save();
    console.log("Hotel:", result.toObject({ getters: true }));
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
  
  // console.log("featuresData: ", featuresData);

  if (hotelCounter === 0) {
    const getFeatureIdsGivenNames = (names: string[]): number[] => {
      const ids = names.map((name: string) => {
        const feature = featuresData.find((feature: any) => feature.name === name);
        if (feature) return feature._id;
        return false;
      });

      return [...ids];
    };
  
    const hotels = [
      {
        name: "Holiday Inn Express",
        description: "London - Excel",
        address: "1018 Dockside Road, E16 2FQ London",
        layout: {
          totalFloors: 10,
          features: getFeatureIdsGivenNames(["Parking available", "Swiming Pool"]),
          rooms: [
            {
              floor: 1,
              number: "1",
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
        layout: {
          totalFloors: 10,
          features: getFeatureIdsGivenNames(["Swiming Pool"]),
          rooms: [
            {
              floor: 1,
              number: "1",
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
        layout: {
          totalFloors: 5,
          features: [],
          rooms: [{
            floor: 1,
            number: "1A",
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
  }
}

export default mongoose;
