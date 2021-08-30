const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Subject = require("../models/Subject");
const { check, validationResult } = require("express-validator");

router.post("/add/:subjectname", [
  auth,
  [check("email", "email is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      
        }
    
     catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
]);
module.exports = router;
