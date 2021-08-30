const express = require("express");
const router = express.Router();
// const auth = require("../middleware/auth");
const User = require("../models/User");
const Subject = require("../models/Subject");
const Assignment = require("../models/Assignment");
const { check, validationResult } = require("express-validator");

router.post(
  "/add/:subjectname/:assignment",
  [
    check("num", "number is required").not().isEmpty(),
    check("title", "title is required").not().isEmpty(),
    check("description", "description is required").isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, deadline } = req.body;
      let subjectfound = await Subject.findOne({
        name: req.params.subjectname,
      });
      let students = await User.find({
        subject: { name: req.params.subjectname },
      });
      if (subjectfound) {
        const assignment = new Assignment({
          num: req.params.assignment,
          title: title,
          description: description,
          deadline: new Date(deadline),
          subject: {
            subjectId: subjectfound.id,
            subjectName: subjectfound.name,
          },
        });
        await Assignment.save();
        Assigment.
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);
module.exports = router;
