const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Teacher = require("../models/Teacher");
// const User = require("../models/User");
const Subject = require("../models/Subject");
const { check, validationResult } = require("express-validator");

router.post("/", [
  auth,
  [check("name", "Subject is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log(req.user);
      const teacher = await Teacher.findById(req.user.id).select("-password");
      console.log(teacher);
      const subject = new Subject({
        teacher: teacher.name,
        name: req.body.name,
      });
      console.log(subject);
      const sub = await subject.save();
      res.json(sub);
    } catch (err) {
      console.log(err);
      //   console.log(subject);

      res.status(500).send("server error");
    }
  },
]);

module.exports = router;
