const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Teacher = require("../models/Teacher");

router.get("/", auth, async (req, res) => {
  try {
    // console.log(req.teacher.id);
    if (req.user) {
      var user = await User.findById(req.user.id).select("-password");
    } else if (req.teacher) {
      var teacher = await Teacher.findById(req.teacher.id).select("-password");
    }
    if (teacher && user) {
      console.log(teacher);
      console.log(user);
      res.json(user);
    }
    if (teacher && !user) {
      res.json(teacher);
    }
    if (user && !teacher) {
      res.json(user);
    }
  } catch (err) {
    console.error(err);
    console.error("gg");
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    check("email", "Enter valid email").isEmail(),
    check("password", "is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      let teacher = await Teacher.findOne({ email });
      if (!user && !teacher) {
        res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
      }
      if (teacher) {
        const match = await bcrypt.compare(password, teacher.password);
        if (!match) {
          res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
        }
        const payload = {
          teacher: {
            id: teacher.id,
          },
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) {
              throw err;
            }
            res.json({ token, msg: "login" });
          }
        );
      }
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
        }
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) {
              throw err;
            }
            res.json({ token, msg: "login" });
          }
        );
      }
      // res.json({ msg: "user registered" });
    } catch (err) {
      console.error(err);
      res.status(500).message("error");
    }
  }
);

module.exports = router;
