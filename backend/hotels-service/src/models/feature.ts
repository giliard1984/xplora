const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String!,
    required: true,
    enum: ["all", "hotel", "room"]
  },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { versionKey: false, toObject: { getters: false }, toJSON: { getters: false } });

export {};
module.exports = mongoose.model("Feature", schema);
