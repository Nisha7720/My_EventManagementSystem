//User → MongoDB model
//bcrypt → password hashing
//jwt → to create login token
const user = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//register page
module.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  //store password in hased form
  const hashed = await bcrypt.hash(password, 10);
  // used to ceate email password
  const user = await user.create({ name, email, password: hashed, role });

  res.json({ message: "register successfully!" });
};

//login page
module.login = async (req, res) => {
  const { email, password } = req.body;
  //if email again and again same id
  const user = await user.findOne({ email });
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
};
