//jwt library import for valid/vrify = token
const jwt = require("jsonwebtoken");

//Middleware check - Token valid?,user allowed? then next() bolke route aage badha dega.
module.exports = (req, res, next) => {
  const token = req?.headers?.autherzation?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "no token found!" });

  try {
    const decoded = jwt.verify(token, process.env.MONGO_URL);
    res.users = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not valid token!" });
  }
};
