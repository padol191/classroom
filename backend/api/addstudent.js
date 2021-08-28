const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");
router.post("/", [
  auth,
  [check("email", "email is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const student = await User.findById(req.body.email).select("-password");
    } catch {}
  },
]);
module.exports = router;
