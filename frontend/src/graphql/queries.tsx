import { gql } from '@apollo/client';

const FETCH_ALL_FEATURES = gql`
  query fetchAllFeatures {
    fetchAllFeatures {
      _id
      createdAt
      description
      name
      status
      type
    }
  }
`;

const FETCH_ALL_HOTELS = gql`
  query fetchAllHotels {
    fetchAllHotels {
      _id
      address
      createdAt
      description
      name
      rating
      serviceTimes {
        checkIn
        checkOut
      }
      prices {
        _id
        createdAt
        hotel
        roomType {
          _id
          name
          description
          maxGuests
          createdAt
        }
        prices {
          from
          price
          to
        }
      }
      layout {
        rooms {
          description
          features {
            _id
            createdAt
            description
            name
            status
            type
          }
          floor
          number
          roomType {
            _id
            createdAt
            description
            maxGuests
            name
          }
          status
        }
        totalFloors
        features {
          _id
          createdAt
          description
          name
          status
          type
        }
      }
    }
  }
`;

export {
  FETCH_ALL_FEATURES,
  FETCH_ALL_HOTELS
};
