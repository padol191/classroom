const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  subject: [
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
      completed: {
        type: Boolean,
      },
      fileUrl: {
        type: String,
      },
      subject: {
        type: String,
      },
    },
  ],
});

module.exports = User = mongoose.model("user", UserSchema);
