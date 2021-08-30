const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AssignmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
  },
  uploaded: [
    {
      fileUrl: {
        type: String,
      },
      studentName: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  pending: [
    {
      studentName: {
        type: String,
      },
    },
  ],
});
module.exports = Assignment = mongoose.model("subject", AssignmentSchema);
