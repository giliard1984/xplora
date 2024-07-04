// Mongoose & MongoDB
const mongoose = require("mongoose");
import { Whitelist } from "../models";
mongoose.set("strictQuery", true);

mongoose.connect("mongodb://xplora-users-db:27017/db", {});

mongoose.connection.once("open", () => {
  console.log("Connected to the auth database");
  initial();
});

mongoose.connection.once("error", () => {
  console.error("MongoDB connection error");
});

function initial() {
  // Populates whitelist collection
  Whitelist.countDocuments().then((count: number) => {
    if (count === 0) {
      new Whitelist({
        client: "Postman",
        description: "This is the token required to log via Postman"
      }).save().then((resp: any) => {
        console.log("Added initial applications to the whitelist collection");
      }).catch((e: Error) => {
        console.log(`Error ${e}`);
      });

      new Whitelist({
        client: "React Application",
        description: "This is the token required to log via the React Application"
      }).save().then((resp: any) => {
        console.log("Added initial applications to the whitelist collection");
      }).catch((e: Error) => {
        console.log(`Error ${e}`);
      });
    }
  });

}

export default mongoose;
