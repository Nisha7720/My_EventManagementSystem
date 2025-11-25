const Booking = require("../models/booking");
const User = require("../models/users");
const Event = require("../models/event");
//addbooking - means customer add their booking
module.exports.bookEvent = async (req, res) => {
  try {
    const { eventId, tickets } = req.body;

    const userId = req.user.id;

    if (!eventId)
      return res.status(400).json({ message: "event id is required " });

    const booking = await Booking.create({
      userId,
      eventId,
      tickets,
    });

    res.status(201).json({
      message: "add booking",
      booking,
    });
  } catch (err) {
    console.log("server problem", err);
    res.status(500).json({ message: "server probelm during booking!" });
  }
};

//myBooking - cutsomer only see their booking
console.log("hello");
module.exports.myBooking = async (req, res) => {
  try {
    // const userId = req.user.id;
    const userId = req.user.id;
    console.log("so the users id", req.user);

    //populate used for retrival or referencing data
    const booking = await Booking.find({ userId })
      .populate("eventId")
      .populate("userId");

    res.status(200).json({
      message: "your bookings",
      booking,
    });
  } catch (err) {
    console.log("sever not login ", err);
    res.status(500).json({ message: "server issue" });
  }
};

//userBooking - used when admin see user booking and also delete user boking

module.exports.adminBooking = async (req, res) => {
  try {
    const booking = await Booking.find().populate("eventId").populate("userId");

    res.status(200).json({
      message: "users bookings",
      booking,
    });
  } catch (err) {
    console.log("sever not login ", err);
    res.status(500).json({ message: "server issue" });
  }
};

// ADMIN - DELETE USER BOOKING
module.exports.deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;

    await Booking.findByIdAndDelete(id);

    res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server is not connect that time!" });
  }
};
