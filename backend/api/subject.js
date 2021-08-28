const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Teacher = require("../models/Teacher");
const User = require("../models/User");
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
      let subjectexist = Subject.findOne(req.body.name);
      if (subjectexist) {
        return res
          .status(400)
          .json({ errors: [{ msg: " subject already exists" }] });
      }
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

//
router.put("/add/:subjectname", [
  auth,
  [check("email", "email is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email } = req.body;
      let user = await User.findOne({ email });
      let subjectadd = await Subject.findOne({ name: req.params.subjectname });
      if (user) {
        if (
          user.subject.filter(
            (subject) => subject.name.toString() === req.params.subjectname
          ).length > 0
        ) {
          return res.status(400).json({ msg: "already added" });
        }
        user.subject.push({ name: req.params.subjectname });
        await user.save();
        subjectadd.students.push({ studentId: user.id });
        await subjectadd.save();
        res.status(200).json({
          msg: "student added",
        });
      } else {
        res.status(400).send("user doesnt exist");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  },
]);
module.exports = router;
