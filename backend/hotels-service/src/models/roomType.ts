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
  maxGuests: {
    type: Number,
    required: true,
    min: [1, 'Max guests should contain at least one guest!'],
    max: [8, 'Max guests should contain up to 8 guests!']
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { versionKey: false });

export {};
module.exports = mongoose.model("RoomType", schema);
