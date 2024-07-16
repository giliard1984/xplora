
type Status = "available" | "unavailable"

type RoomType = {
  _id: String
  name: String
  description: String
  maxGuests: Number
  createdAt: Date
}

type Feature = {
  _id: String
  name: String
  description: String
  type: "hotel" | "room"
  status: Status
  createdAt: Date
}

type HotelRoom = {
  description: String
  features: Feature[]
  floor: String
  number: String
  roomType: RoomType
  status: Status
}

// type HotelLayout = {

// }


type Hotel = {
  _id: String!
  name: String!
  description: String!
  address: String
  image: String
  createdAt: Date!
  rating: Number
  serviceTimes: {
    checkIn: String
    checkOut: String
  }
  prices: any
  layout: any
}


// {
//   "prices": [
//       {
//           "__typename": "HotelRoomTypePrice",
//           "_id": "668bc37fd0167db6d9a1a258",
//           "createdAt": "2024-07-08T10:46:23.759Z",
//           "hotel": "668bc37fd0167db6d9a1a24b",
//           "roomType": {
//               "__typename": "RoomType",
//               "_id": "668bc37fd0167db6d9a1a23f",
//               "name": "Standard Room",
//               "description": "Standard Room. When you arrive at the hotel we will do our best to meet your room type preference. This is subject to availability and cannot be guaranteed",
//               "maxGuests": 2,
//               "createdAt": "2024-07-08T10:46:23.718Z"
//           },
//           "prices": [
//               {
//                   "__typename": "Price",
//                   "from": "1970-01-01T05:37:20.708Z",
//                   "price": 241,
//                   "to": null
//               }
//           ]
//       }
//   ],
//   "layout": {
//       "__typename": "HotelLayout",
//       "rooms": [
//           {
//               "__typename": "Room",
//               "description": "This is a room",
//               "features": [],
//               "floor": "1",
//               "number": "1A",
//               "roomType": {
//                   "__typename": "RoomType",
//                   "_id": "668bc37fd0167db6d9a1a23f",
//                   "createdAt": "2024-07-08T10:46:23.718Z",
//                   "description": "Standard Room. When you arrive at the hotel we will do our best to meet your room type preference. This is subject to availability and cannot be guaranteed",
//                   "maxGuests": 2,
//                   "name": "Standard Room"
//               },
//               "status": "available"
//           }
//       ],
//       "totalFloors": 5,
//       "features": []
//   }
// }