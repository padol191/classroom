const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubjectSchema = new Schema({
  teacher: {
    type: Schema.Types.String,
    ref: "teachers",
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  students: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
});
module.exports = Subject = mongoose.model("subject", SubjectSchema);
