const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//import all routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/event", require("./routes/eventRoutes"));
app.use("/api/booking", require("./routes/bookingRoutes"));

app.listen(4000, () => {
  console.log("Server start at the port on 4000");
});
