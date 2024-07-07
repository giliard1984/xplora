import { Route, Routes, Navigate } from "react-router-dom";

// Layouts
// import DefaultLayout from "../layouts/Default";
import HotelLayout from "../layouts/Hotel";

// Pages
// TODO: Implement the pages
import SearchPage from "../pages/SearchPage";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<HotelLayout />}>
        <Route path="/" element={<SearchPage />} />
        <Route path="/bookings" element={<div>my bookings</div>} />
      </Route>
    </Routes>
  );
};

export default Router;
