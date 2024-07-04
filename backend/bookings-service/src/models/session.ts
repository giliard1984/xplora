const mongoose = require("mongoose");

const schema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
    // ref: 'User'
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true,
  }
}, { versionKey: false });

module.exports = mongoose.model("Session", schema);
