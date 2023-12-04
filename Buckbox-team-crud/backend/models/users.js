const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
//   id: {
//     require: true,
//     type: Number,
//   },
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
  gender: {
    required: true,
    type: String,
  },
  country: {
    required: true,
    type: String,
  },
  profileImg: {
    require: true,
    type: String,
  },
});

const Team = new mongoose.model("Team", UserSchema);
module.exports = Team;
