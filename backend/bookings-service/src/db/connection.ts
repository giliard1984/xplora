import dayjs from "dayjs";

// Mongoose & MongoDB
const mongoose = require("mongoose");
// import { Booking } from "../models";
mongoose.set("strictQuery", true);

mongoose.connect("mongodb://xplora-generic-db:27017/db", {});

mongoose.connection.once("open", () => {
  console.log("Connected to the generic database");
  initial();
});

mongoose.connection.once("error", () => {
  console.error("MongoDB connection error");
});

async function initial() {};

export default mongoose;
