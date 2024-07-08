import React from "react";
import { useQuery } from '@apollo/client';
import { motion } from "framer-motion";

// GraphQL - Queries, mutations and/or subscriptions
import { FETCH_ALL_HOTELS } from "../graphql/queries";

// Components
import HotelCard from "../components/HotelCard";

const SearchPage: React.FC = () => {
  const { loading, error, data } = useQuery(FETCH_ALL_HOTELS);

  if (loading) return <p>Loading...</p>; // TODO: Add a skeleton
  if (error) return <p>Error : {error.message}</p>; // TODO: Create an error component, and gracefully present the message

  // iterates through the hotels returned by the endpoint, in order to render its details
  return data.fetchAllHotels.map((hotel: any, index: number) =>
    <motion.div
      initial={{
        x: 0,
        y: -100,
        opacity: 0 
      }}
      animate={{
        x: 0,
        y: 0,
        opacity: 1
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.2,
        ease: "easeIn"
      }}
    >
      <HotelCard data={hotel} />
    </motion.div>
  );
};

export default SearchPage;
