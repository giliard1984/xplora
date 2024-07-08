import { gql } from '@apollo/client';

const ADD_BOOKING = gql`
  mutation AddBooking($input: BookingInput!) {
    addBooking(input: $input) {
      _id
      asGuest {
        name
        mobile
        paymentDetails
      }
      hotel
      roomType
      room
      costs {
        category
        price
        createdBy
        createdAt
      }
      createdAt
      when {
        from
        to
        checkIn
        checkOut
      }
    }
  }
`;


export {
  ADD_BOOKING
};
