const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

// define the path of router
const router = express.Router();
//give route of path of event
router.get("/get", getEvent);
router.post("/create", auth, role("admin"), createEvent);
router.put("/update/:id", auth, role("admin"), updateEvent);
router.delete("/delete/:id", auth, role("admin"), deleteEvent);

module.exports = router;
