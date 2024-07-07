const mongoose = require("mongoose");

const schema = mongoose.Schema({
  hotel: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true
  },
  roomType: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "RoomType",
    required: true
  },
  prices: [{
    from: {
      type: Date!,
      required: true,
      default: Date.now
    },
    to: {
      type: Date!,
      required: false
    },
    price: {
      type: Number,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { versionKey: false });

// defines a composed unique key, so the hotel vs roomType gets created only once
// the purpose is for admin users to change prices based on the room types
// this can be changed to offer more flexbility
schema.index({ hotel: 1, roomType: 1 }, { unique: true });

export {};
module.exports = mongoose.model("HotelRoomTypePrice", schema);
