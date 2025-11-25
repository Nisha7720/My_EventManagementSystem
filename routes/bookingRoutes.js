const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  bookEvent,
  myBooking,
  adminBooking,
  deleteBooking,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/book", auth, role("customer"), bookEvent);
router.get("/my-booking", auth, role("customer"), myBooking);
router.get("/admin-booking", auth, role("admin"), adminBooking);
router.delete("/:id", auth, role("admin"), deleteBooking);

module.exports = router;
