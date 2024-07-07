import React from "react";
import { useQuery } from '@apollo/client';

// GraphQL - Queries, mutations and/or subscriptions
import { FETCH_ALL_HOTELS } from "../graphql/queries";

// Components
import HotelCard from "../components/HotelCard";


const SearchPage: React.FC = () => {
  const { loading, error, data } = useQuery(FETCH_ALL_HOTELS);
  console.log(loading, error, data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // return data.fetchAllHotels.map((hotel: any) =>
  //   <div>{JSON.stringify(hotel)}</div>
  // );

  return data.fetchAllHotels.map((hotel: any) =>
    <HotelCard data={hotel} />
  );
};

export default SearchPage;
