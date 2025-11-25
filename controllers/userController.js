//User → MongoDB model
//bcrypt → password hashing
//jwt → to create login token
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1️ Check empty fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️ Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 3️ Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 4️Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️ Save user in database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // 6️Successful response
    res.status(201).json({
      message: "Registration successful!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

//login page
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(201).json({ message: "fill all details" });
    //if email again and again same id
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "email exists" });
    //if password not macth
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "not valid!" });

    //used to find token
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET
    );
    res.json({ token, role: user.role });
  } catch (err) {
    console.log("server looged in", err);
    res.status(500).json({ message: "wait that time server issue" });
  }
};

//logout page
module.exports.logout = (req, res) => {
  return res.json({ message: "we want to logout" });
};
