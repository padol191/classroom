const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AssignmentSchema = new Schema({
  num: {
    type: Number,
    required: true,
  },
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
  subject: {
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: "subject",
    },
    subjectName: {
      type: String,
    },
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
