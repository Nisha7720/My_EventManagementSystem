const Event = require("../models/event");

//we have also get the event
module.exports.getEvent = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      events,
    });
  } catch (err) {
    console.log("server getting error", err);
    res.status(500).json({ message: "event not get" });
  }
};

// if we want to create event
module.exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, price, venue } = req.body;
    //used condition
    if (!title || !description || !date || !price || !venue)
      return res.status(201).json({ message: "fill all the detailed!" });

    const userEvent = await Event.create({
      title,
      description,
      date,
      price,
      venue,
    });

    //create the events
    res.status(201).json({
      message: "Event created successfully",
      event: userEvent,
    });
  } catch (err) {
    console.log(" network not valid", err);
    res.status(500).json({ message: "server issue" });
  }
};

module.exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const updated = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({
      message: "Event updated successfully",
      updated,
    });
  } catch (err) {
    console.log("Update error:", err);
    res.status(500).json({ message: "Server error while updating event" });
  }
};

//if we want to delete event we need a particalur id

module.exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const deleted = await Event.findByIdAndDelete(eventId);

    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event successfully deleted" });
  } catch (err) {
    console.log("Delete error:", err);
    res.status(500).json({ message: "Server error while deleting event" });
  }
};
