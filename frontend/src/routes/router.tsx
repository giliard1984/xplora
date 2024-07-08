import { Route, Routes/* , Navigate */ } from "react-router-dom";

// Layouts
// import DefaultLayout from "../layouts/Default";
import HotelLayout from "../layouts/Hotel";

// Pages
// TODO: Implement the pages
import SearchPage from "../pages/SearchPage";
import HotelDetails from "../pages/HotelDetails";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<HotelLayout />}>
        <Route path="/" element={<SearchPage />} />
        <Route path="/hotel/:id/:name" element={<HotelDetails />} />
        <Route path="/bookings" element={<div>my bookings</div>} />
      </Route>
    </Routes>
  );
};

export default Router;
