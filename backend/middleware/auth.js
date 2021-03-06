const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, "secrettoken");
    req.user = decoded.user;
    req.teacher = decoded.teacher;
    next();
  } catch (err) {
    console.log(err);
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
