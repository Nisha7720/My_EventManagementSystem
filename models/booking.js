const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  // Who booked the event
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // model name
    required: true,
  },

  // Which event was booked
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event", // model name
    required: true,
  },

  // Booking date
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookSchema);
