const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
//dotenv loads secret values from .env file into your app so you can use them safely without hard-coding passwords in your code.
const dotenv = require("dotenv");

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use(cors());

//import all routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/event", require("./routes/eventRoutes"));
app.use("/api/booking", require("./routes/bookingRoutes"));

app.listen(4000, () => {
  console.log("Server start at the port on 4000");
});

//http://localhost:4000/api/users/     -regitser login ,logout
//http://localhost:4000/api/event/     - get, create, update/:id ,delete/:id
//http://localhost:4000/api/booking/    -book , my-booking admin-booking /:id
