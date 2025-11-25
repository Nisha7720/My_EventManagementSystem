//we chcek the role role == admin ? admin : customer

module.exports = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(401).json({ message: "access denied" });
    }
    next();
  };
};
