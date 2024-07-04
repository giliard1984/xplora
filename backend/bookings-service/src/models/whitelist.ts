import generateUUID from "../helpers/generateUUID";
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  client: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  ip: {
    type: Array,
    required: true,
    default: [{
      from: '*',
      to: null
    }]
  },
  token: {
    type: String,
    required: true,
    default: generateUUID()
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: false,
  }
}, { versionKey: false });

module.exports = mongoose.model("Whitelist", schema);
