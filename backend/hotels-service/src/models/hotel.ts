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
  rating: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 5
  },
  serviceTimes: {
    checkIn: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 8
    },
    checkOut: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 8
    }
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
      roomType: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "RoomType",
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
