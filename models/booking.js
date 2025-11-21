const mongoose = require("express");

const bookSchema = new mongoose.Schema({
  //userId - Booking by which users
  userId: {
    // field means MongoDB ka unique ID (ObjectId) store hoga.
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  //eventId = booking for which event
  eventId: {
    type: mongoose.Schema.Types.objectId,
    ref: "event",
  },
  // show current date
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("booking", bookSchema);
