// Mongoose & MongoDB
const mongoose = require("mongoose");
const fs: any = require("fs/promises");

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
      fs.readFile("./src/data/seeds/whitelist.json")
        .then((data: any) => {
          for (const item of JSON.parse(data)) {
            console.log(count, item);
            new Whitelist(item).save().then((resp: any) => {
              console.log("Added initial applications to the whitelist collection");
            }).catch((e: Error) => {
              console.log(`Error ${e}`);
            });
          }
        })
        .catch((error: Error) => {
          console.log("Error: ", error);
        });
    }
  });
}

export default mongoose;
