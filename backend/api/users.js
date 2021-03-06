const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Teacher = require("../models/Teacher");
const gravatar = require("gravatar");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const normalize = require("normalize-url");

router.post(
  "/",
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, usertype } = req.body;

    try {
      let user;
      let teacher;
      if (usertype === "Student") {
        user = await User.findOne({ email });
      } else {
        teacher = await Teacher.findOne({ email });
      }
      if (user || teacher) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm",
        }),
        { forceHttps: true }
      );
      if (usertype === "Teacher") {
        console.log(name, email, password);
        teacher = new Teacher({
          name,
          email,
          avatar,
          password,
        });

        const salt = await bcrypt.genSalt(10);

        teacher.password = await bcrypt.hash(password, salt);

        await teacher.save();
        const payload = {
          teacher: {
            id: teacher.id,
          },
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: "5 days" },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } else if (usertype === "Student") {
        user = new User({
          name,
          email,
          avatar,
          password,
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();
        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: "5 days" },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/getsubject",
  check("id", "id is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.body;

    try {
      const user = await User.findById(id).select("subject");
      if (user) {
        res.json(user);
      } else {
        res.status(400).json({ msg: "not found" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/getsubject",
  check("id", "Id is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.body;

    try {
      let user = await User.findById(id).select("subject");
      if (user) {
        res.json(user);
      } else {
        res.status(400).json({ msg: "user not found" });
      }
    } catch (err) {
      res.status(500).json({ msg: "server error" });
    }
  }
);

router.post(
  "/getname",
  check("id", "Id is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.body;

    try {
      let user = await User.findById(id).select("name");
      let teacher = await Teacher.findById(id).select("name");
      if (user && !teacher) {
        res.json(user);
      } else if (teacher && !user) {
        res.json(teacher);
      } else {
        res.status(400).json({ msg: "doesnt exist" });
      }
    } catch (err) {
      res.status(500).json({ msg: "server error" });
    }
  }
);
module.exports = router;
