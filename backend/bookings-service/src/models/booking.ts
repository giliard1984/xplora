const mongoose = require("mongoose");

const schema = mongoose.Schema({
  // TODO: asGuest should be a record in the Users database, and refenced here
  asGuest: {
    name: {
      type: String,
      required: false
    },
    mobile: {
      type: String,
      required: false
    },
    paymentDetails: {
      type: Object,
      required: false
    }
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true
  },
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomType",
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomType",
    required: false
  },
  when: {
    from: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 8
    },
    to: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 8
    },
    checkIn: {
      type: String,
      required: false,
      trim: false,
      minlength: 8,
      maxlength: 8
    },
    checkOut: {
      type: String,
      required: false,
      trim: false,
      minlength: 8,
      maxlength: 8
    }
  },
  costs: [
    {
      category: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
      },
      createdAt: {
        type: Date,
        required: true,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { versionKey: false });

export {};
module.exports = mongoose.model("Booking", schema);
