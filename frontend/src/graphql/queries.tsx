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
      image
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


const FETCH_HOTEL_BY_ID = gql`
  query FetchHotelById($fetchHotelByIdId: ID!) {
    fetchHotelById(id: $fetchHotelByIdId) {
      _id
      name
      description
      address
      image
      rating
      serviceTimes {
        checkIn
        checkOut
      }
      prices {
        _id
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
          to
          price
        }
        createdAt
      }
      layout {
        totalFloors
        features {
          _id
          name
          description
          type
          status
          createdAt
        }
        rooms {
          floor
          number
          roomType {
            _id
            name
            description
            maxGuests
            createdAt
          }
          features {
            _id
            name
            description
            type
            status
            createdAt
          }
          description
          status
        }
      }
    }
  }
`;

export {
  FETCH_ALL_FEATURES,
  FETCH_ALL_HOTELS,
  FETCH_HOTEL_BY_ID
};
