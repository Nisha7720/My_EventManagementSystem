const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  bookEvent,
  myBooking,
  adminBooking,
} = require("../controllers/bookingController");

const router = express.Router();

router.get("/", bookEvent);
router.post("/", auth, role("customer"), myBooking);
router.post("/", auth, role("admin"), adminBooking);
