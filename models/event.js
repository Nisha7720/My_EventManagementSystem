const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  description: String,
  price: Number,
  venue: String,
});

module.exports = mongoose.model("event", eventSchema);
