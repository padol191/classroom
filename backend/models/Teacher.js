const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  subjectCreated: [
    {
      name: {
        type: String,
      },
    },
  ],
  assignment: [
    {
      title: {
        type: Schema.Types.String,
        ref: "assignment",
      },
      description: {
        type: Schema.Types.String,
        ref: "assignment",
      },
    },
  ],
});

module.exports = Teacher = mongoose.model("teacher", TeacherSchema);
