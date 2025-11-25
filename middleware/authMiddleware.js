//jwt library import for valid/vrify = token
const jwt = require("jsonwebtoken");

//Middleware check - Token valid?,user allowed? then next() bolke route aage badha dega.

module.exports = (req, res, next) => {
  // correct header name
  const authHeader = req?.headers?.authorization;

  if (!authHeader) return res.status(401).json({ message: "no token found!" });

  // "Bearer tokenvalue"
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // correct place to store user data
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Not valid token!" });
  }
};
