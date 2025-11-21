const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { createEvent, getEvent, updateEvent, deleteEvent } = reqiure(
  "..controllers/eventController"
);

const router = express.Router();

router.get("/", getEvent);
router.post("/", auth, role("admin"), createEvent);
router.put("/:id", auth, role("admin"), updateEvent);
router.delete("/:id", auth, role("admin"), deleteEvent);

module.exports = router;
