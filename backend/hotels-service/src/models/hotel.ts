const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: true
  },
  layout: {
    totalFloors: {
      type: Number,
      required: true
    },
    features: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feature",
      required: false
    }],
    rooms: [{
      floor: {
        type: String,
        required: true
      },
      number: {
        type: String,
        required: true
      },
      features: [{
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Feature",
        required: false
      }],
      description: {
        type: String,
        required: false
      },
      status: {
        type: String,
        enum: ["available", "unavailable"],
        required: true
      }
    }]
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { versionKey: false });

export {};
module.exports = mongoose.model("Hotel", schema);
